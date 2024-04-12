'use client'
import { FC, createRef, useEffect, useRef, useState } from 'react'

import activeThimbleImg from '@/public/images/thimbles/activeThimble.webp'
import ballIco from '@/public/images/thimbles/ball.png'
import thimbleImg from '@/public/images/thimbles/thimble.webp'
import thimbleShadow from '@/public/images/thimbles/thimbleShadow.webp'
import gameBg from '@/public/images/thimbles/thimblesBg.webp'

import { useUnit } from 'effector-react'
import Image from 'next/image'
import { GameModel, UserModel } from '@/states'

import { WagerModel } from '@/states'

import { useSocket } from '@/components/providers/socket.provider'
import { RegistrModel } from '@/states'
import TotalCoeff from '@/components/custom/totalCoeff'
import Coefficient from '@/components/custom/coefficient'

interface ThimblesGameProps {
  gameText?: string
}

export const ThimblesGame: FC<ThimblesGameProps> = () => {
  const socket = useSocket()
  const [
    lost,
    profit,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    gameStatus,
    betsAmount,
    cryptoValue,
    stopLoss,
    stopGain,
    pickedSide,
    setIsPlaying,
    isPlaying,
    result,
    setResult,
    isDrax,
    userInfo,
    multiplier
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    GameModel.$gameStatus,
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopLoss,
    WagerModel.$stopGain,
    GameModel.$pickedSide,
    GameModel.setIsPlaying,
    GameModel.$isPlaying,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$multiplier
  ])
  const [gamesList] = useUnit([GameModel.$gamesList])

  const [socketReset] = useUnit([UserModel.$socketReset])

  useEffect(() => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList.length > 0
    ) {
      socket?.send(JSON.stringify({ type: 'UnsubscribeAllBets' }))
      socket?.send(
        JSON.stringify({
          type: 'SubscribeBets',
          payload: [gamesList.find(item => item.name === 'Thimbles')?.id]
        })
      )
    }
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  const [activeThimble, setActiveThimble] = useState<number | null>(null) //0,1,2
  const [thimbles, setThimbles] = useState([0, 0, 0])
  const [openGame, setOpenGame] = useState<number | null>(1)
  const [showBall, setShowBall] = useState(true)

  const [startGame, setStartGame] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [selected, setSelected] = useState<null | number>(null)

  useEffect(() => {
    if (isPlaying) {
      setSelected(null)
      setOpenGame(null)
    }
  }, [isPlaying])

  useEffect(() => {
    if (startGame) {
      setActiveThimble(null)
      setTimeout(() => setShowAnimation(true), 500)
      setShowBall(false)
    } else {
    }
  }, [startGame])

  const animatedRefs = useRef([
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>()
  ])

  useEffect(() => {
    setStartGame(isPlaying)
  }, [isPlaying])

  const [access_token] = useUnit([RegistrModel.$access_token])
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'Thimbles')?.id]
  }

  const [subscribed, setCubscribed] = useState(false)
  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN &&
      selected !== null
    ) {
      if (!subscribed) {
        socket.send(JSON.stringify(subscribe))
        setCubscribed(true)
      }
      socket.send(
        JSON.stringify({
          type: 'MakeBet',
          game_id: gamesList.find(item => item.name === 'Thimbles')?.id,
          coin_id: isDrax ? 2 : 1,
          user_id: userInfo?.id || 0,
          data: `{"car":${selected}}`,
          amount: `${cryptoValue || 0}`,
          stop_loss: Number(stopLoss) || 0,
          stop_win: Number(stopGain) || 0,
          num_games: betsAmount
        })
      )
      setTimeout(() => setShowBall(false), 500)
    }
  }, [
    socket,
    isPlaying,
    access_token,
    selected,
    stopGain,
    stopLoss,
    pickedSide,
    cryptoValue,
    betsAmount,
    isDrax
  ])

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Thimbles')?.id]
        })
      )
    }
  }, [])

  useEffect(() => {
    if (startGame) {
      setTimeout(() => {
        setStartGame(false)
        setShowAnimation(false)
        setShowBall(false)
      }, 4000)
    }
  }, [startGame])
  useEffect(() => {
    if (result !== null && result?.type === 'Bet') {
      const fullAmount = Number(result.amount) * result.num_games!
      const parseArr = JSON.parse(result.profits)
      const handleCall = () => {
        for (let i = 0; i < parseArr?.length; i++) {
          setTimeout(() => {
            const outCome = Number(parseArr[i]) / fullAmount
            setCoefficientData(prev => [outCome, ...prev])
          }, 700 * (i + 1))
        }
      }
      handleCall()
      const numArr = JSON.parse(result.profits)
      if (
        Number(result.profit) > Number(result.amount) ||
        Number(result.profit) === Number(result.amount)
      ) {
        setActiveThimble(selected as number)
        const multiplier = Number(Number(result.profit) / Number(result.amount))
        Promise.all([
          new Promise(resolve =>
            setTimeout(
              () => resolve(setGameStatus(GameModel.GameStatus.Won)),
              300
            )
          ),
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve(
                  setWonStatus({
                    profit: Number(result.profit),
                    multiplier,
                    token: 'DRAX'
                  })
                ),
              300
            )
          ),
          new Promise(resolve =>
            setTimeout(() => resolve(setIsPlaying(false)), 0)
          ),
          new Promise(resolve =>
            setTimeout(() => resolve(setSelected(null)), 0)
          )
        ])
      } else if (Number(result.profit) < Number(result.amount)) {
        Promise.all([
          new Promise(resolve =>
            setTimeout(
              () => resolve(setGameStatus(GameModel.GameStatus.Lost)),
              300
            )
          ),
          new Promise(resolve =>
            setTimeout(() => resolve(setIsPlaying(false)), 300)
          ),
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve(
                  setLostStatus(Number(result.profit) - Number(result.amount))
                ),
              300
            )
          ),

          new Promise(resolve =>
            setTimeout(() => resolve(setSelected(null)), 0)
          )
        ])
      } else {
        setGameStatus(GameModel.GameStatus.Draw)
        setIsPlaying(false)
      }
      setResult(null)
    }
  }, [result?.timestamp, result, gameStatus])

  const [selectedShow, setSelectedShow] = useState<number | null>(null)

  useEffect(() => {
    if (selected !== null) {
      setSelectedShow(selected)
    } else
      [
        setTimeout(() => {
          setSelectedShow(null)
          setActiveThimble(null)
        }, 2000)
      ]
  }, [selected])
  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  const [coefficientData, setCoefficientData] = useState<number[]>([])
  return (
    <section className='thimbles_table_wrap'>
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient common ballsArr={coefficientData} multipliers={multiplier} />
      <div
        className='
        absolute w-full h-full left-0 top-0
      '
      >
        <img
          src={gameBg.src}
          className='
            w-full h-full object-cover rounded-[0] sm:rounded-[20px_20px_0_0] emd:rounded-[20px_0_0_0]
          '
          alt='thimbles-static-bg'
        />
      </div>
      <div
        className='
          sm:w-full w-[calc(100%_-_60px)] h-full z-[5] relative flex justify-center items-end p-[0_30px] sm:p-[0]
        '
      >
        <div
          className='
          gap-[20px] sm:gap-[35px] mb-[50px] sm:mb-[73px] relative flex  
        '
        >
          {thimbles.map((_, ind) => (
            <div
              key={ind}
              className={`
                flex flex-col justify-center items-center transition-all duration-500 relative
                ${showAnimation && `thimble_wrap_${ind + 1}`}
              `}
              onClick={() => {
                if (!showAnimation && !openGame && isPlaying) {
                  setSelected(ind)
                }
              }}
              ref={animatedRefs.current[ind]}
            >
              {activeThimble === ind || openGame == ind ? (
                <img
                  src={activeThimbleImg.src}
                  className={`
                    absolute select-none opacity-0 invisible z-[2] transition-all duration-400
                    bottom-[-10.5px] h-[79px] max-w-[92px] smm:bottom-[-20.5px] smm:h-[142px] smm:max-w-[165.5px] smm:w-full
                    opacity-100 !visible bottom-[94px] smm:bottom-[85px] tbb:bottom-[80px] tbb:max-w-[186px] tbb:h-[160px]
                    ${selectedShow === ind && 'bottom-[105px]'}
                  `}
                  alt='thimble'
                />
              ) : (
                <img
                  src={thimbleImg.src}
                  className={`
                    select-none z-[3] absolute bottom-0 transition-all duration-400
                    max-w-[70px] h-[57px] smm:h-[104px] smm:max-w-[130px] smm:w-full tbb:w-[auto] tbb:h-[auto]
                    ${selectedShow === ind && 'bottom-[105px]'}
                    ${
                      !showAnimation &&
                      !openGame &&
                      isPlaying &&
                      'cursor-pointer'
                    }
                  `}
                  alt='thimble'
                />
              )}
              {(activeThimble === ind || openGame == ind) && (
                <Image
                  src={ballIco}
                  alt='ball'
                  className={`
                    select-none left-[48%] translate-x-[-50%]
                    absolute w-[22px] h-[20px] bottom-[7px]
                    smm:w-[40px] smm:h-[36px] tbb:h-[40px] tbb:w-[40px]
                    tbb:bottom-[15px]
                  `}
                />
              )}
              <img
                src={thimbleShadow.src}
                className='
                  select-none w-[92%] xxxs:w-[75%] xxs:w-[55%] smm:w-[90%] tbb:w-[95%]
                '
                alt='thimble-static-shadow'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
