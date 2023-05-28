import { listBrands } from '@/lib/products'
import Slider from '@components/my-orders/Slider'
import Card from './Card'

async function FilterByBrand() {
  const brands = await listBrands()

  return (
    <Slider
      withControls
      slideSize={{
        desktop: {
          width: '7rem',
          height: '7rem',
        },
        mobile: {
          width: '7rem',
          height: '7rem',
        },
      }}
      orientation='horizontal'
    >
      {brands.map((brand) => (
        <Card key={brand.slug} {...brand} />
      ))}
    </Slider>
  )
}

export default FilterByBrand
