// scripts/list-users.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('📋 Liste des utilisateurs:');
    console.log('------------------------');
    
    users.forEach(user => {
      console.log(`
ID: ${user.id}
Email: ${user.email}
Nom: ${user.name}
Longueur du nom: ${user.name.length} caractères
Code points Unicode: ${[...user.name].map(char => `U+${char.charCodeAt(0).toString(16).toUpperCase()}`).join(', ')}
Admin: ${user.isAdmin ? 'Oui' : 'Non'}
Créé le: ${user.createdAt.toLocaleDateString()}
------------------------`);
    });
    
    console.log(`Total: ${users.length} utilisateur(s)`);
    
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