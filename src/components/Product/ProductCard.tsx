'use client'
import { Product, Variant } from '@/lib/products'
import { kFormatter } from '@/lib/util/kFormatter'
import Image from '@components/Image'
import { Carousel } from '@mantine/carousel'
import { Badge, Button, Card, Group, Rating, Text } from '@mantine/core'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState<Variant | Product>(
    product
  )
  const [index, setIndex] = useState(0)
  const url = encodeURI(`${product.title.replaceAll(' ', '-')}/${product.pid}`)
  const addToCardHandler = () => {
    return console.log('add to Cart %s', 'product')
  }

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //  this is prevent the navigation if the user clicks on the carousel controllers
    if (e.target instanceof Element && e.target.tagName === 'svg') {
      e.preventDefault()
    }
  }
  useEffect(() => {
    if (index > 0 && product?.variants?.length) {
      const variant = product.variants[index - 1]
      variant.price = variant?.price || product.price
      variant.sizes = variant?.sizes || []
      variant.title = variant?.title || product.title
      setCurrentProduct(variant)
    }
    if (index === 0) {
      setCurrentProduct(product)
    }
  }, [index, product])
  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
      display={'flex'}
      style={{
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {product?.view_360?.length === 36 && (
        <Badge
          style={{
            position: 'absolute',
            right: 20,
          }}
        >
          360 view
        </Badge>
      )}
      <Link
        href={`/${url}`}
        onClick={handleLink}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card.Section>
          {product.variants?.length ? (
            <Carousel onSlideChange={(index) => setIndex(index)} loop>
              <>
                <Carousel.Slide
                  key={product.pid + '-main'}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={product.thumbnail}
                    height={250}
                    width={250}
                    style={{
                      objectFit: 'contain',
                    }}
                    alt={product.title}
                  />
                </Carousel.Slide>
              </>
              {product.variants.map(({ thumbnail, id, title }, i) => (
                <Carousel.Slide
                  key={`${id}-${title}-${i}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={thumbnail}
                    height={250}
                    width={250}
                    alt={title}
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <Image
              src={product.thumbnail}
              height={250}
              width={250}
              style={{
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
              }}
              alt={product.title}
            />
          )}
        </Card.Section>

        <Text weight={500}>{currentProduct.title}</Text>
        <Text
          sx={(theme) => ({
            fontSize: '0.9rem',
            color: theme.colors.gray[5],
            textTransform: 'capitalize',
          })}
          weight={300}
        >
          {product.gender}
        </Text>
        <Group mt='md' mb='sm'>
          {currentProduct?.sizes.length ? (
            currentProduct?.sizes.map((size, index) => (
              <Badge
                key={`${currentProduct.title} - ${index}-${size}`}
                color='grape'
                variant='light'
                miw={'2rem'}
                p={'sm'}
              >
                {size}
              </Badge>
            ))
          ) : (
            <Badge color='red' variant='light' p={'sm'}>
              Out of Stock
            </Badge>
          )}
        </Group>
        <Group
          align='center'
          style={{
            marginTop: 'auto',
            justifyContent: 'space-between',
            gap: '1rem 0',
            paddingTop: '1rem',
          }}
        >
          <Group>
            <Rating fractions={2} readOnly value={3.5} /> ({kFormatter(10_000)})
          </Group>
          <Text
            ml={'xs'}
            sx={(theme) => ({
              fontSize: '1.1rem',
              fontWeight: 500,
              marginRight: '0.5rem',
              color: theme.colors.gray[8],
            })}
          >
            ${currentProduct.price.toLocaleString()}
          </Text>
        </Group>
      </Link>
      <Button
        fullWidth
        variant='light'
        color='blue'
        radius='md'
        mt='md'
        disabled={!product.sizes.length}
        className='add-to-cart'
        onClick={addToCardHandler}
      >
        {product.sizes.length ? 'Add To Cart' : 'Out of Stock'}
      </Button>
    </Card>
  )
}

export default ProductCard
