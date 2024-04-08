import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  pages: {
    error: '/auth/login'
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' }
})
