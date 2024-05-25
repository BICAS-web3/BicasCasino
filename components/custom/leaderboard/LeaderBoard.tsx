'use client'
import { FC, useEffect } from 'react'

import { useUnit } from 'effector-react'

import clsx from 'clsx'

import { T_LeaderBoardResponse, getLeaderboard } from '@/api'
import { SettingModel } from '@/states'
import { LeaderBoardItem } from './LeaderBoardItem'
import s from './styles.module.scss'
import { useTranslation } from 'react-i18next'

interface LeaderBoardProps {}

export const LeaderBoard: FC<LeaderBoardProps> = () => {
  const [setLeaders, leaders] = useUnit([
    SettingModel.setAvailableLeader,
    SettingModel.$AvailableLeaderbord
  ])

  const setDefaultValue = async () => {
    const data = (await getLeaderboard({ time: 'all', return: 'volume' }))
      .body as any

    // setLeaders(data.leaderboard)
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

  const { t } = useTranslation()

  return (
    <div className={s.leader_board_wrap}>
      <h2 className={s.leader_board_title}>{t('pages.leaderboard.title')}</h2>
      <div className={s.leader_board_list_titles}>
        <div className={s.leader_board_row_titles_block}>
          <span className={s.leader_board_list_titles_item}>
            {t('pages.leaderboard.Rank')}
          </span>
          <span className={s.leader_board_list_titles_item}>
            {t('pages.leaderboard.Player')}
          </span>
          <span
            className={clsx(
              s.leader_board_list_titles_item,
              s.leader_board_list_titles_item_address
            )}
          >
            {t('pages.leaderboard.Wons')}
          </span>
          <span className={s.leader_board_list_titles_item}>
            {t('pages.leaderboard.Volume')}
          </span>
        </div>
      </div>
      <div className={s.leader_board_list}>
        {Array.isArray(leaders) &&
          leaders &&
          leaders
            ?.slice(0, 3)
            ?.map((item: T_LeaderBoardResponse, i: number) => {
              return (
                <LeaderBoardItem
                  ind={i}
                  player={item.username}
                  nickname={item.username}
                  total={Number(item.total || 0)}
                  username={item.username}
                  user_id={item.user_id}
                />
              )
            })}
      </div>
    </div>
  )
}
