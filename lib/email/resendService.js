import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, url, template) => {
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'CABEN <onboarding@resend.dev>',
            to: email,
            subject: 'Se connecter à CABEN',
            html: template(url)
        });

        if (error) {
            console.error('Resend error:', error);
            throw new Error('Failed to send email');
        }

        console.log('Email sent successfully:', data);
        return data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error("Erreur lors de l'envoi de l'email");
    }
}; 