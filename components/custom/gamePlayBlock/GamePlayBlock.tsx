'use client'

import { FC } from 'react'
import InfoIco from '@/public/images/misc/infoIco.svg'
import { Button } from '@/components/ui/button'
import { useUnit } from 'effector-react'
import { GameModel } from '@/states'

interface GamePlayBlockProps {}

export const GamePlayBlock: FC<GamePlayBlockProps> = () => {
  const [setIsPlaying] = useUnit([GameModel.setIsPlaying])

  return (
    <div className='flex gap-[20px] items-center justify-end'>
      <div className='cursor-pointer'>
        <InfoIco className='w-6 h-6' />
      </div>
      <Button onClick={() => setIsPlaying(true)} variant='wagerPlay'>
        Play
      </Button>
    </div>
  )
}
