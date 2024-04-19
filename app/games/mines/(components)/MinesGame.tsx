'use client'

import Coefficient from '@/components/custom/coefficient'
import TotalCoeff from '@/components/custom/totalCoeff'
import { useSocket } from '@/components/providers/socket.provider'
import { cn } from '@/lib/utils'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { Tile, initialGameField, initialPickedTiles, maxReveal } from '../data'
import { handleResult, pickTileforMine } from '../utils'
import SelectedMine from './selected.mine'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { useGetState } from '@/lib/utils/useGetState'

const MinesGame = () => {
  const socket = useSocket()
  const [
    betsAmount,
    lost,
    profit,
    gameStatus,
    cryptoValue,
    setGameStatus,
    setWonStatus,
    setLostStatus,
    stopWinning,
    setStopWinning,
    waitingResponse,
    setWaitingResponse,
    isDrax,
    userInfo,
    gamesList,
    stopGain,
    stopLoss,
    result,
    setResult,
    socketLogged,
    setCryptoValue,
    socketReset,
    keep,
    setKeep,
    setIsPlaying,
    musicType,
    pickedValue,
    access_token,
    isPlaying
  ] = useUnit([
    WagerModel.$pickedValue,
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$gameStatus,
    WagerModel.$cryptoValue,
    GameModel.setGameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    GameModel.$stopWinning,
    GameModel.setStopWinning,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$gamesList,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$socketLogged,
    WagerModel.setCryptoValue,
    UserModel.$socketReset,
    GameModel.$keep,
    GameModel.setKeep,
    GameModel.setIsPlaying,
    GameModel.$playSounds,
    WagerModel.$pickedRows,
    RegistrModel.$access_token,
    GameModel.$isPlaying
  ])

  const [preloading, setPreloading] = useState(true)
  const [isCashout, setIsCashout] = useState(true)
  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)
  const [taken, setTaken] = useState(false)
  const [betData, setBetData] = useState({})
  const [subscribed, setCubscribed] = useState(false)
  const [copySelectedArr, setCopySelectedArr] = useState<number[]>([])
  const [gameField, setGameField] = useState<Tile[]>(initialGameField)
  const [pickedTiles, setPickedTiles] = useState([...initialPickedTiles])
  const [totalOpenedTiles, setTotalOpenedTiles] = useState(0)
  const [inGame, setInGame] = useState<boolean>(false)
  const [redrawTrigger, triggerRedraw] = useState<boolean>(true)

  const [playTileClick] = useSound(
    `/static/media/games_assets/mines/mineClick.mp3`,
    {
      playbackRate: (totalOpenedTiles + 1) / 25 + 0.5,
      volume: 1
    }
  )
  useEffect(() => {
    useSubscibeBets({
      name: 'Mines',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  useEffect(() => {
    handleResult({
      result,
      setInGame,
      setWaitingResponse,
      setGameStatus,
      setWonStatus,
      setLostStatus,
      setKeep,
      gameField,
      setCoefficientData,
      setCryptoValue,
      setGameField,
      setPickedTiles,
      setStopWinning,
      setTotalOpenedTiles,
      triggerRedraw
    })
    setResult(null)
  }, [result])

  useEffect(() => {
    setTotalOpenedTiles(0)
    setPickedTiles(initialPickedTiles)
    triggerRedraw(true)
  }, [pickedValue])

  useEffect(() => {
    if (stopWinning === 'NO') {
      setIsCashout(false)
    } else {
      setIsCashout(true)
    }
  }, [stopWinning])

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setIsCashout(true)
      setCopySelectedArr([])
    }
  }, [gameStatus])

  useEffect(() => setInGame(isPlaying), [isPlaying])

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

  useEffect(() => {
    if (keep) {
      setBetData({
        type: 'ContinueGame',
        game_id: gamesList.find(item => item.name === 'Mines')?.id,
        coin_id: isDrax ? 2 : 1,
        user_id: userInfo?.id || 0,
        data: `{ "cashout":${isCashout}, "tiles":[${pickedTiles}]}`
      })
    } else {
      setBetData({
        type: 'MakeBet',
        game_id: gamesList.find(item => item.name === 'Mines')?.id,
        coin_id: isDrax ? 2 : 1,
        user_id: userInfo?.id || 0,
        data: `{"num_mines":${pickedValue}, "cashout":${isCashout}, "tiles": [${pickedTiles}]}`,
        amount: `${cryptoValue || 0}`,
        stop_loss: Number(stopLoss) || 0,
        stop_win: Number(stopGain) || 0,
        num_games: betsAmount
      })
    }
  }, [
    stopGain,
    stopLoss,
    cryptoValue,
    isDrax,
    betsAmount,
    isCashout,
    pickedTiles,
    totalOpenedTiles
  ])

  useEffect(() => {
    if (keep && stopWinning === 'YES' && totalOpenedTiles === 0) {
      if (socket && access_token && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'ContinueGame',
            game_id: gamesList.find(item => item.name === 'Mines')?.id,
            coin_id: isDrax ? 2 : 1,
            user_id: userInfo?.id || 0,
            data: `{"cashout":true}`
          })
        )
      }
    }
  }, [keep, stopWinning, isDrax, betsAmount, totalOpenedTiles, pickedTiles])

  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(betData))
      setIsPlaying(false)
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
          payload: [gamesList.find(item => item.name === 'Mines')?.id]
        })
      )
      setCubscribed(true)
    }
  }, [socket, isPlaying, access_token, gamesList, subscribed])

  useEffect(() => {
    useGetState({
      access_token,
      gamesList,
      isDrax,
      socket,
      socketLogged,
      title: 'Mines'
    })
  }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'Mines' })
  }, [])

  const pickTiles = (index: number) =>
    pickTileforMine({
      index,
      gameField,
      musicType,
      pickedTiles,
      pickedValue,
      playTileClick,
      setTotalOpenedTiles,
      totalOpenedTiles,
      triggerRedraw
    })

  // useEffect(() => alert(inGame), [inGame])

  return (
    <div
      className='w-full h-full relative flex justify-center flex-col min-h-[680px]'
      style={{
        background: `url('/images/mines_images/mines_bg.webp') center center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient common ballsArr={coefficientData} />
      <div className='w-[226px] h-[226px] p-1.5 xl:p-4 gap-1.5 mt-0 sm:mt-[22px] sm:gap-2.5 sm:p-2.5 sm:w-[329px] sm:h-[325px] xl:w-[496px] xl:h-[496px] 3xl:mt-[14px] xl:gap-4 grid grid-cols-5 grid-rows-5 xl:mt-11 mx-auto bg-[#0f0f0f] rounded-[12px] 3xl:w-[553px] 3xl:h-[546px]'>
        {redrawTrigger &&
          gameField &&
          pickedTiles &&
          gameField.map((value, index) => {
            const isPicked = value == Tile.Closed && pickedTiles[index]
            return (
              <div
                key={index}
                onClick={pickTiles.bind('', index)}
                className={cn(
                  'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] cursor-pointer duration-500 relative',
                  isPicked && inGame && !copySelectedArr.includes(index) && ''
                )}
              >
                <Image
                  width={80}
                  height={80}
                  className={cn(
                    'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute top-0 left-0',
                    isPicked ? 'z-[0]' : 'z-[1]'
                  )}
                  src={'/icons/mines/mines.svg'}
                  alt=''
                />
                <SelectedMine
                  index={index}
                  type={isPicked ? Tile.Selected : value}
                  waitingResponse={waitingResponse}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default MinesGame
