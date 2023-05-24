import { getProductById } from '@/lib/products'
import SuccessOrderItemCard from './card'
import { Sx } from '@mantine/core'

interface SuccessOrderItemProps {
  id: string
  variantId: string | null
  quantity: number
  size: number
  styles?: Sx
}

const SuccessOrderItem = async ({
  id,
  quantity,
  size,
  variantId,
  styles,
}: SuccessOrderItemProps) => {
  const product = await getProductById(id)
  const variant =
    variantId &&
    product?.variants &&
    product?.variants.find((variant) => variant.id === variantId)
  if (!product) {
    return <div>Product not found</div>
  }
  if (variant) {
    return (
      <SuccessOrderItemCard
        title={variant?.title ?? product.title}
        thumbnail={variant.thumbnail}
        price={variant?.price ?? product.price}
        quantity={quantity}
        size={size}
        styles={styles}
      />
    )
  }
  return (
    <SuccessOrderItemCard
      title={product.title}
      thumbnail={product.thumbnail}
      price={product.price}
      quantity={quantity}
      size={size}
      styles={styles}
    />
  )
}

export default SuccessOrderItem
