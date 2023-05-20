'use client'
import { useCart } from '@/lib/hooks/useCart'
import { ActionIcon, Badge, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShoppingCart } from '@tabler/icons-react'
import CartItem from './cartItem'

function Cart() {
  const [opened, { open, close }] = useDisclosure(false)
  const { items } = useCart()

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title='Cart'
        size={'lg'}
        overlayProps={{
          opacity: 0.15,
          blur: 3,
        }}
        position='right'
      >
        {items.map((item) => (
          <CartItem key={item.cartItemId} item={item} />
        ))}
      </Drawer>
      <ActionIcon
        variant='light'
        color='blue'
        radius='xl'
        size='lg'
        pos={'relative'}
      >
        <IconShoppingCart onClick={open} size='1.125rem' />
        {items.length > 0 && (
          <Badge
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translate(50%, -50%)',
              zIndex: 1,
            }}
            color='red'
            variant='filled'
            radius={'50%'}
            w={20}
            h={20}
            size='xs'
          >
            {items.length}
          </Badge>
        )}
      </ActionIcon>
    </>
  )
}

export default Cart
