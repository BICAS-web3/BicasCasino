import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    error: '/auth/login'
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        if (user && user.access_token) {
          console.log(user)
          session.user.access_token = user.access_token
        }
      }
      return session
    },
    async jwt({ token, user, session }) {
      if (!token.sub) return token
      return token
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig
})
// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET
//     }),
//     FacebookProvider,
//     TwitterProvider({
//       clientId: process.env.TWITTER_ID,
//       clientSecret: process.env.TWITTER_SECRET
//     }),
//     Credentials({
//       name: 'Credentials',
//       async authorize(credentials) {
//         console.log('start vilidate')
//         const validateFields = registrSchema.safeParse(credentials)
//         if (validateFields.success) {
//           const { password, username } = validateFields.data

//           if (!username || !password) {
//             console.log('5')
//             return null
//           } else {
//             console.log('cred', credentials)
//             try {
//               const userResponse = await api.loginUser({
//                 login: username,
//                 password: password
//               })
//               if (
//                 userResponse &&
//                 userResponse.status &&
//                 userResponse.status === 'OK'
//               ) {
//                 console.log('demo success', (userResponse as any).body)
//                 const user = (userResponse as any).body
//                 return user
//               } else {
//                 console.log('demo success', (userResponse as any).body)
//                 return null
//               }
//             } catch (error) {
//               console.error('Error during login:', error)
//               return null
//             }
//           }
//         } else {
//           console.log('fuck')
//           return null
//         }
//       }
//     })
//   ]
// } satisfies NextAuthConfig
