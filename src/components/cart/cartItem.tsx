'use client'
import { useCart } from '@/lib/hooks/useCart'
import { CartItem as TCartItem } from '@/store/cart/cartSlice'
import Image from '@components/Image'
import { Box, Group, NumberInput, Text } from '@mantine/core'
import { FC, useState } from 'react'

interface cartItemProps {
  item: TCartItem
}

const CartItem: FC<cartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const { updateItemQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (value: number) => {
    setQuantity(value)
    if (value === 0) {
      removeFromCart(item.cartItemId)
    } else {
      updateItemQuantity({
        cartItemId: item.cartItemId,
        quantity: value,
      })
    }
  }
  return (
    <Group
      sx={{
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid #ebebeb',
      }}
    >
      <Group align='center' spacing={'lg'}>
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={120}
          height={120}
          style={{
            objectFit: 'contain',
            mixBlendMode: 'darken',
          }}
        />
        <Box>
          <Text color='#18191a' fw={500}>
            {item.title}
          </Text>
          <Text my={'0.1rem'}>size: {item.size}</Text>
          <Text color='#18191a' fw={700}>
            {item.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </Box>
      </Group>
      <NumberInput
        min={0}
        max={10}
        value={quantity}
        onChange={handleQuantityChange}
        w={'5rem'}
      />
    </Group>
  )
}

export default CartItem
