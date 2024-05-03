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

export const GamePlayBlock = () => {
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
    wheelVisible,
    appleWager,
    showResult,
    startAnimation
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
    GameModel.$wheelVisible,
    GameModel.$appleWager,
    GameModel.$showResult,
    GameModel.$startAnimation
  ])

  const path = usePathname()

  const [isCoinflip, setIsCoinflip] = useState(false)
  const [isApple, setIsApple] = useState(false)
  const [isMines, setIsMines] = useState(false)
  const [isRPS, setIsRPS] = useState(false)
  const [coinflipGame, setCoinflipGame] = useState(false)

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

    if (path.includes('coinflip')) {
      setIsCoinflip(true)
    } else {
      setIsCoinflip(false)
    }
    if (path.includes('rock_paper_scissors')) {
      setIsRPS(true)
    } else {
      setIsRPS(false)
    }
  }, [path])

  useEffect(() => {
    if (isCoinflip) {
      if (isPlaying) {
        setCoinflipGame(true)
      } else {
        setTimeout(() => setCoinflipGame(false), 2100)
      }
    }
  }, [isPlaying, isCoinflip])

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
    <div className='w-full sm:w-auto flex gap-2 sm:gap-5 row-start-4 m-[0_auto] mt-[20px] sm:mt-0 col-start-1 col-end-3 items-center justify-end -order-5 sm:order-none'>
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
        className={`h-[30px] flex items-center justify-center cursor-pointer min-w-[60px] relative`}
        onClick={() => {
          setAuto(!autoVisibile)
          setWheelVisible(false)
        }}
      >
        <span
          className={`uppercase text-[10px] text-[#7e7e7e] font-semibold mr-[8px] block ${
            autoVisibile && 'text-[#FFE09D]'
          }`}
        >
          auto
        </span>
        <AutoBorder
          className={`absolute top-0 left-0 w-full h-full fill-[#676767] ${
            autoVisibile && 'fill-[#FFE09D]'
          }`}
        />
      </div>
      <Button
        disabled={
          coinflipGame ||
          (isApple && showResult) ||
          (isApple && apples.length === 0 && isPlaying) ||
          (isRPS && startAnimation) ||
          (isRPS && isPlaying)
        }
        onClick={handlePlay}
        variant='wagerPlay'
        className='uppercase'
      >
        {isPlaying && isApple ? (
          <>
            Refund ${appleWager.toFixed(2)}
            {cryptoValue &&
              (isDrax ? (
                <DraxMiniSVG className='absolute w-3 h-3 sm:w-3 sm:h-3 -top-[4px] left-[85%] sm:left-[75%] -translate-x-1/2' />
              ) : (
                <BonusCoinSVG className='absolute w-3 h-3 sm:w-3 sm:h-3 -top-[4px] left-[85%] sm:left-[75%] -translate-x-1/2' />
              ))}
          </>
        ) : (
          'Play'
        )}
      </Button>
      {isMines && keep && (
        <Button onClick={minesClick} variant='wagerPlay' className='uppercase'>
          Refund
        </Button>
      )}
    </div>
  )
}
