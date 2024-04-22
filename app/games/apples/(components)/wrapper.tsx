'use client'

import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { useSocket } from '@/components/providers/socket.provider'

import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'

import Coefficient from '@/components/custom/coefficient'
import TotalCoeff from '@/components/custom/totalCoeff'
import {
  generateBetData,
  handleGameResult,
  updateChunkedArray
} from '../(utils)'

import AppleTable from './appleTable'

import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { IAppleData } from '@/types/games.types'

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
  const [chunkedApplesArr, setChunkedApplesArr] = useState<
    {
      apples: number[]
      cf: number
    }[]
  >([])

  useEffect(() => {
    const chunkedArray = updateChunkedArray(applesArr)
    setChunkedApplesArr(chunkedArray)
  }, [applesArr])

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
    useSubscibeBets({
      name: 'Apples',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
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

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
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
    return () => useUnSubscribe({ gamesList, socket, name: 'Apples' })
  }, [])

  return (
    <div
      className='relative w-full h-full py-[23px] sm:py-16 lg:py-[30px] px-2.5 sm:px-[30px] lg:px-0 rounded-none sm:rounded-t-[20px] flex-[1_1_auto]'
      style={{
        background: `url('/images/apples/applesBg.webp') center center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <Coefficient ballsArr={coefficientData} multipliers={multiplier} />
      <div className='h-full flex items-center justify-center'>
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
  )
}

export default AppleGame
