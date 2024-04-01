import Credentials from 'next-auth/providers/credentials'

import type { NextAuthConfig } from 'next-auth'
import { loginSchema, registrSchema } from './schemas'

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        const validateFields = registrSchema.safeParse(credentials)
        if (validateFields.success) {
          console.log(1)
          const { password, email } = validateFields.data

          if (!email || !password) {
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
