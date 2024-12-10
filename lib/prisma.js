// lib/prisma.js
import { PrismaClient } from '@prisma/client';

// Déclaration de la variable prisma pour la portée globale
let prisma;

// En production, on crée simplement une nouvelle instance
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({
        log: ['query', 'error', 'warn'],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });
} else {
    // En développement, on réutilise l'instance si elle existe déjà
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query', 'error', 'warn'],
        });
    }
    prisma = global.prisma;
}

export { prisma };