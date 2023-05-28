import Image from 'next/image'

function loading() {
  return (
    <section
      style={{
        height: 'calc(100vh - 100px)',
        position: 'relative',
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      <Image src='/placeholder.png' alt='loading' fill priority />
    </section>
  )
}

export default loading
