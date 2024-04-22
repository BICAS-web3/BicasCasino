'use client'

import Coefficient from '@/components/custom/coefficient'
import { useSocket } from '@/components/providers/socket.provider'
import { sendSocketData } from '@/lib/utils/game.send'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { CoinAction } from '@/types/games.types'
import { Environment, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import Model from '../(models)/coin'
import { processBetResult } from '../(utils)'
import Selector from './selector'

const CoinFlipGame = () => {
  const socket = useSocket()

  const [
    lost,
    profit,
    pickedSide,
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
    gamesList,
    socketReset,
    isPlaying,
    access_token
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$pickedSide,
    GameModel.setActive,
    GameModel.pickSide,
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
    UserModel.$socketReset,
    GameModel.$isPlaying,
    RegistrModel.$access_token
  ])

  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [inGame, setInGame] = useState(false)
  const [subscribed, setCubscribed] = useState(false)
  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)
  const [taken, setTaken] = useState(false)
  const [betData, setBetData] = useState({})

  useEffect(() => {
    useSubscibeBets({
      name: 'CoinFlip',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  useEffect(() => {
    processBetResult(
      result,
      setGameStatus,
      pickSide,
      setIsPlaying,
      setInGame,
      setLostStatus,
      setWonStatus,
      pickedSide,
      setCoefficientData,
      setResult
    )
  }, [result?.timestamp, result, gameStatus])

  useEffect(() => {
    setCoefficient(1.98)
  }, [])

  useEffect(() => {
    setActivePicker(true)
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide)
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1)
    }
  }, [gameStatus])

  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
    }
  }, [betsAmount, cryptoValue, isPlaying])

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  useEffect(() => setInGame(isPlaying), [isPlaying])

  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'CoinFlip')?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"is_heads": ${pickedSide === 1 ? true : false}}`,
      amount: `${cryptoValue || 0}`,
      difficulty: 0,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
  }, [stopGain, stopLoss, pickedSide, cryptoValue, isDrax, betsAmount])

  useEffect(
    () => sendSocketData({ access_token, betData, isPlaying, socket }),
    [socket, isPlaying, access_token]
  )
  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'CoinFlip' })
  }, [])

  useEffect(() => setInGame(isPlaying), [isPlaying])
  return (
    <div
      className='relative w-full h-full px-4 flex-[1_1_auto] flex flex-col'
      style={{
        background: `url('/images/coinflip_images/bg.png') center center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <Coefficient ballsArr={coefficientData} common />
      <div className='relative w-full h-full flex flex-col overflow-hidden  flex-[1_1_auto]'>
        <div className='w-full h-[370px] flex flex-col items-center absolute top-[100px] sm:top-[219px] xl:top-[50px] left-1/2 -translate-x-1/2 gap-10'>
          <div className='h-[114px] sm:h-[154px] xl:h-full w-full'>
            <Canvas
              camera={{
                position: [-9, 0, 0],
                fov: 20
              }}
              style={{ pointerEvents: 'none' }}
            >
              <Stage adjustCamera={false} environment='dawn'>
                <Environment path='/kira/' files='kiara_1_dawn_1k.hdr' />
              </Stage>
              <ambientLight intensity={1} />
              <Model
                action={
                  inGame
                    ? CoinAction.Rotation
                    : pickedSide == GameModel.Side.Heads
                    ? CoinAction.TailsHeads
                    : CoinAction.TailsHeads
                }
                initial={pickedSide}
              />
            </Canvas>
          </div>
        </div>
        <Selector className='mx-auto mt-auto mb-3 ms:mb-4 sm:mb-[22px]' />
      </div>
    </div>
  )
}

export default CoinFlipGame
