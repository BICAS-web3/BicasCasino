'use client'
import { FC } from 'react'

import { cn } from '@/lib/utils'

interface IToggle {
  bjVariants: any
  setCryptoInputValue: (el: string) => void
  setCryptoValue: (el: string | number) => void
  setCurrencyInputValue: any
  cryptoInputValue: any
  exchangeRate: number
  bjVariantsList: any[]
}

const Toggle: FC<IToggle> = ({
  bjVariants,
  setCryptoInputValue,
  setCryptoValue,
  setCurrencyInputValue,
  cryptoInputValue,
  exchangeRate,
  bjVariantsList
}) => {
  return (
    <div
      className={
        'flex bg-black-acc rounded-b-[12px] sm:rounded-b-[12px] overflow-hidden'
      }
    >
      {!bjVariants
        ? [5, 7.5, 10, 12.5, 15].map(cNumber => (
            <div
              key={cNumber}
              className={cn(
                'flex items-center justify-center cursor-pointer w-[50px] border-r border-[#3e3e3e]',
                'group hover:bg-[#2e2e2e] last:border-none',
                'px-[10px] h-[30px] w-full'
              )}
              onClick={() => {
                const currency = Number((cNumber * exchangeRate).toFixed(7))
                setCurrencyInputValue(currency.toString())
                setCryptoValue(cNumber)
                setCryptoInputValue(Number(cNumber.toFixed(7)).toString())
                const newCurrencyValue = cNumber * exchangeRate
                setCurrencyInputValue(
                  Number(newCurrencyValue.toFixed(7)).toString()
                )
              }}
            >
              <span
                className={cn(
                  'group-hover:text-white-acc',
                  'text-grey-acc text-center text-xs font-bold uppercase'
                )}
              >
                {cNumber}
              </span>
            </div>
          ))
        : bjVariantsList.map((item, ind) => (
            <div
              className={cn(
                'flex justify-center items-center cursor-pointer',
                'group hover:bg-[#2e2e2e] borde-r-[#3e3e3e] w-[50px] last:border-none'
              )}
              key={ind}
              onClick={() => {
                const minVal = 1
                const maxVal = 100
                if (item.title === 'Min') {
                  setCryptoInputValue(minVal.toString())
                } else if (item.title === 'Max') {
                  setCryptoInputValue(maxVal.toString())
                } else if (cryptoInputValue.length && item.title === '/2') {
                  setCryptoInputValue((Number(cryptoInputValue) / 2).toString())
                } else if (cryptoInputValue.length && item.title === 'x2') {
                  setCryptoInputValue((Number(cryptoInputValue) * 2).toString())
                }
              }}
            >
              <span
                className={cn(
                  'group-hover:text-white-acc',
                  'text-grey-acc text-center text-xs font-bold uppercase'
                )}
              >
                {item.title}
              </span>
            </div>
          ))}
    </div>
  )
}

export default Toggle
