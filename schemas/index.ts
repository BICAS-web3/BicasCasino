import * as z from 'zod'

export const loginSchema = z.object({
  username: z.string().min(4, { message: 'min length: 4' }),
  password: z.string().min(4, { message: 'min length: 4' })
})

export const registrSchema = z.object({
  username: z.string().min(4, { message: 'min length: 4' }),
  password: z.string().min(4, { message: 'min length: 4' })
})

export const resetSchema = z.object({
  email: z.string().email()
})
