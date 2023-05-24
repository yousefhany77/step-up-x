import { listBrands } from '@/lib/products'
import BrandsList from '@components/Brands/BrandsList'

const page = async ({}) => {
  const brands = await listBrands()
  return (
    <section
      style={{
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <BrandsList brands={brands} />
    </section>
  )
}

export default page
