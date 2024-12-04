import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/config';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const purchases = await prisma.order.findMany({
      where: {
        userId: session.user.id,
        status: 'complete', // ou le statut que vous utilisez pour les paiements réussis
      },
      include: {
        product: true,
      },
    });

    const products = purchases.map(purchase => purchase.product);

    return Response.json({ products });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return Response.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 