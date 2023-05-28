'use client'

import { Select, Tooltip, useMantineTheme } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import type { ShippingStatus } from '@prisma/client'
import { useState } from 'react'

const UpdateShippingState = ({
  status,
  orderId,
}: {
  status: ShippingStatus
  orderId: string
}) => {
  const color = {
    pending: 'orange',
    shipped: 'blue',
    delivered: 'green',
  }
  const [shippingStatus, setShippingStatus] = useState<ShippingStatus>(status)
  const theme = useMantineTheme()
  const updateShippingState = async (value: string) => {
    try {
      setShippingStatus(value as ShippingStatus)
      const res = await fetch('/api/update-shipping-status', {
        method: 'POST',
        body: JSON.stringify({
          orderId,
          shippingStatus: value,
        }),
      })
      if (res.ok) {
        notifications.show({
          title: 'Order updated',
          message: `Order ${orderId} is now ${value}`,
          color: 'green',
        })
      } else {
        notifications.show({
          title: 'Order update failed',
          message: `Order ${orderId} failed to update`,
          color: 'red',
        })
      }
    } catch (error) {
      console.error(error)
      setShippingStatus(status)
      notifications.show({
        title: 'Order update failed',
        message: `Order ${orderId} failed to update`,
        color: 'red',
      })
    }
  }
  return (
    <Tooltip label={`Order is ${status}`}>
      <Select
        label='Order Status'
        placeholder='Pick one'
        defaultValue={shippingStatus}
        onChange={(value) => updateShippingState(value as ShippingStatus)}
        styles={{
          input: {
            backgroundColor: theme.colors[color[shippingStatus]][4],
            color: 'white',
            fontWeight: 700,
          },
          item: {
            '&[data-selected]': {
              backgroundColor: theme.colors[color[shippingStatus]][4],
            },
          },
          rightSection: {
            svg: {
              color: 'white !important',
            },
          },
        }}
        style={{ width: 150 }}
        data={[
          { value: 'pending', label: 'Pending' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Delivered' },
        ]}
      />
    </Tooltip>
  )
}

export default UpdateShippingState
