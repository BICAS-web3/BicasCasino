'use client'
import { useUnit } from 'effector-react'
import { FC, useEffect, useState, useTransition } from 'react'
import { RegistrModel } from '@/states'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { registrSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUp } from '@/app/auth/(actions)/signUp'
import Checkbox from './checkbox'
import LoginLink from './login.link'

interface SignupProps {}

const SignUp: FC<SignupProps> = () => {
  const [isPending, setrtTransition] = useTransition()
  const form = useForm<z.infer<typeof registrSchema>>({
    resolver: zodResolver(registrSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [setIsSignup, setAuth, setAccessToken, setRefreshToken] = useUnit([
    RegistrModel.setIsSignup,
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

  const [ageCheckbox, setAgeCheckbox] = useState(true)
  const [policyCheckbox, setPolicyCheckbox] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false)
      }, 1500)
    }
  }, [error])

  const handleSubmitUp = (values: z.infer<typeof registrSchema>) => {
    setrtTransition(async () => {
      signUp(values)
    })
  }
  return (
    <Form {...form}>
      <div className='sm:mt-[20px] mt-[10px] flex flex-col justify-between'>
        <form
          onSubmit={form.handleSubmit(handleSubmitUp)}
          className='flex flex-col gap-[10px] sm:gap[20px]'
        >
          <div className='flex flex-col gap-[4px] sm:gap-[5px] relative'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className='text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
          text-left text-bets-title-color'
                  >
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isPending} variant='registr' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className='text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
          text-left text-bets-title-color'
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      variant='registr'
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Checkbox
            setCheckbox={setAgeCheckbox}
            chackbox={ageCheckbox}
            error={error}
            text='I am at least 18 years old and not a resident of the restricted states.'
          />
          <Checkbox
            setCheckbox={setPolicyCheckbox}
            chackbox={policyCheckbox}
            error={error}
            text={
              <>
                I accept the GreekKeepers <span>Terms of Use</span> and
                <span className='text-orange'> Privacy Policy.</span>
              </>
            }
          />

          <Button disabled={isPending} type='submit' variant='auth'>
            {isPending ? 'In process' : 'Sign Up'}
          </Button>
          <LoginLink setIsSignup={setIsSignup} />
        </form>
      </div>
    </Form>
  )
}
export default SignUp
