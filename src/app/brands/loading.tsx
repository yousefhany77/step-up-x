import Image from 'next/image'

function loading() {
  return (
    <section
      style={{
        minHeight: 'calc(100vh - 200px)',
        maxWidth: '70rem',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          padding: '1rem',
          margin: '1rem',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Brands
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          padding: '1rem',
          margin: '1rem',
        }}
      >
        {[1, 2, 3].map((_, i) => (
          <Image
            src='/placeholder.png'
            key={i}
            alt='loading'
            width={200}
            height={200}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              opacity: 0.64,
            }}
            priority
          />
        ))}
      </div>
    </section>
  )
}

export default loading
