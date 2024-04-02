'use server'

import * as z from 'zod'

import { resetSchema } from '@/schemas'
// import { getUserByEmail } from '@/data/user'
// import { sendPasswordResetEmail } from '@/lib/mail'
// import { generatePasswordResetToken } from '@/lib/tokens'
export const generatePasswordResetToken = async (email: string) => {
  //   const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = 'token form db'

  //   if (existingToken) {
  //     await db.passwordResetToken.delete({
  //       where: { id: existingToken.id }
  //     })
  //   }

  //   const passwordResetToken = await db.passwordResetToken.create({
  //     data: {
  //       email,
  //       token,
  //       expires
  //     }
  //   })

  return 'passwordResetToken'
}
export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' }
  }

  const { email } = validatedFields.data

  //   const existingUser = await getUserByEmail(email)

  const existingUser = true

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  //   const passwordResetToken = await generatePasswordResetToken(email)
  //   await sendPasswordResetEmail(
  //     passwordResetToken.email,
  //     passwordResetToken.token
  //   )

  return { success: 'Reset email sent!' }
}
