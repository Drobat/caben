// scripts/create-user.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(email, name = null, isAdmin = false) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        isAdmin,
      },
    });
    
    console.log('✅ Utilisateur créé avec succès:');
    console.log(JSON.stringify(user, null, 2));
    
    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      console.error('❌ Un utilisateur avec cet email existe déjà');
    } else {
      console.error('❌ Erreur lors de la création de l\'utilisateur:', error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exemple d'utilisation
const email = process.argv[2];
const name = process.argv[3];
const isAdmin = process.argv[4] === 'true';

if (!email) {
  console.error('❌ Veuillez fournir un email.');
  console.log('Usage: npm run create-user -- email@example.com "Nom Complet" true/false');
  process.exit(1);
}

createUser(email, name, isAdmin)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));