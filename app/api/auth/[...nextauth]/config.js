import { prisma } from '@/lib/prisma';

export const authConfig = {
    pages: {
        signIn: '/account',
        error: '/account',
        verifyRequest: '/account/verify',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    }
}; 