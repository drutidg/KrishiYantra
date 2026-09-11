import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateETA } from '@/lib/eta';
import notificationService from '@/lib/notifications';
import { broadcastQueueUpdate } from '@/lib/socket-server';

export async function POST(req: Request) {
  try {
    const { farmerId, centerId, slotId, cropType, quantityKg } = await req.json();

    if (!farmerId || !centerId || !slotId) {
      return NextResponse.json(
        { error: 'Missing required fields: farmerId, centerId, slotId' },
        { status: 400 }
      );
    }

    // Atomic transaction for concurrency safety
    const result = await prisma.$transaction(async (tx) => {
      const slot = await tx.slot.findUnique({
        where: { id: slotId },
        include: { center: true },
      });

      if (!slot) {
        throw new Error('Slot not found');
      }

      if (slot.status === 'DISABLED') {
        throw new Error('This slot is disabled by center staff.');
      }

      if (slot.bookedCount >= slot.capacity) {
        throw new Error(
          'This slot was just booked by another farmer. Please choose another slot.'
        );
      }

      if (slot.center.status === 'CLOSED') {
        throw new Error('This center is currently closed. Please select another center.');
      }

      // Count existing active queue in this center
      const activeBookingsCount = await tx.booking.count({
        where: {
          centerId,
          status: { in: ['WAITING', 'PROCESSING'] },
        },
      });

      // Total bookings for token sequential generation
      const totalBookingsCount = await tx.booking.count({
        where: { centerId },
      });

      // Generate token: Center prefix B- + sequential number
      const nextNum = 100 + totalBookingsCount + 1;
      const tokenNumber = `B-${nextNum}`;

      const queuePosition = activeBookingsCount + 1;
      const eta = calculateETA({
        peopleAhead: activeBookingsCount,
        avgProcessMins: slot.center.avgProcessMins,
        activeCounters: slot.center.activeCounters,
      });

      // Increment slot booked count
      const updatedSlot = await tx.slot.update({
        where: { id: slotId },
        data: {
          bookedCount: { increment: 1 },
          status: slot.bookedCount + 1 >= slot.capacity ? 'FULL' : 'AVAILABLE',
        },
      });

      // Create booking
      const booking = await tx.booking.create({
        data: {
          farmerId,
          centerId,
          slotId,
          tokenNumber,
          status: 'WAITING',
          estimatedWait: eta.minutes,
          queuePosition,
          cropType: cropType || 'Paddy / Rice',
          quantityKg: quantityKg ? parseInt(quantityKg) : 1000,
        },
        include: {
          center: true,
          slot: true,
          user: true,
        },
      });

      // Create queue event
      await tx.queueEvent.create({
        data: {
          bookingId: booking.id,
          oldStatus: 'NONE',
          newStatus: 'WAITING',
          note: 'Booking confirmed via KrishiYantra portal',
        },
      });

      return booking;
    });

    // Send confirmation notification
    await notificationService.send({
      userId: farmerId,
      bookingId: result.id,
      title: 'Booking Confirmed',
      message: `Your booking ${result.tokenNumber} at ${result.center.name} is confirmed for ${result.slot.date} at ${result.slot.startTime}.`,
      type: 'BOOKING',
    });

    // Broadcast queue update
    broadcastQueueUpdate(centerId, {
      centerId,
      action: 'BOOKING_CREATED',
      bookingId: result.id,
    });

    return NextResponse.json({ success: true, booking: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
