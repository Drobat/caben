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
    
    async signIn({ user, email }) {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email }
            });

            if (!existingUser) {
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error in signIn callback:', error);
            return false;
        }
    },
    
    async redirect({ baseUrl }) {
        return baseUrl;
    }
}; 