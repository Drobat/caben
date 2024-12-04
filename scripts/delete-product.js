const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteProduct(productId) {
  try {
    // D'abord, supprimer toutes les commandes associées
    await prisma.order.deleteMany({
      where: { productId: productId }
    });

    // Ensuite, supprimer le produit
    const product = await prisma.product.delete({
      where: { id: productId }
    });

    console.log('Product and associated orders deleted successfully:', product);
  } catch (error) {
    console.error('Error deleting product:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer l'ID du produit depuis les arguments de la ligne de commande
const productId = process.argv[2];

if (!productId) {
  console.log('Veuillez fournir un ID de produit. Usage: node scripts/delete-product.js <productId>');
} else {
  deleteProduct(productId);
} 