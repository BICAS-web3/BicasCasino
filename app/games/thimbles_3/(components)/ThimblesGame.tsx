'use client'
import { FC, createRef, useEffect, useRef, useState } from 'react'

import { GameModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'

import { WagerModel } from '@/states'

import Coefficient from '@/components/custom/coefficient'
import TotalCoeff from '@/components/custom/totalCoeff'
import { useSocket } from '@/components/providers/socket.provider'
import { RegistrModel } from '@/states'
import Thimble from './Thimble'
import { handleGameResult } from '../utils'
import Image from 'next/image'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { ThimblesGameProps } from '@/types/games.types'

export const ThimblesGame: FC<ThimblesGameProps> = () => {
  const socket = useSocket()
  const [
    lost,
    profit,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    gameStatus,
    betsAmount,
    cryptoValue,
    stopLoss,
    stopGain,
    pickedSide,
    setIsPlaying,
    isPlaying,
    result,
    setResult,
    isDrax,
    userInfo,
    multiplier,
    gamesList,
    socketReset,
    access_token
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    GameModel.$gameStatus,
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopLoss,
    WagerModel.$stopGain,
    GameModel.$pickedSide,
    GameModel.setIsPlaying,
    GameModel.$isPlaying,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$multiplier,
    GameModel.$gamesList,
    UserModel.$socketReset,
    RegistrModel.$access_token
  ])
  const [activeThimble, setActiveThimble] = useState<number | null>(null) //0,1,2
  const [thimbles, setThimbles] = useState([0, 0, 0])
  const [openGame, setOpenGame] = useState<number | null>(1)
  const [startGame, setStartGame] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [selected, setSelected] = useState<null | number>(null)
  const [subscribed, setCubscribed] = useState(false)
  const [selectedShow, setSelectedShow] = useState<number | null>(null)
  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [coefficientData, setCoefficientData] = useState<number[]>([])

  useEffect(() => {
    useSubscibeBets({
      name: 'Thimbles',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  useEffect(() => {
    if (isPlaying) {
      setSelected(null)
      setOpenGame(null)
    }
  }, [isPlaying])

  useEffect(() => {
    if (startGame) {
      setActiveThimble(null)
      setTimeout(() => setShowAnimation(true), 500)
    }
  }, [startGame])

  const animatedRefs = useRef([
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>()
  ])

  useEffect(() => {
    setStartGame(isPlaying)
  }, [isPlaying])

  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN &&
      selected !== null
    ) {
      if (!subscribed) {
        socket.send(
          JSON.stringify({
            type: 'SubscribeBets',
            payload: [gamesList.find(item => item.name === 'Thimbles')?.id]
          })
        )
        setCubscribed(true)
      }
      socket.send(
        JSON.stringify({
          type: 'MakeBet',
          game_id: gamesList.find(item => item.name === 'Thimbles')?.id,
          coin_id: isDrax ? 2 : 1,
          user_id: userInfo?.id || 0,
          data: `{"car":${selected}}`,
          amount: `${cryptoValue || 0}`,
          stop_loss: Number(stopLoss) || 0,
          stop_win: Number(stopGain) || 0,
          num_games: betsAmount
        })
      )
    }
  }, [
    socket,
    isPlaying,
    access_token,
    selected,
    stopGain,
    stopLoss,
    pickedSide,
    cryptoValue,
    betsAmount,
    isDrax
  ])

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Thimbles')?.id]
        })
      )
    }
  }, [])

  useEffect(() => {
    if (startGame) {
      setTimeout(() => {
        setStartGame(false)
        setShowAnimation(false)
      }, 4000)
    }
  }, [startGame])

  useEffect(() => {
    handleGameResult({
      result,
      setActiveThimble,
      setCoefficientData,
      setGameStatus,
      setWonStatus,
      setIsPlaying,
      setSelected,
      selected,
      setLostStatus,
      setResult
    })
  }, [result?.timestamp, result, gameStatus])

  useEffect(() => {
    if (selected !== null) {
      setSelectedShow(selected)
    } else
      [
        setTimeout(() => {
          setSelectedShow(null)
          setActiveThimble(null)
        }, 2000)
      ]
  }, [selected])
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  return (
    <section className='thimbles_table_wrap'>
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient common ballsArr={coefficientData} multipliers={multiplier} />
      <div className='absolute w-full h-full left-0 top-0'>
        <Image
          width={1438}
          height={680}
          src='/images/thimbles/thimblesBg.webp'
          className='w-full h-full object-cover rounded-[0] sm:rounded-[20px_20px_0_0] emd:rounded-[20px_0_0_0]'
          alt='thimbles-static-bg'
        />
      </div>
      <div className='sm:w-full w-[calc(100%_-_60px)] h-full z-[5] relative flex justify-center items-end p-[0_30px] sm:p-[0]'>
        <div className='gap-[20px] sm:gap-[35px] mb-[50px] sm:mb-[73px] relative flex'>
          {thimbles.map((_, ind) => (
            <Thimble
              activeThimble={activeThimble}
              animatedRefs={animatedRefs}
              ind={ind}
              isPlaying={isPlaying}
              openGame={openGame}
              selectedShow={selectedShow}
              setSelected={setSelected}
              showAnimation={showAnimation}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
