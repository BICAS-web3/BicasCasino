'use client'
import { FC, JSX, useEffect, useState } from 'react'
import locker from '@/public/total/locker.webp'
import star from '@/public/total/star.webp'
import trophy from '@/public/total/trophy.webp'
// import { SideBarModel } from "../SideBar";
import { useUnit } from 'effector-react'
import { TotalItem } from './TotalItem'
import * as Api from '@/api'

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

  return (
    <>
      <div
        className='flex flex-col gap-[10px] mb-[40px] box-border px-[16px]
        sm:flex-row sm:px-0
      '
      >
        <TotalItem
          description='total wagered'
          image={locker}
          dollar
          statistics={totals.total_wagered}
        />
        <TotalItem
          description='total bets'
          image={star}
          statistics={totals.total_bets}
        />
        <TotalItem
          description='total users'
          image={trophy}
          statistics={totals.total_users}
        />
      </div>
    </>
  )
}
