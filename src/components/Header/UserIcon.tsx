'use client'
import { useAuth, useUser } from '@clerk/nextjs'
import { Avatar, Menu, Stack, Text, UnstyledButton } from '@mantine/core'
import { IconLogout, IconSettings, IconShoppingBag } from '@tabler/icons-react'
import Link from 'next/link'

function UserIcon() {
  const { user } = useUser()
  const { signOut } = useAuth()
  if (!user) return null
  return (
    <Menu shadow='md' width={300}>
      <Menu.Target>
        <Avatar
          component={UnstyledButton}
          src={user?.profileImageUrl}
          radius={'50%'}
        >
          {user?.firstName?.[0]}
          {user?.lastName?.[0]}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          sx={{
            alignItems: 'center',
            '& > div': {
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
            },
          }}
        >
          <Avatar
            src={user?.profileImageUrl}
            radius={'50%'}
            w={'fit-content'}
            size={'md'}
          >
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </Avatar>
          <Stack spacing={'0.1rem'}>
            <Text
              sx={{
                margin: 0,
                marginLeft: '0.5rem',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              {user?.fullName}
            </Text>
            <Text
              sx={{
                marginLeft: '0.6rem',
                fontWeight: 400,
                width: 'fit-content',
                color: '#505050',
              }}
              size={'xs'}
            >
              @{user?.username}
            </Text>
          </Stack>
        </Menu.Item>
        <Menu.Item
          component={Link}
          icon={<IconSettings size={14} />}
          href={'/profile'}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          component={Link}
          href={'/my-orders'}
          icon={<IconShoppingBag size={14} />}
        >
          My Orders
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item onClick={() => signOut()} icon={<IconLogout size={14} />}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserIcon
