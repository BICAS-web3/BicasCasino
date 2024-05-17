import {
  BonusCoinSVG,
  DraxMiniSVG
} from '@/components/custom/header/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { stringRemoveSpacing } from '@/lib/string'
import { GameModel, SettingModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const bets = ['min', '/2', 'x2', 'max']
const titles = ['Wager', 'Max: 50']

const BONUS_MAX = 50000
const COIN_MAX = 500

const GameWager = () => {
  const path = usePathname()
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
    error,
    balance,
    isPlaying,
    setApplesWagerr,
    isDrax,
    setGameStatus,
    setIsPlaying,
    showNotification
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
    WagerModel.$error,
    UserModel.$balance,
    GameModel.$isPlaying,
    GameModel.setApplesWagerr,
    UserModel.$isDrax,
    GameModel.setGameStatus,
    GameModel.setIsPlaying,
    UserModel.$showNotification
  ])

  useEffect(() => {
    setCryptoValue(1)
    setCryptoInputValue('1')
  }, [path])

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
    setApplesWagerr(Number(cryptoInputValue))
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
    if (num > (isDrax ? COIN_MAX : BONUS_MAX)) {
      return
    }
    setCryptoInputValue(numb)
    setCryptoValue(num)
  }
  const handleBet = value => {
    // alert(3)
    if (isPlaying) {
      showNotification && toast(t(`toast.in_game`))
      return
    }
    if (value === 'min') {
      setCryptoInputValue('1')
    } else if (value === 'max') {
      if (balance > (isDrax ? COIN_MAX : BONUS_MAX)) {
        setCryptoInputValue(`${isDrax ? COIN_MAX : BONUS_MAX}`)
      } else {
        setCryptoInputValue(balance.toString())
      }
    } else if (cryptoInputValue.length && value === '/2') {
      setCryptoInputValue((Number(cryptoInputValue) / 2).toString())
    } else if (cryptoInputValue.length && value === 'x2') {
      if (Number(cryptoInputValue) * 2 > (isDrax ? COIN_MAX : BONUS_MAX)) {
        setCryptoInputValue(`${isDrax ? COIN_MAX : BONUS_MAX}`)
      } else {
        setCryptoInputValue((Number(cryptoInputValue) * 2).toString())
      }
    }
  }

  const { t } = useTranslation()

  useEffect(() => {
    if (Number(cryptoInputValue) > balance) {
      setCryptoValue(balance)
      setCryptoInputValue(`${balance}`)
    }
  }, [isDrax])

  return (
    <div className='w-full sm:w-fit my-0 mx-auto col-start-1 col-end-3 row-start-1 flex flex-col gap-2'>
      <div className='flex items-center justify-between flex-nowrap'>
        {titles.map((title, index) => (
          <span
            key={`game-wager--${stringRemoveSpacing(title)}-${index}`}
            className='text-sm font-semibold leading-5 tracking-wide text-[#7e7e7e]'
          >
            {title.includes('50')
              ? t(
                  `pages.games.${title}`.replace(
                    '50',
                    `${isDrax ? COIN_MAX : BONUS_MAX}`
                  )
                )
              : t(`pages.games.${title}`)}
          </span>
        ))}
      </div>
      <div className='rounded-[20px] border h-9 pl-2.5 flex items-center border-[#363636]'>
        <Input
          type='number'
          ref={wagerInputRef}
          placeholder='0.0000'
          value={`${cryptoInputValue}`}
          // variant='borderNone'
          className='placeholder-[#eaeaea] w-full'
          containerClassName={`bg-transparent gap-[6px] sm:gap-3.5 max-w-full sm:max-w-36 ${
            error ? 'border-[#ee6969]' : 'border-[#363636]'
          }`}
          onChange={handleInput}
          endAdornment={
            isDrax ? (
              <DraxMiniSVG
                width={14}
                height={14}
                className='min-w-3.5 h-3.5 max-w-3.5 max-h-3.5 aspect-square object-contain'
              />
            ) : (
              <BonusCoinSVG
                width={14}
                height={14}
                className='min-w-3.5 h-3.5 max-w-3.5 max-h-3.5 aspect-square object-contain'
              />
            )
          }
        />
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
            {t(`pages.games.${bet}`)}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default GameWager
