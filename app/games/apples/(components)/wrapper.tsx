'use client'

import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'

import { useSocket } from '@/components/providers/socket.provider'

import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'

import AppleTable from './appleTable'
import TotalCoeff from '@/components/custom/totalCoeff'
import Preload from '@/components/custom/preload'
import Coefficient from '@/components/custom/coefficient'
import {
  generateBetData,
  handleGameResult,
  updateChunkedArray
} from '../(utils)'
export interface IAppleData {
  number: number
  value: number
}
const AppleGame = () => {
  const socket = useSocket()
  const [start, setStart] = useState(true)
  const [keep, setKeep] = useState(false)
  const [appleData, setAppleData] = useState<IAppleData[]>([])

  const [setEmpty] = useUnit([GameModel.setEmptyField])

  useEffect(() => {
    if (appleData.length === 0) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  }, [appleData.length])

  useEffect(() => {
    const data = appleData.map(el => el.value)
    setApples(data)
  }, [appleData])
  const [applesArr, setApplesArr] = useState(Array(27).fill({}))
  const [chunkedApplesArr, setChunkedApplesArr] = useState<any>([])

  useEffect(() => {
    const chunkedArray = updateChunkedArray(applesArr)
    setChunkedApplesArr(chunkedArray)
  }, [applesArr])

  const [isLoading, setIsLoading] = useState(false)
  const [
    lost,
    profit,
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
    setWaitingResponse,
    setIsPlaying,
    pickedSide,
    setAppleGameResult,
    reset,
    gamesList,
    result,
    setResult,
    socketLogged,
    isDrax,
    userInfo,
    isPlaying,
    multiplier,
    setCryptoValue,
    stop,
    setStop,
    setApples,
    socketReset
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
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
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.$pickedSide,
    GameModel.setGameResult,
    GameModel.$reset,
    GameModel.$gamesList,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$socketLogged,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$isPlaying,
    GameModel.$multiplier,
    WagerModel.setCryptoValue,
    GameModel.$stop,
    GameModel.setStop,
    GameModel.setApples,
    UserModel.$socketReset
  ])

  useEffect(() => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList.length > 0
    ) {
      socket?.send(JSON.stringify({ type: 'UnsubscribeBets' }))
      socket?.send(
        JSON.stringify({
          type: 'SubscribeBets',
          payload: [gamesList.find(item => item.name === 'Apples')?.id] || 14
        })
      )
    }
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  const [firstBet, setFirstBet] = useState(true)
  const [mines, setMines] = useState<boolean[][]>([])
  const [appleItem, setAppleItem] = useState<number[]>([])

  useEffect(() => {
    handleGameResult(
      result,
      start,
      setIsPlaying,
      setApples,
      setMines,
      setAppleData,
      setKeep,
      setGameStatus,
      setWonStatus,
      setLostStatus,
      setInGame,
      setFirstBet,
      handleReset,
      setStop,
      setAppleItem,
      setAppleGameResult,
      setCryptoValue,
      setStart,
      setWaitingResponse,
      setResult
    )
  }, [result, start])
  useEffect(() => {
    setIsCashout(stop)
  }, [stop])

  const [isCashout, setIsCashout] = useState(true)

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

  useEffect(() => setInGame(true), [inGame])

  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)
  const [localAmount, setLocalAmount] = useState<any>(0)
  const [localCryptoValue, setLocalCryptoValue] = useState(0)
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

  useEffect(() => setInGame(isPlaying), [isPlaying])
  const [access_token] = useUnit([RegistrModel.$access_token])
  const handleReset = () => {
    setAppleGameResult([])
    setAppleData([])
    setApples([])
  }

  useEffect(() => {
    handleReset()
  }, [reset])

  const [betData, setBetData] = useState({})

  const [coninue, setContinue] = useState(0)

  useEffect(() => {
    const getData = generateBetData(
      firstBet,
      keep,
      gamesList,
      isDrax,
      userInfo,
      cryptoValue,
      stopLoss,
      stopGain,
      betsAmount,
      isCashout,
      isPlaying,
      appleItem,
      setContinue,
      setFirstBet,
      setKeep
    )
    setBetData(getData)
  }, [
    stopGain,
    stopLoss,
    cryptoValue,
    isDrax,
    betsAmount,
    isCashout,
    isPlaying,
    appleItem
  ])
  const [subscribed, setCubscribed] = useState(false)
  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(betData))
    }
    if (
      socket &&
      access_token &&
      socket.readyState === WebSocket.OPEN &&
      !subscribed &&
      gamesList?.length > 0
    ) {
      socket.send(
        JSON.stringify({
          type: 'SubscribeBets',
          payload: [gamesList.find(item => item.name === 'Apples')?.id]
        })
      )
      setCubscribed(true)
    }
  }, [socket, isPlaying, access_token, gamesList, coninue])

  useEffect(() => {
    if (
      access_token &&
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList?.length > 0 &&
      socketLogged
    ) {
      socket.send(
        JSON.stringify({
          type: 'GetState',
          game_id: gamesList.find(item => item.name === 'Apples')?.id,
          coin_id: isDrax ? 2 : 1
        })
      )
    }
  }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged])

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Apples')?.id]
        })
      )
    }
  }, [])

  return (
    <div className='relative w-full h-full py-11 sm:py-16 lg:py-[30px] px-[10px] sm:px-[30px] lg:px-0 min-h-[680px]'>
      <div className='absolute top-0 right-0 w-full h-full overflow-hidden rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]'>
        <Image
          width={1438}
          height={680}
          onLoad={() => setIsLoading(false)}
          src='/images/apples/applesBg.webp'
          className='absolute right-0 bottom-0 h-full overflow-hidden object-cover z-[-1] w-full 2xl:w-[1438px] 3xl:w-full'
          alt='apples-static-bg'
        />
      </div>
      {isLoading && <Preload />}
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient ballsArr={coefficientData} multipliers={multiplier} />
      <div className='h-full flex items-center justify-center'>
        <div className='max-w-[325px] mt-0 mb-10 px-[17px] py-[19px] sm:px-6 sm:pt-[31px] sm:pb-5 shadow-[0px_0px_24.6px_0px_rgba(25,102,101,0.89)] lg:mt-[30px] bg-[rgba(3,33,45,0.82)] border border-[#105453] rounded-[12px] sm:max-w-[425px] w-full relative'>
          <AppleTable
            appleData={appleData}
            chunkedApplesArr={chunkedApplesArr}
            inGame={inGame}
            mines={mines}
            setAppleData={setAppleData}
            setAppleItem={setAppleItem}
          />
        </div>
      </div>
    </div>
  )
}

export default AppleGame
