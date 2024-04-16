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
import { Tile, initialPickedTiles, maxReveal } from '../data'

export const setGameFields = ({
  revealedTiles,
  tilesPicked,
  setGameField,
  setPickedTiles
}: {
  revealedTiles: boolean[]
  tilesPicked: boolean[] | undefined
  setGameField: Dispatch<SetStateAction<Tile[]>>
  setPickedTiles: Dispatch<SetStateAction<boolean[]>>
}) => {
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
      setGameFields({
        revealedTiles: initialPickedTiles,
        tilesPicked: [...initialPickedTiles],
        setGameField,
        setPickedTiles
      })
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

export const pickTile = ({
  index,
  pickedTiles,
  totalOpenedTiles,
  setTotalOpenedTiles,
  gameField,
  musicType,
  playTileClick,
  triggerRedraw,
  pickedValue
}: {
  index: number
  pickedTiles: boolean[]
  totalOpenedTiles: number
  setTotalOpenedTiles: Dispatch<SetStateAction<number>>
  musicType: string
  gameField: Tile[]
  playTileClick: () => void
  triggerRedraw: Dispatch<SetStateAction<boolean>>
  pickedValue: number
}) => {
  if (gameField[index] == Tile.Closed) {
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
