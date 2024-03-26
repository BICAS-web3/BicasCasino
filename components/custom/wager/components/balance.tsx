'use client'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { FC } from 'react'

import * as api from '@/api'

import downArr from '@/public/misc/downArr.webp'

import { DollarSVG } from './icons'

import { cn } from '@/lib/utils'

import { GameModel, SettingModel, WagerModel } from '@/states'

interface IBalance {
  setstartedTyping: (el: boolean) => void
  setCryptoInputValue: (el: string) => void
  toggle: () => void
  setCurrencyInputValue: any
  currencyInputValue: string
  cryptoInputValue: string | number
  wagerInputRef: any
  exchangeRate: number
  isOpen: boolean
}

const Balance: FC<IBalance> = ({
  setCryptoInputValue,
  setstartedTyping,
  toggle,
  setCurrencyInputValue,
  currencyInputValue,
  cryptoInputValue,
  exchangeRate,
  wagerInputRef,
  isOpen
}) => {
  const [
    availableTokens,
    setCryptoValue,
    pickedToken,
    pickToken,
    isEmtyWager,
    setError
  ] = useUnit([
    SettingModel.$AvailableTokens,
    WagerModel.setCryptoValue,
    WagerModel.$pickedToken,
    WagerModel.pickToken,
    GameModel.$isEmtyWager,
    WagerModel.setError
  ])
  const handleChangeToken = (token: api.T_Token) => {
    pickToken(token)
  }

  return (
    <>
      <div
        className={cn(
          'rounded-t-[5px] sm:rounded-t-[12px] duration-500 border border-transparent xl:h-10',
          'flex items-center justify-center px-[15px] py-2 h-10',
          isEmtyWager && 'border-[#fc3c37]'
        )}
      >
        <input
          ref={wagerInputRef}
          placeholder='0.0000'
          className={cn(
            'border-none bg-inherit w-full outline-none',
            'text-white-acc text-sm font-bold uppercase'
          )}
          onChange={e => {
            setError(false)
            setstartedTyping(true)
            const numb = e.target.value
            const num = Number(numb)
            if (isNaN(num)) {
              setCryptoValue(0)
              return
            }
            if (num > 50) {
              return
            }
            setCryptoInputValue(numb)
            const currency = Number((num * exchangeRate).toFixed(7))
            setCurrencyInputValue(currency.toString())
            setCryptoValue(num)
          }}
          value={`${cryptoInputValue}`}
        />
        <div
          className={
            'min-w-[126px] cursor-pointer flex justify-end relative z-[5]'
          }
        >
          {pickedToken && (
            <>
              <div
                className={cn(
                  'duration-500 flex items-center gap-1.5 min-w-[126px]',
                  'px-[15px] xl:px-4 py-[10px] -mx-[10px] -mt-4 lg:-mr-[15px] xl:-mr-5',
                  isOpen && 'bg-[#252525] rounded-t-[5px] sm:rounded-t-[12px]'
                )}
                onClick={toggle}
              >
                <Image
                  alt='token-ico'
                  src={`${api.BaseStaticUrl}/media/tokens/${pickedToken.name}.svg`}
                  width={24}
                  height={24}
                  className='w-6 h-6'
                />
                <span
                  className={cn(
                    'text-white-acc text-xs font-bold uppercase',
                    isOpen && 'text-white-acc'
                  )}
                >
                  {pickedToken?.name}
                </span>
                <Image
                  className={cn(
                    'duration-500 ml-auto mr-[3px]',
                    isOpen && 'scale-y-[-1] '
                  )}
                  src={downArr}
                  alt='down-arr'
                />
              </div>
              <div
                className={cn(
                  'pt-1 rounded-b-[20px] bg-[252525] opacity-0 invisible duration-500',
                  'absolute -right-4 w-full top-[calc(100%+4px)]',
                  isOpen &&
                    'opacity-[1] visible rouned-b-[5px] sm:rouned-b-[12px] overflow-hidden w-full'
                )}
              >
                {availableTokens &&
                  availableTokens.tokens.map((token, _) => (
                    <div
                      className={cn(
                        'flex items-center justify-center duration-200',
                        'px-4 py-[10px] min-w-[126px] hover:bg-black-acc',
                        pickedToken.name === token.name && 'bg-[2e2e2e]'
                      )}
                      onClick={() => handleChangeToken(token)}
                    >
                      <Image
                        src={`${api.BaseStaticUrl}/media/tokens/${token.name}.svg`}
                        alt='token-ico'
                        width={24}
                        height={24}
                      />
                      <span
                        className={cn(
                          'ml-1.5 text-grey-acc text-xs font-bold uppercase',
                          pickedToken.name === token.name && 'text-white-acc'
                        )}
                      >
                        {token.name}
                      </span>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={'flex items-center justify-center px-[15px] py-2 h-10'}>
        <input
          placeholder='0.0000'
          className={cn(
            'border-none bg-inherit w-full outline-none',
            'text-grey-acc text-sm font-bold uppercase'
          )}
          onChange={e => {
            setstartedTyping(true)
            const numb = e.target.value
            setCurrencyInputValue(numb)
            const num = Number(numb)
            if (isNaN(num)) {
              setCryptoValue(0)
              return
            }
            const crypto_value = exchangeRate > 0 ? num / exchangeRate : 0
            setCryptoInputValue(Number(crypto_value.toFixed(7)).toString())
            setCryptoValue(crypto_value)
          }}
          value={currencyInputValue}
        />
        <div
          className={
            'mt-[3px] h-[27px] sm:h-[33px] flex items-center justify-center'
          }
        >
          <DollarSVG />
        </div>
      </div>
    </>
  )
}

export default Balance
