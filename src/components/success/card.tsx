'use client'

import Image from '@components/Image'
import { Box, Group, Sx, Text, Title } from '@mantine/core'
import { FC } from 'react'

interface Item {
  title: string
  price: number
  quantity: number
  size: number
  thumbnail: string
  styles?: Sx
}

const SuccessOrderItemCard: FC<Item> = ({
  quantity,
  price,
  size,
  thumbnail,
  title,
  styles,
}) => {
  return (
    <Group
      align='flex-start'
      pr={'lg'}
      spacing={'md'}
      sx={(theme) => ({
        textAlign: 'left',
        boxShadow: theme.shadows.sm,
        borderRadius: '25px',
        ...styles,
      })}
    >
      <Image
        alt={title}
        src={thumbnail}
        width={270}
        height={200}
        style={{
          objectFit: 'cover',
          borderRadius: '25px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '2rem',
        }}
      >
        <Title order={4}>{title}</Title>
        <Text size={'sm'} weight={500}>
          Size: {size}
        </Text>
        <Text size={'sm'} weight={500}>
          Price: {price} x {quantity}
        </Text>
      </Box>
    </Group>
  )
}

export default SuccessOrderItemCard
