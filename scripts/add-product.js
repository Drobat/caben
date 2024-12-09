const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addProduct() {
  try {
    const product = await prisma.product.create({
      data: {
        name: "✨ test",
        description: "hehehehheess Communication Excellence • Leadership Skills • Writing Mastery • Live Sessions • Personal Coach • Mobile App • Business Certificate • Global Network",
        price: 300, // 299.00 EUR
        duration: 250, // 250 heures
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