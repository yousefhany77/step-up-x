import { SignInButton, SignedOut } from '@clerk/nextjs'
import UserIcon from '@components/Header/UserIcon'
import Cart from '@components/cart'

import {
  Button,
  Container,
  Group,
  Header as MantineHeader,
  Space,
  Title,
} from '@mantine/core'
import Link from 'next/link'
function Header() {
  return (
    <MantineHeader height={70} p='md'>
      <Container
        size={'xl'}
        sx={{
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
            transition: 'all 200ms ease',
          },
          '& a:hover': {
            fontWeight: 500,
            textDecoration: 'underline',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href='/'>
          <Title order={3}>§</Title>
        </Link>
        <Group spacing={'xl'}>
          <Link href='/'>Home</Link>
          <Link href='/brands'>Brands</Link>
          <Space />
          <UserIcon />
          <SignedOut>
            <Button component={SignInButton} variant='outline'>
              Sign in
            </Button>
          </SignedOut>
          <Cart />
        </Group>
      </Container>
    </MantineHeader>
  )
}

export default Header
