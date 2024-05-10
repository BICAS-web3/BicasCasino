import { T_Card } from '@/api'
import { GameModel } from '@/states'
import { GameStatus, IResult, Side, WonStatus } from '@/states/game_model.store'
import { Dispatch, SetStateAction } from 'react'

interface IHandleResult {
  title?: string
  result?: IResult | null
  setInGame?: Dispatch<SetStateAction<boolean>>
  setWaitingResponse?: Dispatch<SetStateAction<boolean>>
  setIsPlaying?: Dispatch<SetStateAction<boolean>>
  setGameStatus?: Dispatch<SetStateAction<GameStatus | null>>
  setWonStatus?: Dispatch<SetStateAction<WonStatus | null>>
  setLostStatus?: Dispatch<SetStateAction<number>>
  setKeep?: Dispatch<SetStateAction<boolean>>
  setFirstBet?: Dispatch<SetStateAction<boolean>>
  setUpdate?: Dispatch<SetStateAction<boolean>>
  setActiveCards?: Dispatch<SetStateAction<T_Card[]>>
  setShowFlipCards?: Dispatch<SetStateAction<boolean>>
  setCoefficientData?: Dispatch<SetStateAction<number[]>>
  setLocalNumber?: Dispatch<SetStateAction<number>>
  pickSide?: Dispatch<SetStateAction<Side>>
  pickedSide?: Side
}

export function handleResult({
  title,
  result,
  setInGame,
  setWaitingResponse,
  setIsPlaying,
  setGameStatus,
  setWonStatus,
  setLostStatus,
  setKeep,
  setFirstBet,
  setUpdate,
  setActiveCards,
  setShowFlipCards,
  setCoefficientData,
  setLocalNumber,
  pickSide,
  pickedSide
}: IHandleResult) {
  if (!result) return
  if (result.type === 'State' && result.state) {
    const dataState = JSON.parse(result.state).cards_in_hand
    setFirstBet?.(false)
    setShowFlipCards?.(true)
    setWaitingResponse?.(false)
    setActiveCards?.(dataState)
    setKeep?.(true)
    setIsPlaying?.(true)
    setUpdate?.(prev => !prev)
    if (result?.amount) {
      setIsPlaying?.(true)
    }
  } else if (result.type === 'Bet') {
    if (title === 'rps' && setCoefficientData) {
      const fullAmount = Number(result.amount) * result.num_games!
      setCoefficientData(prev => [
        fullAmount === 0 ? 0 : Number(result.profit) / fullAmount,
        ...prev
      ])
    }
    setKeep?.(false)
    setFirstBet?.(true)
    setWaitingResponse?.(false)
    const fullAmount = Number(result.amount) * result.num_games!
    const parseArr = JSON.parse(result.profits)
    if (title === 'rocket') {
      const handleCall = () => {
        // alert(1)
        for (let i = 0; i < parseArr?.length; i++) {
          Promise.all([
            new Promise(resolve =>
              setTimeout(() => {
                const outCome = Number(parseArr[i]) / Number(result.amount)
                resolve(setCoefficientData?.(prev => [outCome, ...prev]))
              }, 700 * i)
            ),
            new Promise(resolve =>
              setTimeout(() => {
                const outCome = Number(parseArr[i]) / Number(result.amount)
                resolve(setLocalNumber?.(outCome))
              }, 700 * i)
            )
          ])
        }
      }
      handleCall()
    }
    if (
      Number(result.profit) > Number(result.amount) ||
      Number(result.profit) === Number(result.amount)
    ) {
      setGameStatus?.(GameModel.GameStatus.Won)

      const multiplier = Number(result.profit) / Number(result.amount)
      setWonStatus?.({
        profit: Number(result.profit),
        multiplier,
        token: 'DRAX'
      })
      if (title === 'rocket' || title === 'rps') {
        setIsPlaying?.(false)
        setInGame?.(false)
      }
      if (title === 'poker') {
        setTimeout(() => {
          setInGame?.(false)
          setIsPlaying?.(false)
          setKeep?.(false)
          setFirstBet?.(true)
        }, 200)
      }
    } else {
      setGameStatus?.(GameModel.GameStatus.Lost)
      setLostStatus?.(Number(result.profit) - Number(result.amount))
      if (title === 'rocket' || title === 'rps') {
        setLostStatus?.(Number(result.profit) - fullAmount)
        pickedSide && pickSide?.(pickedSide ^ 1)
        setIsPlaying?.(false)
        setInGame?.(false)
      }
      if (title === 'poker') {
        setTimeout(() => {
          setInGame?.(false)
          setIsPlaying?.(false)
          setKeep?.(false)
          setFirstBet?.(true)
        }, 200)
      }
    }
  }
}
