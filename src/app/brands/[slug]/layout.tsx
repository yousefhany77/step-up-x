import Filters from '@components/Filters'
import { FC } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: '80vw',
        margin: '0 auto',
      }}
    >
      <Filters />
      {children}
    </section>
  )
}

export default Layout
