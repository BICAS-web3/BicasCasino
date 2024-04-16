'use client'

import bg from '@/public/images/rps/bg.png'
import { useEffect, useState } from 'react'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import TotalCoeff from '@/components/custom/totalCoeff'
import { useSocket } from '@/components/providers/socket.provider'
import RpsPicker from './Picker'
import { handleResult } from '@/lib/utils/game.result'
import { sendSocketData } from '@/lib/utils/game.send'
import Coefficient from '@/components/custom/coefficient'

import Image from 'next/image'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { changeEnemyValue } from '../(utils)'

export enum ModelType {
  Paper = 'Paper',
  Rock = 'Rock',
  Scissors = 'Scissors',
  Quest = 'Quest'
}
const PRSGame = () => {
  const socket = useSocket()
  const [value, setValue] = useState<ModelType>(ModelType.Paper)
  const [
    lost,
    profit,
    pickedValue,
    setActivePicker,
    pickSide,
    betsAmount,
    cryptoValue,
    stopGain,
    stopLoss,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    setCoefficient,
    setIsPlaying,
    result,
    setResult,
    isDrax,
    userInfo,
    gamesList
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$pickedValueRPS,
    GameModel.setActiveRPS,
    GameModel.pickValueRPS,
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    GameModel.setCoefficient,
    GameModel.setIsPlaying,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$gamesList
  ])

  const [socketReset] = useUnit([UserModel.$socketReset])

  useEffect(() => {
    useSubscibeBets({
      name: 'RPS',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  useEffect(() => {
    handleResult({
      title: 'rps',
      result,
      setInGame,
      setIsPlaying,
      setGameStatus,
      setWonStatus,
      setLostStatus,
      setCoefficientData
    })
    setResult(null)
  }, [result, result?.type])

  useEffect(() => {
    setCoefficient(1.98)
  }, [])

  useEffect(() => {
    if (pickedValue === GameModel.RPSValue.Paper) {
      setValue(ModelType.Paper)
    } else if (pickedValue === GameModel.RPSValue.Rock) {
      setValue(ModelType.Rock)
    } else {
      setValue(ModelType.Scissors)
    }
  }, [pickedValue])

  const [inGame, setInGame] = useState<boolean>(false)

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])

  const [isPlaying] = useUnit([GameModel.$isPlaying])
  const [coefficientData, setCoefficientData] = useState<number[]>([])

  useEffect(() => {
    setActivePicker(true)
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedValue)
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedValue)
    }
  }, [gameStatus])

  const [enemyValue, setEnemyValue] = useState(ModelType.Quest)

  useEffect(() => {
    changeEnemyValue({ gameStatus, pickedValue, setEnemyValue })
  }, [gameStatus])

  const [taken, setTaken] = useState(false)
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
    }
  }, [betsAmount, cryptoValue, isPlaying])

  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  const [access_token] = useUnit([RegistrModel.$access_token])

  const [betData, setBetData] = useState({})

  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'RPS')?.id || 5,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"action":${pickedValue}}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
  }, [stopGain, stopLoss, pickedValue, cryptoValue, isDrax, betsAmount])

  const [subscribed, setCubscribed] = useState(false)

  useEffect(() => {
    sendSocketData({
      socket,
      isPlaying,
      access_token,
      betData
    })
  }, [socket, isPlaying, access_token, gamesList])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'RPS' })
  }, [])

  return (
    <div className='h-full w-full relative pt-9'>
      <div className='w-full h-full absolute top-0 left-0 bottom-0 right-0 -z-[1]'>
        <Image
          src={bg}
          className='rounded-[0] sm:rounded-[20px_20px_0_0] w-full object-cover h-full'
          alt='table-bg'
        />
      </div>{' '}
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient common ballsArr={coefficientData} />
      <div className='w-full h-full flex justify-center items-end'>
        <div className='flex items-center flex-col gap-[98px]'>
          <div className='flex items-center justify-between gap-10 sm:gap-[50px] md:gap-5 xl:gap-[95px]'>
            {value === ModelType.Paper && (
              <Image
                width={248}
                height={248}
                src={'/images/rps/papper.png'}
                alt='img'
                className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] levitate'
              />
            )}
            {value === ModelType.Rock && (
              <Image
                width={248}
                height={248}
                src={'/images/rps/rock.png'}
                alt='img'
                className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] levitate'
              />
            )}
            {value === ModelType.Scissors && (
              <Image
                width={248}
                height={248}
                src={'/images/rps/scissor.png'}
                alt='img'
                className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] levitate'
              />
            )}
            <span className='uppercase text-[32px] sm:text-5xl md:text-[69px] xl:text-[95px] text-[#464646] font-semibold'>
              vs
            </span>
            {enemyValue === ModelType.Paper && (
              <Image
                width={248}
                height={248}
                className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] levitate_enemy'
                src={'/images/rps/papper.png'}
                alt='img'
              />
            )}
            {enemyValue === ModelType.Rock && (
              <Image
                width={248}
                height={248}
                className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] levitate_enemy'
                src={'/images/rps/rock.png'}
                alt='img'
              />
            )}
            {enemyValue === ModelType.Scissors && (
              <Image
                width={248}
                height={248}
                className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] levitate_enemy'
                src={'/images/rps/scissor.png'}
                alt='img'
              />
            )}
            {enemyValue === ModelType.Quest && (
              <Image
                width={248}
                height={248}
                className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] levitate_enemy'
                src={'/images/rps/rock.png'}
                alt='img'
              />
            )}
          </div>
          <div className='py-3'>
            <RpsPicker />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PRSGame
