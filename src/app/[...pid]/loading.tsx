import styles from '@components/Product/productDetails.module.css'
import Image from 'next/image'
function loading() {
  return (
    <section
      style={{
        maxWidth: '100%',
        height: '100%',
        margin: '0 auto',
        display: 'grid',
        gap: '1.5rem',
      }}
      className={styles['responsive-grid']}
    >
      <div
        className={styles['responsive-grid-col-1']}
        style={{
          position: 'relative',
          backgroundColor: 'white',
          overflow: 'hidden',
          borderRadius: '20px',
        }}
      >
        <Image
          src='/placeholder.png'
          alt='loading'
          fill
          priority
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            opacity: 0.84,
          }}
        />
      </div>
      <div className={styles['responsive-grid-col-2']}></div>
    </section>
  )
}

export default loading
