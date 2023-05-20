import Cart from '@components/cart'
import {
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
        <Title order={3}>StepUp X</Title>
        <Group spacing={'xl'}>
          <Link href='/'>Home</Link>
          <Link href='/brands'>Brands</Link>
          <Space />
          <Cart />
        </Group>
      </Container>
    </MantineHeader>
  )
}

export default Header
