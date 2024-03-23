'use client'
import s from './styles.module.scss'

import draxTokenIco from '@/public/payment/draxCoin.webp'
import bonusTokenIco from '@/public/payment/bonusCoin.webp'

import diceIcon from '@/public/live_bets/diceIco.webp'
import coinFlipIcon from '@/public/live_bets/coinflipIco.webp'
import pokerIcon from '@/public/live_bets/pokerIco.webp'
import rpsIcon from '@/public/live_bets/rpsIco.webp'
import rpsMobIco from '@/public/live_bets/rpsMobIco.webp'
import bombIcon from '@/public/live_bets/bombIco.webp'
import plincoIcon from '@/public/live_bets/plinkoIco.webp'
import rocketIcon from '@/public/games_assets/rocket/rocket_icon.webp'
import slotsIcon from '@/public/games_assets/slots/slots_icon.webp'
import linkIco from '@/public/media/live_bets/linkIco.svg'
import appleIcon from '@/public/apples_icon/apple_icon.webp'
import wagerIco from '@/public/media/live_bets/wagerIco.svg'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
// import * as api from "@/shared/api";
import { BlockiesAva } from '../BlockiesAva/BlockiesAva'
// import { useAccount } from "wagmi";
import carIcon from '@/public/cars/icon.webp'
import wheelIcon from '@/public/wheel_icons/wheel_icon.webp'
import thimbleIcon from '@/public/thimbles/icon.webp'
import rouletteIcon from '@/public/roulette_icons/roulette.webp'
import clsx from 'clsx'
// import * as BetModel from '@/widgets/LiveBets/model'
import { useUnit } from 'effector-react'
// import * as RegistrModel from '@/widgets/Registration/model'
// import wheelIcon from '@/public/media/wheel_icons/wheel_icon.webp'

// import * as BalanceModel from '@/widgets/BalanceSwitcher/model'

import raceIson from '@/public/race_icons/bets_icon.webp'
// import { sessionModel } from '@/entities/session'
// import * as GameModel from '@/widgets/GamePage/model'
export interface CustomBetsItemProps {
  trx_url: string
  time: {
    date: string
    time: string
  }
  username: string
  bets: number
  multiplier: number
  profit: number
  id: number
  bet: any
  user_id: string | number
  game_id: number
  num_games?: number
  game_name: string
  amount: string
  coin_id: number
}

// {
// 	"0": {
// 		"id": 21,
// 		"timestamp": 1709469715,
// 		"amount": "2.0000",
// 		"profit": "0",
// 		"num_games": 1,
// 		"outcomes": "[28004]",
// 		"bet_info": "{\"roll_over\":true, \"multiplier\":\"2.0204\"}",
// 		"uuid": "cd4fb7d9-c0c3-4f4e-af15-aea40274fd59",
// 		"game_id": 2,
// 		"user_id": 1,
// 		"coin_id": 1,
// 		"userseed_id": 6,
// 		"serverseed_id": 6
// 	}
// }

interface IUserData {
  type: string
  id: number
  registration_time: 1709465625
  username: string
}

export const CustomBetsItem: FC<CustomBetsItemProps> = props => {
  // const [result, access_token, isDrax] = useUnit([
  //   BetModel.$result,
  //   RegistrModel.$access_token,
  //   BalanceModel.$isDrax
  // ])
  const [gameImg, setGameImg] = useState(pokerIcon)
  const [avaSize, setAvaSize] = useState('30')
  const [screenWidth, setScreenWidth] = useState(0)
  const [userData, setUserData] = useState<IUserData | null>(null)
  // const { address } = useAccount();

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (screenWidth < 650) {
      setAvaSize('20')
    } else {
      setAvaSize('30')
    }
  }, [screenWidth])

  useEffect(() => {
    if (props?.game_name === 'CoinFlip') {
      setGameImg(coinFlipIcon)
    } else if (props?.game_name === 'Dice') {
      setGameImg(diceIcon)
    } else if (props?.game_name === 'Mines') {
      setGameImg(bombIcon)
    } else if (props?.game_name === 'RPS') {
      setGameImg(rpsIcon)
    } else if (props?.game_name === 'Poker') {
      setGameImg(pokerIcon)
    } else if (props?.game_name === 'Plinko') {
      setGameImg(plincoIcon)
    } else if (props?.game_name === 'Slots') {
      setGameImg(slotsIcon)
    } else if (props?.game_name === 'Rocket') {
      setGameImg(rocketIcon)
    } else if (props?.game_name === 'Wheel') {
      setGameImg(wheelIcon)
    } else if (props?.game_name === 'Apples') {
      setGameImg(appleIcon)
    } else if (props?.game_name === 'Cars') {
      setGameImg(carIcon)
    } else if (props?.game_name === 'Thimbles') {
      setGameImg(thimbleIcon)
    } else if (props?.game_name === 'Race') {
      setGameImg(raceIson)
    } else if (props?.game_name === 'Roulette') {
      setGameImg(rouletteIcon)
    }
  })

  return (
    <div
      // className={clsx(s.customBets_list_item)}
      // data-bg={props?.id % 2 === 0 && 'true'}
      className='h-[50px] border-b-[1px] border-[#252525] px-[8.5px] gap-x-[5px] grid grid-cols-[25px_65px_1fr_30px_35px] sm:grid-cols-[40px_110px_1fr_40px_70px_40px]'
    >
      <div
        //  className={s.customBets_list_item_time_block}
        className='flex items-center '
      >
        <Link
          href={props?.trx_url}
          target='_blank'
          className={s.customBets_list_item_time_link_block}
        >
          <span className={s.customBets_list_item_date}>
            {props?.time.date}
          </span>
          <span className={s.customBets_list_item_time}>
            {/* {props?.time.time} */}
            15:05
          </span>
        </Link>
      </div>
      <div
        className='flex items-center'
        // className={s.customBets_list_item_game_block}
      >
        <Link
          href={`/games/${props?.game_name}`}
          target='_blank'
          className={s.customBets_list_item_game_link_block}
        >
          <img
            src={gameImg.src}
            className='w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] rounded-[6px] sm:rounded-[10px] mr-[5px] '
            alt='game-ico-preview'
          />
          <span
            className='text-[10px]'
            // className={s.customBets_list_item_game}
          >
            {props?.game_name}
          </span>
        </Link>
      </div>
      <div className='flex items-center '>
        <Link
          href={`/account/${props?.user_id}`}
          target='_blank'
          className='flex justify-center items-center no-underline'
        >
          <div className='mt-[6px]'>
            <BlockiesAva address={props?.username || 'retryu'} size={avaSize} />
          </div>
          <span className='ml-[10px] text-[10px] text-text-w-def tracking-[0.56px] font-medium'>
            {/* {props?.player_name} */}
            {/* {props?.username} */}
            gamer
          </span>
        </Link>
      </div>
      <div
        // className={s.customBets_list_item_address_block}
        className='hidden sm:block'
      >
        <span className={s.customBets_list_item_address}>
          {/* {`${props?.player_address?.slice(
          0,
          5
        )}...${props?.player_address?.slice(38, 42)}`} */}
          {props.num_games}
        </span>
      </div>
      <div className={s.customBets_list_item_transaction_block}>
        <Link href={props?.trx_url} target='_blank'>
          {/* <img src={linkIco.src} width={22} height={22} alt='' /> */}
        </Link>
      </div>
      <div
        className='hidden sm:block'
        // className={s.customBets_list_item_wager_block}
      >
        <img
          src={props.bet.coin_id === 1 ? bonusTokenIco.src : draxTokenIco.src}
          alt='wager-ico'
          className={s.icon}
        />
        <span className={s.customBets_list_item_wager}>x{props?.amount}</span>
      </div>
      <div
        className='hidden sm:block'
        // className={s.customBets_list_item_multiplier_block}
      >
        <span className={s.customBets_list_item_multiplier}>
          {props?.multiplier}x
        </span>
      </div>
      <div
        className='flex items-center justify-end  '
        // className={s.customBets_list_item_profit_block}
      >
        <span
          className={`text-[10px] font-bold tracking-[0.56px] ${
            props?.multiplier < 1 && 'text-[#f57731]'
          } text-bets-gr `}
          // className={`${s.customBets_list_item_profit} ${
          //   props?.multiplier < 1 && s.lose_profit
          // }`}
        >
          {props?.profit}
        </span>
        <img
          src={props.coin_id === 1 ? bonusTokenIco.src : draxTokenIco.src}
          alt='wager-ico'
          className='w-[20px] h-[20px] ml-[5px]'
          // className={s.icon}
        />
      </div>
    </div>
  )
}
