'use client'
import { Container, SimpleGrid } from '@mantine/core'
import { FC } from 'react'

interface ProductListProps {
  children: React.ReactNode
}

const ProductList: FC<ProductListProps> = ({ children }) => {
  return (
    <Container>
      <SimpleGrid cols={3}>{children}</SimpleGrid>
    </Container>
  )
}

export default ProductList
