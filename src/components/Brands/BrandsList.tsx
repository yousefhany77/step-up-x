'use client'
import { Container, Paper, SimpleGrid, Title, Tooltip } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import style from './BrandsList.module.css'
const BrandsList: FC<{
  brands: {
    name: string
    slug: string
    logo: string
  }[]
}> = ({ brands }) => {
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
                  src={brand.logo}
                  className={style['image-hover']}
                  alt={brand.name}
                  priority
                  width={200}
                  height={200}
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
