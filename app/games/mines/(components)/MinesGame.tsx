'use client'

import Coefficient from '@/components/custom/coefficient'
import { useSocket } from '@/components/providers/socket.provider'
import { cn } from '@/lib/utils'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { useGetState } from '@/lib/utils/useGetState'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { useCallback, useEffect, useState } from 'react'
import ReactHowler from 'react-howler'
import useSound from 'use-sound'
import { Tile, initialGameField, initialPickedTiles, maxReveal } from '../data'
import { handleResult } from '../utils'
import SelectedMine from './selected.mine'
import './styles.scss'
const MinesGame = () => {
  const socket = useSocket()
  const [
    betsAmount,
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
    isPlaying,
    setMinesSelected,
    minesSelected,
    minesDelay,
    pickedTiles,
    setPickedTiles
  ] = useUnit([
    WagerModel.$pickedValue,
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
    GameModel.$isPlaying,
    GameModel.setMinesSelected,
    GameModel.$minesSelected,
    GameModel.$minesDelay,
    GameModel.$pickedTiles,
    GameModel.setPickedTiles
  ])
  const [playSounds] = useUnit([GameModel.$playSounds])
  const [isCashout, setIsCashout] = useState(true)
  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [taken, setTaken] = useState(false)
  const [betData, setBetData] = useState({})
  const [subscribed, setCubscribed] = useState(false)
  const [copySelectedArr, setCopySelectedArr] = useState<number[]>([])
  const [gameField, setGameField] = useState<Tile[]>(initialGameField)
  // const [pickedTiles, setPickedTiles] = useState([...initialPickedTiles])
  const [totalOpenedTiles, setTotalOpenedTiles] = useState(0)
  const [inGame, setInGame] = useState<boolean>(false)
  const [redrawTrigger, triggerRedraw] = useState<boolean>(true)
  const [minesLose] = useSound('/music/mines_lose.mp3')
  const [minesWin] = useSound('/music/mines_win.mp3')

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
      triggerRedraw,
      minesLose,
      minesWin,
      playSounds
    })
    setResult(null)
  }, [result])

  useEffect(() => {
    setTotalOpenedTiles(0)
    setPickedTiles([
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
    ])
    triggerRedraw(true)
  }, [pickedValue])

  useEffect(() => {
    if (pickedTiles.find(el => el === true)) {
      setMinesSelected(true)
    } else {
      setMinesSelected(false)
    }
  }, [pickedTiles.find(el => el === true)])

  useEffect(() => {
    if (stopWinning === 'NO') {
      setIsCashout(false)
    } else {
      setIsCashout(true)
    }
  }, [stopWinning])

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
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'Mines')?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"num_mines":${pickedValue}, "cashout":true, "tiles": [${pickedTiles}]}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
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

  const [playTileClick] = useSound(
    `https://game.greekkeepers.io/static/media/games_assets/mines/mineClick.mp3`,
    {
      playbackRate: (totalOpenedTiles + 1) / 25 + 0.5,
      volume: 1
    }
  )
  const [isMouseDown, setIsMouseDown] = useState(false)

  const pickTiles = useCallback(
    index => {
      if (waitingResponse || minesDelay) return
      if (gameField[index] === Tile.Closed) {
        if (!pickedTiles[index]) {
          if (totalOpenedTiles >= maxReveal[pickedValue]) {
            return
          }
          setTotalOpenedTiles(prev => prev + 1)
          pickedTiles[index] = true
        } else {
          setTotalOpenedTiles(prev => prev - 1)
          pickedTiles[index] = false
        }

        if (musicType !== 'off') {
          playTileClick()
        }
        triggerRedraw(true)
      }
    },
    [
      waitingResponse,
      minesDelay,
      gameField,
      musicType,
      pickedTiles,
      pickedValue,
      playTileClick,
      setTotalOpenedTiles,
      totalOpenedTiles,
      triggerRedraw
    ]
  )

  const handleMouseMove = useCallback(
    index => {
      if (isMouseDown) {
        if (waitingResponse || minesDelay) return
        if (gameField[index] === Tile.Closed) {
          if (!pickedTiles[index]) {
            if (totalOpenedTiles >= maxReveal[pickedValue]) {
              return
            }
            setTotalOpenedTiles(prev => prev + 1)
            pickedTiles[index] = true
          } else {
            setTotalOpenedTiles(prev => prev - 1)
            pickedTiles[index] = false
          }

          if (musicType !== 'off') {
            playTileClick()
          }
          triggerRedraw(true)
        }
      }
    },
    [
      isMouseDown,
      waitingResponse,
      minesDelay,
      gameField,
      musicType,
      pickedTiles,
      pickedValue,
      playTileClick,
      setTotalOpenedTiles,
      totalOpenedTiles,
      triggerRedraw
    ]
  )

  return (
    <div
      className='w-full h-full relative flex justify-center flex-col  flex-[1_1_auto]'
      style={{
        background: `url('/images/mines_images/bg.png') center center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      {waitingResponse && (
        <ReactHowler
          src={'/music/mines_animation.mp3'}
          playing={playSounds !== 'off'}
          rate={1}
          loop
        />
      )}
      <Coefficient common ballsArr={coefficientData} />
      <div
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        className='scale-[1.25] sm:scale-[1] w-[226px] h-[226px] p-1.5 xl:p-4 gap-1.5 mt-0 sm:mt-[22px] sm:gap-2.5 sm:p-2.5 sm:w-[329px] sm:h-[325px] xl:w-[496px] xl:h-[496px] 3xl:mt-[14px] xl:gap-4 grid grid-cols-5 grid-rows-5 xl:mt-11 mx-auto bg-[#0f0f0f] rounded-[12px] 3xl:w-[553px] 3xl:h-[546px]'
      >
        {redrawTrigger &&
          gameField &&
          pickedTiles &&
          gameField.map((value, index) => {
            const isPicked = value == Tile.Closed && pickedTiles[index]
            return (
              <div
                key={index}
                onClick={pickTiles.bind('', index)}
                onMouseEnter={handleMouseMove.bind('', index)}
                className={cn(
                  'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] cursor-pointer duration-500 relative ',
                  isPicked && inGame && !copySelectedArr.includes(index) && ''
                )}
              >
                <svg
                  key={index}
                  width='91'
                  height='90'
                  viewBox='0 0 91 90'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className={cn(
                    'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute top-0 left-0  mine_hover',
                    isPicked ? 'z-[0]' : 'z-[1]'
                  )}
                >
                  <mask id='path-1-inside-1_10900_43116' fill='white'>
                    <path d='M0.149414 10C0.149414 4.47715 4.62657 0 10.1494 0H80.1494C85.6723 0 90.1494 4.47715 90.1494 10V80C90.1494 85.5229 85.6723 90 80.1494 90H10.1494C4.62657 90 0.149414 85.5229 0.149414 80V10Z' />
                  </mask>
                  <path
                    d='M0.149414 10C0.149414 4.47715 4.62657 0 10.1494 0H80.1494C85.6723 0 90.1494 4.47715 90.1494 10V80C90.1494 85.5229 85.6723 90 80.1494 90H10.1494C4.62657 90 0.149414 85.5229 0.149414 80V10Z'
                    fill='url(#paint0_linear_10900_43116)'
                  />
                  <path
                    d='M0.149414 10C0.149414 3.92487 5.07428 -1 11.1494 -1H79.1494C85.2245 -1 90.1494 3.92487 90.1494 10C90.1494 5.02944 85.6723 1 80.1494 1H10.1494C4.62657 1 0.149414 5.02944 0.149414 10ZM90.1494 90H0.149414H90.1494ZM0.149414 90V0V90ZM90.1494 0V90V0Z'
                    fill='#464646'
                    mask='url(#path-1-inside-1_10900_43116)'
                  />
                  <defs>
                    <linearGradient
                      id='paint0_linear_10900_43116'
                      x1='45.1494'
                      y1='0'
                      x2='45.1494'
                      y2='90'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stop-color='#333333' />
                      <stop offset='1' stop-color='#1D1D1D' />
                    </linearGradient>
                  </defs>
                </svg>

                <SelectedMine
                  key={index}
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
{
  /* <Image
                  width={80}
                  height={80}
                  className={cn(
                    'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute top-0 left-0',
                    isPicked ? 'z-[0]' : 'z-[1]'
                  )}
                  src={'/icons/mines/mines.svg'}
                  alt=''
                /> */
}
