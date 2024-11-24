// app/auth/providers/email-provider.js
import EmailProvider from 'next-auth/providers/email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const emailProvider = EmailProvider({
  server: {
    async sendVerificationRequest({ identifier: email, url }) {
      try {
        const { data, error } = await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Connexion à CABEN',
          html: `
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px;">
              <h2 style="color: #333; text-align: center;">Bienvenue sur CABEN</h2>
              <p style="color: #666; text-align: center;">
                Cliquez sur le bouton ci-dessous pour vous connecter.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" 
                   style="background: #F7CE3E; 
                          color: black; 
                          padding: 12px 30px; 
                          text-decoration: none; 
                          border-radius: 5px; 
                          display: inline-block;
                          font-weight: bold;">
                  Se connecter
                </a>
              </div>
            </div>
          `
        })

        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        console.error('Erreur d\'envoi d\'email:', error)
        throw error
      }
    }
  },
  from: process.env.EMAIL_FROM
})