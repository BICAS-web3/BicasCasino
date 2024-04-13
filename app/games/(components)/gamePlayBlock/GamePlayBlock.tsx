'use client'

import { Button } from '@/components/ui/button'
import InfoIco from '@/public/images/misc/infoIco.svg'
import { GameModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC } from 'react'

interface GamePlayBlockProps {}

export const GamePlayBlock: FC<GamePlayBlockProps> = () => {
  const [
    setIsPlaying,
    cryptoValue,
    setError,
    setFinishPoker,
    isPlaying,
    finishPoker
  ] = useUnit([
    GameModel.setIsPlaying,
    WagerModel.$cryptoValue,
    WagerModel.setError,
    GameModel.setFinishPoker,
    GameModel.$isPlaying,
    GameModel.$finishPoker
  ])

  const play = () => {
    if (!cryptoValue) {
      setError(true)
    } else {
      if (!isPlaying) {
        setIsPlaying(true)
      } else {
        setFinishPoker(!finishPoker)
      }
    }
  }

  return (
    <div className='flex gap-[20px] items-center justify-end'>
      <div className='cursor-pointer'>
        <InfoIco className='w-6 h-6' />
      </div>
      <Button onClick={play} variant='wagerPlay'>
        Play
      </Button>
    </div>
  )
}
