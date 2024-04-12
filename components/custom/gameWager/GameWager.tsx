'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { DraxMiniSVG } from '@/components/custom/header/components/icons'
import { BetItem } from './BetItem'
import { useUnit } from 'effector-react'
import { GameModel, SettingModel, WagerModel } from '@/states'
import { cn } from '@/lib/utils'

export const bets = ['min', '/2', 'x2', 'max']

interface GameWagerProps {}

export const GameWager: FC<GameWagerProps> = () => {
  const [
    availableTokens,
    cryptoValue,
    setCryptoValue,
    pickedToken,
    pickToken,
    betsAmount,
    isEmtyWager,
    setIsEmtyWager,
    activeStep,
    setError,
    error
  ] = useUnit([
    SettingModel.$AvailableTokens,
    WagerModel.$cryptoValue,
    WagerModel.setCryptoValue,
    WagerModel.$pickedToken,
    WagerModel.pickToken,
    WagerModel.$pickedValue,
    GameModel.$isEmtyWager,
    GameModel.setIsEmtyWager,
    GameModel.$activeStep,
    WagerModel.setError,
    WagerModel.$error
  ])

  useEffect(() => {
    if (activeStep === 'Double' && Number(cryptoInputValue)) {
      setCryptoInputValue(prev => `${Number(prev) * 2}`)
    }
  }, [activeStep])

  const [cryptoInputValue, setCryptoInputValue] = useState('')

  useEffect(() => {
    const run = async () => {}
    if (availableTokens.tokens.length != 0) {
      pickToken(availableTokens.tokens[0])
      run()
    }
  }, [availableTokens])

  useEffect(() => {
    const run = async (token: string) => {}
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
    <div className='w-[fit-content] m-[0_auto] col-start-1 col-end-3  row-start-1 flex flex-col gap-[8px]'>
      <div className='flex items-center justify-between'>
        <span className='text-[14px] font-semibold leading-[20px] tracking-[4%] text-[#7e7e7e]'>
          Wager
        </span>
        <span className='text-[13px] font-medium leading-[18.5px] tracking-[4%] text-[#7e7e7e]'>
          Max: 0
        </span>
      </div>
      <div
        className={cn(
          'rounded-[20px] border-[1px] h-[36px] pl-[10px] flex items-center duration-500',
          error ? 'border-[#ee6969]' : 'border-[#363636]'
        )}
      >
        <div className='flex items-center gap-[15px] w-full max-w-[140px] pr-[10px] '>
          <Input
            ref={wagerInputRef}
            type='number'
            placeholder='0.0000'
            variant='borderNone'
            className='placeholder-[#eaeaea] w-full'
            onChange={e => {
              setError(false)
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
              setCryptoValue(num)
            }}
            value={`${cryptoInputValue}`}
          />
          <DraxMiniSVG className='min-w-[14px] h-[14px] aspect-square object-contain' />
        </div>
        {bets.map((bet, ind) => (
          <BetItem
            onClick={() => {
              const minVal = 1
              const maxVal = 100
              if (bet === 'Min') {
                setCryptoInputValue(minVal.toString())
              } else if (bet === 'Max') {
                setCryptoInputValue(maxVal.toString())
              } else if (cryptoInputValue.length && bet === '/2') {
                setCryptoInputValue((Number(cryptoInputValue) / 2).toString())
              } else if (cryptoInputValue.length && bet === 'x2') {
                setCryptoInputValue((Number(cryptoInputValue) * 2).toString())
              }
            }}
            key={ind}
            value={bet}
            id={ind}
          />
        ))}
      </div>
    </div>
  )
}
