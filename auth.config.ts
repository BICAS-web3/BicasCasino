import Credentials from 'next-auth/providers/credentials'

import type { NextAuthConfig } from 'next-auth'
import { registrSchema } from './schemas'

export default {
  providers: [
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
