import { NextResponse } from 'next/server'
import { stripe, type PlanId } from '@/lib/stripe'

const PRICE_IDS: Record<PlanId, string | undefined> = {
  solo: process.env.STRIPE_PRICE_SOLO,
  business: process.env.STRIPE_PRICE_BUSINESS,
  multi: process.env.STRIPE_PRICE_MULTI,
}

export async function POST(req: Request) {
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
      success_url: 'http://localhost:3000/dashboard',
      cancel_url: 'http://localhost:3000/paiement',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue.'
    console.error('[checkout]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
