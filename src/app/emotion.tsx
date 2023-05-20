'use client'
import { store } from '@/store'
import Header from '@components/ui/Header'
import { CacheProvider } from '@emotion/react'
import { AppShell, MantineProvider, useEmotionCache } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Roboto } from 'next/font/google'
import { useServerInsertedHTML } from 'next/navigation'
import { Provider } from 'react-redux'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const cache = useEmotionCache()
  cache.compat = true

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ))

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          globalStyles: () => ({
            '*': {
              boxSizing: 'border-box',
            },
            body: {
              fontFamily: 'Roboto, sans-serif',
            },
            'h1,h2,h3,h4,h5,h6': {
              color: '#18191a !important',
            },
            a: {
              color: 'inherit',
              textDecoration: 'none',
            },
          }),
          ...roboto.style,
          headings: {
            ...roboto.style,
          },
          fontFamilyMonospace: 'Roboto, monospace',
        }}
      >
        <ModalsProvider>
          <Provider store={store}>
            <AppShell
              padding='md'
              header={<Header />}
              styles={(theme) => ({
                root: {
                  '*': {
                    boxSizing: 'border-box',
                  },
                },
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Notifications autoClose={3000} position='top-right' />
              {children}
            </AppShell>
          </Provider>
        </ModalsProvider>
      </MantineProvider>
    </CacheProvider>
  )
}
