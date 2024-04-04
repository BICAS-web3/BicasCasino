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
      async authorize(credentials) {
        console.log('start vilidate')
        const validateFields = registrSchema.safeParse(credentials)
        if (validateFields.success) {
          const { password, username } = validateFields.data

          if (!username || !password) {
            console.log('5')
            return null
          } else {
            console.log('cred', credentials)
            try {
              const userResponse = await api.loginUser({
                login: username,
                password: password
              })
              if (userResponse.status === 'OK') {
                console.log('demo success', (userResponse as any).body)
                const user = (userResponse as any).body
                return user
              } else {
                return null // Если запрос не успешен, верните null
              }
            } catch (error) {
              console.error('Error during login:', error)
              return null // В случае ошибки верните null
            }
          }
        } else {
          console.log('fuck')
          return null
        }
      }
    })
  ]
} satisfies NextAuthConfig
