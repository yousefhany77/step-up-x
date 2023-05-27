import { getProductById } from '@/lib/products'
import { Sx } from '@mantine/core'
import SuccessOrderItemCard from './card'

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
  const url = encodeURI(`${product.title.replaceAll(' ', '-')}/${product.pid}`)
  if (variant) {
    return (
      <SuccessOrderItemCard
        title={variant?.title ?? product.title}
        thumbnail={variant.thumbnail}
        price={variant?.price ?? product.price}
        quantity={quantity}
        size={size}
        styles={styles}
        url={url}
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
      url={url}
    />
  )
}

export default SuccessOrderItem
