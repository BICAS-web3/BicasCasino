'use client'

import { Environment, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { useSocket } from '@/components/providers/socket.provider'
import Model from '../(models)/coin'
import Coefficient from '@/components/custom/coefficient'
import TotalCoeff from '@/components/custom/totalCoeff'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { CoinAction } from '@/types/games.types'
import { processBetResult } from '../(utils)'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { sendSocketData } from '@/lib/utils/game.send'

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
  const [modelLoading, setModelLoading] = useState(true)
  const [imageLoading, setIMageLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
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

  // useEffect(() => {
  //   if (!modelLoading && !imageLoading) {
  //     setIsLoading?.(modelLoading)
  //   }
  // }, [modelLoading, imageLoading])

  useEffect(() => setInGame(isPlaying), [isPlaying])

  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'CoinFlip')?.id]
  }

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
      className='relative w-full h-[328px] sm:h-[594px] xl:h-[680px] min-h-[328px] sm:min-h-[594px] xl:min-h-[680px]'
      style={{
        background: `url('/images/coinflip_images/coinflipTableBg.webp') center center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient ballsArr={coefficientData} common />
      <div className='relative w-full h-full'>
        <div className='w-full h-[370px] flex flex-col items-center absolute bottom-[226px] left-1/2 -translate-x-1/2 gap-10'>
          <div className='h-full sm:h-[154px] xl:h-full w-full'>
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
      </div>
    </div>
  )
}

export default CoinFlipGame
