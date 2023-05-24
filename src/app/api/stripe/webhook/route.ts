import prisma from '@/db'
import { env } from '@/env.mjs'
import { NextResponse } from 'next/server'
import _stripe from 'stripe'

const stripe = new _stripe(env.STRIPE_SK, {
  apiVersion: '2022-11-15',
})

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') || ''
  const rawBody = await req.text()
  let event

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` })
    return NextResponse.json({ error: 'Webhook Error' })
  }
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as {
        id: string
        customer_details: customer_details
      }
      await prisma.orders.update({
        where: {
          paymentId: session.id,
        },
        data: {
          customerPhone: session.customer_details.phone,
          paymentStatus: 'paid',
          address: `${session.customer_details.address.line1}, ${session.customer_details.address.city}, ${session.customer_details.address.state}, ${session.customer_details.address.postal_code}, ${session.customer_details.address.country}`,
        },
      })

    default:
  }

  return NextResponse.json(
    { received: true },
    {
      status: 200,
    }
  )
}

type customer_details = {
  address: {
    city: string
    country: string
    line1: string
    line2: string | null
    postal_code: string
    state: string
  }
  email: string
  name: string
  phone: string
}
