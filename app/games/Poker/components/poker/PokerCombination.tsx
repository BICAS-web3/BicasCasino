import { FC, useEffect, useState } from 'react'

import { useUnit } from 'effector-react'

import * as api from '@/api'

import clsx from 'clsx'

interface PokerCombinationProps {
  combinationName: string
  tokenImage: any
  profit?: string | number
  multiplier: string | number
}

export const PokerCombination: FC<PokerCombinationProps> = ({
  combinationName,
  tokenImage,
  multiplier
}) => {
  // const [availableTokens, setCryptoValue, pickedToken, pickToken, betsAmount] =
  //   useUnit([
  //     settingsModel.$AvailableTokens,
  //     WagerModelInput.setCryptoValue,
  //     WagerModelInput.$pickedToken,
  //     WagerModelInput.pickToken,
  //     CustomWagerRangeInputModel.$pickedValue
  //   ])
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  // useEffect(() => {
  //   const run = async () => {
  //     const price = (
  //       (await api.GetTokenPriceFx(availableTokens.tokens[0].name))
  //         .body as api.T_TokenPrice
  //     ).token_price
  //     setExchangeRate(price)
  //   }
  //   if (availableTokens.tokens.length != 0) {
  //     pickToken(availableTokens.tokens[0])
  //     run()
  //   }
  // }, [availableTokens])

  // useEffect(() => {
  //   const run = async (token: string) => {
  //     const price = (
  //       (await api.GetTokenPriceFx(token)).body as api.T_TokenPrice
  //     ).token_price
  //     setExchangeRate(price)
  //   }
  //   if (pickedToken) {
  //     run(pickedToken.name)
  //   }
  // }, [pickedToken])

  // useEffect(() => {
  //   const num = Number(profit)
  //   if (isNaN(num)) {
  //     return
  //   }
  //   const currency = num * exchangeRate
  //   setCryptoValue(num)
  // }, [betsAmount])
  // const [pressButton] = useUnit([WagerModel.pressButton])
  // const [clearStatus, profit] = useUnit([
  //   GameModel.clearStatus,
  //   GameModel.$profit
  // ])

  // const { isOpen, open, dropdownRef, close } = useDropdown()

  useEffect(() => {
    open()
    return () => {
      // clearStatus()
      close()
    }
  }, [])

  return (
    <article
      // ref={dropdownRef}
      className='
        w-[220px] p-[20px_15px] 
      '
    >
      <h3
        className='
        text-center text-[1.25rem] sm:text-[1.5rem] tmd:text-[2rem] font-black leading-[90%] tracking-def 
        bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] uppercase
      '
      >
        {combinationName}
      </h3>
      <span
        className='
        text-[1.25rem] sm:text-[1.5rem] tmd:text-[2rem] font-black leading-[90%]
        bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)]
        text-transparent bg-clip-text
      '
      >
        you win
      </span>
      <div
        className='
        flex flex0col items-center
      '
      >
        <div
          className='
          flex items-center gap-[10px]
        '
        >
          <div>{tokenImage}</div>
          <div
            className='
            text-center text-[0.875rem] sm:text-[1rem] tmd:text-[1.25rem] font-black leading-[90%] text-[#eaeaea]
          '
          >
            {/* {profit} */}
            12
          </div>
        </div>
        <div
          className='
            text-[0.75rem] sm:text-[1rem] mt-[14px] sm:mt-[14px] leading-[90%]
            text-[#7e7e7e] font-bold text-center
          '
        >
          {multiplier}x
        </div>
      </div>
      <button
        className='
          bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)]
          text-[#0f0f0f] leading-normal font-extrabold text-[0.8125rem] sm:text-[1.125rem]
          tracking-[0.72px] p-[8px_6px] sm:p-[12px_10px] rounded-[5px] sm:rounded-[12px]
          w-[180px] sm:w-[252px] h-[40px] sm:h-[50px] 
        '
        onClick={() => {
          // pressButton()
        }}
      >
        Bet on my winnings
      </button>
    </article>
  )
}
