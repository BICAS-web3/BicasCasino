'use client'
import { useUnit } from 'effector-react'
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  useTransition
} from 'react'
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
import LoginLink from './login.link'
import { signIn } from 'next-auth/react'
import { BaseApiUrl } from '@/api'
import { Checkbox } from '@/components/ui/checkbox'
import Captcha from './captcha'
import { EyeClose, EyeOpen } from '../../(icons)'

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

  const [ageCheckbox, setAgeCheckbox] = useState(false)
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
      form.reset()
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
        if (userData.status === 'OK') {
          setAccessToken((userData.body as any).access_token)
          setRefreshToken((userData.body as any).refresh_token)
          setAuth(true)
          await signIn('credentials', {
            username: values.username,
            password: values.password
          })
        }
      } else {
        setErrorData(true)
      }
    })
  }
  const [token, setToken] = useState('')
  const [show, setSHow] = useState(false)

  const resetPassword = () => setShowPassword(prev => !prev)
  const errorFocus = () => setErrorData(false)

  const resetCheckbox = (func: Dispatch<SetStateAction<boolean>>) => {
    func(prev => !prev)
  }

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
          className='flex flex-col'
        >
          <div className='flex flex-col relative gap-[10px] sm:gap-5'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder={errorData ? 'User exist' : 'Username'}
                      onFocus={errorFocus}
                      className={`duration-200 ${
                        errorData && 'placeholder:text-[red]'
                      }`}
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
                      type={showPassword ? 'password' : 'text'}
                      disabled={isPending}
                      placeholder={errorData ? 'User exist' : 'Password'}
                      onFocus={errorFocus}
                      className={`duration-200 ${
                        errorData
                          ? 'placeholder:text-[red]'
                          : 'border-transparent'
                      }`}
                      variant='registr'
                      {...field}
                    />
                  </FormControl>
                  {showPassword ? (
                    <EyeOpen
                      className='cursor-pointer absolute top-2 right-4'
                      onClick={resetPassword}
                    />
                  ) : (
                    <EyeClose
                      className='cursor-pointer absolute top-2 right-4'
                      onClick={resetPassword}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start mt-[0_!important] mb-[0_!important] gap-5'>
                  <FormControl>
                    <Checkbox
                      itemID='age'
                      onClick={resetCheckbox.bind('', setAgeCheckbox)}
                      className={`min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px] flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit transition-all duration-300`}
                    />
                  </FormControl>
                  <FormLabel className='text-[12px] font-normal leading-[16px] tracking-def mt-[0_!important] mb-[0_!important] cursor-pointer text-bets-title-color'>
                    I am at least 18 years old and not a resident of the
                    restricted states.
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start mt-[0_!important] mb-[0_!important] gap-5'>
                  <FormControl>
                    <Checkbox
                      onClick={resetCheckbox.bind('', setPolicyCheckbox)}
                      className={`min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px] flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit transition-all duration-300`}
                    />
                  </FormControl>
                  <FormLabel className='text-[12px] font-normal leading-[16px] tracking-def mt-[0_!important] mb-[0_!important] cursor-pointer text-bets-title-color'>
                    I accept the GreekKeepers <span>Terms of Use</span> and
                    <span className='text-orange'> Privacy Policy.</span>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <Button
            className='mt-2.5 sm:mt-5'
            disabled={
              isPending ||
              !form.getValues().password ||
              !form.getValues().username ||
              !policyCheckbox ||
              !ageCheckbox
            }
            type='submit'
            variant='auth'
          >
            {isPending ? 'In process' : 'Sign Up'}
          </Button>
          <LoginLink className='mt-2.5' setIsSignup={setIsSignup} />
        </form>

        <div className='mt-2 w-0 h-0 overflow-hidden fixed -left-1/2 -top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Captcha
            key={process.env.SITE_KEY || ''}
            startCaptcha={show}
            onToken={setToken}
            show
          />
        </div>
      </div>
    </Form>
  )
}
export default SignUp
