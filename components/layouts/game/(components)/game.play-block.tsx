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

import AutoBorder from '@/public/images/misc/autoBorder.svg'
import { SettingSVG } from '../(icons)'

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
    apples,
    setStopWinning,
    keep,
    setAuto,
    autoVisibile,
    setWheelVisible,
    wheelVisible
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
    GameModel.$apples,
    GameModel.setStopWinning,
    GameModel.$keep,
    GameModel.setAutoVisible,
    GameModel.$autoVisible,
    GameModel.setWheelVisible,
    GameModel.$wheelVisible
  ])

  const path = usePathname()

  const [isApple, setIsApple] = useState(false)
  const [isMines, setIsMines] = useState(false)

  useEffect(() => {
    if (path.includes('apples')) {
      setIsApple(true)
    } else {
      setIsApple(false)
    }

    if (path.includes('mines')) {
      setIsMines(true)
    } else {
      setIsMines(false)
    }
  }, [path])

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
  const wheelGame = usePathname().includes('wheel_of_fortune')

  const minesClick = () => {
    setStopWinning('YES')
  }
  return (
    <div className='flex gap-2 sm:gap-5 row-start-4 m-[0_auto] mt-[20px] sm:mt-0 col-start-1 col-end-3 items-center justify-end -order-5 sm:order-none'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='flex justify-center items-center'>
            <Info className='w-6 h-6 aspect-square cursor-pointer text-[#676767]' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Some info</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {wheelGame && (
        <SettingSVG
          className={`cursor-pointer duration-500 ${
            wheelVisible ? 'text-[#FFE09D] bg-transparent' : 'text-[#676767]'
          }`}
          onClick={() => {
            setWheelVisible(!wheelVisible)
            setAuto(false)
          }}
        />
      )}
      <div
        className='h-[30px] flex items-center justify-center cursor-pointer min-w-[60px] relative'
        onClick={() => {
          setAuto(!autoVisibile)
          setWheelVisible(false)
        }}
      >
        <span className='uppercase text-[10px] text-[#7e7e7e] font-semibold mr-[8px] block'>
          auto
        </span>
        <AutoBorder className='absolute top-0 left-0 w-full h-full fill-[#676767]' />
      </div>
      <Button onClick={handlePlay} variant='wagerPlay'>
        {isPlaying && isApple ? 'Refund' : 'Play'}
      </Button>
      {isMines && keep && (
        <Button onClick={minesClick} variant='wagerPlay'>
          Refund
        </Button>
      )}
    </div>
  )
}

export default GamePlayBlock
