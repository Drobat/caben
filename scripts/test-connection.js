// scripts/test-connection.js
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Nécessaire pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie !');
    
    const result = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP;`;
    console.log('📅 Timestamp de la base de données:', result[0]);
    
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    console.error('Details:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });