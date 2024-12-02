// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { authConfig } from './config';
import { authCallbacks } from '@/lib/auth/authCallbacks';
import { sendVerificationEmail } from '@/lib/email/resendService';
import { createVerificationEmailHTML } from './email-template';

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    ...authConfig,
    providers: [
        EmailProvider({
            from: process.env.EMAIL_FROM || 'CABEN <onboarding@resend.dev>',
            async sendVerificationRequest({ identifier: email, url }) {
                await sendVerificationEmail(email, url, createVerificationEmailHTML);
            },
        }),
    ],
    callbacks: authCallbacks,
});

export { handler as GET, handler as POST };
