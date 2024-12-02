// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM || 'CABEN <onboarding@resend.dev>',
      async sendVerificationRequest({ identifier: email, url }) {
        try {
          // Vérifions d'abord si l'utilisateur existe
          const user = await prisma.user.findUnique({
            where: { email }
          });
          
          // Si l'utilisateur n'existe pas, on lance une erreur
          if (!user) {
            throw new Error('Email not found');
          }
          
          // Si l'utilisateur existe, on envoie l'email
          const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'CABEN <onboarding@resend.dev>',
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
          
          if (error) {
            throw error;
          }
        } catch (error) {
          console.error('Erreur envoi email:', error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn callback:", { 
        user,
        account,
        profile,
        email,
        credentials 
      });
      return true;
    },
    async session({ session, token, user }) {
      console.log("Session callback:", { 
        session,
        token,
        user 
      });
      if (session?.user) {
        session.user.id = user?.id || token?.sub;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT callback:", { 
        token,
        user,
        account,
        profile 
      });
      return token;
    }
  },
  pages: {
    signIn: '/account',
    verifyRequest: '/account/verify',
  },
  events: {
    async signIn(message) { console.log("Successful sign in", message) },
    async signOut(message) { console.log("Sign out", message) },
    async session(message) { console.log("Session", message) },
  },
  debug: true, // Active les logs de debug de NextAuth
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };