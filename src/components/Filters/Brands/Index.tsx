import { listBrands } from '@/lib/products'
import Slider from '@components/my-orders/Slider'
import WithCollapse from '../WithCollapse'
import Card from './Card'

async function FilterByBrand() {
  const brands = await listBrands()

  return (
    <WithCollapse label={`Brands (${brands.length})`}>
      <Slider
        slideSize={{
          desktop: {
            width: '10rem',
            height: '10rem',
          },
          mobile: {
            width: '10rem',
            height: '10rem',
          },
        }}
      >
        {brands.map((brand) => (
          <Card key={brand.slug} {...brand} />
        ))}
      </Slider>
    </WithCollapse>
  )
}

export default FilterByBrand
