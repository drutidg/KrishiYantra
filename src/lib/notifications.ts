import prisma from './prisma';
import { broadcastNotification } from './socket-server';

export interface SendNotificationDTO {
  userId: string;
  bookingId?: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'QUEUE' | 'DELAY' | 'COMPLETION' | 'CLOSURE';
  phone?: string;
}

export interface INotificationService {
  send(data: SendNotificationDTO): Promise<any>;
}

class MockNotificationService implements INotificationService {
  async send(data: SendNotificationDTO) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId: data.userId,
          bookingId: data.bookingId,
          title: data.title,
          message: data.message,
          type: data.type,
          read: false,
        },
      });

      // Broadcast via socket to connected user room
      broadcastNotification(data.userId, notification);

      console.log(`[MockNotification] Pushed to User ${data.userId} (${data.phone || 'no-phone'}): [${data.title}] ${data.message}`);
      return notification;
    } catch (err) {
      console.error('Failed to create notification:', err);
      return null;
    }
  }
}

class TwilioNotificationService implements INotificationService {
  async send(data: SendNotificationDTO) {
    // In production with credentials, dispatch SMS via Twilio SDK
    console.log(`[Twilio SMS fallback to mock] To: ${data.phone} Msg: ${data.message}`);
    const mock = new MockNotificationService();
    return mock.send(data);
  }
}

export const notificationService: INotificationService =
  process.env.NOTIFICATION_PROVIDER === 'twilio' && process.env.TWILIO_ACCOUNT_SID
    ? new TwilioNotificationService()
    : new MockNotificationService();

export default notificationService;
