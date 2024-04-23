'use client'

import { useSocket } from '@/components/providers/socket.provider'
import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import bg from '@/public/images/wheel_images/bg.webp'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { IWheelCoef, IWheelColors } from '@/types/games.types'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ReactHowler from 'react-howler'
import './styles.scss'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { BLUE_COLOR, GREEN_COLOR, WHITE_COLOR } from './data'
import {
  generateSegmentColors_easy,
  setCoefLevel,
  setHardLevel,
  setMediumLevel
} from '../(utils)'
import { BallSVG, CircleSVG, PickerSVG } from '../(icons)'
import Coefficient from './coefficient'
import WheelCircle from './Wheel'

const WheelGame = () => {
  const socket = useSocket()
  const isDesktop = useMediaQuery('(max-width: 1280px)')
  const isMobile = useMediaQuery('(max-width: 650px)')

  const [level] = useUnit([GameModel.$level])

  const [
    lost,
    profit,
    playSounds,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    gameStatus,
    betsAmount,
    cryptoValue,
    stopLoss,
    stopGain,
    pickedSide,
    setActivePicker,
    pickSide,
    setIsPlaying,
    pickedValue,
    result,
    setResult,
    isPlaying,
    isDrax,
    userInfo,
    socketReset
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$playSounds,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    GameModel.$gameStatus,
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopLoss,
    WagerModel.$stopGain,
    GameModel.$pickedSide,
    GameModel.setActive,
    GameModel.pickSide,
    GameModel.setIsPlaying,
    WagerModel.$pickedRows,
    GameModel.$result,
    GameModel.setResult,
    GameModel.$isPlaying,
    UserModel.$isDrax,
    UserModel.$userInfo,
    UserModel.$socketReset
  ])
  const [gamesList] = useUnit([GameModel.$gamesList])
  const [access_token] = useUnit([RegistrModel.$access_token])

  useEffect(() => {
    useSubscibeBets({
      name: 'Wheel',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  const [coeff, setCoeff] = useState<{
    profit: string[]
    amount: number
  } | null>(null)
  useEffect(() => {
    if (coeff !== null) {
      const handlePayouts = (profits: any, amount: number) => {
        const arr = JSON.parse(profits)

        for (let i = 0; i < arr?.length; i++) {
          setTimeout(() => {
            const outCome = arr[i] / amount

            setCoefficientData(prev => [outCome, ...prev])
          }, 2000 * (i + 1))
        }
      }
      handlePayouts(coeff.profit, coeff.amount)
      setCoeff(null)
    }
  }, [coeff])
  useEffect(() => {
    if (
      (result !== null && result?.type === 'Bet') ||
      result?.type === 'MakeBet'
    ) {
      const fullAmount = Number(result.amount) * result.num_games!
      const outcomesArray = JSON.parse((result as any).outcomes)
      setOutcomes(outcomesArray)
      if (
        Number(result.profit) > fullAmount ||
        Number(result.profit) === fullAmount
      ) {
        setTimeout(() => {
          setGameStatus(GameModel.GameStatus.Won)

          const multiplier = Number(Number(result.profit) / fullAmount)
          pickSide(pickedSide)
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: 'DRAX'
          })
          setIsPlaying(false)
          setInGame(false)
          setCoeff({
            profit: (result as any).profits,
            amount: fullAmount
          })
        }, 2000)
      } else if (Number(result.profit) < fullAmount) {
        setTimeout(() => {
          setGameStatus(GameModel.GameStatus.Lost)
          pickSide(pickedSide ^ 1)
          setIsPlaying(false)
          setInGame(false)
          setLostStatus(Number(result.profit) - fullAmount)
          setCoeff({
            profit: (result as any).profits,
            amount: Number((result as any).amount)
          })
        }, 2000)
      } else {
        setGameStatus(GameModel.GameStatus.Draw)
        setIsPlaying(false)
        setInGame(false)
      }
      setResult(null)
    }
  }, [result?.timestamp, result, gameStatus])

  useEffect(() => {
    if (isPlaying) {
      setInGame(true)
    }
  }, [isPlaying])

  const [inGame, setInGame] = useState<boolean>(false)

  const [numSectors, setNumSectors] = useState(0)

  useEffect(() => {
    setNumSectors(pickedValue / 10)
  }, [pickedValue])

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])

  const [localNumber, setLocalNumber] = useState<number | null>(null)
  const [coefficientData, setCoefficientData] = useState<number[]>([])

  const [outcomes, setOutcomes] = useState<number[]>([])

  useEffect(() => {
    setActivePicker(true)
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide)
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1)
    }
  }, [gameStatus])

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

  const [count, setCount] = useState(10)
  const [levelCoef, setLevelCoef] = useState<IWheelCoef[]>([
    { value: 0.0, color: WHITE_COLOR },
    { value: 1.2, color: BLUE_COLOR },
    { value: 1.5, color: GREEN_COLOR }
  ])

  useEffect(() => {
    setCoefLevel({ setLevelCoef, level, pickedValue })
  }, [level, pickedValue])
  const [segColors, setSegColors] = useState<IWheelColors[]>([])
  const [easy10SegColors, setEasy10SegColors] = useState<IWheelColors[]>([])
  const [easy20SegColors, setEasy20SegColors] = useState<IWheelColors[]>([])
  const [easy30SegColors, setEasy30SegColors] = useState<IWheelColors[]>([])
  const [easy40SegColors, setEasy40SegColors] = useState<IWheelColors[]>([])
  const [easy50SegColors, setEasy50SegColors] = useState<IWheelColors[]>([])

  const [medium10SegColors, setMedium10SegColors] = useState<IWheelColors[]>([])
  const [medium20SegColors, setMedium20SegColors] = useState<IWheelColors[]>([])
  const [medium30SegColors, setMedium30SegColors] = useState<IWheelColors[]>([])
  const [medium40SegColors, setMedium40SegColors] = useState<IWheelColors[]>([])
  const [medium50SegColors, setMedium50SegColors] = useState<IWheelColors[]>([])

  const [hard10SegColors, setHard10SegColors] = useState<IWheelColors[]>([])
  const [hard20SegColors, setHard20SegColors] = useState<IWheelColors[]>([])
  const [hard30SegColors, setHard30SegColors] = useState<IWheelColors[]>([])
  const [hard40SegColors, setHard40SegColors] = useState<IWheelColors[]>([])
  const [hard50SegColors, setHard50SegColors] = useState<IWheelColors[]>([])

  // Easy level

  useEffect(() => {
    if (easy10SegColors?.length < 11) {
      setEasy10SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(10, 1)
      ])
    }
    if (easy20SegColors?.length < 21) {
      setEasy20SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(20, 1)
      ])
    }
    if (easy30SegColors?.length < 31) {
      setEasy30SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(30, 1)
      ])
    }
    if (easy40SegColors?.length < 41) {
      setEasy40SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(40, 1)
      ])
    }
    if (easy50SegColors?.length < 51) {
      setEasy50SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(50, 1)
      ])
    }
  }, [easy10SegColors?.length])

  // Medium level

  useEffect(() => {
    setMediumLevel({
      medium10SegColors,
      medium20SegColors,
      medium30SegColors,
      medium40SegColors,
      medium50SegColors,
      setMedium10SegColors,
      setMedium20SegColors,
      setMedium30SegColors,
      setMedium40SegColors,
      setMedium50SegColors
    })
  }, [medium10SegColors?.length])

  //hard lvl
  useEffect(() => {
    setHardLevel({
      hard10SegColors,
      hard20SegColors,
      hard30SegColors,
      hard40SegColors,
      hard50SegColors,
      setHard10SegColors,
      setHard20SegColors,
      setHard30SegColors,
      setHard40SegColors,
      setHard50SegColors
    })
  }, [hard10SegColors?.length])

  useEffect(() => {
    if (level === 'Easy') {
      if (pickedValue === 10) {
        setSegColors(easy10SegColors)
      } else if (pickedValue === 20) {
        setSegColors(easy20SegColors)
      } else if (pickedValue === 30) {
        setSegColors(easy30SegColors)
      } else if (pickedValue === 40) {
        setSegColors(easy40SegColors)
      } else if (pickedValue === 50) {
        setSegColors(easy50SegColors)
      }
    } else if (level === 'Medium') {
      if (pickedValue === 10) {
        setSegColors(medium10SegColors)
      } else if (pickedValue === 20) {
        setSegColors(medium20SegColors)
      } else if (pickedValue === 30) {
        setSegColors(medium30SegColors)
      } else if (pickedValue === 40) {
        setSegColors(medium40SegColors)
      } else if (pickedValue === 50) {
        setSegColors(medium50SegColors)
      }
    } else if (level === 'Hard') {
      if (pickedValue === 10) {
        setSegColors(hard10SegColors)
      } else if (pickedValue === 20) {
        setSegColors(hard20SegColors)
      } else if (pickedValue === 30) {
        setSegColors(hard30SegColors)
      } else if (pickedValue === 40) {
        setSegColors(hard40SegColors)
      } else if (pickedValue === 50) {
        setSegColors(hard50SegColors)
      }
    }
  }, [pickedValue, level, easy10SegColors])

  const [highlightIndex, setHighlightIndex] = useState<number[]>([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHighlightIndex(prev => {
        if (prev.length === 25) {
          return []
        } else {
          return [...prev, prev.length + 1]
        }
      })
    }, 250)

    return () => {
      clearInterval(intervalId)
      setHighlightIndex([])
    }
  }, [])

  const [inSpeen, setInSpeen] = useState(false)

  const [testInGame, setTestInGame] = useState(false)

  const [lastNum, setLastNum] = useState<null | number>(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  const startAnimation = () => {
    if (currentIndex < outcomes.length) {
      setTimeout(() => {
        setLastNum(-1)
        setTimeout(() => setLastNum(outcomes[currentIndex]), 0)
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, 1500)
    } else {
      // Animation for all elements in the array is complete
      setTimeout(() => {
        setCurrentIndex(0) // Reset the index for future animations
        setTestInGame(false)
        setOutcomes([])
      }, 1500)
    }
  }

  useEffect(() => {
    if (outcomes?.length > 0) {
      startAnimation()
    }
  }, [outcomes?.length, currentIndex])

  const [betData, setBetData] = useState({})

  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'Wheel')?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"risk":${
        level === 'Easy' ? 0 : level === 'Medium' ? 1 : 2
      }, "num_sectors":${numSectors - 1}}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
  }, [stopGain, stopLoss, pickedSide, cryptoValue, betsAmount, isDrax])

  const [subscribed, setCubscribed] = useState(false)

  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      if (!subscribed) {
        socket.send(
          JSON.stringify({
            type: 'SubscribeBets',
            payload: [gamesList.find(item => item.name === 'Wheel')?.id]
          })
        )
        setCubscribed(true)
      }
      socket.send(JSON.stringify(betData))
    }
  }, [socket, isPlaying, access_token])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'Wheel' })
  }, [])

  return (
    <section
      onClick={() => {
        setCount(prev => prev + 2)
        setTestInGame(prev => !prev)
      }}
      className='w-full h-full relative flex flex-col overflow-hidden flex-[1_1_auto] items-center justify-center'
    >
      <ReactHowler
        src={'/music/wheel.mp3'}
        playing={
          (inGame ||
            (outcomes.length > 0 && lastNum !== null && lastNum > -1)) &&
          playSounds !== 'off'
        }
        rate={2}
      />
      <div className='absolute w-full h-full left-0 top-0 z-[-1]'>
        <Image
          src={bg}
          className='absolute w-full h-full object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-0 sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]'
          alt='table-bg'
          width={1418}
          height={680}
          quality={100}
        />
      </div>
      <div className='flex flex-col items-center w-full h-full justify-center'>
        <div className='w-[280.959px] h-[280.959px] sm:w-[360px] sm:h-[360px] xl:w-[495px] xl:h-[495px] relative'>
          <div className='top-[9px] h-[23.209px] w-[15.473px] sm:top-1 sm:w-[18.928px] sm:h-[28.392px] z-[2] xl:w-[26px] xl:h-[39px] xl:top-[0px] -translate-x-1/2 left-1/2 absolute'>
            <PickerSVG className='w-[15.473px] h-[23.209px] sm:w-[18.928px] sm:h-[18.392px] xl:w-[26px] xl:h-[26px] -top-[10px] sm:-top-1 relative' />
            <CircleSVG
              className={cn(
                'relative left-1/2 -translate-x-1/2 -translate-y-[9px] ] w-[5px] h-[10px] sm:h-[14px] sm:w-[7px]  xl:w-auto',

                inGame ||
                  (outcomes.length > 0 && lastNum !== null && lastNum > -1)
                  ? '-top-2 sm:top-[1px] xl:top-[6.5px] -rotate-[30deg] animate-[pick-animation_0.15s_infinite_steps(2)]'
                  : '-top-[7px] sm:top-0'
              )}
            />
          </div>
          <div
            className={cn(
              'w-[107.195px] h-[107.195px] text-xl sm:h-[131.132px] sm:w-[131.132px] sm:text-2xl xl:w-[180.126px] xl:h-[180.126px] xl:text-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#181724] border-[2px] border-[#2c2a45] flex justify-center items-center text-[#d7e8f1] shadow-[0px_0px_15px_rgba(255,255,255,0.4)] font-extrabold rounded-[50%] z-[2]',
              level === 'Hard' &&
                coefficientData[0] > 0 &&
                coefficientData[0] < 10 &&
                'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
              level === 'Hard' &&
                coefficientData[0] > 11 &&
                'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
              level === 'Easy' &&
                coefficientData[0] > 1.3 &&
                'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
              level === 'Easy' &&
                coefficientData[0] > 0 &&
                coefficientData[0] < 1.3 &&
                'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
              level === 'Medium' &&
                coefficientData[0] > 0 &&
                coefficientData[0] < 1.6 &&
                'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
              level === 'Medium' &&
                coefficientData[0] == 2 &&
                'text-[#fbc02e] shadow-[0px_0px_10px_rgba(251,192,46,0.3)]',
              (pickedValue === 10 ||
                pickedValue === 20 ||
                pickedValue === 30) &&
                level === 'Medium' &&
                coefficientData[0] < 1.6 &&
                coefficientData[0] > 0 &&
                'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
              (pickedValue === 10 ||
                pickedValue === 20 ||
                pickedValue === 30) &&
                level === 'Medium' &&
                coefficientData[0] < 2 &&
                coefficientData[0] > 1.6 &&
                'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
              (pickedValue === 40 || pickedValue === 50) &&
                level === 'Medium' &&
                coefficientData[0] == 3 &&
                'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
              (pickedValue === 10 ||
                pickedValue === 20 ||
                pickedValue === 30) &&
                level === 'Medium' &&
                coefficientData[0] == 3 &&
                'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
              level === 'Medium' &&
                pickedValue === 30 &&
                coefficientData[0] == 4 &&
                'text-[red]',
              level === 'Medium' &&
                pickedValue === 40 &&
                coefficientData[0] == 1.6 &&
                'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
              level === 'Medium' &&
                pickedValue === 50 &&
                coefficientData[0] == 5 &&
                'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
              level === 'Medium' &&
                coefficientData[0] < 0.1 &&
                'text-[#979797] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]',
              level === 'Hard' &&
                coefficientData[0] < 0.1 &&
                'text-[#979797] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]',
              level === 'Easy' &&
                coefficientData[0] < 0.1 &&
                'text-[#979797] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]'
            )}
          >
            {coefficientData[0]?.toFixed(2) || (0.0).toFixed(2)}x
          </div>
          {Array.from({ length: 24 }).map((_, i) => (
            <BallSVG
              className={cn(
                'wheel_ball',
                `wheel_ball_${i + 1}`,
                highlightIndex.find(el => el === i + 1) && 'shadow'
              )}
            />
          ))}
          <div
            className={cn(
              'wheel_wrapp',
              `wheel_wrapp_${pickedValue}`,
              lastNum !== null &&
                lastNum !== -1 &&
                `wheel_wrapp_${pickedValue}_${lastNum}`,
              inGame && 'animate-[rotate-2_2s_ease-in,rotate_7000s_2s_linear]'
            )}
          >
            <WheelCircle
              inSpeen={inSpeen}
              setInSpeen={setInSpeen}
              localNumber={localNumber || 0}
              count={pickedValue}
              segColors={segColors}
              winningSegment=''
              onFinished={(winner: any) => console.log(winner)}
              primaryColor='black'
              primaryColoraround='#ffffffb4'
              contrastColor='white'
              buttonText='Spin'
              isOnlyOnce={false}
              size={isMobile ? 110 : isDesktop ? 145 : 200}
              upDuration={50}
              downDuration={2000}
            />
          </div>
        </div>
        <div
          className={cn(
            '-bottom-[70px] w-[calc(100vw-20px)] sm:w-[calc(100vw-370px)] lg:w-[calc(100vw-750px)] gap-[5p] xl:gap-2.5 xl:w-[calc(100vw-885px)] duration-500 absolute flex left-1/2 -translate-x-1/2 scale-y-0 sm:-bottom-[50px] justify-center',
            true && 'scale-y-[1] sm:bottom-2.5'
          )}
        >
          {levelCoef.map((el, i) => (
            <div
              className={cn('wheel_coeff', `wheel_coeff_${el.color.slice(1)}`)}
              key={i}
            >
              <span> {el.value.toFixed(2)}x</span>
            </div>
          ))}
        </div>
        <Coefficient coefficientData={coefficientData} />
      </div>
    </section>
  )
}

export default WheelGame
