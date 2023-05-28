'use client'
import { useCart } from '@/lib/hooks/useCart'
import { useAuth } from '@clerk/nextjs'
import {
  ActionIcon,
  Badge,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconShoppingCart } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import CartItem from './cartItem'

function Cart() {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { userId } = useAuth()
  const handleCheckout = async () => {
    try {
      if (!userId) {
        close()
        notifications.show({
          title: 'Error',
          message: 'You must be logged in to checkout',
          color: 'red',
        })
        const currentUrl = window.location.href
        return router.push(`/sign-in?redirectUrl=${currentUrl}`)
      }
      setLoading(true)
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        body: JSON.stringify({ items }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { url } = await res.json()
      localStorage.removeItem('cart')
      window.location.assign(url)
    } catch (error) {
      let message = 'Something went wrong'
      if (error instanceof Error) {
        message = error.message
      }
      notifications.show({
        title: 'Error',
        message: message,
        color: 'red',
      })
    }
  }
  const { items } = useCart()

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.quantity * item.price
    }, 0)
  }, [items])

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
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        position='right'
      >
        <ScrollArea.Autosize
          mah={'75vh'}
          sx={(theme) => ({
            paddingBottom: theme.spacing.md,
            flex: 1,
          })}
        >
          {items.length === 0 && (
            <Text
              sx={{
                textAlign: 'center',
                marginBlock: '2rem',
                color: 'gray',
              }}
            >
              Your cart is empty
            </Text>
          )}
          {items.map((item) => (
            <CartItem key={item.cartItemId} item={item} />
          ))}
        </ScrollArea.Autosize>
        {items.length > 0 && (
          <Group
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Text p={'sm'} my={'md'} weight={500} size='lg'>
              Total
            </Text>
            <Text p={'sm'} my={'md'} weight={600} size='xl'>
              ${total}
            </Text>
          </Group>
        )}
        <Button
          loading={loading}
          disabled={loading || items.length === 0}
          onClick={handleCheckout}
          fullWidth
          variant='light'
          size='md'
        >
          Continue to payment
        </Button>
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
