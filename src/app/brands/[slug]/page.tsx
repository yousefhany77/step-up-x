import { listBrands, listProduct } from '@/lib/products'
import { Brand } from '@/lib/products/type'
import ProductCard from '@components/Product/ProductCard'
import ProductList from '@components/Product/ProductsList'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function page({ params }: Props) {
  const sneakers = await listProduct({
    brand: params.slug as Brand,
  })
  if (!sneakers.length) {
    const brands = await listBrands()
    if (!brands.find((brand) => brand.slug === params.slug)) {
      return notFound()
    }
  }
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
