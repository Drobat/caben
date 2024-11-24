// lib/actions/getSession.js
'use server'

import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export async function getSession(sessionId) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent'],
    });

    const email = session.customer_details?.email || session.customer?.email;
    const customerName = session.customer_details?.name;

    if (email) {
      try {
        // Créer ou mettre à jour l'utilisateur
        const user = await prisma.user.upsert({
          where: { email },
          update: {}, // Ne met rien à jour si l'utilisateur existe
          create: {
            email,
            name: customerName || undefined,
          },
        });

        // Enregistrer la commande
        await prisma.order.create({
          data: {
            userId: user.id,
            stripeSessionId: sessionId,
            amount: session.amount_total / 100,
            status: session.payment_status,
          },
        });

        console.log('Utilisateur et commande créés avec succès:', { email, userId: user.id });
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur/commande:', error);
        // Continue l'exécution même en cas d'erreur pour maintenir la compatibilité
      }
    }

    // Garde le même format de retour que votre version originale
    return {
      email: email,
      amount: session.amount_total / 100,
      status: session.payment_status,
      customer_details: session.customer_details,
    };

  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}