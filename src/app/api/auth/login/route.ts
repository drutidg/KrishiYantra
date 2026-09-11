import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { phone, role = 'FARMER', name } = body;

    if (!phone) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { phone },
      include: { farmerProfile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          name: name || (role === 'FARMER' ? 'Farmer User' : 'Center Staff'),
          role,
          ...(role === 'FARMER'
            ? {
                farmerProfile: {
                  create: {
                    village: 'Shivapur',
                    cropType: 'Paddy',
                    language: 'en',
                  },
                },
              }
            : {}),
        },
        include: { farmerProfile: true },
      });
    }

    return NextResponse.json({ success: true, message: 'Login successful', user });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Login failed' }, { status: 500 });
  }
}
