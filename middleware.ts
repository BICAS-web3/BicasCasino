import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import { apiAuthPrefix, authRoutes, publicRoutes } from './routes'

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { nextUrl } = req
  console.log(nextUrl.origin)
  const isLoggin = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthName = authRoutes.includes(nextUrl.pathname)
  if (isApiAuthRoute) {
    return
  }
  if (isAuthName) {
    if (isLoggin) {
      return Response.redirect(nextUrl.origin + '/')
    } else {
    }
    return
  }
  if (!isLoggin && !isAuthName) {
    return Response.redirect(nextUrl.origin + '/auth/registration')
  }
  return
})
// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/']
}
