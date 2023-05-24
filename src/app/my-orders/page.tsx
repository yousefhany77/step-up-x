import prisma from '@/db'
import { auth } from '@clerk/nextjs'
import SuccessOrderItem from '@components/success/item'

async function page() {
  const { userId } = auth()
  if (!userId) throw new Error('Not authenticated')
  const orders = await prisma.orders.findMany({
    where: {
      customerId: userId,
    },
    include: {
      OrderItem: true,
    },
  })
  return (
    <div
      style={{
        maxWidth: '1200px',
      }}
    >
      <h1>My Orders</h1>
      {orders.map(({ OrderItem, id }) => (
        <section
          key={id}
          style={{
            border: '1px solid black',
            padding: '1rem',
            margin: '1rem 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 300px))',
            gap: '2rem',
          }}
        >
          {OrderItem.map((item) => (
            <>
              {/* @ts-expect-error Async Server Component */}
              <SuccessOrderItem
                id={item.SneakerId}
                variantId={item.variantId}
                quantity={item.quantity}
                size={item.size}
                key={item.id}
                styles={{
                  padding: '0 !important',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  '& img': {
                    width: '100%',
                  },
                  '& > div': {
                    marginTop: '1rem',
                    paddingBottom: '1rem',
                    gap: '0.5rem',
                  },
                }}
              />
            </>
          ))}
        </section>
      ))}
    </div>
  )
}

export default page
