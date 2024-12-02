// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            from: process.env.EMAIL_FROM || 'CABEN <onboarding@resend.dev>',
            async sendVerificationRequest({ identifier: email, url }) {
                try {
                    await resend.emails.send({
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
                } catch (error) {
                    throw new Error("Erreur lors de l'envoi de l'email");
                }
            },
        }),
    ],
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
        async redirect({ url, baseUrl }) {
            // Toujours rediriger vers la page d'accueil après la connexion
            return baseUrl;
        },
    },
});

export { handler as GET, handler as POST };