// lib/actions/getSession.js
'use server'

import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function getSession(sessionId) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent'],
    });

    const email = session.customer_details?.email || session.customer?.email;
    const customerName = session.customer_details?.name;
    const productId = session.metadata.productId;

    if (email) {
      try {
        // Créer ou mettre à jour l'utilisateur
        const user = await prisma.user.upsert({
          where: { email },
          update: {
            name: customerName || undefined,
            emailVerified: new Date(), // Marquer l'email comme vérifié
          },
          create: {
            email,
            name: customerName || undefined,
            emailVerified: new Date(), // Marquer l'email comme vérifié
          },
        });

        // Enregistrer la commande
        await prisma.order.create({
          data: {
            userId: user.id,
            productId: productId,
            stripeSessionId: sessionId,
            amount: session.amount_total,
            status: 'complete',
          },
        });

        // Créer un token de vérification pour la connexion automatique
        await prisma.verificationToken.create({
          data: {
            identifier: email,
            token: sessionId, // Utiliser le sessionId comme token
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expire dans 24h
          },
        });

        console.log('Utilisateur, commande et token créés avec succès:', { email, userId: user.id });

        // Stocker l'email dans un cookie pour la redirection
        cookies().set('userEmail', email, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24, // 24 heures
        });

      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur/commande:', error);
      }
    }

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