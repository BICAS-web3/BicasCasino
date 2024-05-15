'use client'
import { FC, useEffect, useState } from 'react'

import { useUnit } from 'effector-react'

import clsx from 'clsx'

// import * as Api from "@/api";

import s from './styles.module.scss'
import { LeaderBoardItem } from './LeaderBoardItem'
import { useMediaQuery } from 'usehooks-ts'
import { SettingModel } from '@/states'
import { T_LeaderBoardResponse, getLeaderboard } from '@/api'

interface LeaderBoardProps {}

export const LeaderBoard: FC<LeaderBoardProps> = () => {
  const [setLeaders, leaders] = useUnit([
    SettingModel.setAvailableLeader,
    SettingModel.$AvailableLeaderbord
  ])

  const [activeButton, setActiveButton] = useState<string | null>(
    'All Time_volume'
  )

  const setDefaultValue = async () => {
    const data = (await getLeaderboard({ time: 'all', return: 'volume' }))
      .body as any

    data && alert(JSON.stringify(data))
    setLeaders(data.leaderboard)
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

    // const data = (
    //   await getLeaderboard({
    //     time: toRequest.split('_')[0]?.toLowerCase(),
    //     return: toRequest.split('_')[1]?.toLowerCase()
    //   })
    // ).body as uany
  }

  return (
    <div className={s.leader_board_wrap}>
      <h2 className={s.leader_board_title}>Leader Board</h2>
      <div className={s.leader_board_list_titles}>
        <div className={s.leader_board_row_titles_block}>
          <span className={s.leader_board_list_titles_item}>Rank</span>
          <span className={s.leader_board_list_titles_item}>Player</span>
          <span
            className={clsx(
              s.leader_board_list_titles_item,
              s.leader_board_list_titles_item_address
            )}
          >
            Address
          </span>
          <span className={s.leader_board_list_titles_item}>Volume</span>
        </div>
      </div>
      <div className={s.leader_board_list}>
        {/* {list && list.length > 0 ? (
          list.map((item: Api.T_LeaderBoardResponse, ind: number) => (
            <LeaderBoardItem key={ind + item.total} {...item} ind={ind} />
          ))
        ) : (
          <span className={s.no_data}>No Data yet</span>
        )} */}

        {Array.isArray(leaders) &&
          leaders &&
          leaders
            ?.slice(0, 3)
            ?.map((item: T_LeaderBoardResponse, i: number) => {
              // let image
              // switch (i) {
              //   case 0:
              //     image = gold
              //     break
              //   case 1:
              //     image = silver
              //     break
              //   case 2:
              //     image = bronze
              //     break
              //   default:
              //     break
              // }
              return (
                <LeaderBoardItem
                  // description={item.nickname || truncatedAddress}
                  // dunkin='Dunkin Caps'
                  // image={image}
                  // dollar
                  // statistics={item.total.toFixed(2)}
                  // id={i}
                  // address={item.player}
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
      {/* {apiResponse?.length > 5 && (
        <div className={s.leaderBoard_loadMore_btn_block}>
          <button onClick={setListSize} className={s.leaderBoard_loadMore_btn}>
            Load {fullList ? "Less" : "More"}
          </button>
        </div>
      )} */}
      <div className={s.leaderBoard_loadMore_btn_block}>
        <button
          onClick={() => {
            // setListSize()
            null
          }}
          className={s.leaderBoard_loadMore_btn}
        >
          {/* Load {fullList ? 'Less' : 'More'} */}
          btn
        </button>
      </div>
    </div>
  )
}
