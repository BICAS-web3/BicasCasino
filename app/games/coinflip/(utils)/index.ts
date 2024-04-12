import { GameModel } from '@/states'

// betResultLogic.ts
export const processBetResult = (
  result: any,
  setGameStatus: Function,
  pickSide: Function,
  setIsPlaying: Function,
  setInGame: Function,
  setLostStatus: Function,
  setWonStatus: Function,
  pickedSide: number,
  setCoefficientData: any,
  setResult: any
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
