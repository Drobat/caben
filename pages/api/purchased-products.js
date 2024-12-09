import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany({
        include: {
          product: true,
        },
      });
      const purchasedProducts = orders.map(order => order.product);
      res.status(200).json(purchasedProducts);
    } catch (error) {
      console.error('Error fetching purchased products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 