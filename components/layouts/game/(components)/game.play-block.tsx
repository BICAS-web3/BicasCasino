'use client'

import { InfoSVG } from '@/components/custom/sidebar/components/icons/bottom'
import { Button } from '@/components/ui/button'
import { GameModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { useEffect } from 'react'

const GamePlayBlock = () => {
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

  const handlePlay = () => {
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
    <div className='flex gap-2 sm:gap-5 items-center justify-end -order-5 sm:order-none'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='flex justify-center items-center'>
            <Info className='w-5 h-5 aspect-square cursor-pointer' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Some info</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button onClick={handlePlay} variant='wagerPlay'>
        Play
      </Button>
    </div>
  )
}

export default GamePlayBlock
