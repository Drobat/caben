import { prisma } from '@/lib/prisma';

export const authCallbacks = {
    async session({ session, token }) {
        if (session?.user && token) {
            session.user.id = token.id;
        }
        return session;
    },
    
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
        }
        return token;
    },
    
    async redirect({ baseUrl }) {
        return baseUrl;
    },
    
    async signIn({ user, email }) {
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!existingUser) {
            throw new Error('Email not found');
        }

        return true;
    },
}; 