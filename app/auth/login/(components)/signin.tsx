'use client'

import { useUnit } from 'effector-react'
import { FC, useEffect, useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegistrModel } from '@/states'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { loginSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { EyeClose, EyeOpen } from '../../(icons)'

import * as api from '@/api'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { setCookie } from '@/lib/cookies'
import { parseJWT } from '@/lib/parseJWT'

interface SigninProps {}

const Signin: FC<SigninProps> = () => {
  const [isPending, setrtTransition] = useTransition()

  const [setAuth, setAccessToken, setRefreshToken] = useUnit([
    RegistrModel.setAuth,
    RegistrModel.setAccessToken,
    RegistrModel.setRefreshToken
  ])

  // useEffect(() => {
  //   const exist = localStorage.getItem('auth')
  //   if (exist) {
  //     setAccessToken(exist)
  //     setAuth(true)
  //   } else {
  //     setAuth(false)
  //   }
  // }, [])

  const [showPassword, setShowPassword] = useState(false)

  const [errorData, setErrorData] = useState(false)
  const [error, setError] = useState(false)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false)
      }, 1500)
    }
  }, [error])

  const route = useRouter()
  const handleSubmitIn = (values: z.infer<typeof loginSchema>) => {
    const usernameRegex = /^[^\u0400-\u04FF]+$/
    if (
      !usernameRegex.test(values.username) ||
      !usernameRegex.test(values.password)
    ) {
      toast.error('Please use only Latin characters for the username')
      return
    }
    setrtTransition(async () => {
      const data = await api.loginUser({
        login: values.username,
        password: values.password
      })
      if (data?.status === 'OK') {
        const body = data.body as Record<string, any>
        const accessTokenContent = parseJWT({ token: body.access_token })
        const refreshTokenContent = parseJWT({ token: body.refresh_token })
        await setCookie({
          key: 'access_token',
          value: body.access_token,
          expires: +(accessTokenContent.exp + '000')
        })
        await setCookie({
          key: 'refresh_token',
          value: body.refresh_token,
          expires: +(refreshTokenContent.exp + '000')
        })
        setAccessToken(body.access_token)
        setRefreshToken(body.refresh_token)
        setAuth(true)
        route.push('/')
      } else if ((data.body as Record<string, string>)?.status !== 'OK') {
        setAuth(false)
        setErrorData(true)
      }
    })
  }

  const disableError = () => setErrorData(false)

  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-[10px] sm:gap-[20px] mt-[10px] sm:mt-[20px]'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitIn)}
          className='flex flex-col gap-[4px] sm:gap-[15px] relative'
        >
          <div>
            <span className='text-[13px] text-[#7E7E7E] font-normal block mb-[10px]'>
              {t(`pages.auth.textes.Username`)}
            </span>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormControl>
                    <Input
                      onFocus={disableError}
                      placeholder={
                        errorData
                          ? t(`pages.auth.textes.error_data`)
                          : t(`pages.auth.textes.Username`)
                      }
                      className={`duration-200 z-[1] relative' ${
                        errorData && 'placeholder:text-[red]'
                      }`}
                      disabled={isPending}
                      variant='registr'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <span className='text-[13px] text-[#7E7E7E] font-normal block mb-[10px]'>
              {t(`pages.auth.textes.Password`)}
            </span>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormControl>
                    <Input
                      placeholder={
                        errorData
                          ? t(`pages.auth.textes.error_data`)
                          : t(`pages.auth.textes.Password`)
                      }
                      onFocus={disableError}
                      className={`duration-200 z-[1] relative' ${
                        errorData && 'placeholder:text-[red]'
                      }`}
                      disabled={isPending}
                      variant='registr'
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <Button
                          variant='noneBg'
                          type='button'
                          className='w-full h-full flex justify-center items-center p-0'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? <EyeClose /> : <EyeOpen />}
                        </Button>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className='mt-3 sm:mt-0'
            disabled={isPending}
            type='submit'
            variant='auth'
          >
            {isPending ? t(`pages.auth.btns.process`) : t(`pages.auth.btns.in`)}
          </Button>
        </form>
      </Form>

      <Link
        className=' cursor-pointer text-[13px] font-normal leading-[22px] tracking-def text-bets-title-color text-right'
        href='/auth/recovery'
      >
        {t(`pages.auth.btns.forgot`)}
      </Link>
    </div>
  )
}
export default Signin
