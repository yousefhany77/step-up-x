import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/', '/brands', '/brands(.*)', '/(.*)/(.*)', '/api'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/|trpc(.*)'],
}
