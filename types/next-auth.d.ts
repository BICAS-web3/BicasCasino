import { Session } from 'next-auth'
import { JWT, SESSION } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    id: string
    access_token?: string
    refresh_token?: string
  }

  interface User {
    id: string
    access_token?: string
    refresh_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    access_token?: string
    refresh_token?: string
  }
}

declare module 'next-auth/session' {
  interface SESSION {
    id: string
    access_token?: string
    refresh_token?: string
  }
}
