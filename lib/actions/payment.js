// lib/actions/payment.js
'use server'

import Stripe from 'stripe';

export async function createCheckoutSession() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: '✨ Business English Course - Premium Edition',
              description: 'Professional Business English Program (250 Hours) • Business Communication Excellence • Leadership Skills • Writing Mastery • Live Sessions • Personal Coach • Mobile App • Business Certificate • Global Network',
            },
            unit_amount: 29900,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      locale: 'en',
      custom_text: {
        submit: {
          message: "Join thousands of successful professionals. Get immediate access after purchase.",
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Stripe error:', error);
    throw new Error(error.message);
  }
}