const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserPurchases(userEmail) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        orders: {
          include: {
            product: true
          }
        }
      }
    });

    if (!user) {
      console.log('Aucun utilisateur trouvé avec cet email.');
      return;
    }

    console.log('\n=== Informations utilisateur ===');
    console.log(`Nom: ${user.name || 'Non renseigné'}`);
    console.log(`Email: ${user.email}`);
    console.log(`Compte créé le: ${user.createdAt.toLocaleDateString()}`);

    console.log('\n=== Achats ===');
    if (user.orders.length === 0) {
      console.log('Aucun achat trouvé pour cet utilisateur.');
      return;
    }

    user.orders.forEach((order, index) => {
      console.log(`\n--- Achat ${index + 1} ---`);
      console.log(`Produit: ${order.product.name}`);
      console.log(`Prix payé: ${(order.amount / 100).toFixed(2)} EUR`);
      console.log(`Statut: ${order.status}`);
      console.log(`Date: ${order.createdAt.toLocaleDateString()}`);
    });

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer l'email depuis les arguments de la ligne de commande
const userEmail = process.argv[2];

if (!userEmail) {
  console.log('Veuillez fournir un email. Usage: node scripts/get-user-purchases.js user@example.com');
} else {
  getUserPurchases(userEmail);
} 