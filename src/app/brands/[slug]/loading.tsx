import { ProductCardSkeleton } from '@components/skeletons/product/product'

const cards = Array.from({ length: 10 }, (_, i) => i)

function loading() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        maxWidth: '70vw',
        gap: '1rem',
        margin: '0 auto',
      }}
    >
      {cards.map((card) => (
        <ProductCardSkeleton key={card} />
      ))}
    </div>
  )
}

export default loading
