import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, url, template) => {
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || 'CABEN <onboarding@resend.dev>',
            to: email,
            subject: 'Se connecter à CABEN',
            html: template(url)
        });
    } catch (error) {
        throw new Error("Erreur lors de l'envoi de l'email");
    }
}; 