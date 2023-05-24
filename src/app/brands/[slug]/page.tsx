import { listProduct } from '@/lib/products'
import { Brand } from '@/lib/products/type'
import ProductCard from '@components/Product/ProductCard'
import ProductList from '@components/Product/ProductsList'
import { notFound } from 'next/navigation'

const brands = [
  {
    name: 'Nike',
    slug: 'nike',
  },
  {
    name: 'Adidas',
    slug: 'adidas',
  },
  {
    name: 'Converse',
    slug: 'converse',
  },
  {
    name: 'new balance',
    slug: 'new_balance',
  },
].map((brand) => brand.slug)

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
