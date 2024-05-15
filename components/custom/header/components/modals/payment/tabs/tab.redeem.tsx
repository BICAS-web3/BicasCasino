'use client'

import { useState } from 'react'
import { crypto_data } from '../data'
import { BitcoinSVG, DraxMiniSVG } from '../../../icons'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import RedeemConfirmModal from '../redeem.confirm'
import { useUnit } from 'effector-react'
import { PaymentModel } from '@/states'
import { useTranslation } from 'react-i18next'

type CryptoProps = {
  id: string
  network: 'default' | string[]
  label: string
  value: string
  address: string
  icon: React.ReactNode
}

const TabRedeem = () => {
  const [amount, setAmount] = useState<number>(9601)
  const [estimate, setEstimate] = useState<number>(amount / 12 - 428.5)
  const [address, setAddress] = useState<string>('')
  const [purchaseI, setPurchaseI] = useState<CryptoProps>({
    id: '1',
    network: 'default',
    label: 'BTC',
    value: 'btc',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <BitcoinSVG className='aspect-square object-contain' />
  })

  const [setRedeemConfirm] = useUnit([PaymentModel.setRedeemConfirm])
  const handleSelect = (value: string) => {
    crypto_data.filter((item: any) =>
      item.id === value ? setPurchaseI(item) : null
    )
  }

  const handleAmount = e => {
    setAmount(+e.target.value)
  }
  const handleAddress = e => {
    setAddress(e.target.value)
  }
  const handleEstimate = e => {
    setEstimate(+e.target.value)
    setAmount(+(+e.target.value * 12 + 428.5).toFixed(2))
  }

  const { t } = useTranslation()

  return (
    <div className='flex flex-col justify-between gap-3 h-full'>
      <div className='w-full flex justify-center items-center'>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className='w-[140px] h-10 bg-[#202020] hover:bg-accent rounded-lg'>
            <span className='mr-2'>{purchaseI.icon}</span>
            <SelectValue
              placeholder={purchaseI.label}
              className='uppercase text-xs font-bold text-[#eaeaea]'
            />
          </SelectTrigger>
          <SelectContent className='gap-4 bg-[#202020]'>
            {crypto_data.map((item, index) => (
              <SelectItem
                value={item.id}
                key={index}
                icon={item.icon}
                className='py-2 gap-2 cursor-pointer'
              >
                <span className='uppercase text-xs font-bold text-[#eaeaea]'>
                  {item.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex h-full justify-between flex-col gap-5'>
        <div className=''>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between text-sm sm:text-base font-semibold text-[#979797]'>
              <span>{t(`modals.wallet.payment.redeem.amount`)}</span>
              <span>{t(`modals.wallet.payment.redeem.subtitle`)}</span>
            </div>
            <div className='flex items-center justify-between text-xs sm:text-base text-[#979797]'>
              <span>({t(`modals.wallet.payment.redeem.min`)} 20DC)</span>
              <div className='flex gap-1 items-center'>
                <span className='cursor-pointer underline text-orange max-w-60 truncate'>
                  {amount.toLocaleString('en-US')}DC
                </span>
                <span className='max-w-60 truncate'>
                  &asymp;{amount.toLocaleString('en-US')}$
                </span>
              </div>
            </div>

            <div className='flex flex-nowrap bg-[#121212] rounded-lg border border-[#252525]'>
              <Input
                className='w-full flex-1 h-10 rounded-none'
                value={amount === 0 ? '' : amount}
                type='number'
                step={0.01}
                onChange={handleAmount}
                placeholder={t(`modals.wallet.payment.redeem.amount`)}
              />
              <div className='flex items-center justify-center h-10 aspect-square'>
                <DraxMiniSVG className='w-5 h-5 aspect-square object-contain' />
              </div>
            </div>
          </div>

          <div className='flex flex-col mt-[10px] gap-1'>
            <div className='flex items-center justify-between text-sm sm:text-base font-semibold text-[#979797]'>
              <span>
                {purchaseI.label} {t(`modals.wallet.payment.redeem.address`)}
              </span>
            </div>

            <div className='flex flex-nowrap bg-[#121212] rounded-lg border border-[#252525]'>
              <Input
                className='w-full flex-1 h-10 rounded-none'
                value={address}
                type='string'
                onChange={handleAddress}
                placeholder={`${t(`modals.wallet.payment.redeem.to.text_1`)} ${
                  purchaseI.label
                } ${t(`modals.wallet.payment.redeem.to.text_2`)} `}
              />
            </div>
          </div>

          <div className='flex flex-col mt-[10px] gap-1'>
            <div className='flex items-center justify-between text-sm sm:text-base font-semibold text-[#979797]'>
              <span>{t(`modals.wallet.payment.redeem.estimate`)}</span>
              <span>≈{(amount / 12 - 428.5).toFixed(2)}USDT</span>
            </div>

            <div className='flex flex-nowrap bg-[#121212] rounded-lg border border-[#252525]'>
              <Input
                className='w-full flex-1 h-10 rounded-none'
                value={estimate}
                type='number'
                step={0.01}
                onChange={handleEstimate}
                placeholder={t(`modals.wallet.payment.redeem.estimate`)}
              />
              <div className='flex items-center justify-center h-10 aspect-square'>
                {purchaseI.icon}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-[10px]'>
          <div className='flex flex-col p-[10px] w-full bg-[#212121] rounded-lg'>
            <h6 className='text-sm text-[#979797] font-medium'>
              {t(`modals.wallet.payment.redeem.desclaimer`)}
            </h6>
            <p className='text-sm text-[#979797] font-medium'>
              {t(`modals.wallet.payment.redeem.text`)}
            </p>
          </div>

          <Button
            onClick={() => setRedeemConfirm(true)}
            className='w-full max-w-full text-sm border border-[#907640] bg-[#201F1C] hover:bg-[#252019] transition-all duration-300 text-[#FFE09D] font-bold'
          >
            {t(`modals.wallet.payment.redeem.redeem`)}
          </Button>
        </div>
      </div>
      <RedeemConfirmModal />
    </div>
  )
}

export default TabRedeem
