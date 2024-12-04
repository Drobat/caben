// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { authConfig } from './config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    ...authConfig,
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest({ identifier: email, url }) {
                try {
                    const { data, error } = await resend.emails.send({
                        from: process.env.EMAIL_FROM,
                        to: email,
                        subject: 'Connexion à CABEN',
                        html: `
                            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h1>Connexion à CABEN</h1>
                                <p>Cliquez sur le lien ci-dessous pour vous connecter :</p>
                                <a href="${url}" style="
                                    display: inline-block;
                                    padding: 12px 24px;
                                    background-color: #F7CE3E;
                                    color: black;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    margin: 20px 0;
                                ">Se connecter</a>
                                <p>Si vous n'avez pas demandé cette connexion, vous pouvez ignorer cet email.</p>
                            </div>
                        `
                    });

                    if (error) {
                        throw new Error(error.message);
                    }
                    
                    console.log('Verification email sent:', data);
                } catch (error) {
                    console.error('Error sending verification email:', error);
                    throw new Error('SEND_VERIFICATION_EMAIL_ERROR');
                }
            },
        }),
    ],
});

export { handler as GET, handler as POST };
