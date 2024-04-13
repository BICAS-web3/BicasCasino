import { cn } from '@/lib/utils'
// import { MineBombSVG, MineGreenSVG, MineMoneySVG } from './icons'
import { Tile } from '../data'
import Image from 'next/image'

interface ISelectedMine {
  type: Tile
  waitingResponse: boolean
  index: number
}
const SelectedMine = (props: ISelectedMine) => {
  const { type, waitingResponse, index } = props

  if (type == Tile.Coin) {
    return (
      // <MineMoneySVG
      //   className={
      //     'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]'
      //   }
      // />
      <Image
        className={
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]'
        }
        width={80}
        height={80}
        alt='mine money'
        src={'/icons/mines/mine.money.svg'}
      />
    )
  } else if (type == Tile.Bomb) {
    return (
      // <MineBombSVG
      //   className={
      //     'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]'
      //   }
      // />
      <Image
        className={
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]'
        }
        width={80}
        height={80}
        alt='mine money'
        src={'/icons/mines/mine.bomb.svg'}
      />
    )
  } else if (type == Tile.Selected) {
    return (
      // <MineGreenSVG
      //   className={cn(
      //     'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
      //     waitingResponse && `mine_animation style-${index}`
      //   )}
      // />
      <Image
        className={cn(
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
          waitingResponse && `mine_animation style-${index}`
        )}
        width={80}
        height={80}
        alt='mine money'
        src={'/icons/mines/mine.green.svg'}
      />
    )
  } else if (type == Tile.SelectedShaking) {
    return (
      // <MineGreenSVG
      //   className={cn(
      //     'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
      //     `mine_animation style-${index}`
      //   )}
      // />
      <Image
        className={cn(
          'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
          `mine_animation style-${index}`
        )}
        width={80}
        height={80}
        alt='mine money'
        src={'/icons/mines/mine.green.svg'}
      />
    )
  }
}

export default SelectedMine
