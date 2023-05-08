import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const plexRequests = await prisma.plexRequest.findMany(
    {
        include: {
            user: true
        }
    }
  );
  return NextResponse.json(plexRequests);
}

export async function POST(request: Request) {
    const body = await request.json();
    const plexRequest = await prisma.plexRequest.create({
        data: {
        title: body.title,
        user: {
            connect: {
            email: body.userEmail
            }
        }
        }
    });
    
    return NextResponse.json(plexRequest);
    }