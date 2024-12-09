'use server'

import { stripe } from '@/lib/stripe';

export async function createCheckoutSession(product) {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('BASE_URL not configured');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: product.id,
      },
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
    return { error: error.message };
  }
}