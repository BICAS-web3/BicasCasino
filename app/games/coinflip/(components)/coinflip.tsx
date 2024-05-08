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
    pickedSide,
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
    access_token,
    initialValue
  ] = useUnit([
    GameModel.$pickedSide,
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
    RegistrModel.$access_token,
    GameModel.$initialValue
  ])

  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [inGame, setInGame] = useState(false)
  const [subscribed, setCubscribed] = useState(false)
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
      initialValue,
      setCoefficientData,
      setResult
    )
  }, [result?.timestamp, result, gameStatus])

  useEffect(() => {
    setCoefficient(1.98)
  }, [])

  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
    }
  }, [betsAmount, cryptoValue, isPlaying])

  useEffect(() => setInGame(isPlaying), [isPlaying])

  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'CoinFlip')?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"is_heads": ${initialValue === 1 ? true : false}}`,
      amount: `${cryptoValue || 0}`,
      difficulty: 0,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
  }, [stopGain, stopLoss, initialValue, cryptoValue, isDrax, betsAmount])

  useEffect(
    () => sendSocketData({ access_token, betData, isPlaying, socket }),
    [socket, isPlaying, access_token]
  )
  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'CoinFlip' })
  }, [])

  useEffect(() => setInGame(isPlaying), [isPlaying])

  const [start, setStart] = useState(3.5)

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
        <div
          className='w-full h-[370px] flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 gap-10 -translate-y-1/2 top-[calc(50%-30px)] sm:top-[calc(50%-32px)] '
          //top-20 sm:top-[119px] xl:top-[50px]
        >
          <div className='h-[210px] sm:h-[255px] xl:h-full w-full'>
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
                start={start}
                setStart={setStart}
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
