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

import Checkbox from './checkbox'
import LoginLink from './login.link'
import { signIn } from 'next-auth/react'
import { BaseApiUrl } from '@/api'
import Captcha from '@/components/custom/captcha'

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
  const [errorData, setErrorData] = useState(false)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false)
      }, 1500)
    }
  }, [error])

  const handleSubmitUp = (values: z.infer<typeof registrSchema>) => {
    setrtTransition(async () => {
      const { username, password } = values
      const data = await fetch(`${BaseApiUrl}/user/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          h_captcha_response: token
        })
      })
        .then(async res => await res.json())
        .catch(e => e)

      if (data.status === 'OK') {
        const userData = await fetch(`${BaseApiUrl}/user/login`, {
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
        console.log('data: ', JSON.stringify(userData))
        if (userData.status === 'OK') {
          setAccessToken((userData.body as any).access_token)
          setRefreshToken((userData.body as any).refresh_token)
          localStorage.setItem('auth', (userData.body as any).access_token)
          console.log(data)
          await signIn('credentials', {
            username: values.username,
            password: values.password,
            redirectTo: '/'
          })
        }
      } else {
        setErrorData(true)
      }
    })
  }
  const [token, setToken] = useState('')
  const [show, setSHow] = useState(false)
  const [nameEffect, setNameEffect] = useState(false)
  const [passwordEffect, setPasswordEffect] = useState(false)
  return (
    <Form {...form}>
      <div className='sm:mt-[20px] mt-[10px] flex flex-col justify-between'>
        <form
          onSubmit={e => {
            if (!policyCheckbox || !ageCheckbox) {
              setError(true)
            } else if (token.length > 0) {
              form.handleSubmit(handleSubmitUp)(e)
            } else {
              e.preventDefault()
              setSHow(true)
            }
          }}
          className='flex flex-col gap-[10px] sm:gap[20px]'
        >
          <div className='flex flex-col  relative gap-[19px]'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel
                    className={`text-sm sm:text-[13px] font-normal px-1 leading-[22px] tracking-def
          after:duration-200 text-left absolute top-[1rem] left-[1rem] duration-200 ${
            nameEffect &&
            '-translate-y-[90%] scale-[0.7] after:absolute after:content-[""] after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-[#121212]'
          } ${errorData ? 'text-[red]' : 'text-bets-title-color'}`}
                  >
                    <span className='z-[1] relative'>
                      {errorData ? 'User exist' : 'Username'}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      onFocus={() => {
                        setErrorData(false)
                        setNameEffect(true)
                      }}
                      className={`border duration-200 ${
                        nameEffect ? 'border-[#7E7E7E]' : 'border-transparent'
                      }`}
                      // disabled={isPending}
                      variant='registr'
                      {...field}
                      onBlur={el => {
                        if (!el.target.value) {
                          setNameEffect(false)
                        }
                      }}
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
                  <FormLabel
                    className={`text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
          after:duration-200 text-left absolute top-[1rem] left-[1rem] duration-200 ${
            passwordEffect &&
            '-translate-y-[90%] scale-[0.7] after:absolute after:content-[""] after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-[#121212]'
          } ${errorData ? 'text-[red]' : 'text-bets-title-color'}`}
                  >
                    <span className='z-[1] relative'>
                      {' '}
                      {errorData ? 'User exist' : 'Password'}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      onFocus={() => {
                        setErrorData(false)
                        setPasswordEffect(true)
                      }}
                      className={`border duration-200 ${
                        passwordEffect
                          ? 'border-[#7E7E7E]'
                          : 'border-transparent'
                      }`}
                      // disabled={isPending}
                      variant='registr'
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      onBlur={el => {
                        if (!el.target.value) {
                          setPasswordEffect(false)
                        }
                      }}
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
          <Button
            disabled={
              isPending ||
              !form.getValues().password ||
              !form.getValues().username
            }
            type='submit'
            variant='auth'
          >
            {isPending ? 'In process' : 'Sign Up'}
          </Button>
          <LoginLink setIsSignup={setIsSignup} />
        </form>

        <div className='mt-2 w-0 h-0 overflow-hidden fixed -left-1/2 -top-1/2 -translate-x-1/2 -translate-x-1/2'>
          <Captcha startCaptcha={show} onToken={setToken} show />
        </div>
      </div>
    </Form>
  )
}
export default SignUp
// signUp(values)
// signIn('credentials', {
//   username: values.username,
//   password: values.password,
//   callbackUrl: '/'
// })
