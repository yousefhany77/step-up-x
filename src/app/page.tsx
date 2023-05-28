import { getHomePage } from '@/lib/products'
import Hero from '@components/Hero'
import ProductCard from '@components/Product/ProductCard'
import ProductList from '@components/Product/ProductsList'
import styles from './index.module.css'

export const dynamic = 'force-static'

export default async function Home() {
  const homePage = await getHomePage()
  if (!homePage) throw new Error('Failed to load home page')
  return (
    <>
      <Hero {...homePage.herSection} />
      <br />
      <div className={styles.container}>
        <h2 className={styles['sub-header']}>Featured Products</h2>
        <ProductList>
          {homePage.featuredProducts.map((sneaker) => (
            <ProductCard
              key={`${sneaker.pid} - ${sneaker.brand}`}
              product={sneaker}
            />
          ))}
        </ProductList>
      </div>
    </>
  )
}
