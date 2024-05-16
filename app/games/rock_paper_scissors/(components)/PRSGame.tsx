'use client'

import Coefficient from '@/components/custom/coefficient'
import { useSocket } from '@/components/providers/socket.provider'
import { sendSocketData } from '@/lib/utils/game.send'
import bg from '@/public/images/rps/bg_2.png'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import RpsPicker from './Picker'

import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import Image from 'next/image'
import useSound from 'use-sound'
import ReactHowler from 'react-howler'

export enum ModelType {
  Paper = 'Paper',
  Rock = 'Rock',
  Scissors = 'Scissors'
}
const PRSGame = () => {
  const socket = useSocket()
  const [
    pickedValue,
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
    gamesList,
    isPlaying,
    socketReset,
    access_token,
    startAnimation,
    setStartAnimation
  ] = useUnit([
    GameModel.$pickedValueRPS,
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
    GameModel.$gamesList,
    GameModel.$isPlaying,
    UserModel.$socketReset,
    RegistrModel.$access_token,
    GameModel.$startAnimation,
    GameModel.setStartAnimation
  ])

  const [playSounds] = useUnit([GameModel.$playSounds])
  const [rpsLose] = useSound('/music/rps_loss.mp3')
  const [rpsScroll] = useSound('/music/rps_scroll.mp3')
  const [rpsSwaapHand] = useSound('/music/rps_sweep_hand.mp3')
  const [rpsWin] = useSound('/music/rps_win.mp3')

  const [openGame, setOpenGame] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setOpenGame(true)
    }, 500)
  }, [])

  useEffect(() => {
    setIsPlaying(false)
  }, [])
  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [enemyValue, setEnemyValue] = useState(ModelType.Rock)
  const [betData, setBetData] = useState({})
  const [subscribed, setCubscribed] = useState(false)
  const [value, setValue] = useState<ModelType>(ModelType.Paper)
  const [startPlay, setStartPlay] = useState(false)

  useEffect(() => {
    if (isPlaying && openGame) {
      setStartAnimation(true)
      Promise.all([
        new Promise(resolve =>
          setTimeout(() => resolve(setStartPlay(true)), 1500)
        ),
        new Promise(resolve =>
          setTimeout(() => resolve(setStartAnimation(false)), 1400)
        )
      ])
    } else {
      setStartAnimation(false)
      Promise.all([
        new Promise(resolve =>
          setTimeout(() => resolve(setStartPlay(false)), 1500)
        )
      ])
    }
  }, [isPlaying])

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
    if (!result) return
    if (result.type === 'Bet') {
      const enemyValue = JSON.parse(result.outcomes)
      if (enemyValue[0] === 2) {
        setEnemyValue(ModelType.Scissors)
      } else if (enemyValue[0] === 1) {
        setEnemyValue(ModelType.Paper)
      } else if (enemyValue[0] === 0) {
        setEnemyValue(ModelType.Rock)
      }
      const fullAmount = Number(result.amount) * result.num_games!
      setCoefficientData(prev => [
        fullAmount === 0 ? 0 : Number(result.profit) / fullAmount,
        ...prev
      ])

      if (
        Number(result.profit) > Number(result.amount) ||
        Number(result.profit) === Number(result.amount)
      ) {
        setGameStatus?.(GameModel.GameStatus.Won)
        playSounds !== 'off' && rpsWin()
        const multiplier = Number(result.profit) / Number(result.amount)
        setWonStatus?.({
          profit: Number(result.profit),
          multiplier,
          token: 'DRAX'
        })
        setIsPlaying?.(false)
      } else {
        setGameStatus?.(GameModel.GameStatus.Lost)
        playSounds !== 'off' && rpsLose()
        setLostStatus?.(Number(result.profit) - Number(result.amount))
        setLostStatus?.(Number(result.profit) - fullAmount)
        setIsPlaying?.(false)
      }
    }
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

  useEffect(() => {
    sendSocketData({
      socket,
      isPlaying: startPlay,
      access_token,
      betData
    })
  }, [socket, startPlay, access_token, gamesList])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'RPS' })
  }, [])

  return (
    <div className='h-full w-full relative pt-9  flex-[1_1_auto] flex flex-col'>
      {startAnimation && (
        <ReactHowler
          src={'/music/rps_animation.mp3'}
          playing={playSounds !== 'off'}
          rate={1}
          loop
        />
      )}
      <div className='w-full h-full absolute top-0 left-0 bottom-0 right-0 -z-[1]'>
        <Image src={bg} className='w-full object-cover h-full' alt='table-bg' />
      </div>
      <Coefficient rps common ballsArr={coefficientData} />
      <div className='w-full h-full flex justify-center items-end  flex-[1_1_auto] flex-col'>
        <div className='w-full flex items-center flex-col justify-between flex-auto h-full'>
          <div className='flex items-center justify-between gap-10 sm:gap-[50px] md:gap-5 xl:gap-[95px] mt-auto mb-auto'>
            {!startAnimation && !isPlaying && value === ModelType.Paper && (
              <Image
                width={248}
                height={248}
                src={'/images/rps/papper.png'}
                alt='img'
                className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] ${
                  startAnimation ? 'left-hand' : 'levitate'
                }`}
              />
            )}
            {(startAnimation || isPlaying || value === ModelType.Rock) && (
              <Image
                width={248}
                height={248}
                src={'/images/rps/rock.png'}
                alt='img'
                className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] ${
                  startAnimation ? 'left-hand' : 'levitate'
                }`}
              />
            )}
            {!startAnimation && !isPlaying && value === ModelType.Scissors && (
              <Image
                width={248}
                height={248}
                src={'/images/rps/scissor.png'}
                alt='img'
                className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] ${
                  startAnimation ? 'left-hand' : 'levitate'
                }`}
              />
            )}
            <span className='uppercase text-[32px] sm:text-5xl md:text-[69px] xl:text-[95px] text-[#464646] font-semibold'>
              vs
            </span>
            {!startAnimation &&
              !isPlaying &&
              enemyValue === ModelType.Paper && (
                <Image
                  width={248}
                  height={248}
                  className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] ${
                    startAnimation ? 'right-hand' : 'levitate_enemy'
                  }`}
                  src={'/images/rps/papper.png'}
                  alt='img'
                />
              )}
            {(startAnimation || isPlaying || enemyValue === ModelType.Rock) && (
              <Image
                width={248}
                height={248}
                className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] ${
                  startAnimation ? 'right-hand' : 'levitate_enemy'
                }`}
                src={'/images/rps/rock.png'}
                alt='img'
              />
            )}
            {!startAnimation &&
              !isPlaying &&
              enemyValue === ModelType.Scissors && (
                <Image
                  width={248}
                  height={248}
                  className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[173px] md:h-[173px] 2xl:w-[248px] 2xl:h-[248px] ${
                    startAnimation ? 'right-hand' : 'levitate_enemy'
                  }`}
                  src={'/images/rps/scissor.png'}
                  alt='img'
                />
              )}
          </div>
          <RpsPicker className='my-3 px-4' />
        </div>
      </div>
    </div>
  )
}
export default PRSGame
