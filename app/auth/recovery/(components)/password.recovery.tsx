'use client'

import { FC } from 'react'
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
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

interface PasswordRecoveryProps {}

const PasswordRecovery: FC<PasswordRecoveryProps> = () => {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: ''
    }
  })

  const { t } = useTranslation()

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
                <FormControl>
                  <Input
                    placeholder={t(`pages.auth.textes.Password`)}
                    type='email'
                    className={`duration-200 ${
                      false && 'placeholder:text-[red]'
                    }`}
                    // disabled={isPending}
                    variant='registr'
                    {...field}
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
            {t(`pages.auth.btns.reset`)}
          </Button>
        </form>
      </Form>
      <Link
        href='/auth/login'
        className='text-[13px] font-normal leading-[22px] tracking-def
          text-left text-bets-title-color flex'
      >
        {t(`pages.auth.textes.have`)}
        <p className='font-normal text-orange'>
          &nbsp;{t(`pages.auth.btns.in`)}
        </p>
      </Link>
    </div>
  )
}
export default PasswordRecovery
