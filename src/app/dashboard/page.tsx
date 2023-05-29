import Order from '@/components/my-orders/order'
import prisma from '@/db'
import UpdateShippingState from '@components/UpdateShippingStatus'
import Slider from '@components/my-orders/Slider'
import React from 'react'

async function page() {
  const orders = await prisma.orders.findMany({
    include: {
      OrderItem: true,
    },
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
      <h1>Orders</h1>
      {orders.map(
        ({
          OrderItem,
          id,
          shippingStatus,
          address,
          createdAt,
          customerEmail,
          customerName,
          customerPhone,
        }) => {
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
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
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
                  <UpdateShippingState orderId={id} status={shippingStatus} />
                  <div
                    style={{
                      color: '#505050',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      margin: 0,
                      flex: 1,
                      width: '100%',
                    }}
                  >
                    <time
                      style={{
                        color: '#505050',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                      }}
                      dateTime={createdAt.toLocaleDateString()}
                    >
                      <strong> Date:</strong>
                      {createdAt.toLocaleDateString()}
                    </time>
                    <OrderDetailsLabel
                      label='Customer Name'
                      value={customerName}
                    />
                    <OrderDetailsLabel
                      label='Customer Email'
                      value={customerEmail}
                    />
                    <OrderDetailsLabel
                      label='Customer Phone'
                      value={customerPhone}
                    />
                    <OrderDetailsLabel label='Address' value={address} />
                    <OrderDetailsLabel
                      label='Total'
                      value={`$${total.toFixed(2)}`}
                    />
                  </div>
                </div>
                {OrderItem.length < 4 ? (
                  <div
                    style={{
                      display: 'grid',
                      gap: '1rem',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(25%, 300px))',
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
        }
      )}
    </div>
  )
}

export default page

const OrderDetailsLabel: React.FC<{
  label: string
  value?: string | number | null
}> = ({ label, value }) => (
  <p
    style={{
      margin: 0,
      fontWeight: 500,
    }}
  >
    <strong>{label}:</strong> {value ?? 'N/A'}
  </p>
)
