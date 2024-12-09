const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: "✨ test",
      description: "hehehehheess Communication Excellence • Leadership Skills • Writing Mastery • Live Sessions • Personal Coach • Mobile App • Business Certificate • Global Network",
      price: 300,
      duration: 250,
      imageUrl: "/test.svg",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      active: true,
    },
  });
  
  console.log('Product created:', product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 