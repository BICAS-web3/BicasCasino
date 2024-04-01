import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import { apiAuthPrefix, authRoutes, publicRoutes } from './routes'

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { nextUrl } = req
  const isLoggin = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthName = authRoutes.includes(nextUrl.pathname)
  if (isApiAuthRoute) {
    return null
  }
  if (isAuthName) {
    if (isLoggin) {
      return Response.redirect(new URL('/', nextUrl))
    } else {
    }
    return null
  }
  if (isPublicRoute && !isLoggin) {
    return Response.redirect(new URL('/auth/registration', nextUrl))
  }
  return null
})
// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/']
}
