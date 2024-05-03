'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { BonusCoinSVG, DraxMiniSVG } from './icons'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from 'usehooks-ts'
import { GameModel, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'

import * as api from '@/api'

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
  const isMobile = useMediaQuery('(max-width: 730px)')

  const [
    isDrax,
    setDrax,
    access_token,
    userInfo,
    result,
    setBalanceValue,
    balanceValue
  ] = useUnit([
    UserModel.$isDrax,
    UserModel.setIsDrax,
    RegistrModel.$access_token,
    UserModel.$userInfo,
    GameModel.$result,
    UserModel.setBalance,
    UserModel.$balance
  ])

  const [balance, setBalance] = useState<null | IAmount>(null)

  useEffect(() => {
    if (access_token && userInfo) {
      ;(async () => {
        const data = await api.getUserAmounts({
          bareer: access_token,
          userId: userInfo?.id
        })
        if (data.status === 'OK') {
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

  return (
    <div
      className={cn(
        'h-[40px] flex items-center p-1 sm:p-[5px] gap-0 sm:gap-2.5',
        'bg-[#121212] border border-[#212121] rounded-[50px]'
      )}
    >
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
                <span className='text-xs sm:text-sm leading-4  w-max'>
                  {balance !== null ? balanceValue : zero.toFixed(3)}
                </span>
              )
            ) : (
              <span className='text-xs sm:text-[14px] leading-4 w-max'>
                {item.isDrax
                  ? balance !== null
                    ? Number(
                        balance.amounts.find(item => item.name === 'Drax')
                          ?.amount
                      ).toFixed(2)
                    : zero.toFixed(3)
                  : balance !== null
                  ? Number(
                      balance.amounts.find(item => item.name === 'DraxBonus')
                        ?.amount
                    ).toFixed(2)
                  : zero.toFixed(3)}
              </span>
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
