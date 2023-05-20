import { getProductById } from '@/lib/products'
import ProductDetails from '@components/Product/ProductDetails'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    pid: string[]
  }
}

/**
 *
 * SEO recommendation to add the title to the url, a solution for that was using catch all routes and strict it to the pattern which is [title, pid]
 */

const Page = async ({ params }: PageProps) => {
  if (params.pid.length !== 2) {
    notFound()
  }
  const product = await getProductById(params.pid[1])
  if (!product) {
    notFound()
  }
  return (
    <section
      style={{
        height: '100%',
      }}
    >
      <ProductDetails product={product} />
    </section>
  )
}

export default Page
