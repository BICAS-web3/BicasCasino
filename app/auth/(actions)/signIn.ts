'use server'

import { BaseApiUrl } from '@/api'
import { signIn } from '@/auth'
import { loginSchema, registrSchema } from '@/schemas'

import * as z from 'zod'

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = registrSchema.safeParse(values)
  if (!validateFields.success) {
    return { error: '' }
  }
  const { username, password } = validateFields.data
  const data = await fetch(`${BaseApiUrl}/user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: username,
      password
    })
  })
    .then(async res => await res.json())
    .catch(e => e)

  try {
    if (data.status === 'OK') {
      await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirectTo: '/'
      })
    }
  } catch (e) {
    console.log(1, e)
  }
}
