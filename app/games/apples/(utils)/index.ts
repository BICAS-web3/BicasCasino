import { GameModel } from '@/states'
import {
  GameStatus,
  GamesList,
  IResult,
  WonStatus
} from '@/states/game_model.store'
import { Dispatch, SetStateAction } from 'react'
import { UserType } from '@/states/user_model.store'
import { IAppleData } from '@/types/games.types'

export const updateChunkedArray = (applesArr: number[]) => {
  const arr: { apples: number[]; cf: number }[] = []
  const chunkSize = 3

  for (let i = 0; i < applesArr.length; i += chunkSize) {
    const chunk = applesArr.slice(i, i + chunkSize)
    let cf = 0
    switch (i) {
      case 0:
        cf = 64
        break
      case 3:
        cf = 32
        break
      case 6:
        cf = 16
        break
      case 9:
        cf = 8
        break
      case 12:
        cf = 4
        break
      case 15:
        cf = 2
        break
      case 18:
        cf = 1.7
        break
      case 21:
        cf = 1.5
        break
      case 24:
        cf = 1.3
        break
      default:
        cf = 0
        break
    }

    arr.push({ apples: chunk, cf: cf })
  }

  return arr
}

// gameLogic.ts
export const handleGameResult = (
  result: IResult | null,
  start: boolean,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  setApples: Dispatch<SetStateAction<number[]>>,
  setMines: Dispatch<SetStateAction<boolean[][]>>,
  setAppleData: Dispatch<SetStateAction<IAppleData[]>>,
  setKeep: Dispatch<SetStateAction<boolean>>,
  setGameStatus: Dispatch<SetStateAction<GameStatus | null>>,
  setWonStatus: Dispatch<SetStateAction<WonStatus | null>>,
  setLostStatus: Dispatch<SetStateAction<number>>,
  setInGame: Dispatch<SetStateAction<boolean>>,
  setFirstBet: Dispatch<SetStateAction<boolean>>,
  handleReset: () => void,
  setStop: Dispatch<SetStateAction<boolean>>,
  setAppleItem: Dispatch<SetStateAction<number[]>>,
  setAppleGameResult: Dispatch<SetStateAction<number[]>>,
  setCryptoValue: Dispatch<SetStateAction<number>>,
  setStart: Dispatch<SetStateAction<boolean>>,
  setWaitingResponse: Dispatch<SetStateAction<boolean>>,
  setResult: Dispatch<SetStateAction<IResult | null>>,
  setCoefficientData: Dispatch<SetStateAction<number[]>>
) => {
  if (result) {
    if (result.type === 'State' && result.state) {
      const dataState = JSON.parse(result.state).state
      setCryptoValue(Number(result.amount))
      if (result?.amount && start) {
        setIsPlaying(true)
        setApples(JSON.parse(result.state).picked_tiles)
        setMines(dataState)
        setStart(false)
        setAppleData(
          dataState.map((_, i: number) => {
            return {
              value: 5,
              number: 1
            }
          })
        )
      }

      setMines(() => dataState)
      setKeep(true)
    } else if (result.type === 'Bet' && result.state) {
      const fullAmount = Number(result.amount) * result.num_games!
      setCoefficientData(prev => [
        fullAmount === 0 ? 0 : Number(result.profit) / fullAmount,
        ...prev
      ])
      setWaitingResponse(false)
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
      } else if (Number(result.profit) < Number(result.amount)) {
        const dataState = JSON.parse(result.state).state
        setApples(JSON.parse(result.state).picked_tiles)
        setMines(dataState)
        setGameStatus(GameModel.GameStatus.Lost)
        setLostStatus(Number(result.profit) - Number(result.amount))
      }
    }
  }
  setResult(null)
}

// betLogic.ts
export const generateBetData = (
  firstBet: boolean,
  keep: boolean,
  gamesList: GamesList[],
  isDrax: boolean,
  userInfo: UserType | null,
  cryptoValue: number,
  stopLoss: number | null,
  stopGain: number | null,
  betsAmount: number,
  isCashout: boolean,
  isPlaying: boolean,
  appleItem: number[],
  setContinue: Dispatch<SetStateAction<number>>,
  setFirstBet: Dispatch<SetStateAction<boolean>>,
  setKeep: Dispatch<SetStateAction<boolean>>
) => {
  if (firstBet) {
    if (isPlaying) {
      setFirstBet(false)
      setKeep(true)
    }
    return {
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'Apples')?.id || 14,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: '{"difficulty":1}',
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    }
  } else {
    if (keep) {
      setContinue(prev => prev + 1)
      return {
        type: 'ContinueGame',
        game_id: gamesList.find(item => item.name === 'Apples')?.id || 14,
        coin_id: isDrax ? 2 : 1,
        user_id: userInfo?.id || 0,
        data: isCashout
          ? `{"cashout":${isCashout}}`
          : `{"tile":${
              appleItem[appleItem?.length - 1]
            }, "cashout":${isCashout}}`
      }
    } else {
      return {
        type: 'MakeBet',
        game_id: gamesList.find(item => item.name === 'Apples')?.id || 14,
        coin_id: isDrax ? 2 : 1,
        user_id: userInfo?.id || 0,
        data: '{"difficulty":1}',
        amount: `${cryptoValue || 0}`,
        stop_loss: Number(stopLoss) || 0,
        stop_win: Number(stopGain) || 0,
        num_games: betsAmount
      }
    }
  }
}
