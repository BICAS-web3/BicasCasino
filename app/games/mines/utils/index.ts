import { GameModel } from '@/states'
import { IHandleResult } from '@/types/games.types'
import { Dispatch, SetStateAction } from 'react'
import { Tile, initialGameField, maxReveal } from '../data'

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
  let openedTiles = 0
  setGameField(initialGameField)
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
  // if (tilesPicked) {
  //   setPickedTiles(tilesPicked)
  // }

  return openedTiles
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
  gameField,
  minesLose,
  minesWin,
  playSounds
}: IHandleResult) {
  if (!result) return
  const fullAmount = Number(result.amount) * result.num_games!
  setTimeout(() => {
    setCoefficientData(prev => [
      fullAmount === 0 ? 0 : Number(result.profit) / fullAmount,
      ...prev
    ])
  }, 1600)
  const data = JSON.parse(result!.state as string)
  const newGameField = gameField.map((value, index) => {
    if (data?.mines[index]) {
      return Tile.Bomb
    } else if (data?.state[index]) {
      return Tile.Coin
    } else {
      return value
    }
  })
  setWaitingResponse(true)
  Promise.all([
    new Promise(resolve =>
      setTimeout(() => resolve(setGameField(newGameField)), 1000)
    ),
    new Promise(resolve =>
      setTimeout(() => resolve(setWaitingResponse(false)), 1000)
    )
  ])

  setTotalOpenedTiles(0)
  setTimeout(() => {
    setInGame(false)
    triggerRedraw(true)
    setGameField(initialGameField)
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
  }, 2500)
  if (
    Number(result.profit) > Number(result.amount) ||
    Number(result.profit) === Number(result.amount)
  ) {
    setGameStatus(GameModel.GameStatus.Won)
    const multiplier = Number(Number(result.profit) / Number(result.amount))
    setWonStatus({
      profit: Number(result.profit),
      multiplier,
      token: 'DRAX'
    })
    setInGame(false)
    setTimeout(() => {
      playSounds !== 'off' && minesWin()
    }, 1000)
  } else if (Number(result.profit) < Number(result.amount)) {
    setTimeout(() => {
      setWaitingResponse(false)
      setGameStatus(GameModel.GameStatus.Lost)
      playSounds !== 'off' && minesLose()
      setInGame(false)
      setLostStatus(Number(result.profit) - Number(result.amount))
    }, 1000)
  } else {
    setGameStatus(GameModel.GameStatus.Draw)
    setInGame(false)
  }
}

export const pickTileforMine = ({
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
