import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'

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
      async authorize(credentials) {
        const validateFields = registrSchema.safeParse(credentials)
        if (validateFields.success) {
          console.log(1)
          const { password, username } = validateFields.data

          if (!username || !password) {
            return null
          } else {
            return credentials
          }
        } else {
          console.log(2)
        }
      }
    })
  ]
} satisfies NextAuthConfig
