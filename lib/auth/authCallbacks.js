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
            const userEmail = user?.email || email;
            if (!userEmail) return false;

            const existingUser = await prisma.user.findUnique({
                where: { email: userEmail }
            });

            // Autoriser la connexion si l'utilisateur existe
            return !!existingUser;
        } catch (error) {
            console.error('Error in signIn callback:', error);
            return false;
        }
    },
    
    async redirect({ url, baseUrl }) {
        return url.startsWith(baseUrl) ? url : baseUrl;
    }
}; 