'use client'

import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

import helmet from '@/public/images/plinko_images/helmet.webp'
import statue from '@/public/images/plinko_images/statue.webp'

import { useMediaQuery } from 'usehooks-ts'

import { useSocket } from '@/components/providers/socket.provider'
import PlinkoPyramid from './plinko.pyramid'

import Coefficient from '@/components/custom/coefficient'
import {
  GameModel,
  RegistrModel,
  SessionModel,
  UserModel,
  WagerModel
} from '@/states'

const PlinkoGame = () => {
  const isMobile = useMediaQuery('(max-width: 1280px)')

  const [
    lost,
    profit,
    // setPlayingStatus,
    playSounds,
    wagered,
    setWagered,
    rowsAmount,
    pickedValue,
    gameAddress,
    pickedToken,
    currentBalance,
    cryptoValue,
    stopGain,
    stopLoss,
    allowance,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    pickedLevel,
    setWaitingResponse,
    setIsPlaying,
    refund,
    setRefund,
    isPlaying,
    result,
    setResult,
    isDrax,
    userInfo,
    gamesList
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    // PlinkoM.setPlayingStatus,
    GameModel.$playSounds,
    WagerModel.$Wagered,
    WagerModel.setWagered,
    GameModel.$pickedRows,
    WagerModel.$pickedValue,
    SessionModel.$gameAddress,
    WagerModel.$pickedToken,
    SessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    SessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    GameModel.$level,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.$refund,
    GameModel.setRefund,
    GameModel.$isPlaying,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$gamesList
  ])

  const [playLost, { stop: stopLost }] = useSound(
    'https://game.greekkeepers.io/static/media/games_assets/music/loseSound.mp3',
    { volume: 1, loop: false }
  )
  const [playWon, { stop: stopWon }] = useSound(
    'https://game.greekkeepers.io/static/media/games_assets/music/winSound.mp3',
    { volume: 1, loop: false }
  )
  useEffect(() => {
    if (result !== null && result?.type === 'Bet') {
      const fullAmount = Number(result.amount) * result.num_games!
      const bet_info = JSON.parse(result.bet_info)

      setPath(bet_info.paths)

      const rows_amount = bet_info.num_rows
      const ballAmount = bet_info.paths.length

      setTimeout(() => {
        setCoefficientData(prev => [
          fullAmount === 0 ? 0 : Number(result.profit) / fullAmount,
          ...prev
        ])
      }, rows_amount * 400 + ballAmount * 400)
      if (
        Number(result.profit) > fullAmount ||
        Number(result.profit) === fullAmount
      ) {
        setTimeout(() => {
          setGameStatus(GameModel.GameStatus.Won)
          const multiplier = Number(Number(result.profit) / fullAmount)
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: 'DRAX'
          })
          playWon()
          setIsPlaying(false)
          setInGame(false)
          setPath(undefined)
        }, rows_amount * 400 + ballAmount * 400 + (ballAmount > 20 ? 1000 : 500))
      } else if (Number(result.profit) < fullAmount) {
        setTimeout(() => {
          playLost()
          setIsPlaying(false)
          setInGame(false)
          setGameStatus(GameModel.GameStatus.Lost)
          setLostStatus(Number(result.profit) - fullAmount)
          setPath(undefined)
        }, rows_amount * 400 + ballAmount * 400 + (ballAmount > 20 ? 1000 : 500))
      } else {
        setGameStatus(GameModel.GameStatus.Draw)
        setIsPlaying(false)
        setInGame(false)
      }
      setResult(null)
    }
  }, [result?.timestamp, result, gameStatus])

  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [inGame, setInGame] = useState<boolean>(false)
  const [path, setPath] = useState<boolean[][] | undefined>(undefined)

  useEffect(() => {
    setInGame(inGame)
  }, [inGame])

  useEffect(() => {
    setPath(undefined)
  }, [rowsAmount])

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])

  // useEffect(() => {

  useEffect(() => {
    //setActivePicker(true);
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      //pickSide(pickedSide);
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      //pickSide(pickedSide ^ 1);
    }
  }, [gameStatus])
  const [multipliers, setMultipliers] = useState<number[]>([])

  const [ballsArr, setBallsArr] = useState<{ value: number; index: number }[]>(
    []
  )

  useEffect(() => {
    if (ballsArr.length - 1 === path?.length) {
      setTimeout(() => {
        setBallsArr([
          {
            value: -1,
            index: -1
          }
        ])
      }, 700)
    }
  }, [ballsArr, path])
  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])
  const [imageLoading_1, setImageLoading_1] = useState(true)
  const [imageLoading_2, setImageLoading_2] = useState(true)
  const [imageLoading_3, setImageLoading_3] = useState(true)

  useEffect(() => {
    if (isMobile) {
      if (!imageLoading_1) {
        setIsLoading?.(imageLoading_1)
      }
    } else {
      if (!imageLoading_1 && !imageLoading_2 && !imageLoading_3) {
        setIsLoading?.(imageLoading_1)
      }
    }
  }, [imageLoading_1, imageLoading_2, imageLoading_3])

  useEffect(() => {
    if (isPlaying) {
      setInGame(true)
    }
  }, [isPlaying])

  const [betData, setBetData] = useState({})

  const [access_token] = useUnit([RegistrModel.$access_token])
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'Plinko')?.id]
  }
  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'Plinko')?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"num_rows":${rowsAmount}, "risk":${
        pickedLevel == 'Easy' ? 0 : pickedLevel == 'Medium' ? 1 : 2
      }}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: stopLoss ? String(stopLoss) : 0,
      stop_win: stopGain ? String(stopGain) : 0,
      num_games: pickedValue
    })
  }, [
    stopGain,
    stopLoss,
    cryptoValue,
    isDrax,
    rowsAmount,
    pickedLevel,
    pickedValue
  ])

  const socket = useSocket()

  const [subscribed, setCubscribed] = useState(false)

  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      if (!subscribed) {
        socket.send(JSON.stringify(subscribe))
        setCubscribed(true)
      }

      socket.send(JSON.stringify(betData))
    }
  }, [socket, isPlaying, access_token])

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Plinko')?.id]
        })
      )
    }
  }, [])

  return (
    <div className='w-full h-full relative flex-[1_1_auto] flex flex-col justify-center'>
      <Coefficient ballsArr={coefficientData} common />{' '}
      <div className='w-full h-full absolute right-0 bottom-0 left-0 top-0 z-[-1]'>
        <Image
          onLoad={() => setImageLoading_1(false)}
          src={'/images/games_assets/plinko/bg.png'}
          className='w-full h-full object-cover rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]'
          alt='table-bg'
          width={1418}
          height={680}
          quality={100}
        />
        <Image
          onLoad={() => setImageLoading_2(false)}
          src={helmet}
          className='hidden xl:block -right-20 2xl:right-0 top-0 z-[1] absolute'
          alt='helmet'
          width={729}
          height={680}
          quality={100}
        />
        <Image
          onLoad={() => setImageLoading_3(false)}
          src={statue}
          className='hidden xl:block -left-20 2xl:left-0 top-0 z-[1] absolute'
          alt='statue'
          width={709}
          height={680}
          quality={100}
        />
      </div>
      <div className='flex items-end justify-center gap-[1.5vw] p-0 sm:p-5 w-full sm:w-[calc(100%-40px)] h-[calc(100%-40px)] relative'>
        <Coefficient ballsArr={ballsArr} multipliers={multipliers} />
        {path ? (
          <PlinkoPyramid
            inGame={inGame}
            multipliers={multipliers}
            setMultipliers={setMultipliers}
            path={path}
            ballsArr={ballsArr}
            setBallsArr={setBallsArr}
            middleC={multipliers.length}
          />
        ) : (
          <PlinkoPyramid
            inGame={false}
            multipliers={multipliers}
            setMultipliers={setMultipliers}
            path={undefined}
            ballsArr={ballsArr}
            setBallsArr={setBallsArr}
            middleC={multipliers.length}
          />
        )}
      </div>
    </div>
  )
}

export default PlinkoGame
