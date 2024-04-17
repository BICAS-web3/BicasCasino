import { DraxMiniSVG } from '@/components/custom/header/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { stringRemoveSpacing } from '@/lib/string'
import { GameModel, SettingModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { useEffect, useRef, useState } from 'react'

const bets = ['min', '/2', 'x2', 'max']
const titles = ['Wager', 'Max: 0']

const GameWager = () => {
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
  const handleInput = e => {
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
  }
  const handleBet = value => {
    const minVal = 1
    const maxVal = 100
    if (value === 'Min') {
      setCryptoInputValue(minVal.toString())
    } else if (value === 'Max') {
      setCryptoInputValue(maxVal.toString())
    } else if (cryptoInputValue.length && value === '/2') {
      setCryptoInputValue((Number(cryptoInputValue) / 2).toString())
    } else if (cryptoInputValue.length && value === 'x2') {
      setCryptoInputValue((Number(cryptoInputValue) * 2).toString())
    }
  }
  return (
    <div className='w-full sm:w-fit my-0 mx-auto col-start-1 col-end-3 row-start-1 flex flex-col gap-2'>
      <div className='flex items-center justify-between flex-nowrap'>
        {titles.map((title, index) => (
          <span
            key={`game-wager--${stringRemoveSpacing(title)}-${index}`}
            className='text-sm font-semibold leading-5 tracking-wide text-[#7e7e7e]'
          >
            {title}
          </span>
        ))}
      </div>
      <div className='rounded-[20px] border h-9 pl-2.5 flex items-center border-[#363636]'>
        <div className='flex items-center gap-3.5 w-full max-w-full sm:max-w-36 pr-2.5'>
          <Input
            type='number'
            ref={wagerInputRef}
            placeholder='0.0000'
            variant='borderNone'
            className='placeholder-[#eaeaea] w-full'
            onChange={handleInput}
          />
          <DraxMiniSVG className='min-w-3.5 h-3.5 aspect-square object-contain' />
        </div>
        {bets.map((bet, index) => (
          <Button
            variant='wager'
            key={`game-wager-bet--${stringRemoveSpacing(bet)}-${index}`}
            className={`h-full ${
              index + 1 === bets.length
                ? 'rounded-[0_20px_20px_0] border-none'
                : ''
            } ${index === 0 ? 'border-l border-l-[#363636]' : ''}`}
            onClick={() => handleBet(bet)}
          >
            {bet}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default GameWager
