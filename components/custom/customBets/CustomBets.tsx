'use client'
import { CustomBetsItem } from './CustomBetsItem'
import { FC, useEffect, useState } from 'react'
// import { LiveBetsModel } from '../LiveBets'
import { useUnit } from 'effector-react'
import { GameModel, SessionModel, UserModel } from '@/states'
// import { settingsModel } from "@/entities/settings";
// import { T_BetInfo } from "@/shared/api";
// import { sessionModel } from "@/entities/session";
// import { useAccount } from "wagmi";
// import * as api from "@/shared/api/";
// import { TOKENS } from "@/shared/tokens";
// import * as GameModel from "@/widgets/GamePage/model";

import * as api from '@/api'
import { useTranslation } from 'react-i18next'

enum Page {
  AllBets = 0,
  MyBets = 1
}

const testBets: any = [
  {
    trx_url: 'string',
    time: {
      date: 'string',
      time: '15:05'
    },
    game_name: 'string',
    player_address: 'string',
    player_name: 'GAMER',
    wager: 2,
    bets: 3,
    multiplier: 2,
    profit: 2,
    token: '2',
    id: 2
  },
  {
    trx_url: 'string',
    time: {
      date: 'string',
      time: '15:05'
    },
    game_name: 'string',
    player_address: 'string',
    player_name: 'GAMER',
    wager: 2,
    bets: 3,
    multiplier: 2,
    profit: 2,
    token: '2',
    id: 2
  },
  {
    trx_url: 'string',
    time: {
      date: 'string',
      time: '15:05'
    },
    game_name: 'string',
    player_address: 'string',
    player_name: 'GAMER',
    wager: 2,
    bets: 3,
    multiplier: 2,
    profit: 2,
    token: '2',
    id: 2
  },
  {
    trx_url: 'string',
    time: {
      date: 'string',
      time: '15:05'
    },
    game_name: 'string',
    player_address: 'string',
    player_name: 'GAMER',
    wager: 2,
    bets: 3,
    multiplier: 2,
    profit: 2,
    token: '2',
    id: 2
  },
  {
    trx_url: 'string',
    time: {
      date: 'string',
      time: '15:05'
    },
    game_name: 'string',
    player_address: 'string',
    player_name: 'GAMER',
    wager: 2,
    bets: 3,
    multiplier: 2,
    profit: 2,
    token: '2',
    id: 2
  }
]

export interface CustomBetsProps {
  title: string
  isMainPage: boolean
  isGamePage: boolean
  game: string | undefined
}
export const CustomBets: FC<CustomBetsProps> = props => {
  const [Bets, setBets, newBet, userInfo] = useUnit([
    GameModel.$Bets,
    GameModel.setBets,
    SessionModel.$newBet,
    UserModel.$userInfo
  ])

  const data = {
    id: 7183,
    timestamp: 1715454813,
    amount: '5.0000',
    profit: '9.9000',
    num_games: 1,
    outcomes: '[0]',
    profits: '[9.90]',
    bet_info: '{"action":1}',
    state: null,
    uuid: '1a6bd12a-c549-42e3-b3f6-2ebc7dbe14a4',
    game_id: 5,
    user_id: 57,
    username: 'yurii19931993@icloud.com',
    coin_id: 1,
    userseed_id: 6111,
    serverseed_id: 178
  }
  const [betsToDisplay, setBetsToDisplay] = useState<api.T_BetInfo[]>([])
  const [userBets, setUserBets] = useState(null)

  useEffect(() => {
    if (userInfo?.id) {
      ;(async () => {
        const data = await api.getUserBets({ address: userInfo.id })
        // data && alert(JSON.stringify(data))
        if (data.status === 'OK') {
          setUserBets((data as any).body.bets)
        }
      })()
    }
  }, [userInfo])

  const [gamesList, setShowAllBets, showAllBets] = useUnit([
    GameModel.$gamesList,
    UserModel.setShowAllBets,
    UserModel.$showAllBets
  ])
  useEffect(() => {
    ;(async () => {
      const new_bets = (await api.getAllLastBets()).body as api.T_Bets

      new_bets && console.log(JSON.stringify(new_bets))
      setBets(new_bets.bets)
    })()
  }, [newBet])

  const { t } = useTranslation()

  return (
    <div className='w-full flex-col items-center sm:rounded-[12px] flex bg-black-def py-[45px]'>
      <div
        className={`flex justify-between items-center w-full px-[10px] sm:px-[40px]`}
      >
        <h2 className='flex items-center text-text-w-def tracking-[0.96px] font-semibold text-[16px] sm:text-[1.25rem]'>
          {(props?.isMainPage || props?.isGamePage) && (
            <div className='w-[9px] h-[9px] bg-bets-gr rounded-full mr-[10px] animate-pulse'></div>
          )}
          {t('pages.main.live_bets.title')}
        </h2>
        <div className='flex items-center gap-[12px] w-[180px] sm:w-[240px]'>
          <button
            onClick={() => setShowAllBets(true)}
            className={`duration-500 h-[40px] w-full flex items-center justify-center cursor-pointer rounded-[12px] uppercase text-[#181818] text-[12px] sm:text-[14px] font-bold ${
              showAllBets
                ? 'bg-[#FFE09D] text-[#181818]'
                : 'bg-[#202020] text-[#7E7E7E]'
            }`}
          >
            {t('pages.main.live_bets.all')}
          </button>
          <button
            onClick={() => setShowAllBets(false)}
            className={`duration-500 h-[40px] w-full flex items-center uppercase justify-center cursor-pointer rounded-[12px] text-[12px] sm:text-[14px] font-bold ${
              !showAllBets
                ? 'bg-[#FFE09D] text-[#181818]'
                : 'bg-[#202020] text-[#7E7E7E]'
            }`}
          >
            {t('pages.main.live_bets.my')}
          </button>
        </div>
      </div>
      <div className='w-full mt-[35px]'>
        <div
          className='px-[10px] 
        sm:px-[40px] grid xs:grid-cols-[25px_80px_85px_100px] 
        grid-cols-[25px_65px_1fr_70px] sm:sm:grid-cols-[40px_110px_1fr_40px_70px] 
        md:grid-cols-[40px_110px_1fr_60px_1fr_60px] 
        mmd:grid-cols-[160px_110px_1fr_100px_1fr_1fr_60px] 
        gap-x-[5px] content-between mb-[7px] '
        >
          <span className='text-bets-title-color text-footer-text-xs sm:text-[14px]'>
            {t('pages.main.live_bets.titles.Time')}
          </span>
          <span className='text-bets-title-color pr-[15px] sm:pr-0 text-center mmd:text-start text-footer-text-xs sm:text-[14px]'>
            {t('pages.main.live_bets.titles.Game')}
          </span>
          <span className='text-bets-title-color emd:pr-[50px] emd:text-center text-footer-text-xs sm:text-[14px]'>
            {t('pages.main.live_bets.titles.Player')}
          </span>
          <span className='text-bets-title-color min-w-max text-footer-text-xs hidden mmd:block sm:text-[14px]'>
            {t('pages.main.live_bets.titles.Number of games')}
          </span>
          <span
            className='text-bets-title-color mmd:pr-[25px] mmd:text-center text-footer-text-xs hidden sm:block sm:text-[14px]'
            data-id='wager'
          >
            {t('pages.main.live_bets.titles.Wager')}
          </span>
          <span
            className='text-bets-title-color md:pl-[15px] md:text-center text-footer-text-xs hidden md:block sm:text-[14px]'
            data-id='multiplier'
          >
            {t('pages.main.live_bets.titles.Multiplier')}
          </span>
          <span
            className='text-bets-title-color text-footer-text-xs flex justify-end sm:text-[14px]'
            data-id='profit'
          >
            {t('pages.main.live_bets.titles.Profit')}
          </span>
        </div>
        <div className='flex flex-col border-t-[1px] border-b-[1px] border-[#252525] '>
          {Bets &&
            (showAllBets
              ? Bets
              : userBets
              ? userBets
              : Bets.filter(item => item.user_id === userInfo?.id)
            ).map((bet, ind) => {
              const time = new Date(bet?.timestamp * 1000)
              const multiplier = Number(
                parseFloat(
                  (
                    Number(bet?.profit) /
                    (Number(bet?.amount) * bet?.num_games)
                  ).toFixed(2)
                )
              )
              return (
                <CustomBetsItem
                  game_id={(bet as any).game_id}
                  user_id={(bet as any)?.user_id}
                  bet={bet}
                  trx_url=''
                  key={ind}
                  time={{
                    date: `${time.getDate()}.${
                      time.getMonth() + 1
                    }.${time.getFullYear()}`,
                    time: `${time.getHours()}:${('0' + time.getMinutes()).slice(
                      -2
                    )}`
                  }}
                  game_name={
                    gamesList.find(item => item.id === bet.game_id)?.name || ''
                  }
                  bets={bet?.num_games}
                  multiplier={multiplier}
                  profit={Number(Number(bet?.profit).toFixed(2))}
                  id={ind}
                  num_games={(bet as any)?.num_games}
                  username={bet?.username}
                  amount={Number(bet.amount).toString()}
                  coin_id={bet.coin_id}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
