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

import * as api from '@/api'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

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
  const route = useRouter()
  const handleSubmitUp = (values: z.infer<typeof registrSchema>) => {
    const usernameRegex = /^[^\u0400-\u04FF]+$/
    if (
      !usernameRegex.test(values.username) ||
      !usernameRegex.test(values.password)
    ) {
      toast.error('Please use only Latin characters for the username')
      return
    }
    setrtTransition(async () => {
      const { username, password } = values
      console.log(`${BaseApiUrl}/user/register`)
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
        setAuth(true)
        const userResponse = await api.loginUser({
          login: username,
          password: password
        })
        if (userResponse.status === 'OK') {
          setAccessToken(
            (userResponse.body as Record<string, string>).access_token
          )
          setRefreshToken(
            (userResponse.body as Record<string, string>).refresh_token
          )
          localStorage.setItem(
            'access_token',
            (userResponse.body as Record<string, string>).access_token
          )
          localStorage.setItem(
            'refresh_token',
            (userResponse.body as Record<string, string>).access_token
          )

          route.push('/')
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

  const { t } = useTranslation()

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
          <div className='flex flex-col relative'>
            <div className='mb-[10px]'>
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
                        disabled={isPending}
                        placeholder={
                          errorData
                            ? t(`pages.auth.textes.exist`)
                            : t(`pages.auth.textes.Username`)
                        }
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
            </div>
            <div className='mb-[10px]'>
              <span className='text-[13px] text-[#7E7E7E] font-normal block mb-[10px]'>
                {t(`pages.auth.textes.Password`)}
              </span>
              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        disabled={isPending}
                        placeholder={
                          errorData
                            ? t(`pages.auth.textes.exist`)
                            : t(`pages.auth.textes.Password`)
                        }
                        onFocus={errorFocus}
                        className={`duration-200 ${
                          errorData
                            ? 'placeholder:text-[red]'
                            : 'border-transparent'
                        }`}
                        variant='registr'
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='flex items-center flex-row mt-[0_!important] mb-[0_!important] gap-5'>
                  <FormControl>
                    <Checkbox
                      itemID='age'
                      onClick={resetCheckbox.bind('', setAgeCheckbox)}
                      className={`min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px] flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit transition-all duration-300`}
                    />
                  </FormControl>
                  <FormLabel className='text-[12px] font-normal leading-[16px] tracking-def mt-[0_!important] mb-[0_!important] cursor-pointer text-bets-title-color'>
                    {t(`pages.auth.signup.age_text`)}
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='flex items-center flex-row mb-[0_!important] gap-5 mt-5'>
                  <FormControl>
                    <Checkbox
                      onClick={resetCheckbox.bind('', setPolicyCheckbox)}
                      className={`min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px] flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit transition-all duration-300`}
                    />
                  </FormControl>
                  <FormLabel className='text-[12px] font-normal leading-[16px] tracking-def mt-[0_!important] mb-[0_!important] cursor-pointer text-bets-title-color'>
                    {t(`pages.auth.signup.privacy.text_1`)}{' '}
                    <span>{t(`pages.auth.signup.privacy.text_2`)}</span>{' '}
                    {t(`pages.auth.signup.privacy.text_3`)}
                    <span className='text-orange'>
                      {' '}
                      {t(`pages.auth.signup.privacy.text_4`)}
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <Button
            className='mt-2.5 border border-[#907640] sm:mt-5'
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
            {isPending ? t(`pages.auth.btns.process`) : t(`pages.auth.btns.up`)}
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
