import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/', '/brands', '/brands(.*)', '/(.*)/(.*)', '/api'],
  afterAuth(auth, req) {
    if (auth.orgRole !== 'admin' && req.nextUrl.pathname === '/dashboard') {
      const redirect = new URL('/404', req.url)

      return NextResponse.rewrite(redirect, {
        status: 403,
        statusText: 'Forbidden',
      })
    }
    NextResponse.next()
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/|trpc(.*)'],
}
