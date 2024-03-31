'use client'

import { useSocket } from '@/components/providers/socket.provider'
import Preload from '@/components/ui/preload'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ReactHowler from 'react-howler'
import Wheel from './components/Wheel'
import TotalCoeff from '@/components/ui/total.coeff'
import bg from '@/public/images/wheel_images/bg.webp'
import './styles.scss'

interface IWheelColors {
  segment: '#100C1E' | '#1F1435'
  border: string
}

interface IWheelCoef {
  color: string
  value: number
}

const WheelGame = () => {
  const isDesktop = useMediaQuery('(max-width: 1280px)')
  const isMobile = useMediaQuery('(max-width: 650px)')
  const WHITE_COLOR = '#D7E8F1'
  const GREEN_COLOR = '#3ECF55'
  const BLUE_COLOR = '#2C589B'
  const PURPLE_COLOR = '#FB2E90'
  const YELLOW_COLOR = '#FBC02E'
  const [level] = useUnit([GameModel.$level])
  const [isLoading, setIsLoading] = useState(true)

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
    userInfo
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
    UserModel.$userInfo
  ])

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
        // alert("draw");
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

  const [imageLoading_1, setImageLoading_1] = useState(true)

  useEffect(() => {
    if (!imageLoading_1) {
      setIsLoading(imageLoading_1)
    }
  }, [imageLoading_1])
  const [count, setCount] = useState(10)
  const [levelCoef, setLevelCoef] = useState<IWheelCoef[]>([
    { value: 0.0, color: WHITE_COLOR },
    { value: 1.2, color: BLUE_COLOR },
    { value: 1.5, color: GREEN_COLOR }
  ])

  useEffect(() => {
    if (level === 'Easy') {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 1.2, color: BLUE_COLOR },
        { value: 1.5, color: GREEN_COLOR }
      ])
    } else if (level === 'Medium') {
      if (pickedValue === 10) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.9, color: PURPLE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: GREEN_COLOR }
        ])
      } else if (pickedValue === 20) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.8, color: PURPLE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: GREEN_COLOR }
        ])
      } else if (pickedValue === 30) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.7, color: PURPLE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: GREEN_COLOR },
          { value: 4.0, color: '#FF0000' }
        ])
      } else if (pickedValue === 40) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.6, color: GREEN_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: PURPLE_COLOR }
        ])
      } else if (pickedValue === 50) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: PURPLE_COLOR },
          { value: 5.0, color: GREEN_COLOR }
        ])
      }
    } else {
      if (pickedValue === 10) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 9.9, color: BLUE_COLOR }
        ])
      } else if (pickedValue === 20) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 19.8, color: PURPLE_COLOR }
        ])
      } else if (pickedValue === 30) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 29.7, color: PURPLE_COLOR }
        ])
      } else if (pickedValue === 40) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 39.6, color: PURPLE_COLOR }
        ])
      } else if (pickedValue === 50) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 49.5, color: PURPLE_COLOR }
        ])
      }
    }
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
  const generateSegmentColors_easy = (
    count: number,
    greenIndex: number
  ): IWheelColors[] => {
    return Array.from({ length: count }).map((_, el: number) => {
      if ([1, 11, 21, 31, 41].includes(el)) {
        return {
          segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
          border: GREEN_COLOR
        }
      } else if ([0, 5, 10, 15, 20, 25, 30, 35, 40, 45].includes(el)) {
        return {
          segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
          border: WHITE_COLOR
        }
      } else {
        return {
          segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
          border: BLUE_COLOR
        }
      }
    })
  }

  useEffect(() => {
    console.log(1)
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
    if (medium10SegColors?.length < 11) {
      Array.from({ length: 10 }).map((_, el: number) => {
        if (el === 2) {
          setMedium10SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else if (el === 0) {
          setMedium10SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: GREEN_COLOR
              }
            ]
          })
        } else if (el === 6) {
          setMedium10SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: YELLOW_COLOR
              }
            ]
          })
        } else if (el === 4 || el === 8) {
          setMedium10SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: BLUE_COLOR
              }
            ]
          })
        } else {
          setMedium10SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (medium20SegColors?.length < 21) {
      Array.from({ length: 20 }).map((_, el: number) => {
        if (el === 1 || el === 9) {
          setMedium20SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: BLUE_COLOR
              }
            ]
          })
        } else if (el === 13) {
          setMedium20SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else if (el === 11) {
          setMedium20SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: GREEN_COLOR
              }
            ]
          })
        } else if (
          el === 3 ||
          el === 5 ||
          el === 7 ||
          el === 15 ||
          el === 17 ||
          el === 19
        ) {
          setMedium20SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: YELLOW_COLOR
              }
            ]
          })
        } else {
          setMedium20SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (medium30SegColors?.length < 31) {
      Array.from({ length: 30 }).map((_, el: number) => {
        if (el === 23) {
          setMedium30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else if (el === 15) {
          setMedium30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: GREEN_COLOR
              }
            ]
          })
        } else if (el === 25) {
          setMedium30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: 'red'
              }
            ]
          })
        } else if (
          el === 5 ||
          el === 9 ||
          el === 11 ||
          el === 19 ||
          el === 21 ||
          el === 29
        ) {
          setMedium30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: YELLOW_COLOR
              }
            ]
          })
        } else if (
          el === 1 ||
          el === 3 ||
          el === 7 ||
          el === 13 ||
          el === 17 ||
          el === 27
        ) {
          setMedium30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: BLUE_COLOR
              }
            ]
          })
        } else {
          setMedium30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (medium40SegColors?.length < 41) {
      Array.from({ length: 40 }).map((_, el: number) => {
        if (el === 3 || el === 9 || el === 19 || el === 33) {
          setMedium40SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else if (el === 27) {
          setMedium40SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: GREEN_COLOR
              }
            ]
          })
        } else if (
          el === 1 ||
          el === 5 ||
          el === 15 ||
          el === 23 ||
          el === 25 ||
          el === 29 ||
          el === 37
        ) {
          setMedium40SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: YELLOW_COLOR
              }
            ]
          })
        } else if (
          el === 7 ||
          el === 11 ||
          el === 13 ||
          el === 17 ||
          el === 21 ||
          el === 31 ||
          el === 35 ||
          el === 39
        ) {
          setMedium40SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: BLUE_COLOR
              }
            ]
          })
        } else {
          setMedium40SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (medium50SegColors?.length < 51) {
      Array.from({ length: 50 }).map((_, el: number) => {
        if (el === 9 || el === 19 || el === 33) {
          setMedium50SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else if (el === 43) {
          setMedium50SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: GREEN_COLOR
              }
            ]
          })
        } else if (
          el === 1 ||
          el === 5 ||
          el === 15 ||
          el === 23 ||
          el === 27 ||
          el === 29 ||
          el === 37 ||
          el === 47
        ) {
          setMedium50SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: YELLOW_COLOR
              }
            ]
          })
        } else if (
          el === 3 ||
          el === 7 ||
          el === 11 ||
          el === 13 ||
          el === 17 ||
          el === 21 ||
          el === 25 ||
          el === 31 ||
          el === 35 ||
          el === 39 ||
          el === 41 ||
          el === 45 ||
          el === 49
        ) {
          setMedium50SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: BLUE_COLOR
              }
            ]
          })
        } else {
          setMedium50SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
  }, [medium10SegColors?.length])
  //hard lvl
  useEffect(() => {
    if (hard10SegColors?.length < 11) {
      Array.from({ length: 10 }).map((_, el: number) => {
        if (el === 0) {
          setHard10SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: BLUE_COLOR
              }
            ]
          })
        } else {
          setHard10SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (hard20SegColors?.length < 21) {
      Array.from({ length: 20 }).map((_, el: number) => {
        if (el === 0) {
          setHard20SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else {
          setHard20SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (hard30SegColors?.length < 31) {
      Array.from({ length: 30 }).map((_, el: number) => {
        if (el === 0) {
          setHard30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else {
          setHard30SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (hard40SegColors?.length < 41) {
      Array.from({ length: 40 }).map((_, el: number) => {
        if (el === 0) {
          setHard40SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else {
          setHard40SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
    if (hard50SegColors?.length < 51) {
      Array.from({ length: 50 }).map((_, el: number) => {
        if (el === 0) {
          setHard50SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: PURPLE_COLOR
              }
            ]
          })
        } else {
          setHard50SegColors(prev => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
                border: WHITE_COLOR
              }
            ]
          })
        }
      })
    }
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
          return [] // Reset to [1] after reaching length 6
        } else {
          return [...prev, prev.length + 1]
        }
      })
    }, 250)

    return () => {
      clearInterval(intervalId) // вCleanup interval on component unmount
      setHighlightIndex([]) // Reset state when component is unmounted
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

  const [gamesList] = useUnit([GameModel.$gamesList])
  const [access_token] = useUnit([RegistrModel.$access_token])
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'Wheel')?.id]
  }

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
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Wheel')?.id]
        })
      )
    }
  }, [])

  return (
    <section
      onClick={() => {
        setCount(prev => prev + 2)
        setTestInGame(prev => !prev)
        // setDone(true);
      }}
      className='w-full h-full relative flex flex-col overflow-hidden'
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
      {isLoading && <Preload />}
      {/* <WagerLowerBtnsBlock
          className={s.sound_mobile}
          showInfo={false}
          game='wheel'
          text={gameText}
        /> */}
      <div className='absolute w-full h-full left-0 top-0 z-[-1]'>
        <Image
          onLoad={() => setImageLoading_1(false)}
          src={bg}
          className='absolute w-full h-full object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-0 sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]'
          alt='table-bg'
          width={1418}
          height={680}
          quality={100}
        />
      </div>
      <div className='flex flex-col items-center w-full h-full justify-center'>
        {/* <div className={s.total_container}>
          <span className={s.total_won}>{fullWon.toFixed(2)}</span>
          <span className={s.total_lost}>{fullLost.toFixed(2)}</span>
          <div>
            Total:&nbsp;
            <span
              className={cn(
                totalValue > 0 && s.total_won,
                totalValue < 0 && s.total_lost
              )}
            >
              {Math.abs(totalValue).toFixed(2)}
            </span>
          </div>
        </div> */}
        <TotalCoeff
          fullLost={fullLost}
          fullWon={fullWon}
          totalValue={totalValue}
        />
        <div className='w-[280.959px] h-[280.959px] sm:w-[360px] sm:h-[360px] xl:w-[495px] xl:h-[495px] relative'>
          <div className='top-[3px] h-[23.209px] w-[15.473px] sm:top-2 sm:w-[18.928px] sm:h-[28.392px] z-[2] xl:w-[26px] xl:h-[39px] xl:top-1.5 -translate-x-1/2 left-1/2 absolute'>
            <svg
              className='w-[15.473px] h-[23.209px] sm:w-[18.928px] sm:h-[18.392px] xl:w-[26px] xl:h-[26px]'
              width='26'
              height='26'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='13' cy='13' r='13' fill='#EF8CFF' />
              <circle cx='13' cy='13' r='8' fill='#983DC2' />
            </svg>
            <svg
              className={cn(
                'relative left-1/2 -translate-x-1/2 -translate-y-[9px] -top-[7px] w-[5px] sm:w-[7px] sm:top-0 xl:w-auto',
                inGame &&
                  'animate-[pick-animation_0.15s_infinite_steps(2)] top-[5px] -translate-x-1/2 -rotate-[40deg]',
                outcomes.length > 0 &&
                  lastNum !== null &&
                  lastNum > -1 &&
                  'animate-[pick-animation 0.15s 0.3s infinite steps(2)] top-[5px] -translate-x-1/2 -rotate-[40deg]'
              )}
              width='10'
              height='14'
              viewBox='0 0 10 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M9.64648 0H0L4.82324 13.9238L9.64648 0Z'
                fill='#EF8CFF'
              />
            </svg>
          </div>
          <div className='w-[107.195px] h-[107.195px] text-xl sm:h-[131.132px] sm:w-[131.132px] sm:text-2xl xl:w-[180.126px] xl:h-[180.126px] xl:text-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#181724] border-[2px] border-[#2c2a45] flex justify-center items-center text-[#d7e8f1] shadow-[0px_0px_15px_rgba(255,255,255,0.4)] font-extrabold rounded-[50%] z-[2]'>
            {localNumber?.toFixed(2) || (0.0).toFixed(2)}x
          </div>
          {/* {Array.from({ length: 24 }).map((_, i) => (
            <BallIcon
              className={cn(
                s.wheel_ball,
                s[`wheel_ball_${i + 1}`],
                highlightIndex.find(el => el === i + 1) &&
                  'drop-shadow-[(0px_0px_11px_#e9e9e9)]'
              )}
            />
          ))} */}
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
            <Wheel
              inSpeen={inSpeen}
              setInSpeen={setInSpeen}
              localNumber={localNumber || 0}
              count={pickedValue}
              // segments={segments}
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
            ' -bottom-[70px] w-[calc(100vw-20px)] sm:w-[calc(100vw-370px)] lg:w-[calc(100vw-750px)] gap-[5p] xl:gap-2.5 xl:w-[calc(100vw-885px)] duration-500 absolute flex left-1/2 -translate-x-1/2 scale-y-0 sm:-bottom-[50px] justify-center',
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
        <div className='w-[calc(100%-20px)] top-2.5 sm:w-[calc(100%-262px)] xl:w-[calc(100%-358px)] 3xl:w-[calc(100%-398px)] gap-2.5 overflow-x-scroll flex flex-row-reverse -translate-x-1/2 absolute t-5 left-1/2'>
          {coefficientData
            // .sort((a, b) => b - a)
            .map((item, i) => (
              <div
                className={cn(
                  'font-extrabold text-[0.9375rem] h-[30px] w-20 xl:h-10 xl:w-[70px] rounded-[5px] flex justify-center items-center px-2.5 xl:text-lg bg-[rgba(60,56,74,0.49)]',

                  level === 'Hard' &&
                    item > 0 &&
                    item < 10 &&
                    'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
                  level === 'Hard' &&
                    item > 11 &&
                    'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
                  level === 'Easy' &&
                    item > 1.3 &&
                    'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
                  level === 'Easy' &&
                    item > 0 &&
                    item < 1.3 &&
                    'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
                  level === 'Medium' &&
                    item > 0 &&
                    item < 1.6 &&
                    'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
                  level === 'Medium' &&
                    item == 2 &&
                    'text-[#fbc02e] shadow-[0px_0px_10px_rgba(251,192,46,0.3)]',
                  (pickedValue === 10 ||
                    pickedValue === 20 ||
                    pickedValue === 30) &&
                    level === 'Medium' &&
                    item < 1.6 &&
                    item > 0 &&
                    'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
                  (pickedValue === 10 ||
                    pickedValue === 20 ||
                    pickedValue === 30) &&
                    level === 'Medium' &&
                    item < 2 &&
                    item > 1.6 &&
                    'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
                  (pickedValue === 40 || pickedValue === 50) &&
                    level === 'Medium' &&
                    item == 3 &&
                    'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
                  (pickedValue === 10 ||
                    pickedValue === 20 ||
                    pickedValue === 30) &&
                    level === 'Medium' &&
                    item == 3 &&
                    'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
                  level === 'Medium' &&
                    pickedValue === 30 &&
                    item == 4 &&
                    'text-[red]',
                  level === 'Medium' &&
                    pickedValue === 40 &&
                    item == 1.6 &&
                    'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
                  level === 'Medium' &&
                    pickedValue === 50 &&
                    item == 5 &&
                    'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
                  level === 'Medium' &&
                    item < 0.1 &&
                    'text-[#d7e8f1] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]',
                  level === 'Hard' &&
                    item < 0.1 &&
                    'text-[#d7e8f1] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]',
                  level === 'Easy' &&
                    item < 0.1 &&
                    'text-[#d7e8f1] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]'
                )}
                key={i}
              >
                {item?.toFixed(2)}x
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default WheelGame
