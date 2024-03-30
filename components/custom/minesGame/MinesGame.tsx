'use client'

import Coefficient from '@/components/ui/coefficient'
import TotalCoeff from '@/components/ui/total.coeff'
import { cn } from '@/lib/utils'
// import { useSocket } from '@/src/shared/context'
// import { Preload } from '@/src/shared/ui/Preload'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import useSound from 'use-sound'
import SelectedMine from './components/selected.mine'

import background from '@/public/images/mines_images/mines_bg.webp'
import { MineSVG } from './icons'
import { useSocket } from '@/components/providers/socket.provider'
import Preload from '@/components/ui/preload'

export enum Tile {
  Closed,
  Selected,
  SelectedShaking,
  Coin,
  Bomb
}

const maxReveal = [
  0, 24, 21, 17, 14, 12, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1,
  1
]

const MinesGame: FC = () => {
  const initialGameField: Tile[] = [
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed
  ]

  const initialPickedTiles = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]

  const [pickedValue, pickMines, musicType] = useUnit([
    WagerModel.$pickedRows,
    WagerModel.pickRows,
    GameModel.$playSounds
  ])

  const [gameField, setGameField] = useState<Tile[]>(initialGameField)
  const [pickedTiles, setPickedTiles] = useState<boolean[]>([
    ...initialPickedTiles
  ])
  const [totalOpenedTiles, setTotalOpenedTiles] = useState<number>(0)

  const [playTileClick] = useSound(
    `/static/media/games_assets/mines/mineClick.mp3`,
    {
      playbackRate: (totalOpenedTiles + 1) / 25 + 0.5,
      volume: 1
    }
  )
  const [inGame, setInGame] = useState<boolean>(false)

  const [keep, setKeep] = useState(false)

  const [redrawTrigger, triggerRedraw] = useState<boolean>(true)

  const [setIsPlaying] = useUnit([GameModel.setIsPlaying])

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
    setCoefficient,
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
    setCryptoValue
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
    GameModel.setCoefficient,
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
    WagerModel.setCryptoValue
  ])

  useEffect(() => {
    if (result) {
      if (result.type === 'State' && result.state) {
        const dataState = JSON.parse(result.state)
        setKeep(true)
        if (Number(result.amount) > 0) {
          setCryptoValue(Number(result.amount))
          if (JSON.parse(result.bet_info).cashout === false) {
          }
          const newGameField = gameField.map((value, index) => {
            if (dataState?.mines[index]) {
              return Tile.Bomb
            } else if (dataState?.state[index]) {
              return Tile.Coin
            } else {
              return value
            }
          })
          setWaitingResponse(false)
          setGameField(newGameField)
          setTotalOpenedTiles(0)
          setPickedTiles([...initialPickedTiles])
        }
      } else if (result.type === 'Bet' && result.state) {
        const fullAmount = Number(result.amount) * result.num_games!
        setCoefficientData(prev => [
          Number(result.profit) / fullAmount,
          ...prev
        ])
        // handlePayouts();
        setTimeout(() => {
          setInGame(false)
          triggerRedraw(true)
          setGameFields(initialPickedTiles, [...initialPickedTiles])
        }, 2000)
        const data = JSON.parse(result!.state)
        const newGameField = gameField.map((value, index) => {
          if (data?.mines[index]) {
            return Tile.Bomb
          } else if (data?.state[index]) {
            return Tile.Coin
          } else {
            return value
          }
        })
        setWaitingResponse(false)
        setGameField(newGameField)
        setTotalOpenedTiles(0)
        setPickedTiles([...initialPickedTiles])
        if (
          Number(result.profit) > Number(result.amount) ||
          Number(result.profit) === Number(result.amount)
        ) {
          setGameStatus(GameModel.GameStatus.Won)
          setStopWinning('NO')
          const multiplier = Number(
            Number(result.profit) / Number(result.amount)
          )
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: 'DRAX'
          })
          setInGame(false)
        } else if (Number(result.profit) < Number(result.amount)) {
          setGameStatus(GameModel.GameStatus.Lost)
          setStopWinning('NO')
          setInGame(false)
          setLostStatus(Number(result.profit) - Number(result.amount))
        } else {
          setGameStatus(GameModel.GameStatus.Draw)
          setStopWinning('NO')
          setInGame(false)
        }
        setKeep(false)
      }
    }
    setResult(null)
  }, [result])

  useEffect(() => {
    setTotalOpenedTiles(0)
    setPickedTiles(initialPickedTiles)
    triggerRedraw(true)
  }, [pickedValue])

  const [preloading, setPreloading] = useState(true)

  const pickTile = (index: number) => {
    if (gameField[index] == Tile.Closed) {
      console.log('TILES', totalOpenedTiles, maxReveal[pickedValue])
      if (!pickedTiles[index]) {
        if (totalOpenedTiles >= maxReveal[pickedValue]) {
          return
        }
        setTotalOpenedTiles(totalOpenedTiles + 1)
      } else {
        setTotalOpenedTiles(totalOpenedTiles - 1)
      }
      musicType !== 'off' && playTileClick()
      pickedTiles[index] = !pickedTiles[index]
      triggerRedraw(true)
    }
  }

  const setGameFields = (
    revealedTiles: boolean[],
    tilesPicked: boolean[] | undefined
  ) => {
    var openedTiles = 0
    setGameField(
      revealedTiles.map((value: boolean) => {
        if (value) {
          openedTiles += 1
          return Tile.Coin
        } else {
          return Tile.Closed
        }
      })
    )

    if (tilesPicked) {
      setPickedTiles(tilesPicked)
    }

    return openedTiles
  }

  const [isCashout, setIsCashout] = useState(true)

  useEffect(() => {
    if (stopWinning === 'NO') {
      setIsCashout(false)
    } else {
      setIsCashout(true)
    }
  }, [stopWinning])

  const [isPlaying] = useUnit([GameModel.$isPlaying])

  const [finish, setFinish] = useState(false)
  const [coefficientData, setCoefficientData] = useState<number[]>([])
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
        { value: profit / cryptoValue, status: 'won' }
      ])
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
      setGameResult(prev => [...prev, { value: 0.0, status: 'lost' }])
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  const [stopGame, setStopGame] = useState(false)
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setStopGame(true)
      setFinish(true)
    }
  }, [gameStatus])

  const [copySelectedArr, setCopySelectedArr] = useState<number[]>([])

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setIsCashout(true)
      setCopySelectedArr([])
    }
  }, [gameStatus])

  useEffect(() => setInGame(isPlaying), [isPlaying])
  const [access_token] = useUnit([RegistrModel.$access_token])
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

  //!----------
  const socket = useSocket()
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'Mines')?.id]
  }

  const [betData, setBetData] = useState({})

  const [gameState, setGameState] = useState<any>(null)

  useEffect(() => {
    console.log(121212, pickedTiles)
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
            data: `{ "cashout":true}`
          })
        )
      }
    }
  }, [keep, stopWinning, isDrax, betsAmount, totalOpenedTiles, pickedTiles])

  const [subscribed, setCubscribed] = useState(false)
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
          game_id: gamesList.find(item => item.name === 'Mines')?.id,
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
          payload: [gamesList.find(item => item.name === 'Mines')?.id]
        })
      )
    }
  }, [])

  return (
    <div className='w-full h-full relative flex justify-center flex-col min-h-[680px]'>
      {preloading && <Preload />}
      <div className='w-full h-full absolute right-0 bottom-0 top-0 left-0 z-[-1]'>
        <Image
          onLoad={() => setPreloading(false)}
          src={background}
          className='rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0] object-cover w-full h-full'
          alt='table-bg'
          width={1418}
          height={680}
          quality={100}
        />
      </div>
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient ballsArr={coefficientData} />
      <div className='w-[226px] h-[226px] p-1.5 xl:p-4 gap-1.5 mt-0 sm:mt-[22px] sm:gap-2.5 sm:p-2.5 sm:w-[329px] sm:h-[325px] xl:w-[496px] xl:h-[496px] 3xl:mt-[14px] xl:gap-4 grid grid-cols-5 grid-rows-5 xl:mt-11 mx-auto bg-[#0f0f0f] rounded-[12px] 3xl:w-[553px] 3xl:h-[546px]'>
        {redrawTrigger &&
          gameField &&
          pickedTiles &&
          gameField.map((value, index) => {
            const isPicked = value == Tile.Closed && pickedTiles[index]
            return (
              <div
                key={index}
                onClick={() => {
                  pickTile(index)
                }}
                className={cn(
                  'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] cursor-pointer duration-500 relative',
                  isPicked && inGame && !copySelectedArr.includes(index) && ''
                )}
              >
                <MineSVG
                  className={cn(
                    'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute top-0 left-0',
                    isPicked ? 'z-[0]' : 'z-[1]'
                  )}
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
