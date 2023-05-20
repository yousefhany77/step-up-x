import { listProduct } from '@/lib/products'
import ProductCard from '@components/Product/ProductCard'
import ProductList from '@components/Product/ProductsList'
import { Brand } from '@prisma/client'
import { notFound } from 'next/navigation'

const brands = Object.keys(Brand)

async function page({
  params,
}: {
  params: {
    slug: string
  }
}) {
  if (!brands.includes(params.slug)) {
    notFound()
  }
  const sneakers = await listProduct({
    brand: params.slug as Brand,
  })
  return (
    <ProductList>
      {sneakers.map((sneaker) => (
        <ProductCard
          key={`${sneaker.pid} - ${sneaker.brand}`}
          product={sneaker}
        />
      ))}
    </ProductList>
  )
}

export default page
