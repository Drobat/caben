const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (products.length === 0) {
      console.log('Aucun produit trouvé dans la base de données.');
      return;
    }

    console.log('\n=== Liste des produits ===\n');
    products.forEach((product, index) => {
      console.log(`--- Produit ${index + 1} ---`);
      console.log(`ID: ${product.id}`);
      console.log(`Nom: ${product.name}`);
      console.log(`Prix: ${(product.price / 100).toFixed(2)} EUR`);
      console.log(`Date de début: ${product.startDate.toLocaleDateString()}`);
      console.log(`Date de fin: ${product.endDate.toLocaleDateString()}`);
      console.log(`Actif: ${product.active ? 'Oui' : 'Non'}`);
      console.log('');
    });

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listProducts(); 