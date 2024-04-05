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
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { EyeClose, EyeOpen } from '../../(icons)'
interface SigninProps {}

const Signin: FC<SigninProps> = () => {
  const [isPending, setrtTransition] = useTransition()

  const [setAuth, setAccessToken, setRefreshToken] = useUnit([
    RegistrModel.setAuth,
    RegistrModel.setAccessToken,
    RegistrModel.setRefreshToken
  ])

  useEffect(() => {
    const exist = localStorage.getItem('auth')
    if (exist) {
      setAccessToken(exist)
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])

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

  const handleSubmitIn = (values: z.infer<typeof loginSchema>) => {
    setrtTransition(async () => {
      const { username, password } = values
      // alert(JSON.stringify(values))
      // console.log('454544545!!', values)
      // const data = await api.loginUser({
      //   login: values.username,
      //   password: values.password
      // })
      // if (data?.status === 'OK') {
      //   setAccessToken((data.body as any).access_token)
      //   setRefreshToken((data.body as any).refresh_token)

      //   setAuth(true)
      // } else if ((data.body as any)?.status !== 'OK') {
      //   setAuth(false)
      //   setErrorData(true)
      // }
      await signIn('credentials', {
        username,
        password
      })
    })
  }

  return (
    <div className='flex flex-col gap-[10px] sm:gap-[20px] mt-[10px] sm:mt-[20px]'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitIn)}
          className='flex flex-col gap-[4px] sm:gap-[19px] relative'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <Input
                    onFocus={() => {
                      setErrorData(false)
                    }}
                    placeholder={errorData ? 'Wrong data' : 'Username'}
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <Input
                    placeholder={errorData ? 'Wrong data' : 'Password'}
                    onFocus={() => {
                      setErrorData(false)
                    }}
                    className={`duration-200 z-[1] relative' ${
                      errorData && 'placeholder:text-[red]'
                    }`}
                    disabled={isPending}
                    variant='registr'
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {showPassword ? (
                  <EyeOpen
                    className='cursor-pointer absolute top-2 right-4'
                    onClick={() => setShowPassword(prev => !prev)}
                  />
                ) : (
                  <EyeClose
                    className='cursor-pointer absolute top-2 right-4'
                    onClick={() => setShowPassword(prev => !prev)}
                  />
                )}
              </FormItem>
            )}
          />
          <Button
            className='mt-2.5 sm:mt-5'
            disabled={isPending}
            type='submit'
            variant='auth'
          >
            {isPending ? 'In process' : 'Sign In'}
          </Button>
        </form>
      </Form>

      <Link
        className='
          cursor-pointer text-[16px] font-normal leading-[22px] tracking-def text-bets-title-color
          text-right
        '
        href='/auth/recovery'
      >
        Forgot Password?
      </Link>
    </div>
  )
}
export default Signin
