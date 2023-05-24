import prisma from '@/db'
import { env } from '@/env.mjs'
import { getProductById } from '@/lib/products'
import { CartItem } from '@/store/cart/cartSlice'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import _stripe from 'stripe'

const stripe = new _stripe(env.STRIPE_SK, {
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json(
      { error: { message: 'You must be logged in to checkout' } },
      { status: 401 }
    )
  }
  const body = (await request.json()) as { items: CartItem[] }
  if (!Array.isArray(body?.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: { message: 'Invalid request' } },
      { status: 400 }
    )
  }
  try {
    const items = body.items.map(async (item) => {
      try {
        const product = await getProductById(item.id)
        if (!product) throw new Error('Product not found')

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              images: [item.thumbnail],
              description: `Quantity: ${item.quantity} - Size: ${item.size}`,
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity,
        }
      } catch (err) {
        throw new Error('Product not found')
      }
    })
    const line_items = await Promise.all(items)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/`,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `StepUpX purchase ${new Date().toLocaleDateString()}`,
        },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'day',
                value: 1,
              },
              maximum: {
                unit: 'day',
                value: 3,
              },
            },
            fixed_amount: {
              currency: 'usd',
              amount: 0,
            },
            type: 'fixed_amount',
          },
        },
      ],
    })
    if (!session.url) {
      throw new Error('Payment failed')
    }
    await prisma.orders.create({
      data: {
        paymentId: session.id,
        paymentStatus: 'unpaid',
        customerEmail: user.emailAddresses[0].emailAddress,
        customerName: `${user.firstName} ${user.lastName}`,
        customerId: user.id,
        OrderItem: {
          create: body.items.map((item) => {
            return {
              quantity: item.quantity,
              size: Number(item.size),
              price: item.price,
              SneakerId: item.id,
              variantId: item.variantId,
            }
          }),
        },
      },
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.log('🚀 ~ file: route.ts:104 ~ POST ~ error:', error)
    let message = 'Payment failed'
    if (error instanceof Error) {
      message = error.message
    }
    return NextResponse.json({ error: { message } }, { status: 500 })
  }
}
