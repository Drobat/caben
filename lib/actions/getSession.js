// lib/actions/getSession.js
'use server'

import Stripe from 'stripe';

export async function getSession(sessionId) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent'],
    });

    return {
      email: session.customer_details?.email || session.customer?.email,
      amount: session.amount_total / 100,
      status: session.payment_status,
      customer_details: session.customer_details,
    };
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}