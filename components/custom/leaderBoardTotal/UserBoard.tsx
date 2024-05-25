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
    // setLeaders((data as any).leaderboard)
    setLeaders([
      {
        user_id: '1',
        username: 'Ader',
        total: 23435
      },
      {
        user_id: '1',
        username: 'Mark',
        total: 22455
      },
      {
        user_id: '1',
        username: '@ewrgf',
        total: 22234
      },
      {
        user_id: '1',
        username: 'boy666',
        total: 20435
      },
      {
        user_id: '1',
        username: 'cryptoman',
        total: 19334
      },
      {
        user_id: '1',
        username: 'Nika@34',
        total: 16343
      },
      {
        user_id: '1',
        username: 'fedggr',
        total: 15435
      },
      {
        user_id: '1',
        username: 'hunter',
        total: 12324
      },
      {
        user_id: '1',
        username: 'Naruto',
        total: 12213
      },
      {
        user_id: '1',
        username: 'reg34gf',
        total: 10324
      }
    ])
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
    if (period === 'All Time_profit' || period === 'All Time_volume') {
      setLeaders([
        {
          user_id: '1',
          username: 'Ader',
          total: 23435
        },
        {
          user_id: '1',
          username: 'Mark',
          total: 22455
        },
        {
          user_id: '1',
          username: '@ewrgf',
          total: 22234
        },
        {
          user_id: '1',
          username: 'boy666',
          total: 20435
        },
        {
          user_id: '1',
          username: 'cryptoman',
          total: 19334
        },
        {
          user_id: '1',
          username: 'Nika@34',
          total: 16343
        },
        {
          user_id: '1',
          username: 'fedggr',
          total: 15435
        },
        {
          user_id: '1',
          username: 'hunter',
          total: 12324
        },
        {
          user_id: '1',
          username: 'Naruto',
          total: 12213
        },
        {
          user_id: '1',
          username: 'reg34gf',
          total: 10324
        }
      ])
    } else {
      setLeaders((data as any).leaderboard)
    }
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
                  statistics={Number(item.total)}
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
