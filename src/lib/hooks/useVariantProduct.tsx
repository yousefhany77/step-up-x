import { useEffect, useState } from 'react'
import { Product, Variant } from '../products'

type UseVariantProduct = ({
  index,
  product,
}: {
  index: number
  product: Product
}) => {
  currentProduct: Variant | Product
}

const useVariantProduct: UseVariantProduct = ({ index, product }) => {
  const [currentProduct, setCurrentProduct] = useState<Variant | Product>(
    product
  )
  useEffect(() => {
    if (index > 0 && product?.variants?.length) {
      const variant = product.variants[index - 1]
      setCurrentProduct(variant)
    }
    if (index === 0) {
      setCurrentProduct(product)
    }
  }, [index, product])
  return {
    currentProduct,
  }
}

export default useVariantProduct
