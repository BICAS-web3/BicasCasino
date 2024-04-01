// import authConfig from '@/auth.config'
// import NextAuth from 'next-auth'
// import {
//   DEFAULT_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes
// } from './routes'

// const { auth } = NextAuth(authConfig)

// export default auth(req => {
//   // const isLoggin = !!req.auth
//   // const { nextUrl } = req
//   // console.log('isLoggin', isLoggin)
//   // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   // const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//   // const isAuthName = authRoutes.includes(nextUrl.pathname)
//   // if (isApiAuthRoute) {
//   //   return null
//   // }
//   // if (isAuthName) {
//   //   if (isLoggin) {
//   //     return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
//   //   }
//   //   return null
//   // }
//   // if (isPublicRoute && !isLoggin) {
//   //   return Response.redirect(new URL('/login', nextUrl))
//   // }
// })
// // Optionally, don't invoke Middleware on some paths
// // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/']
// }
