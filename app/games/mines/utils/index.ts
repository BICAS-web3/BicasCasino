import { T_Card } from '@/api'
import { GameModel } from '@/states'
import {
  GameStatus,
  IResult,
  Side,
  WinningType,
  WonStatus
} from '@/states/game_model.store'
import { Dispatch, SetStateAction } from 'react'
import { Tile, initialPickedTiles } from '../data'

interface IHandleResult {
  result: IResult | null
  setInGame: Dispatch<SetStateAction<boolean>>
  setWaitingResponse: Dispatch<SetStateAction<boolean>>
  setGameStatus: Dispatch<SetStateAction<GameStatus | null>>
  setWonStatus: Dispatch<SetStateAction<WonStatus | null>>
  setLostStatus: Dispatch<SetStateAction<number>>
  setKeep: Dispatch<SetStateAction<boolean>>
  setCoefficientData: Dispatch<SetStateAction<number[]>>
  setCryptoValue: Dispatch<SetStateAction<number>>
  setTotalOpenedTiles: Dispatch<SetStateAction<number>>
  triggerRedraw: Dispatch<SetStateAction<boolean>> //----
  setStopWinning: Dispatch<SetStateAction<WinningType>>
  setGameField: Dispatch<SetStateAction<Tile[]>>
  setPickedTiles: Dispatch<SetStateAction<boolean[]>>
  setGameFields: (
    revealedTiles: boolean[],
    tilesPicked: boolean[] | undefined
  ) => number
  gameField: Tile[]
}

export function handleResult({
  result,
  setInGame,
  setWaitingResponse,
  setGameStatus,
  setWonStatus,
  setLostStatus,
  setKeep,
  setCoefficientData,
  setCryptoValue,
  setTotalOpenedTiles,
  triggerRedraw,
  setStopWinning,
  setGameField,
  setPickedTiles,
  setGameFields,
  gameField
}: IHandleResult) {
  if (!result) return
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
    setCoefficientData(prev => [Number(result.profit) / fullAmount, ...prev])
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
      const multiplier = Number(Number(result.profit) / Number(result.amount))
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
