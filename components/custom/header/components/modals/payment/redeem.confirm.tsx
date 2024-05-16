'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { Input } from '@/components/ui/input'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const RedeemConfirmModal = () => {
  const useremail = 'example@gmail.com'
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [redeemConfirm, setRedeemConfirm, setPaymentVisibility] = useUnit([
    PaymentModel.$redeemConfirm,
    PaymentModel.setRedeemConfirm,
    PaymentModel.setPaymentVisibility
  ])
  const handleClose = () => {
    setRedeemConfirm(false)
  }

  const { t } = useTranslation()

  return (
    <Dialog open={redeemConfirm} onOpenChange={handleClose}>
      <DialogContent
        customClose
        className='gap-5 max-w-[510px] bg-[#181818] px-[20px] py-5'
      >
        <DialogHeader>
          <div className='flex justify-between items-center flex-row pr-2'>
            <div className='flex items-center gap-4 text-[#979797]'>
              <h5 className='tracking-[4%] font-semibold text-xl leading-7'>
                {t(`modals.wallet.payment.security`)}
              </h5>
            </div>
            <div className='flex items-center gap-4'>
              <Button
                className=''
                size='icon'
                variant='ghost'
                onClick={handleClose}
              >
                <X className='w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
              </Button>
            </div>
          </div>
          <Separator />
        </DialogHeader>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between text-sm sm:text-base font-semibold text-[#979797]'>
              <span>
                {t(`modals.wallet.payment.full`)} ({useremail.slice(0, 4)}
                {useremail
                  .slice(4)
                  .split(/[A-Za-z]/)
                  .join('*')}
                )
              </span>
            </div>

            <div className='flex flex-nowrap bg-[#121212] rounded-lg border border-[#252525]'>
              <Input
                className='w-full flex-1 h-10 rounded-none'
                value={user.email}
                type='email'
                onChange={e => setUser({ ...user, email: e.target.value })}
                placeholder={t(`modals.wallet.payment.full`)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between text-sm sm:text-base font-semibold text-[#979797]'>
              <span>{t(`modals.wallet.payment.input_password`)}</span>
            </div>

            <div className='flex flex-nowrap bg-[#121212] rounded-lg border border-[#252525]'>
              <Input
                className='w-full flex-1 h-10 rounded-none'
                value={user.password}
                type='password'
                onChange={e => setUser({ ...user, password: e.target.value })}
                placeholder='··································'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <Link
              href='#'
              className='text-sm leading-5 underline text-[#979797]'
            >
              {t(`modals.wallet.payment.forgot`)}
            </Link>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='sm'
                className='bg-[#202020] border text-base font-bold text-[#7E7E7E] border-[#363636] rounded-md'
              >
                {t(`modals.wallet.payment.Cancel`)}
              </Button>
              <Button
                variant='ghost'
                onClick={() => {
                  setRedeemConfirm(false)
                }}
                size='sm'
                className='bg-[#231F18] border  text-base font-bold text-[#FFE09D] border-[#907640] rounded-md'
              >
                {t(`modals.wallet.payment.Confirm`)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RedeemConfirmModal
