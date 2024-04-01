import { useUnit } from 'effector-react'
import { FC, useEffect, useState, useTransition } from 'react'
import { signIn } from '@/auth'
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
import * as api from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'
import { DEFAULT_REDIRECT } from '@/routes'
import { signUp } from './actions/signUp'
// import { EyeClose, EyeOpen } from '@/shared/SVGs'

interface SignupProps {}

export const Signup: FC<SignupProps> = () => {
  const [isPending, setrtTransition] = useTransition()
  const form = useForm<z.infer<typeof registrSchema>>({
    resolver: zodResolver(registrSchema),
    defaultValues: {
      email: '',
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
      // const data = await api.registerUser({
      //   username: values.username,
      //   password: values.password
      // })
      // try {
      //   alert('d')
      //   await signIn('credentials', {
      //     email: values.username,
      //     password: values.password,
      //     redirectTo: '/wesdf' || DEFAULT_REDIRECT
      //   })
      // } catch (e) {
      //   alert(e)
      // }
      // alert(JSON.stringify(values))
      signUp(values)
      // if (data?.status === 'OK') {
      //   const dataObj = await api.loginUser({
      //     login: values.username,
      //     password: values.password
      //   })
      //   if (dataObj?.status === 'OK') {
      //     localStorage.setItem('auth', (dataObj.body as any).access_token)
      //     setAccessToken((dataObj.body as any).access_token)
      //     setRefreshToken((dataObj.body as any).refresh_token)
      //     setAuth(true)
      //   } else if (data?.status !== 'OK') {
      //     setAuth(false)
      //   }
      // }
      // if (data?.status !== 'OK') {
      // }
    })
  }
  return (
    <Form {...form}>
      <div
        className='
        sm:mt-[20px] mt-[10px] flex flex-col justify-between
      '
      >
        <form
          onSubmit={form.handleSubmit(handleSubmitUp)}
          className='
          flex flex-col gap-[10px] sm:gap[20px]
        '
        >
          <div className='flex flex-col gap-[4px] sm:gap-[5px] relative'>
            <FormField
              control={form.control}
              name='email'
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

          <div
            className='cursor-pointer flex items-center gap-[20px]'
            onClick={() => setAgeCheckbox(!ageCheckbox)}
          >
            <div
              className={`
              min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px]
              flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit
              transition-all duration-300
              ${error && !ageCheckbox ? '!border-[red]' : ''}
              ${
                ageCheckbox
                  ? 'shadow-[0px_0px_4px_0px_#d18b34] !bg-[#c4a562]'
                  : ''
              }
            `}
            >
              <Image
                width={12}
                height={9}
                src='/images/registration/arr.svg'
                className={`
              opacity-0 invisible transition-all duration-300
              ${ageCheckbox ? 'opacity-100 !visible' : ''}
            `}
                alt='arr-ico'
              />
            </div>
            <p
              className='text-[12px] font-normal leading-[16px] tracking-def
            text-bets-title-color '
            >
              I am at least 18 years old and not a resident of the restricted
              states.
            </p>
          </div>
          <div
            className='cursor-pointer flex items-center gap-[20px]'
            onClick={() => setPolicyCheckbox(!policyCheckbox)}
          >
            <div
              className={`
            min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px]
            flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit
            transition-all duration-300
            ${error && !policyCheckbox ? '!border-[red]' : ''}
            ${
              policyCheckbox
                ? 'shadow-[0px_0px_4px_0px_#d18b34] !bg-[#c4a562]'
                : ''
            }
          `}
            >
              <Image
                width={12}
                height={9}
                src='/images/registration/arr.svg'
                className={`opacity-0 invisible transition-all duration-300
            ${policyCheckbox ? 'opacity-100 !visible' : ''}`}
                alt='arr-ico'
              />
            </div>
            <p
              className='text-[12px] font-normal leading-[16px] tracking-def
            text-bets-title-color '
            >
              I accept the GreekKeepers <span>Terms of Use</span> and
              <span className='text-orange'> Privacy Policy.</span>
            </p>
          </div>
          <Button disabled={isPending} type='submit' variant='auth'>
            {isPending ? 'In process' : 'Sign Up'}
          </Button>
          <Link href='/auth/login' className='flex items-center'>
            <span
              className='text-[13px] font-normal text-bets-title-color leading-[17px]
              tracking-def'
            >
              Already have an account?
            </span>
            <span
              className='cursor-pointer text-orange text-[16px] font-semibold leading-[22px] tracking-def mb-[3px]
            '
              onClick={() => setIsSignup('in')}
            >
              &nbsp; Sign in
            </span>
          </Link>
        </form>
      </div>
    </Form>
  )
}
