import { T_Card } from '@/api'
import { GameModel } from '@/states'
import { GameStatus, IResult, WonStatus } from '@/states/game_model.store'

export function handleResult(
  result?: IResult | null,
  setInGame?: React.Dispatch<React.SetStateAction<boolean>>,
  setWaitingResponse?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPlaying?: React.Dispatch<React.SetStateAction<boolean>>,
  setGameStatus?: React.Dispatch<React.SetStateAction<GameStatus | null>>,
  setWonStatus?: React.Dispatch<React.SetStateAction<WonStatus | null>>,
  setLostStatus?: React.Dispatch<React.SetStateAction<number>>,
  setKeep?: React.Dispatch<React.SetStateAction<boolean>>,
  setFirstBet?: React.Dispatch<React.SetStateAction<boolean>>,
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveCards?: React.Dispatch<React.SetStateAction<T_Card[]>>,
  setShowFlipCards?: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!result) return
  if (result.type === 'State' && result.state) {
    const dataState = JSON.parse(result.state).cards_in_hand
    alert(JSON.stringify(result))
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
  } else if (result.type === 'Bet' && result.state) {
    alert(JSON.stringify(result))
    setKeep?.(false)
    setFirstBet?.(true)
    setWaitingResponse?.(false)
    if (
      Number(result.profit) > Number(result.amount) ||
      Number(result.profit) === Number(result.amount)
    ) {
      setGameStatus?.(GameModel.GameStatus.Won)
      alert('win')
      const multiplier = Number(result.profit) / Number(result.amount)
      setWonStatus?.({
        profit: Number(result.profit),
        multiplier,
        token: 'DRAX'
      })
      setTimeout(() => {
        setInGame?.(false)
        setIsPlaying?.(false)
        setKeep?.(false)
        setFirstBet?.(true)
      }, 200)
    } else if (Number(result.profit) < Number(result.amount)) {
      alert('lost')
      setGameStatus?.(GameModel.GameStatus.Lost)
      setLostStatus?.(Number(result.profit) - Number(result.amount))
      setTimeout(() => {
        setInGame?.(false)
        setIsPlaying?.(false)
        setKeep?.(false)
        setFirstBet?.(true)
      }, 200)
    } else {
      setGameStatus?.(GameModel.GameStatus.Draw)
      setTimeout(() => {
        setInGame?.(false)
        setIsPlaying?.(false)
        setKeep?.(false)
        setFirstBet?.(true)
      }, 200)
    }
  }
}
