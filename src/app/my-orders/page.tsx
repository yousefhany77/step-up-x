import Order from '@/components/my-orders/order'
import prisma from '@/db'
import { auth } from '@clerk/nextjs'
import ShippingStatusBadge from '@components/my-orders/ShippingStatus'
import Slider from '@components/my-orders/Slider'
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
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1>My Orders</h1>
      {orders.map(({ OrderItem, id, shippingStatus }) => {
        const total = OrderItem.reduce(
          (acc, { price, quantity }) => acc + price.toNumber() * quantity,
          0
        )
        return (
          <>
            <section
              key={id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                <h3
                  style={{
                    color: '#505050',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    flex: 1,
                    margin: 0,
                  }}
                >
                  <strong>Order</strong> #{id}
                </h3>

                <ShippingStatusBadge status={shippingStatus} />

                <p
                  style={{
                    color: '#505050',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    width: '100%',
                    margin: '0.5rem 0',
                  }}
                >
                  <strong>Total:</strong> ${total}
                </p>
              </div>
              {OrderItem.length < 4 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(25%, 300px))',
                  }}
                >
                  {OrderItem.map((item) => (
                    <Order key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <Slider loop={false}>
                  {OrderItem.map((item) => (
                    <Order key={item.id} item={item} />
                  ))}
                </Slider>
              )}
            </section>
            <hr
              key={`${id}-hr`}
              style={{
                width: '80%',
                height: '1.5px',
                opacity: 0.12,
                borderRadius: '0.5rem',
                marginBlock: '2.25rem',
              }}
            />
          </>
        )
      })}
    </div>
  )
}

export default page
