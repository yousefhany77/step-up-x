import Image from 'next/image'
import star from '../../../../public/star.png'
import styles from './product.module.css'
export const ProductCardSkeleton = () => {
  return (
    <div className={styles['skeleton-product-card']}>
      <div className={styles['skeleton-product-card__image']}></div>
      <div className={styles['skeleton-card__title']}></div>
      <div className={styles['skeleton-card__gender']}></div>
      <div className={styles['skeleton-product-card__sizes']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles['skeleton-product-card__price_rating']}>
        <div className={styles['rating']}>
          <Image src={star} width={15} height={15} alt='star' />
          <Image src={star} width={15} height={15} alt='star' />
          <Image src={star} width={15} height={15} alt='star' />
          <Image src={star} width={15} height={15} alt='star' />
          <Image src={star} width={15} height={15} alt='star' />
        </div>
        <p className={styles['skeleton-product-card__price--price']}></p>
      </div>
      <div className={styles['skeleton-product-card__description_btn']}></div>
    </div>
  )
}
