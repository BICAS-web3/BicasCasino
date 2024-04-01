import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  secret: 'secret',
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token }) {
      return token
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig
})
