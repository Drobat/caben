'use server'

import { stripe } from '@/lib/stripe';

export async function createCheckoutSession() {
  try {
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

    if (!session?.url) {
      throw new Error('Failed to create checkout session');
    }

    return { url: session.url };
  } catch (error) {
    console.error('Stripe error:', error);
    return { error: error.message };
  }
}

export async function handleSuccessfulPayment(sessionId) {
  if (!sessionId) {
    throw new Error('Session ID is required');
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer_details'],
    });

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;

    if (!customerEmail) {
      throw new Error('Email not found in session');
    }

    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: {}, 
      create: {
        email: customerEmail,
        name: customerName || undefined,
      },
    });

    await prisma.order.create({
      data: {
        userId: user.id,
        stripeSessionId: sessionId,
        amount: session.amount_total / 100,
        status: session.payment_status,
      },
    });

    return {
      success: true,
      user,
      email: customerEmail,
      amount: session.amount_total / 100,
      status: session.payment_status,
    };
  } catch (error) {
    console.error('Error handling successful payment:', error);
    return { error: error.message };
  }
}