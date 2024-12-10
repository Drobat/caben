// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { authConfig } from './config';
import { Resend } from 'resend';
import { createVerificationEmailHTML } from './email-template';

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
                        subject: 'Login to CABEN',
                        html: createVerificationEmailHTML(url)
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
