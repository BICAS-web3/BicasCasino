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
      console.log(session, token)
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      console.log(3, token)
      return token
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig
})
