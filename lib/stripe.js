// lib/stripe.js
import Stripe from 'stripe';

let stripe;

try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    typescript: false,
  });
} catch (error) {
  console.error('Stripe initialization error:', error);
}

export { stripe };