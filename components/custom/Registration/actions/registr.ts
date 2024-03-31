'use server'
import * as api from '@/api'
import { RegistrModel } from '@/states'
import { useUnit } from 'effector-react'

export const registr = async value => {
  alert(1)
  const { password, name } = value
  const data = await api.registerUser({
    username: name,
    password: password
  })
  console.log(data)
}
