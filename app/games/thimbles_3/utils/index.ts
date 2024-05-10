import { GameModel } from '@/states'
import { GameStatus, IResult, WonStatus } from '@/states/game_model.store'
import { Dispatch, SetStateAction } from 'react'

export const handleGameResult = ({
  result,
  setActiveThimble,
  setCoefficientData,
  setGameStatus,
  setWonStatus,
  setIsPlaying,
  setSelected,
  selected,
  setLostStatus,
  setResult,
  thimbleLose,
  thimbleWin
}: {
  result: IResult | null
  setActiveThimble: Dispatch<SetStateAction<number | null>>
  setCoefficientData: Dispatch<SetStateAction<number[]>>
  setGameStatus: Dispatch<SetStateAction<GameStatus | null>>
  setWonStatus: Dispatch<SetStateAction<WonStatus | null>>
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  setSelected: Dispatch<SetStateAction<number | null>>
  selected: number | null
  setLostStatus: Dispatch<SetStateAction<number>>
  setResult: Dispatch<SetStateAction<IResult | null>>
  thimbleLose: () => void
  thimbleWin: () => void
}) => {
  if (result !== null && result?.type === 'Bet') {
    const fullAmount = Number(result.amount) * result.num_games!
    const parseArr = JSON.parse(result.profits)
    const handleCall = () => {
      for (let i = 0; i < parseArr?.length; i++) {
        setTimeout(() => {
          const outCome =
            fullAmount === 0 ? 0 : Number(parseArr[i]) / fullAmount
          setCoefficientData(prev => [outCome, ...prev])
        }, 700 * (i + 1))
      }
    }
    handleCall()
    if (
      Number(result.profit) > Number(result.amount) ||
      Number(result.profit) === Number(result.amount)
    ) {
      setActiveThimble(selected as number)
      const multiplier = Number(Number(result.profit) / Number(result.amount))
      Promise.all([
        new Promise(resolve =>
          setTimeout(
            () => resolve(setGameStatus(GameModel.GameStatus.Won)),
            300
          )
        ),
        new Promise(resolve => setTimeout(() => resolve(thimbleWin()), 300)),
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve(
                setWonStatus({
                  profit: Number(result.profit),
                  multiplier,
                  token: 'DRAX'
                })
              ),
            300
          )
        ),
        new Promise(resolve =>
          setTimeout(() => resolve(setIsPlaying(false)), 0)
        ),
        new Promise(resolve => setTimeout(() => resolve(setSelected(null)), 0))
      ])
    } else if (Number(result.profit) < Number(result.amount)) {
      Promise.all([
        new Promise(resolve =>
          setTimeout(
            () => resolve(setGameStatus(GameModel.GameStatus.Lost)),
            300
          )
        ),
        new Promise(resolve => setTimeout(() => resolve(thimbleLose()), 300)),
        new Promise(resolve =>
          setTimeout(() => resolve(setIsPlaying(false)), 300)
        ),
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve(
                setLostStatus(Number(result.profit) - Number(result.amount))
              ),
            300
          )
        ),

        new Promise(resolve => setTimeout(() => resolve(setSelected(null)), 0))
      ])
    } else {
      setGameStatus(GameModel.GameStatus.Draw)
      setIsPlaying(false)
    }
    setResult(null)
  }
}
