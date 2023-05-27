'use client'

import Image from '@components/Image'
import { ActionIcon, Box, Group, Sx, Text, Title, Tooltip } from '@mantine/core'
import { IconArrowsDiagonal } from '@tabler/icons-react'
import Link from 'next/link'
import { FC } from 'react'
import { UrlObject } from 'url'

interface Item {
  title: string
  price: number
  quantity: number
  size: number
  thumbnail: string
  url: string
  styles?: Sx
}

const SuccessOrderItemCard: FC<Item> = ({
  quantity,
  price,
  size,
  thumbnail,
  title,
  url,
  styles,
}) => {
  return (
    <Group
      align='flex-start'
      pr={'lg'}
      pos={'relative'}
      spacing={'md'}
      sx={(theme) => ({
        textAlign: 'left',
        boxShadow: theme.shadows.sm,
        borderRadius: '25px',
        ...styles,
      })}
    >
      <Tooltip label="View item's details" withArrow position='top'>
        <ActionIcon
          pos={'absolute'}
          top={'5%'}
          right={'5%'}
          radius={'50%'}
          size={'md'}
          component={Link}
          // this is a hack to make the type safe link work, till it's compatible with mantine
          href={`/${url}` as unknown as UrlObject}
        >
          <IconArrowsDiagonal size={16} />
        </ActionIcon>
      </Tooltip>
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
        <Title lineClamp={1} order={4}>
          {title}
        </Title>
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
