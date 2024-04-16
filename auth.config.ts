import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'

import * as api from '@/api'
import type { NextAuthConfig } from 'next-auth'
import { registrSchema } from './schemas'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    FacebookProvider,
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        access_token: {},
        name: {},
        email: {}
      },

      async authorize(credentials) {
        const validateFields = registrSchema.safeParse(credentials)
        if (validateFields.success) {
          const { password, username } = validateFields.data

          if (username || password) {
            const userResponse = await api.loginUser({
              login: username,
              password: password
            })
            if (userResponse.status === 'OK') {
              const user = userResponse.body
              return {
                user,
                name: username
              }
            } else {
              return null
            }
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],

  pages: {
    signIn: '/auth/registration'
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if (
        token.refresh_token &&
        token.access_token &&
        (token.expires_at as any) * 1000 < Date.now()
      ) {
        try {
          const response = await api.refreshToken({
            // request to update token
            refresh_token: token.refresh_token,
            bareer: token.access_token
          })
          return { ...token, ...user } // return token and user data for session
        } catch (err) {
          session.error = 'RefreshAccessTokenError'
          return { ...token, ...user } // return token and user data for session
        }
      } else {
        return { ...token, ...user } // return token and user data for session
      }
    },

    async session({ session, token }: any) {
      session.token = token // in token user data from back
      return { ...session }
    }
  }
} satisfies NextAuthConfig

// async jwt({ token, user }) {
//   console.log('jwt', token, user)
//   return { ...token, ...user }
// },
// const refreshAccessToken = async token => {
//   try {
//     const response = await api.refreshToken({
//       refresh_token: token.refresh_token,
//       bareer: token.access_token
//     })
//     if (response.status === 'OK') {
//       console.log('success refres from api')
//       return {
//         access_token: response.body.access_token,
//         expires_at: Math.floor(Date.now() / 1000 + response.body.expires_in),
//         refresh_token: response.body.refresh_token ?? token.refresh_token
//       }
//     } else {
//       console.log('Error refreshing access token')
//       return token
//     }
//   } catch (error) {
//     console.error('Error refreshing access token', error)
//     return token
//   }
// }
// async jwt({ token, account, user }) {
//   if (account && account.providerAccountId && account.refresh_token) {
//     console.log(1)
//     return {
//       access_token: account.access_token,
//       expires_at: Math.floor(Date.now() / 1000 + (account.expires_in || 0)),
//       refresh_token: account.refresh_token
//     }
//   } else if (
//     token.expires_at &&
//     Date.now() < (Number(token.expires_at) || 1) * 1000
//   ) {
//     console.log(2)
//     return { ...token, ...user }
//   } else {
//     console.log(3)
//     return { ...refreshAccessToken(token), ...user }
//   }
// },
