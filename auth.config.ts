import Credentials from 'next-auth/providers/credentials'

import type { NextAuthConfig } from 'next-auth'
import { loginSchema } from './schemas'

export default {
  providers: [
    // Credentials({
    //   async authorize(credentials) {
    //     const validateFields = loginSchema.safeParse(credentials)
    //     if (validateFields.success) {
    //       const { email, password } = validateFields.data
    //       if (!email || !password) return null
    //     }
    //   }
    // })
  ]
} satisfies NextAuthConfig
