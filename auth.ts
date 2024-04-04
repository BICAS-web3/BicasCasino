import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ token, session, user }) {
      // if (token.sub && session.user) {
      //   session.user.id = token.sub
      //   if (user && user.access_token && session.user) {
      //     session.user.access_token = user.access_token
      //   }
      // }
      return session
    },
    async jwt({ token, user, session }) {
      if (!token.sub) return token
      return token
    }
  },
  session: { strategy: 'jwt' }
})
