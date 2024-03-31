'use client'

import { Suspense, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { Environment, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'

import { useSocket } from '@/components/providers/socket.provider'
import Preload from '@/components/ui/preload'
import TotalCoeff from '@/components/ui/total.coeff'

import Model from './models/coin'

import { GameModel, RegistrModel, SessionModel, WagerModel } from '@/states'

enum CoinAction {
  Rotation = 'Rotation',
  HeadsHeads = 'HeadsHeads',
  HeadsTails = 'HeadsTails',
  TailsHeads = 'TailsHeads',
  TailsTails = 'TailsTails',
  Stop = ''
}

const CoinFlipGame = () => {
  const [modelLoading, setModelLoading] = useState(true)
  const [imageLoading, setIMageLoading] = useState(true)

  const [isLoading, setIsLoading] = useState(true)
  const [
    lost,
    profit,
    playSounds,
    pickedSide,
    setActivePicker,
    pickSide,
    wagered,
    setWagered,
    betsAmount,
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
    setCoefficient,
    waitingResponse,
    setWaitingResponse,
    setIsPlaying,
    setBetValue,
    betValue,
    refund,
    setRefund,
    // result,
    // setResult,
    // isDrax,
    // userInfo,
    gamesList
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$playSounds,
    GameModel.$pickedSide,
    GameModel.setActive,
    GameModel.pickSide,
    WagerModel.$Wagered,
    WagerModel.setWagered,
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
    GameModel.setCoefficient,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.setBetValue,
    GameModel.$betValue,
    GameModel.$refund,
    GameModel.setRefund,
    // BetsModel.$result,
    // BetsModel.setResult,
    // BalanceModel.$isDrax,
    // LayoutModel.$userInfo,
    GameModel.$gamesList
  ])
  // useEffect(() => {
  //   if (result !== null && result?.type === 'Bet') {
  //     const fullAmount = Number(result.amount) * result.num_games!
  //     setCoefficientData(prev => [Number(result.profit) / fullAmount, ...prev])
  //     if (
  //       Number(result.profit) > fullAmount ||
  //       Number(result.profit) === fullAmount
  //     ) {
  //       setGameStatus(GameModel.GameStatus.Won)

  //       const multiplier = Number(Number(result.profit) / fullAmount)
  //       pickSide(pickedSide)
  //       setWonStatus({
  //         profit: Number(result.profit),
  //         multiplier,
  //         token: 'DRAX'
  //       })
  //       setIsPlaying(false)
  //       setInGame(false)
  //       // alert("win");
  //     } else if (Number(result.profit) < fullAmount) {
  //       setGameStatus(GameModel.GameStatus.Lost)
  //       pickSide(pickedSide ^ 1)
  //       setIsPlaying(false)
  //       setInGame(false)
  //       setLostStatus(Number(result.profit) - fullAmount)
  //       // alert("lost");
  //     } else {
  //       setGameStatus(GameModel.GameStatus.Draw)
  //       setIsPlaying(false)
  //       setInGame(false)
  //       // alert("draw");
  //     }
  //     setResult(null)
  //   }
  // }, [result?.timestamp, result, gameStatus])
  const [isPlaying] = useUnit([GameModel.$isPlaying])

  const [coefficientData, setCoefficientData] = useState<number[]>([])

  useEffect(() => {
    setCoefficient(1.98)
  }, [])

  const [inGame, setInGame] = useState<boolean>(false)

  useEffect(() => {
    setActivePicker(true)
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide)
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1)
    }
  }, [gameStatus])

  const [taken, setTaken] = useState(false)
  const [localAmount, setLocalAmount] = useState<any>(0)
  const [localCryptoValue, setLocalCryptoValue] = useState(0)
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
      setLocalAmount(betsAmount)
      setLocalCryptoValue(cryptoValue)
    }
  }, [betsAmount, cryptoValue, isPlaying])

  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)
  const [gameResult, setGameResult] = useState<
    { value: number; status: 'won' | 'lost' }[]
  >([])
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
      setGameResult(prev => [
        ...prev,
        { value: localCryptoValue * localAmount, status: 'won' }
      ])
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
      setGameResult(prev => [...prev, { value: 0.0, status: 'lost' }])
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  useEffect(() => {
    if (!modelLoading && !imageLoading) {
      setIsLoading?.(modelLoading)
    }
  }, [modelLoading, imageLoading])

  useEffect(() => setInGame(isPlaying), [isPlaying])
  const [access_token] = useUnit([RegistrModel.$access_token])

  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'CoinFlip')?.id]
  }

  const [betData, setBetData] = useState({})

  // useEffect(() => {
  //   setBetData({
  //     type: 'MakeBet',
  //     game_id: gamesList.find(item => item.name === 'CoinFlip')?.id,
  //     coin_id: isDrax ? 2 : 1,
  //     user_id: userInfo?.id || 0,
  //     data: `{"is_heads": ${pickedSide === 1 ? true : false}}`,
  //     amount: `${cryptoValue || 0}`,
  //     difficulty: 0,
  //     stop_loss: Number(stopLoss) || 0,
  //     stop_win: Number(stopGain) || 0,
  //     num_games: betsAmount
  //   })
  // }, [stopGain, stopLoss, pickedSide, cryptoValue, isDrax, betsAmount])
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
      socket?.send(JSON.stringify({ type: 'UnsubscribeBets', payload: [1] }))
    }
  }, [])

  return (
    <>
      <div className='relative w-full h-full min-h-[680px]'>
        {isLoading && <Preload />}
        {/* <WagerLowerBtnsBlock game='coinflip' text={gameText} /> */}
        <div className='w-full h-full absolute right-0 bottom-0 top-0 left-0 overflow-hidden z-[-1]'>
          <Image
            onLoad={() => setIMageLoading(false)}
            src='/images/coinflip_images/coinflipTableBg.webp'
            className='w-full object-cover h-full'
            fill
            alt='table-bg'
          />
        </div>
        <TotalCoeff
          fullLost={fullLost}
          fullWon={fullWon}
          totalValue={totalValue}
        />
        {/* <div className={cn(s.balls_arr)}>
          {coefficientData.map((item, i) => (
            <div
              className={cn(
                s.multiplier_value,
                item > 1 ? s.multiplier_positive : s.multiplier_negative
              )}
              key={i}
            >
              {item?.toFixed(2)}x
            </div>
          ))}
        </div> */}
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
                <Suspense fallback={<></>}>
                  <Stage adjustCamera={false} environment='dawn'>
                    <Environment path='/kira/' files='kiara_1_dawn_1k.hdr' />
                  </Stage>
                  <ambientLight intensity={1} />
                  <Model
                    setIsLoading={setModelLoading}
                    action={
                      inGame
                        ? CoinAction.Rotation
                        : pickedSide == GameModel.Side.Heads
                        ? CoinAction.TailsHeads
                        : CoinAction.TailsHeads
                    }
                    initial={pickedSide}
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoinFlipGame
