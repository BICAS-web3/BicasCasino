'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import * as api from '@/api'

import { Button } from '@/components/ui/button'

import { useDropdown } from '@/lib/hooks/useDropDown'

import { GameModel, SettingModel, WagerModel } from '@/states'
import Balance from './components/balance'
import Toggle from './components/toggle'

interface IWager {
  className?: string
  wagerVariants?: number[]
  bjVariants?: boolean
}

const bjVariantsList = [
  {
    title: 'Min'
  },
  {
    title: '/2'
  },
  {
    title: 'x2'
  },
  {
    title: 'Max'
  }
]
const Wager: FC<IWager> = ({ bjVariants }) => {
  const [
    availableTokens,
    cryptoValue,
    setCryptoValue,
    pickedToken,
    pickToken,
    betsAmount,
    isEmtyWager,
    setIsEmtyWager,
    setError
  ] = useUnit([
    SettingModel.$AvailableTokens,
    WagerModel.$cryptoValue,
    WagerModel.setCryptoValue,
    WagerModel.$pickedToken,
    WagerModel.pickToken,
    WagerModel.$pickedValue,
    GameModel.$isEmtyWager,
    GameModel.setIsEmtyWager,
    WagerModel.setError
  ])

  const [cryptoInputValue, setCryptoInputValue] = useState('')
  const [currencyInputValue, setCurrencyInputValue] = useState('')
  const { dropdownRef, isOpen, toggle } = useDropdown()
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [startedTyping, setstartedTyping] = useState<boolean>(false)

  useEffect(() => {
    const run = async () => {
      const price = (
        (await api.GetTokenPriceFx(availableTokens.tokens[0].name))
          .body as api.T_TokenPrice
      ).token_price
      setExchangeRate(price)
    }
    if (availableTokens.tokens.length != 0) {
      pickToken(availableTokens.tokens[0])
      run()
    }
  }, [availableTokens])

  useEffect(() => {
    const run = async (token: string) => {
      const price = (
        (await api.GetTokenPriceFx(token)).body as api.T_TokenPrice
      ).token_price
      setExchangeRate(price)
    }
    if (pickedToken) {
      run(pickedToken.name)
    }
  }, [pickedToken])

  useEffect(() => {
    const num = Number(cryptoInputValue)
    if (isNaN(num)) {
      return
    }
    setCryptoValue(num)
  }, [betsAmount])

  const wagerInputRef = useRef<HTMLInputElement>(null)
  const isEmtyWagerRef = useRef(isEmtyWager)
  useEffect(() => {
    isEmtyWagerRef.current = isEmtyWager
  }, [isEmtyWager])

  useEffect(() => {
    if (cryptoValue > 0) {
      setIsEmtyWager(false)
      setError(false)
    } else {
    }
  }, [cryptoInputValue, cryptoValue])

  useEffect(() => {
    setCryptoValue(Number(cryptoInputValue))
  }, [cryptoInputValue])

  useEffect(() => {
    return () => {
      setIsEmtyWager(false)
    }
  }, [])

  useEffect(() => {
    cryptoValue !== 0 && setCryptoInputValue(String(cryptoValue))
  }, [cryptoValue])
  return (
    <div className='flex flex-col gap-3 flex-[1_1_auto]'>
      <div className='flex flex-col gap-1'>
        <span className='text-sm text-grey-acc'>Wager</span>
        <div
          ref={dropdownRef}
          className={
            'bg-[#0F0F0F] rounded-[5px] sm:rounded-[12px] flex flex-col'
          }
        >
          <Balance
            wagerInputRef={wagerInputRef}
            cryptoInputValue={cryptoInputValue}
            toggle={toggle}
            isOpen={isOpen}
            currencyInputValue={currencyInputValue}
            exchangeRate={exchangeRate}
            setCurrencyInputValue={setCurrencyInputValue}
            setstartedTyping={setstartedTyping}
            setCryptoInputValue={setCryptoInputValue}
          />
          <Toggle
            bjVariants={bjVariants}
            cryptoInputValue={cryptoInputValue}
            exchangeRate={exchangeRate}
            setCurrencyInputValue={setCurrencyInputValue}
            setCryptoInputValue={setCryptoInputValue}
            bjVariantsList={bjVariantsList}
            setCryptoValue={setCryptoValue}
          />
        </div>
      </div>
      <Button variant='gold' className='text-black text-base'>
        Play
      </Button>
    </div>
  )
}

export default Wager
