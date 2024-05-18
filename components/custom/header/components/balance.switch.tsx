'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { BonusCoinSVG, DraxMiniSVG } from './icons'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from 'usehooks-ts'
import { GameModel, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { useSpring, animated } from 'react-spring'

import * as api from '@/api'
import { BalanceHover } from './balance.hover'

const switch_img = [
  {
    isDrax: false,
    icon: <BonusCoinSVG className='w-5 aspect-square object-contain' />,
    id: 'bonus-ico',
    token: 'bc'
  },
  {
    isDrax: true,
    icon: <DraxMiniSVG className='w-5 aspect-square object-contain' />,
    id: 'drax-ico',
    token: 'dc'
  }
]
export interface IAmount {
  type: 'Amounts'
  amounts: {
    name: 'Drax' | 'DraxBonus'
    amount: string
  }[]
}
const BalanceSwitcher = () => {
  const [springProps, setSpringProps] = useSpring(() => ({
    number: 0
  }))
  const [springCoin, setSpringCoin] = useSpring(() => ({
    number: 0
  }))
  const [springBonus, setSpringBonus] = useSpring(() => ({
    number: 0
  }))

  const isMobile = useMediaQuery('(max-width: 730px)')

  const [
    isDrax,
    setDrax,
    access_token,
    userInfo,
    result,
    setBalanceValue,
    balanceValue,
    setRedeemable
  ] = useUnit([
    UserModel.$isDrax,
    UserModel.setIsDrax,
    RegistrModel.$access_token,
    UserModel.$userInfo,
    GameModel.$result,
    UserModel.setBalance,
    UserModel.$balance,
    UserModel.setRedeemable
  ])

  const [balance, setBalance] = useState<null | IAmount>(null)

  useEffect(() => {
    if (isDrax && userInfo?.id && balance !== null) {
      ;(async () => {
        const value = Number(
          balance?.amounts.find(el => el.name === 'Drax')?.amount
        )
        const bets = await api.GetTotalsFx()
        // bets && alert(JSON.stringify(bets))
        setRedeemable(value)
      })()
    }
  }, [isDrax, balance, userInfo])

  useEffect(() => {
    if (access_token && userInfo) {
      ;(async () => {
        const data = await api.getUserAmounts({
          bareer: access_token,
          userId: userInfo?.id
        })
        if (data.status === 'OK') {
          // alert(JSON.stringify(data))
          setBalance((data as any).body)
          setBalanceValue(
            Number(
              (data.body as any).amounts.find(
                (item: any) => item.name === (isDrax ? 'Drax' : 'DraxBonus')
              )?.amount
            )
          )
        }
      })()
    }
  }, [access_token, userInfo?.id])

  useEffect(() => {
    if (access_token && userInfo && result) {
      ;(async () => {
        const data = await api.getUserAmounts({
          bareer: access_token,
          userId: userInfo?.id
        })
        // data && alert(JSON.stringify(data))
        if (data.status === 'OK') {
          setTimeout(() => {
            setBalance((data as any).body)
            setBalanceValue(
              Number(
                (data.body as any).amounts.find(
                  (item: any) => item.name === (isDrax ? 'Drax' : 'DraxBonus')
                )?.amount
              )
            )
          }, 1650)
        }
      })()
    }
  }, [access_token, userInfo?.id, result])

  const zero = 0

  const changeToken = item => {
    const type = item.isDrax ? 'Drax' : 'DraxBonus'
    setDrax(item.isDrax)
    setBalanceValue(
      balance !== null
        ? Number(balance.amounts.find(item => item.name === type)?.amount)
        : 0.0
    )
  }

  useEffect(() => {
    if (balanceValue !== null) {
      setSpringProps({ number: balanceValue })
    }
  }, [balanceValue])

  useEffect(() => {
    if (balance) {
      setSpringCoin({
        number: Number(
          balance.amounts.find(item => item.name === 'Drax')?.amount
        )
      })
      setSpringBonus({
        number: Number(
          balance.amounts.find(item => item.name === 'DraxBonus')?.amount
        )
      })
    }
  }, [balance])

  return (
    <div
      className={cn(
        'h-[40px] balance-switch flex items-center p-1 sm:p-[5px] gap-0 sm:gap-2.5',
        'bg-[#121212] border relative border-[#212121] group rounded-[50px]'
      )}
    >
      <BalanceHover balance={balance} />
      {switch_img.map(item => (
        <Button
          variant='ghost'
          key={item.id}
          onClick={() => changeToken(item)}
          className={cn(
            'w-full h-full flex items-center pl-2 pr-1 cursor-pointer rounded-[50px] gap-2',
            'text-grey-acc text-sm font-medium leading-6 text-left uppercase duration-500',
            isDrax === item.isDrax && 'bg-black-acc text-white'
          )}
        >
          {item.icon}
          <div className='flex items-center gap-1 pr-2'>
            {isMobile ? (
              isDrax === item.isDrax && (
                <animated.span className='text-xs sm:text-sm leading-4  w-max'>
                  {springProps.number.to(n => n.toFixed(0))}
                </animated.span>
              )
            ) : item.isDrax ? (
              <animated.span className='text-xs sm:text-[14px] leading-4 w-max'>
                {springCoin.number.to(n => n.toFixed(0))}
              </animated.span>
            ) : (
              <animated.span className='text-xs sm:text-[14px] leading-4 w-max'>
                {springBonus.number.to(n => n.toFixed(0))}
              </animated.span>
            )}
            <span className='text-xs sm:text-[12px] leading-4'>
              {item.token}
            </span>
          </div>
        </Button>
      ))}
    </div>
  )
}

export default BalanceSwitcher
