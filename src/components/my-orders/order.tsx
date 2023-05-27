import styles from '@components/skeletonAnimation.module.css'
import SuccessOrderItemCard from '@components/success/card'
import SuccessOrderItem from '@components/success/item'
import { FC, Suspense } from 'react'

interface orderProps {
  item: {
    SneakerId: string
    variantId: string | null
    quantity: number
    size: number
  }
}

const Skeleton = ({ q, s }: { q: number; s: number }) => (
  <SuccessOrderItemCard
    title={'Loading...'}
    thumbnail={'/placeholder.png'}
    price={0}
    quantity={q}
    size={s}
    url=''
    styles={{
      paddingRight: '0 !important',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: 'white',
      margin: '0.5rem 0',
      animation: `${styles['skeleton-pulse']} 1s ease-in-out infinite`,
      '& > img': {
        width: '100%',
      },
      '& > div': {
        marginTop: '0',
        padding: '0.8rem',
        gap: '0.5rem',
      },
    }}
  />
)

const order: FC<orderProps> = ({ item }) => {
  return (
    <Suspense fallback={<Skeleton q={item.quantity} s={item.size} />}>
      {/* @ts-expect-error Async Server Component */}
      <SuccessOrderItem
        id={item.SneakerId}
        variantId={item.variantId}
        quantity={item.quantity}
        size={item.size}
        styles={{
          paddingRight: '0 !important',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: 'white',
          margin: '0.5rem 0',
          '& > img': {
            width: '100%',
          },
          '& > div': {
            marginTop: '0',
            padding: '0.8rem',
            gap: '0.5rem',
          },
        }}
      />
    </Suspense>
  )
}

export default order
