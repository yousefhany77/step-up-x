'use client'
import { Product, Variant } from '@/lib/products'
import { kFormatter } from '@/lib/util/kFormatter'
import Image from '@components/Image'
import { Carousel } from '@mantine/carousel'
import {
  Badge,
  Button,
  Card,
  Group,
  Rating,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState<Variant | Product>(
    product
  )

  const matches = useMediaQuery('(min-width: 56.25em)')
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const url = encodeURI(`${product.title.replaceAll(' ', '-')}/${product.pid}`)
  const theme = useMantineTheme()
  const viewProduct = () => {
    return router.push(`/${url}`)
  }

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //  this is prevent the navigation if the user clicks on the carousel controllers
    if (
      e.target instanceof Element &&
      (e.target.tagName === 'button' || e.target.tagName === 'svg')
    ) {
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
            display: matches ? 'flex' : 'none',
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
            <Carousel
              withIndicators
              styles={{
                indicator: {
                  backgroundColor: theme.colors.gray[4],
                },
                control: {
                  transition: `all 200ms ${theme.transitionTimingFunction}`,
                  width: 30,
                  height: 30,
                  '&:hover': {
                    backgroundColor: theme.colors.gray[6],
                  },
                },
              }}
              onSlideChange={(index) => setIndex(index)}
              loop
            >
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
                      borderRadius: theme.radius.lg,
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
                      borderRadius: theme.radius.lg,
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
                borderRadius: theme.radius.lg,
              }}
              alt={product.title}
            />
          )}
        </Card.Section>

        <Text mt={'md'} weight={500}>
          {currentProduct.title}
        </Text>
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
        onClick={viewProduct}
      >
        {product.sizes.length ? 'View' : 'Out of Stock'}
      </Button>
    </Card>
  )
}

export default ProductCard
