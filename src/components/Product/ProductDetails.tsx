'use client'
import useVariantProduct from '@/lib/hooks/useVariantProduct'
import { Product } from '@/lib/products'
import Image from '@components/Image'

import {
  Avatar,
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Modal,
  NumberInput,
  Text,
  Title,
} from '@mantine/core'

import { useCart } from '@/lib/hooks/useCart'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { FC, useState } from 'react'
import View360 from './View360'

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const [index, setIndex] = useState(0)
  product.sizes = product.sizes.sort((a, b) => a - b)
  const { currentProduct } = useVariantProduct({ index, product })
  const [opened, { open, close }] = useDisclosure(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<number>()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize)
      return notifications.show({
        message: 'You must select a size before adding to cart',
        color: 'red',
      })

    // if index is 0, then it's the parent product and the variantId `id` is undefined
    const variantId = 'id' in currentProduct ? currentProduct.id : undefined

    addToCart({
      cartItemId: `${product.pid}${
        variantId ? `-${variantId}` : ''
      }  -${selectedSize}`,
      id: product.pid,
      price: currentProduct.price,
      title: currentProduct.title,
      thumbnail: currentProduct.thumbnail,
      size: selectedSize,
      quantity,
      variantId,
    })

    // reset the quantity and size
    setQuantity(1)
    setSelectedSize(undefined)
  }

  return (
    <Container size={1600} h={'100%'}>
      {product.view_360?.length ? (
        <Modal
          opened={opened}
          onClose={close}
          title='360 View'
          size={'xl'}
          centered
          overlayProps={{
            opacity: 0.15,
            blur: 3,
          }}
        >
          <View360 images={product.view_360} />
        </Modal>
      ) : null}
      <Grid
        sx={{
          maxWidth: '100%',
          height: '100%',
          margin: '0 auto !important',
        }}
        columns={12}
        gutter={2}
        gutterXs='md'
        gutterMd='xl'
        gutterXl={50}
      >
        <Grid.Col key='Grid-col-1-product-Image' span={8} pos={'relative'}>
          {product?.view_360?.length ? (
            <Badge
              onClick={open}
              size='lg'
              sx={(theme) => ({
                cursor: 'pointer',
                position: 'absolute',
                zIndex: 2,
                transition: 'all ease-in-out 0.2s',
                '&:hover': {
                  backgroundColor: theme.colors.blue[1],
                },
              })}
            >
              open 360 View
            </Badge>
          ) : null}
          <Image
            src={currentProduct.images[0]}
            fill
            priority
            style={{
              objectFit: 'contain',
              mixBlendMode: 'darken',
            }}
            alt={product.title}
          />
        </Grid.Col>

        <Grid.Col
          key='Grid-col-2-product-Detail'
          span={4}
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: theme.radius.lg,
            padding: '2.2rem !important',
          })}
        >
          <Title fw={700} order={1}>
            {currentProduct.title}
          </Title>
          <Text
            component='p'
            size={'2rem'}
            fw={700}
            sx={(theme) => ({
              color: theme.colors.dark[3],
            })}
          >
            {currentProduct.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
          {product?.variants?.length ? (
            <Group key='product-Variants'>
              <ProductVariantIcon
                key={product.pid}
                src={product.thumbnail}
                alt={product.title}
                onClick={() => setIndex(0)}
                selected={index === 0}
              />
              {product.variants?.map((variant, i) => (
                <ProductVariantIcon
                  key={variant.id}
                  src={variant.thumbnail}
                  alt={variant.title ?? product.title}
                  onClick={() => setIndex(i + 1)}
                  selected={i + 1 === index}
                />
              ))}
            </Group>
          ) : null}
          <Group mt='md' mb='sm' key='product-Sizes'>
            <Text component='p' size={'xl'} weight={500} w={'100%'}>
              Pick your size
            </Text>
            {currentProduct?.sizes.length ? (
              currentProduct?.sizes.map((size, index) => (
                <Badge
                  key={`${currentProduct.title} - ${index}-${size}`}
                  color={selectedSize === size ? 'blue' : 'gray'}
                  variant='light'
                  miw={'4rem'}
                  h={'2rem'}
                  size='lg'
                  p={'sm'}
                  sx={(theme) => ({
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: theme.colors.blue[0],
                    },
                  })}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Badge>
              ))
            ) : (
              <Badge
                color='red'
                variant='light'
                w={'100%'}
                h={'2rem'}
                size='lg'
                p={'sm'}
              >
                Out of Stock
              </Badge>
            )}
          </Group>
          <Group mt='md' mb='sm' key='product-AddToCart'>
            <Text component='p' size={'xl'} weight={500} w={'100%'}>
              Quantity
            </Text>
            <NumberInput
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value ? value : 1)}
              variant='filled'
              disabled={!currentProduct.sizes.length}
            />
          </Group>
          <Group mt='md' mb='sm'>
            <Button
              onClick={handleAddToCart}
              variant='filled'
              color='blue'
              fullWidth
              size='lg'
              radius='xl'
              disabled={!currentProduct.sizes.length}
            >
              Add to Cart
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default ProductDetails

const ProductVariantIcon = ({
  src,
  alt,
  onClick,
  selected,
}: {
  src: string
  alt: string
  onClick: (e: React.MouseEvent) => void
  selected?: boolean
}) => (
  <Avatar
    src={src}
    alt={alt}
    size={'4rem'}
    radius={'xl'}
    p={'sm'}
    onClick={onClick}
    sx={(theme) => ({
      borderColor: selected ? theme.colors.blue[3] : 'transparent',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: theme.shadows.sm,
        transition: 'all ease-in-out 0.2s',
      },
    })}
    styles={{
      image: {
        mixBlendMode: 'darken',
        objectFit: 'cover',
      },
      root: {
        border: '1px solid',
      },
    }}
  />
)
