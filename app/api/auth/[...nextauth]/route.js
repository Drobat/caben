// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        try {
          // Vérifie si l'utilisateur existe
          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user) {
            throw new Error('Ce compte n\'existe pas');
          }

          await resend.emails.send({
            from: 'CABEN <onboarding@resend.dev>',
            to: email,
            subject: 'Se connecter à CABEN',
            html: `
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="color: #333; text-align: center;">Bienvenue sur CABEN</h1>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${url}" 
                     style="background-color: #F7CE3E; 
                            color: black; 
                            padding: 12px 24px; 
                            text-decoration: none; 
                            border-radius: 5px;
                            font-weight: bold;
                            display: inline-block;">
                    Se connecter
                  </a>
                </div>
                <p style="color: #666; text-align: center; margin-top: 20px;">
                  Ce lien est valable 24 heures. Si vous n'avez pas demandé cette connexion, 
                  vous pouvez ignorer cet email.
                </p>
              </div>
            `
          });
        } catch (error) {
          console.error('Erreur envoi email:', error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        return !!existingUser;
      } catch (error) {
        console.error('Erreur de vérification:', error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/account',
    verifyRequest: '/account/verify',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };