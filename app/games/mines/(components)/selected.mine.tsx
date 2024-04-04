import { cn } from '@/lib/utils'
import { Tile } from './MinesGame'
import { MineBombSVG, MineGreenSVG, MineMoneySVG } from './icons'

interface ISelectedMine {
  type: Tile
  waitingResponse: boolean
  index: number
}
const SelectedMine = (props: ISelectedMine) => {
  const { type, waitingResponse, index } = props

  if (type == Tile.Coin) {
    return (
      <MineMoneySVG
        className={
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]'
        }
      />
    )
  } else if (type == Tile.Bomb) {
    return (
      <MineBombSVG
        className={
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]'
        }
      />
    )
  } else if (type == Tile.Selected) {
    return (
      <MineGreenSVG
        className={cn(
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
          waitingResponse && `mine_animation style-${index}`
        )}
      />
    )
  } else if (type == Tile.SelectedShaking) {
    return (
      <MineGreenSVG
        className={cn(
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
          `mine_animation style-${index}`
        )}
      />
    )
  }
}

export default SelectedMine
