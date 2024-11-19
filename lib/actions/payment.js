// lib/actions/payment.js
'use server'

import { stripe } from '@/lib/stripe';

export async function createCheckoutSession() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('La clé secrète Stripe n\'est pas configurée');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Business English Course',
              description: '250 Hours of Business English Training',
            },
            unit_amount: 29900, // 299.00€
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
      // Ajout d'un délai d'expiration de 30 minutes
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
    });

    return { url: session.url };
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error('Erreur lors de la création de la session de paiement');
  }
}