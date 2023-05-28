import FilterByBrand from './Filters/Brands/Index'

function Filters() {
  return (
    <>
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
      >
        Brands
      </h3>
      {/* @ts-expect-error Async Server Component */}
      <FilterByBrand />
    </>
  )
}

export default Filters
