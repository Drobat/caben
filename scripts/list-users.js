// scripts/list-users.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        orders: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    if (users.length === 0) {
      console.log('Aucun utilisateur trouvé dans la base de données.');
      return;
    }
    
    console.log('\n=== Liste des utilisateurs ===\n');
    users.forEach((user, index) => {
      console.log(`--- Utilisateur ${index + 1} ---`);
      console.log(`ID: ${user.id}`);
      console.log(`Email: ${user.email}`);
      console.log(`Nom: ${user.name || 'Non renseigné'}`);
      console.log(`Rôle: ${user.role}`);
      console.log(`Admin: ${user.isAdmin ? 'Oui' : 'Non'}`);
      console.log(`Email vérifié: ${user.emailVerified ? user.emailVerified.toLocaleDateString() : 'Non'}`);
      console.log(`Créé le: ${user.createdAt.toLocaleDateString()}`);
      
      if (user.orders.length > 0) {
        console.log('\nCommandes:');
        user.orders.forEach((order, orderIndex) => {
          console.log(`  ${orderIndex + 1}. ${order.product.name}`);
          console.log(`     Prix: ${(order.amount / 100).toFixed(2)} EUR`);
          console.log(`     Status: ${order.status}`);
          console.log(`     Session Stripe: ${order.stripeSessionId}`);
          console.log(`     Date: ${order.createdAt.toLocaleDateString()}`);
          console.log(`     Période: ${order.product.startDate} au ${order.product.endDate}`);
        });
      } else {
        console.log('\nAucune commande');
      }
      
      console.log('\n------------------------\n');
    });
    
    // Statistiques
    const totalUsers = users.length;
    const totalOrders = users.reduce((acc, user) => acc + user.orders.length, 0);
    const totalRevenue = users.reduce((acc, user) => {
      return acc + user.orders.reduce((orderAcc, order) => orderAcc + order.amount, 0);
    }, 0);

    console.log('=== Statistiques ===');
    console.log(`Nombre total d'utilisateurs: ${totalUsers}`);
    console.log(`Nombre total de commandes: ${totalOrders}`);
    console.log(`Revenu total: ${(totalRevenue / 100).toFixed(2)} EUR`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

listUsers()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));