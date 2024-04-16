import { GameModel } from '@/states'
import { GameStatus } from '@/states/game_model.store'
import { Dispatch, SetStateAction } from 'react'
import { ModelType } from '../(components)/PRSGame'

export const changeEnemyValue = ({
  setEnemyValue,
  pickedValue,
  gameStatus
}: {
  setEnemyValue: Dispatch<SetStateAction<ModelType>>
  pickedValue: GameModel.RPSValue
  gameStatus: GameStatus | null
}) => {
  if (gameStatus === GameModel.GameStatus.Draw) {
  } else if (gameStatus === GameModel.GameStatus.Won) {
    if (pickedValue === GameModel.RPSValue.Paper) {
      setEnemyValue(ModelType.Rock)
    } else if (pickedValue === GameModel.RPSValue.Rock) {
      setEnemyValue(ModelType.Scissors)
    } else if (pickedValue === GameModel.RPSValue.Scissors) {
      setEnemyValue(ModelType.Paper)
    }
  } else if (gameStatus === GameModel.GameStatus.Lost) {
    if (pickedValue === GameModel.RPSValue.Paper) {
      setEnemyValue(ModelType.Scissors)
    } else if (pickedValue === GameModel.RPSValue.Rock) {
      setEnemyValue(ModelType.Paper)
    } else if (pickedValue === GameModel.RPSValue.Scissors) {
      setEnemyValue(ModelType.Rock)
    }
  }
}
