const { PrismaClient } = require('@prisma/client');

// Vérifier si on est en production
const databaseUrl = process.env.VERCEL_ENV === 'production' 
  ? process.env.DATABASE_URL_PRODUCTION // URL de votre base de données de production
  : process.env.DATABASE_URL; // URL de votre base de données locale

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

async function addProduct() {
  try {
    const product = await prisma.product.create({
      data: {
        name: "Nicolas",
        description: "hehehehheess Communication Excellence • Leadership Skills • Writing Mastery • Live Sessions • Personal Coach • Mobile App • Business Certificate • Global Network",
        price: 6000, // 299.00 EUR
        duration: 12, // 250 heures
        imageUrl: "/test.svg",
        startDate: "2024-02-01", // Format string YYYY-MM-DD
        endDate: "2024-12-31",   // Format string YYYY-MM-DD
        active: true,
      },
    });

    console.log('Product created successfully:', product);
  } catch (error) {
    console.error('Error creating product:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProduct(); 