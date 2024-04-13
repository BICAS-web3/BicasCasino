import { GameModel } from '@/states'
import { GameStatus, IResult, WonStatus } from '@/states/game_model.store'
import { Dispatch, SetStateAction } from 'react'

// betResultLogic.ts
export const processBetResult = (
  result: IResult | null,
  setGameStatus: Dispatch<SetStateAction<GameStatus | null>>,
  pickSide: Dispatch<SetStateAction<number>>,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  setInGame: Dispatch<SetStateAction<boolean>>,
  setLostStatus: Dispatch<SetStateAction<number>>,
  setWonStatus: Dispatch<SetStateAction<WonStatus | null>>,
  pickedSide: number,
  setCoefficientData: Dispatch<SetStateAction<number[]>>,
  setResult: Dispatch<SetStateAction<IResult | null>>
) => {
  if (result !== null && result?.type === 'Bet') {
    const fullAmount = Number(result.amount) * result.num_games!
    setCoefficientData(prev => [Number(result.profit) / fullAmount, ...prev])
    if (
      Number(result.profit) > fullAmount ||
      Number(result.profit) === fullAmount
    ) {
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
    } else if (Number(result.profit) < fullAmount) {
      setGameStatus(GameModel.GameStatus.Lost)
      pickSide(pickedSide ^ 1)
      setIsPlaying(false)
      setInGame(false)
      setLostStatus(Number(result.profit) - fullAmount)
    } else {
      setGameStatus(GameModel.GameStatus.Draw)
      setIsPlaying(false)
      setInGame(false)
    }
    setResult(null)
  }
}
