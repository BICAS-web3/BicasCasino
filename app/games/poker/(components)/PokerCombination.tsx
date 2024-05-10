import { GameModel } from '@/states'
import { PokerCombinationProps } from '@/types/games.types'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

export const PokerCombination = ({
  combinationName,
  tokenImage,
  multiplier,
  className,
  profit
}: PokerCombinationProps) => {
  const [apper, setApper] = useState(false)
  const [invisible, setInvisible] = useState(false)
  const [setGameStatus, setIsPlaying] = useUnit([
    GameModel.setGameStatus,
    GameModel.setPokerPlay
  ])
  useEffect(() => {
    setTimeout(() => {
      setApper(true)
      setTimeout(() => {
        setApper(false)
        setInvisible(true)
        setTimeout(() => {
          setGameStatus(null)
        }, 1000)
      }, 1500)
    }, 0)
  }, [])
  return (
    <article
      className={`w-[250px] sm:w-[309px] bg-transparent duration-1000 py-4 sm:pt-[25px] sm:pb-5 absolute top-7 sm:top-[65px] 4xl:top-[114px] left-1/2 -translate-x-1/2 -translate-y-0 sm:translate-y-0 z-[3] flex flex-col items-center rounded-[12px] gap-2.5 sm:gap-[14px]  ${
        apper ? 'opacity-[1] visible' : 'opacity-[0] invisible'
      }`}
    >
      <span className='text-base sm:text-xl font-bold leading-[100%] sm:leading-[18px] bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] text-transparent bg-clip-text uppercase'>
        you win
      </span>
      <h3 className='text-lg sm:text-2xl font-bold leading-[100%] sm:leading-[21px] bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] text-transparent bg-clip-text uppercase text-center'>
        {combinationName}
      </h3>

      <div className='flex items-center flex-col gap-2'>
        <div className='flex items-center gap-2.5'>
          <div>{tokenImage}</div>
          <div className='text-center text-sm sm:text-xl font-bold leading-[18px] text-white'>
            {profit}
          </div>
        </div>
        {/* <div className='text-sm sm:text-base leading-[90%] text-[#7E7E7E] font-bold text-center'>
          {multiplier}x
        </div> */}
      </div>
    </article>
  )
}
