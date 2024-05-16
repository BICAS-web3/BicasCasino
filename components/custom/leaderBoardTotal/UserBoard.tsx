'use client'
import { FC, useEffect, useState } from 'react'

import { useUnit } from 'effector-react'

import clsx from 'clsx'

import gold from '@/public/images/user_board/gold.webp'
import silver from '@/public/images/user_board/silver.webp'
import bronze from '@/public/images/user_board/bronze.webp'

import * as Api from '@/api'

import s from './style.module.scss'
import { TotalItem } from './TotalItem'
import { SettingModel } from '@/states'
import { useTranslation } from 'react-i18next'

const UserBoard: FC<{}> = () => {
  const [setLeaders, leaders] = useUnit([
    SettingModel.setAvailableLeader,
    SettingModel.$AvailableLeaderbord
  ])

  const [activeButton, setActiveButton] = useState<string | null>(
    'All Time_volume'
  )

  const setDefaultValue = async () => {
    const data = (await Api.getLeaderboard({ time: 'all', return: 'volume' }))
      .body as unknown as Api.T_Lider
    setLeaders((data as any).leaderboard)
  }

  useEffect(() => {
    setDefaultValue()
  }, [])

  const handleButtonClick = async (period: string) => {
    setActiveButton(period)

    const toRequest =
      period === 'All Time_profit' || 'All Time_volume'
        ? period.toLowerCase().split(' ')[0] + '_' + period.split('_')[1]
        : period

    const data = (
      await Api.getLeaderboard({
        time: toRequest.split('_')[0]?.toLowerCase(),
        return: toRequest.split('_')[1]?.toLowerCase()
      })
    ).body as unknown as Api.T_Lider
    setLeaders((data as any).leaderboard)
  }

  const { t } = useTranslation()
  return (
    <div className='flex flex-col gap-10'>
      <div className={s.total_container}>
        {Array.isArray(leaders) &&
          leaders &&
          leaders
            ?.slice(0, 3)
            ?.map((item: Api.T_LeaderBoardResponse, i: number) => {
              let image
              switch (i) {
                case 0:
                  image = gold
                  break
                case 1:
                  image = silver
                  break
                case 2:
                  image = bronze
                  break
                default:
                  break
              }

              return (
                <TotalItem
                  description={item.username}
                  dunkin='Dunkin Caps'
                  image={image}
                  dollar
                  statistics={Number(item.total).toFixed(2)}
                  id={i}
                  address={item.username}
                />
              )
            })}
      </div>
      <div className={s.period}>
        <div className={s.period_column}>
          <div className={s.period_title}>{t('pages.leaderboard.Volume')}</div>
          <ul className={s.period_list}>
            {Api.TypeLeadboardApi.slice(0, 4).map((btn, i) => (
              <li key={i} className={s.period_item}>
                <button
                  type='button'
                  className={clsx(
                    s.period_button,
                    activeButton === btn && s.period_button_active
                  )}
                  onClick={() => handleButtonClick(btn)}
                >
                  {t(`pages.leaderboard.${btn.split('_')[0]}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.period_column}>
          <div className={s.period_title}>
            {t('pages.leaderboard.Cross Profit')}
          </div>
          <ul className={s.period_list}>
            {Api.TypeLeadboardApi.slice(4).map((btn, i) => (
              <li key={i} className={s.period_item}>
                <button
                  type='button'
                  className={clsx(
                    s.period_button,
                    activeButton === btn && s.period_button_active
                  )}
                  onClick={() => handleButtonClick(btn)}
                >
                  {t(`pages.leaderboard.${btn.split('_')[0]}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserBoard
