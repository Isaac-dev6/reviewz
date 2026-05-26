import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  timeout: 30000,
  maxNetworkRetries: 0,
})

export type PlanId = 'solo' | 'business' | 'multi'
