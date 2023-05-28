import prisma from '@/db'
import { NextResponse } from 'next/server'
import { prismaError } from 'prisma-better-errors'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orderId, shippingStatus } = z
      .object({
        orderId: z.string(),
        shippingStatus: z.enum(['pending', 'shipped', 'delivered']),
      })
      .parse(body)
    console.log(
      '🚀 ~ file: route.ts:10 ~ POST ~ shippingStatus:',
      shippingStatus
    )
    const order = await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        shippingStatus,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    if (error instanceof prismaError) {
      return new Response(error.message)
    } else if (error instanceof z.ZodError) {
      return new Response(error.message)
    }
    return new Response("Couldn't update shipping status")
  }
}
