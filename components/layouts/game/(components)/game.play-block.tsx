'use client'

import { Button } from '@/components/ui/button'
import { GameModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

const GamePlayBlock = () => {
  const [
    error,
    setIsPlaying,
    cryptoValue,
    setError,
    setFinishPoker,
    isPlaying,
    finishPoker,
    balance,
    setStop,
    apples
  ] = useUnit([
    WagerModel.$error,
    GameModel.setIsPlaying,
    WagerModel.$cryptoValue,
    WagerModel.setError,
    GameModel.setFinishPoker,
    GameModel.$isPlaying,
    GameModel.$finishPoker,
    UserModel.$balance,
    GameModel.setStop,
    GameModel.$apples
  ])

  const path = usePathname()

  const [isApple, setIsApple] = useState(false)

  useEffect(() => {
    if (path.includes('apples')) {
      setIsApple(true)
    } else {
      setIsApple(false)
    }
  }, [])

  const handlePlay = () => {
    if (cryptoValue > balance) {
      toast('Top up balance!')
      setError(true)
      return
    }
    if (!cryptoValue) {
      toast('Error, place your bet!')
      setError(true)
    } else {
      if (!isPlaying) {
        setIsPlaying(true)
      } else {
        setFinishPoker(!finishPoker)
        apples.length > 0 && setStop(true)
      }
    }
  }

  useEffect(() => {
    console.log('ERROR', error)
  }, [error])

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
        {isPlaying && isApple ? 'Refund' : 'Play'}
      </Button>
    </div>
  )
}

export default GamePlayBlock
