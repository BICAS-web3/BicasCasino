'use server'
import { cookies } from 'next/headers'

const setCookie = async ({
  key,
  value,
  expires
}: {
  key: string
  value: string
  expires: number
}) => {
  try {
    const res = cookies().set(key, value, {
      httpOnly: true,
      sameSite: 'strict',
      expires
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

const getCookie = ({ key }: { key: string }) => {
  try {
    return cookies().get(key)?.value
  } catch (e) {
    console.log(e)
    return null
  }
}

const removeCookie = async ({ key }: { key: string }) => {
  try {
    cookies().delete(key)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
export { setCookie, getCookie, removeCookie }
