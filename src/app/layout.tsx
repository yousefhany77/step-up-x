import { ClerkProvider } from '@clerk/nextjs'
import RootStyleRegistry from './emotion'

export const metadata = {
  title: 'Step up X - Sneakers Store ',
  description: 'Sneakers Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </body>
      </html>
    </ClerkProvider>
  )
}
