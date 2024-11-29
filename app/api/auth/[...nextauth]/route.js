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
          // Vérifie si l'utilisateur existe, soit créé par auth soit par Stripe
          const user = await prisma.user.findUnique({
            where: { email },
            include: {
              orders: {
                select: {
                  status: true,
                },
                where: {
                  status: 'paid'
                }
              }
            }
          });
          
          if (!user) {
            throw new Error('Ce compte n\'existe pas');
          }
          
          // Personnalisation du message en fonction du statut client
          const hasPaidOrders = user.orders.length > 0;
          const welcomeMessage = hasPaidOrders 
            ? 'Ravi de vous revoir sur CABEN' 
            : 'Bienvenue sur CABEN';
          
          const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'CABEN <onboarding@resend.dev>',
            to: email,
            subject: 'Se connecter à CABEN',
            html: `
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="color: #333; text-align: center;">${welcomeMessage}</h1>
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
    async signIn({ user }) {
      try {
        // Vérifie si l'utilisateur existe dans la base de données
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        
        // Si l'utilisateur n'existe pas, on le crée
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
            },
          });
        }
        
        return true; // Autorise la connexion
      } catch (error) {
        console.error('Erreur de vérification:', error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        
        // Ajout des informations de commande à la session
        const userWithOrders = await prisma.user.findUnique({
          where: { id: token.sub },
          include: {
            orders: {
              where: {
                status: 'paid'
              }
            }
          }
        });
        
        if (userWithOrders) {
          session.user.hasPaidOrders = userWithOrders.orders.length > 0;
        }
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/account',
    verifyRequest: '/account/verify',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };