'use client'

import { Badge, Tooltip } from '@mantine/core'
import type { ShippingStatus } from '@prisma/client'

const ShippingStatusBadge = ({ status }: { status: ShippingStatus }) => {
  const color = {
    pending: 'orange',
    shipped: 'blue',
    delivered: 'green',
  }
  return (
    <Tooltip label={`Order is ${status}`}>
      <Badge
        sx={{
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        color={color[status]}
        variant='light'
        size='lg'
        style={{ textTransform: 'capitalize' }}
      >
        {status}
      </Badge>
    </Tooltip>
  )
}

export default ShippingStatusBadge
