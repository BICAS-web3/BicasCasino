'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { loginSchema, resetSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PasswordRecoveryProps {}

const PasswordRecovery: FC<PasswordRecoveryProps> = () => {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: ''
    }
  })
  const [emailEffect, setEmailEffect] = useState(false)

  return (
    <div className='flex flex-col sm:gap-[20px] gap-[10px] mt-[10px] sm:mt-[20px]'>
      <Form {...form}>
        <form
          onSubmit={() => {}}
          className='flex flex-col gap-[4px] sm:gap-[5px] relative'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel
                  className={`text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
          after:duration-200 text-left text-bets-title-color absolute top-[1rem] left-[1rem] duration-200 ${
            emailEffect &&
            '-translate-y-[90%] scale-[0.8] after:absolute after:content-[""] after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-[#121212]'
          }`}
                >
                  <span className='z-[1] relative'>Email</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    onFocus={() => setEmailEffect(true)}
                    className={`border duration-200 ${
                      emailEffect ? 'border-[#7E7E7E]' : 'border-transparent'
                    }`}
                    // disabled={isPending}
                    variant='registr'
                    {...field}
                    onBlur={el => {
                      if (!el.target.value) {
                        setEmailEffect(false)
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='mt-[10px] sm:mt-[20px]'
            type='submit'
            variant='auth'
          >
            Reset Password
          </Button>
        </form>
      </Form>
      <Link
        href='/auth/login'
        className='text-[16px] font-normal leading-[22px] tracking-def
          text-left text-bets-title-color flex'
      >
        Already have an account?
        <p className='font-semibold text-orange'>&nbsp;Sign In</p>
      </Link>
    </div>
  )
}
export default PasswordRecovery
