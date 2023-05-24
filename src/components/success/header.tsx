import { FC } from 'react'

interface headerProps {
  email: string
  name: string
  orderId: string
}

const SuccessPageHeader: FC<headerProps> = ({ email, name, orderId }) => {
  return (
    <section
      style={{
        marginBlock: '2rem',
      }}
    >
      <h1>Thank you for your order, {name}!</h1>
      <p>
        We have sent a confirmation email to <strong>{email}</strong> with your
        order details.
      </p>
      <p>
        Your order ID is <strong>{orderId}</strong>.
      </p>
    </section>
  )
}

export default SuccessPageHeader
