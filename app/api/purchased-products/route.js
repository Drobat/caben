import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        product: true,
      },
      where: {
        status: 'complete' // Pour ne récupérer que les commandes complétées
      }
    });
    
    const purchasedProducts = orders.map(order => order.product);
    return NextResponse.json(purchasedProducts);
  } catch (error) {
    console.error('Error fetching purchased products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 