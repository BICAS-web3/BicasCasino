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
  // alert(JSON.stringify(initialPickedTiles))
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
  gameField
}: IHandleResult) {
  if (!result) return
  const fullAmount = Number(result.amount) * result.num_games!
  setTimeout(() => {
    setCoefficientData(prev => [Number(result.profit) / fullAmount, ...prev])
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
  } else if (Number(result.profit) < Number(result.amount)) {
    setTimeout(() => {
      setWaitingResponse(false)
      setGameStatus(GameModel.GameStatus.Lost)
      setInGame(false)
      setLostStatus(Number(result.profit) - Number(result.amount))
    }, 2500)
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

// export function handleResult({
//   result,
//   setInGame,
//   setWaitingResponse,
//   setGameStatus,
//   setWonStatus,
//   setLostStatus,
//   setKeep,
//   setCoefficientData,
//   setCryptoValue,
//   setTotalOpenedTiles,
//   triggerRedraw,
//   setStopWinning,
//   setGameField,
//   setPickedTiles,
//   gameField
// }: IHandleResult) {
//   if (!result) return
//   if (result.type === 'State' && result.state) {
//     // alert('State')
//     const dataState = JSON.parse(result.state)
//     setKeep(true)
//     if (Number(result.amount) > 0) {
//       setCryptoValue(Number(result.amount))
//       const newGameField = gameField.map((value, index) => {
//         if (dataState?.mines[index]) {
//           return Tile.Bomb
//         } else if (dataState?.state[index]) {
//           return Tile.Coin
//         } else {
//           return value
//         }
//       })
//       setWaitingResponse(false)
//       setGameField(newGameField)
//       setTotalOpenedTiles(0)
//       setPickedTiles([...initialPickedTiles])
//     }
//   } else if (result.type === 'Bet' && result.state) {
//     const fullAmount = Number(result.amount) * result.num_games!
//     setCoefficientData(prev => [Number(result.profit) / fullAmount, ...prev])
//     const data = JSON.parse(result!.state)
//     const newGameField = gameField.map((value, index) => {
//       if (data?.mines[index]) {
//         return Tile.Bomb
//       } else if (data?.state[index]) {
//         return Tile.Coin
//       } else {
//         return value
//       }
//     })
//     setWaitingResponse(false)
//     setGameField(newGameField)
//     setTotalOpenedTiles(0)
//     setPickedTiles([...initialPickedTiles])
//     setTimeout(() => {
//       setInGame(false)
//       triggerRedraw(true)
//       setGameField(initialGameField)
//       setPickedTiles(initialPickedTiles)
//       // setGameFields({
//       //   revealedTiles: initialPickedTiles,
//       //   tilesPicked: [...initialPickedTiles],
//       //   setGameField,
//       //   setPickedTiles
//       // })
//     }, 2000)
//     if (
//       Number(result.profit) > Number(result.amount) ||
//       Number(result.profit) === Number(result.amount)
//     ) {
//       setGameStatus(GameModel.GameStatus.Won)
//       const multiplier = Number(Number(result.profit) / Number(result.amount))
//       setWonStatus({
//         profit: Number(result.profit),
//         multiplier,
//         token: 'DRAX'
//       })
//       setInGame(false)
//     } else if (Number(result.profit) < Number(result.amount)) {
//       setGameStatus(GameModel.GameStatus.Lost)
//       // setStopWinning('NO')
//       setInGame(false)
//       setLostStatus(Number(result.profit) - Number(result.amount))
//     } else {
//       setGameStatus(GameModel.GameStatus.Draw)
//       // setStopWinning('NO')
//       setInGame(false)
//     }
//     // setKeep(false)
//   }
// }
