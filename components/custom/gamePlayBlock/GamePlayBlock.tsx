'use client'

import { FC, useEffect } from 'react'
import InfoIco from '@/public/images/misc/infoIco.svg'
import { Button } from '@/components/ui/button'
import { useUnit } from 'effector-react'
import { GameModel, WagerModel } from '@/states'
import { useSocket } from '@/components/providers/socket.provider'

interface GamePlayBlockProps {}

export const GamePlayBlock: FC<GamePlayBlockProps> = () => {
  const socket = useSocket()
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

  return (
    <div className='flex gap-[20px] items-center justify-end'>
      <div className='cursor-pointer'>
        <InfoIco className='w-6 h-6' />
      </div>
      <Button
        onClick={() => {
          if (!cryptoValue) {
            setError(true)
          } else {
            if (!isPlaying) {
              setIsPlaying(true)
            } else {
              setFinishPoker(!finishPoker)
            }
          }
        }}
        variant='wagerPlay'
      >
        Play
      </Button>
    </div>
  )
}
