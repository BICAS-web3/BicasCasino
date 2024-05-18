import { cn } from '@/lib/utils'
// import { MineBombSVG, MineGreenSVG, MineMoneySVG } from './icons'
import Image from 'next/image'
import { Tile } from '../data'
import { ISelectedMine } from '@/types/games.types'
import { MineBombSVG } from './icons'
import { Green } from '@/public/icons/mines/Green'

const SelectedMine = ({ type, waitingResponse, index }: ISelectedMine) => {
  const handleIcon = () => {
    switch (type) {
      case Tile.Coin:
        return (
          <Image
            className='w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]'
            width={80}
            height={80}
            alt='mine money'
            src={'/icons/mines/mine.money.svg'}
          />
        )

      case Tile.Bomb:
        return (
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

      case Tile.Selected:
        return (
          // <Image
          //   className={cn(
          //     'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
          //     waitingResponse && `mine_animation style-${index}`
          //   )}
          //   width={80}
          //   height={80}
          //   alt='mine money'
          //   src={'/icons/mines/mine.green.svg'}
          // />
          <Green
            className={cn(
              'w-[38px] h-[38px] sm:w-[53px] sm:h-[53px] xl:w-20 xl:h-20 3xl:w-[90px] 3xl:h-[90px] duration-500 absolute z-[1]',
              waitingResponse && `mine_animation style-${index}`
            )}
          />
        )
      case Tile.SelectedShaking:
        return (
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
    }
  }

  return <>{handleIcon()}</>
}

export default SelectedMine
