export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

type PlanId = 'solo' | 'business' | 'multi'

export async function POST(req: Request) {
  console.log('Stripe key exists:', !!process.env.STRIPE_SECRET_KEY)

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const PRICE_IDS: Record<PlanId, string | undefined> = {
    solo: process.env.STRIPE_PRICE_SOLO,
    business: process.env.STRIPE_PRICE_BUSINESS,
    multi: process.env.STRIPE_PRICE_MULTI,
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  try {
    const body = (await req.json().catch(() => ({}))) as { plan?: string }
    const plan = body.plan as PlanId | undefined

    if (!plan || !(plan in PRICE_IDS)) {
      return NextResponse.json(
        { error: 'Plan invalide. Attendu : solo | business | multi.' },
        { status: 400 },
      )
    }

    const priceId = PRICE_IDS[plan]
    if (!priceId) {
      return NextResponse.json(
        { error: `Price ID manquant pour le plan "${plan}". Vérifiez vos variables d'environnement.` },
        { status: 500 },
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      locale: 'fr',
      success_url: `${baseUrl}/dashboard`,
      cancel_url: `${baseUrl}/paiement`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue.'
    console.error('[checkout]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
