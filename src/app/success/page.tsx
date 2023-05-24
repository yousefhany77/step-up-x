import prisma from '@/db'
import SuccessOrderItemCard from '@components/success/card'
import SuccessPageHeader from '@components/success/header'
import SuccessOrderItem from '@components/success/item'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

interface pageProps {
  searchParams: {
    session_id: string
  }
}

const page = async ({ searchParams }: pageProps) => {
  const { session_id } = searchParams
  if (!session_id) {
    redirect('/')
  }
  const items = await prisma.orders.findFirst({
    where: {
      paymentId: session_id,
    },
    include: {
      OrderItem: true,
    },
  })
  if (!items) {
    notFound()
  }
  return (
    <>
      <SuccessPageHeader
        email={items.customerEmail}
        name={items.customerName}
        orderId={items.id}
      />
      {items.OrderItem.map((item) => (
        <Suspense
          key={item.id}
          fallback={
            <SuccessOrderItemCard
              price={0}
              quantity={0}
              size={0}
              thumbnail=''
              title='loading...'
            />
          }
        >
          {/* @ts-expect-error Async Server Component */}
          <SuccessOrderItem
            id={item.SneakerId}
            variantId={item.variantId}
            quantity={item.quantity}
            size={item.size}
          />
        </Suspense>
      ))}
    </>
  )
}

export default page
