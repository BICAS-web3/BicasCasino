'use server'

import { BaseApiUrl } from '@/api'
import { signIn } from '@/auth'
import { registrSchema } from '@/schemas'

import * as z from 'zod'

export const signUp = async (values: z.infer<typeof registrSchema>) => {
  const validateFields = registrSchema.safeParse(values)
  console.log('start')
  if (!validateFields.success) {
    console.log('err')
    return { error: '' }
  }
  const { username, password } = validateFields.data
  const data = await fetch(`${BaseApiUrl}/user/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(async res => await res.json())
    .catch(e => e)
  try {
    console.log(data)
    if (data.status === 'OK') {
      await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirectTo: '/'
      })
    }
    console.log('done')
  } catch (e) {
    console.log(e)
  }
}
