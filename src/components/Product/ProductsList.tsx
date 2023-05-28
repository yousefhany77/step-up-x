'use client'
import { Container, SimpleGrid } from '@mantine/core'
import { FC } from 'react'

interface ProductListProps {
  children: React.ReactNode
}

const ProductList: FC<ProductListProps> = ({ children }) => {
  return (
    <Container size={'xl'}>
      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 2 },
          { minWidth: 'md', cols: 3 },
          { minWidth: 'lg', cols: 4 },
        ]}
      >
        {children}
      </SimpleGrid>
    </Container>
  )
}

export default ProductList
