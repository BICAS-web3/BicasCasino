'use client'

import { DraxMiniSVG } from '@/components/custom/header/components/icons'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'

import { tips_data } from '../data'
import { useTranslation } from 'react-i18next'

const TabTips = () => {
  const [amount, setAmount] = useState<number>(0.2454)
  const [Username, setUsername] = useState<string>('')
  const [purchaseI, setPurchaseI] = useState({
    id: '1',
    label: 'DC',
    value: 'dc',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <DraxMiniSVG className='aspect-square object-contain' />
  })

  const handleSelect = (value: string) => {
    tips_data.filter((item: any) =>
      item.id === value ? setPurchaseI(item) : null
    )
  }

  const handleAmount = e => {
    setAmount(+e.target.value)
  }

  const handleUserName = e => {
    setUsername(e.target.value)
  }

  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-3'>
      <div className='w-full flex justify-center items-center'>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className='w-[240px] h-10 bg-[#202020] rounded-lg'>
            <span className='mr-2 w-5 h-5'>{purchaseI.icon}</span>
            <SelectValue
              placeholder={`${amount.toFixed(2)} ${purchaseI.label}`}
              className='uppercase text-xs font-bold text-[#eaeaea]'
            />
          </SelectTrigger>
          <SelectContent className='gap-4 bg-[#202020] z-[5555]'>
            {tips_data.map((item, index) => (
              <SelectItem
                value={item.id}
                key={index}
                icon={item.icon}
                className='py-2 gap-2 cursor-pointer'
              >
                <span className='uppercase text-xs font-bold text-[#eaeaea]'>
                  {amount.toFixed(2)} {purchaseI.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <h6 className='text-base text-[#979797] font-semibold'>
            {t(`modals.wallet.payment.tips.Username`)}
          </h6>

          <div className='flex flex-nowrap bg-[#121212] rounded-lg border border-[#252525]'>
            <Input
              className='w-full flex-1 h-10 rounded-none'
              value={Username}
              type='string'
              onChange={handleUserName}
              placeholder={t(`modals.wallet.payment.tips.your`)}
            />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <h6 className='text-base text-[#979797] font-semibold'>
            {t(`modals.wallet.payment.tips.tips_amount`)}
          </h6>
          <div className='flex items-center pr-4 flex-nowrap bg-[#121212] rounded-lg border border-[#252525]'>
            <Input
              className='w-full flex-1 h-10 rounded-none'
              value={amount}
              type='number'
              step={0.01}
              onChange={handleAmount}
              placeholder={t(`modals.wallet.payment.tips.amount`)}
            />
            <div className='flex items-center justify-center h-5 aspect-square'>
              {purchaseI.icon}
            </div>
          </div>
        </div>

        <Button className='w-full max-w-full text-sm border border-[#907640] bg-[#252019] hover:bg-[#25201950] transition-all duration-300 text-[#FFE09D] font-bold'>
          {t(`modals.wallet.payment.tips.btn`)} {amount}
        </Button>

        <p className='text-sm text-[#979797] font-medium text-center'>
          {t(`modals.wallet.payment.tips.text`)}
        </p>
      </div>
    </div>
  )
}

export default TabTips
