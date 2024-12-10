import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    
    if (!session?.user?.email) {
      return Response.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!user) {
      return Response.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const purchases = await prisma.order.findMany({
      where: {
        userId: user.id,
        status: 'complete',
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