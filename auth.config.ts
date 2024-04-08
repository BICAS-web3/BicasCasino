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
      async authorize(credentials, req) {
        console.log('start vilidate')
        const validateFields = registrSchema.safeParse(credentials)
        if (validateFields.success) {
          const { password, username } = validateFields.data

          if (username || password) {
            const userResponse = await api.loginUser({
              login: username,
              password: password
            })
            if (userResponse.status === 'OK') {
              console.log('demo success', (userResponse as any).body)
              const user = (userResponse as any).body
              // const data = JSON.parse(user)
              return {
                name: username,
                email: 'ewrfer',
                image: JSON.stringify(user)
                // ...data
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
  callbacks: {
    async session({ token, session, user }) {
      console.log('session callback:', token, session, user)
      if (token.sub && session.user) {
        // session.user.access_token = JSON.parse(session.user.image!).access_token
      }
      return session
    }
  }
} satisfies NextAuthConfig
