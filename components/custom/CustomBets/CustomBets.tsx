'use client'
import s from './styles.module.scss'
import { CustomBetsItem } from './CustomBetsItem'
import { FC, useEffect, useState } from 'react'
// import { LiveBetsModel } from '../LiveBets'
import { useUnit } from 'effector-react'
// import { settingsModel } from "@/entities/settings";
// import { T_BetInfo } from "@/shared/api";
// import { sessionModel } from "@/entities/session";
// import { useAccount } from "wagmi";
// import * as api from "@/shared/api/";
// import { TOKENS } from "@/shared/tokens";
// import * as GameModel from "@/widgets/GamePage/model";

enum Page {
  AllBets = 0,
  MyBets = 1
}

const testBets: any = [
  {
    trx_url: 'string',
    time: {
      date: 'string',
      time: 'string'
    },
    game_name: 'string',
    player_address: 'string',
    player_name: 'string',
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
  // const [Bets, setBets, newBet] = useUnit([
  //   LiveBetsModel.$Bets,
  //   LiveBetsModel.setBets,
  //   sessionModel.$newBet
  // ])
  // const [gamesList] = useUnit([GameModel.$gamesList])

  return (
    <div className='w-full flex-col items-center sm:rounded-md flex bg-black-def py-[45px]'>
      <div
        className={`flex justify-between items-center w-[calc(100%_-_60px)] px-[30px] ${
          props?.isMainPage && 'justify-center'
        }`}
      >
        <h2 className='flex items-center justify-center w-full text-text-w-def tracking-[0.96px] font-semibold text-[1.25rem]'>
          {(props?.isMainPage || props?.isGamePage) && (
            <div className='w-[9px] h-[9px] bg-bets-gr rounded-full mr-[10px] animate-pulse'></div>
          )}
          {props?.title}
        </h2>
        {props?.isGamePage && (
          <div className={s.customBets_switch_bets_btns}></div>
        )}
      </div>
      <div className='w-full mt-[35px]'>
        <div className='px-[10px] sm:px-[15px] grid xs:grid-cols-[25px_80px_85px_100px_35px] grid-cols-[25px_65px_1fr_30px_35px] gap-x-[5px] content-between mb-[7px] '>
          <span className='text-bets-title-color text-footer-text-xs'>
            Time
          </span>
          <span className='text-bets-title-color text-footer-text-xs '>
            Game
          </span>
          <span className='text-bets-title-color text-footer-text-xs'>
            Player
          </span>
          <span
            className='text-bets-title-color text-footer-text-xs hidden sm:block '
            data-id='address'
          >
            Number of games
          </span>
          <span
            className='text-bets-title-color text-footer-text-xs hidden sm:block'
            data-id='wager'
          >
            Wager
          </span>
          <span
            className='text-bets-title-color text-footer-text-xs hidden sm:block'
            data-id='multiplier'
          >
            Multiplier
          </span>
          <span
            className='text-bets-title-color text-footer-text-xs flex justify-end'
            data-id='profit'
          >
            Profit
          </span>
          <span
            className='text-bets-title-color text-footer-text-xs flex justify-end'
            data-id='explorer'
          >
            Explorer
          </span>
        </div>
        <div className='flex flex-col border-t-[1px] border-b-[1px] border-[#252525] '>
          {
            testBets &&
              testBets.map((bet, ind) => {
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
                      time: `${time.getHours()}:${(
                        '0' + time.getMinutes()
                      ).slice(-2)}`
                    }}
                    game_name='Dice'
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
              })
            //)
          }
        </div>
      </div>
    </div>
  )
}
