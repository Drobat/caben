import { prisma } from '@/lib/prisma';

// Configuration de base pour NextAuth
export const authConfig = {
    pages: {
        signIn: '/account',
        error: '/account',
        verifyRequest: '/account/verify',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    },
    callbacks: {
        async signIn({ user, email, account, profile, emailVerified }) {
            if (email?.verificationRequest) {
                return true;
            }
            
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email }
            });
            
            return !!existingUser;
        }
    }
}; 