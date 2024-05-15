'use client'
import { FC, JSX, useEffect, useState } from 'react'
import locker from '@/public/total/locker.webp'
import star from '@/public/total/star.webp'
import trophy from '@/public/total/trophy.webp'
// import { SideBarModel } from "../SideBar";
import { useUnit } from 'effector-react'
import { TotalItem } from './TotalItem'
import * as Api from '@/api'
import { useTranslation } from 'react-i18next'

const triplex = (n: string): string =>
  n.replace(/(?!^)(\d{3})(?=(\d{3})*$)/g, ' $1')

export interface TotalProps1 {}
export const Total: FC<TotalProps1> = props => {
  const [totals, setTotals] = useState({
    total_wagered: '-',
    total_users: '-',
    total_bets: '-'
  })

  useEffect(() => {
    ;(async () => {
      const data = await Api.GetTotalsFx()
      if (data.status === 'OK') {
        setTotals({
          total_wagered: ((data.body as any).sum
            ? Number((data.body as any).sum)
            : 0
          ).toFixed(2),
          total_users: (data.body as any).player_amount.toString(),
          total_bets: (data.body as any).bets_amount.toString()
        })
      }

      const interval = setInterval(() => {
        Api.GetTotalsFx().then(response => {
          const totals = response.body as Api.T_Totals

          setTotals({
            total_wagered: (totals?.sum ? Number(totals?.sum) : 0).toFixed(2),
            total_users: totals.player_amount.toString(),
            total_bets: totals.bets_amount.toString()
          })
        })
      }, 20000)
    })()

    // return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const { t } = useTranslation()

  return (
    <>
      <div
        className='flex flex-col gap-[10px] sm:mt-[30px] mb-[16px] sm:mb-[40px] box-border px-[16px] sm:px-0
        sm:flex-row

      '
      >
        <TotalItem
          description={t('pages.main.totals.wager')}
          image={locker}
          dollar
          statistics={totals.total_wagered}
        />
        <TotalItem
          description={t('pages.main.totals.bets')}
          image={star}
          statistics={totals.total_bets}
        />
        <TotalItem
          description={t('pages.main.totals.users')}
          image={trophy}
          statistics={totals.total_users}
        />
      </div>
    </>
  )
}
