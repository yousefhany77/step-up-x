'use client'
import { Container, Paper, SimpleGrid, Title, Tooltip } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import adidas from '../../../public/brands/adidas.jpg'
import converse from '../../../public/brands/converse.svg'
import newBalance from '../../../public/brands/new-balance.jpg'
import nike from '../../../public/brands/nike.jpg'
import style from './BrandsList.module.css'
const brands = [
  {
    name: 'Nike',
    slug: 'nike',
    image: nike,
  },
  {
    name: 'Adidas',
    slug: 'adidas',
    image: adidas,
  },
  {
    name: 'Converse',
    slug: 'converse',
    image: converse,
  },
  {
    name: 'new balance',
    slug: 'new_balance',
    image: newBalance,
  },
]

const BrandsList: FC = () => {
  return (
    <Container>
      <Title order={1} my={'md'} p={'md'}>
        Brands
      </Title>
      <SimpleGrid
        cols={brands.length / 2}
        style={{
          minHeight: '50vh',
        }}
      >
        {brands.map((brand) => (
          <Tooltip key={brand.slug} label={brand.name}>
            <Paper
              sx={(theme) => ({
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: theme.shadows.sm,
                },
                '&:hover img': {
                  transform: 'scale(1.5)',
                },
                position: 'relative',
                padding: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <Link href={`/brands/${brand.slug}`}>
                <Image
                  src={brand.image}
                  className={style['image-hover']}
                  alt={brand.name}
                  priority
                  width={200}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </Paper>
          </Tooltip>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default BrandsList
