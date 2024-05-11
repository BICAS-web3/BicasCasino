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
  setResult: Dispatch<SetStateAction<IResult | null>>,
  coinflipLose: () => void,
  coinflipWin: () => void,
  playSounds: string
) => {
  if (result !== null && result?.type === 'Bet') {
    const fullAmount = Number(result.amount) * result.num_games!
    setTimeout(() => {
      setCoefficientData(prev => [
        fullAmount === 0 ? 0 : Number(result.profit) / fullAmount,
        ...prev
      ])
    }, 2200)
    if (
      Number(result.profit) > fullAmount ||
      Number(result.profit) === fullAmount
    ) {
      setGameStatus(GameModel.GameStatus.Won)
      const multiplier = Number(Number(result.profit) / fullAmount)
      setWonStatus({
        profit: Number(result.profit),
        multiplier,
        token: 'DRAX'
      })
      pickSide(pickedSide)
      setIsPlaying(false)
      setInGame(false)
      setTimeout(() => {
        playSounds !== 'off' && coinflipWin()
      }, 1300)
    } else if (Number(result.profit) < fullAmount) {
      pickSide(pickedSide ^ 1)
      setIsPlaying(false)
      setInGame(false)
      setGameStatus(GameModel.GameStatus.Lost)
      setTimeout(() => {
        playSounds !== 'off' && coinflipLose()
      }, 1300)
      setLostStatus(Number(result.profit) - fullAmount)
    } else {
      setGameStatus(GameModel.GameStatus.Draw)
      setIsPlaying(false)
      setInGame(false)
    }
    setResult(null)
  }
}
