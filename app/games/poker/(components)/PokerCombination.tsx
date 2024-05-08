import { GameModel } from '@/states'
import { PokerCombinationProps } from '@/types/games.types'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

export const PokerCombination = ({
  combinationName,
  tokenImage,
  multiplier,
  className
}: PokerCombinationProps) => {
  const [apper, setApper] = useState(false)
  const [invisible, setInvisible] = useState(false)
  const [setGameStatus, setIsPlaying] = useUnit([
    GameModel.setGameStatus,
    GameModel.setIsPlaying
  ])
  const [disable, setDisable] = useState(true)
  useEffect(() => {
    // const winBlock = document.getElementById('apples_win_block')
    setTimeout(() => {
      // winBlock?.classList.add(s.block_appearing)
      setApper(true)
      setTimeout(() => {
        setDisable(false)
        setTimeout(() => {
          // winBlock?.classList.remove(s.block_appearing)
          setApper(false)
          setInvisible(true)
          setTimeout(() => {
            setGameStatus(GameModel.GameStatus.Draw)
          }, 1500)
        }, 1900)
      }, 1500)
    }, 1100)
  }, [])
  return (
    <article
      className={`w-[220px] bg-black duration-1000 py-5 px-[15px] sm:p-[30px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] min-w-max flex flex-col items-center rounded-[12px] ${
        apper ? 'opacity-[1] visible' : 'opacity-[0] invisible'
      }`}
    >
      <h3 className='text-xl sm:text-2xl tmd:text-4xl font-black leading-[90%] bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] text-transparent bg-clip-text uppercase'>
        {combinationName}
      </h3>
      <span className='text-xl sm:text-2xl tmd:text-4xl font-black leading-[90%] bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] text-transparent bg-clip-text uppercase'>
        you win
      </span>
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2.5'>
          <div>{tokenImage}</div>
          <div className='text-center text-sm sm:text-base tmd:text-lg font-black leading-[90%] text-[#eaeaea]'>
            12
          </div>
        </div>
        <div className='text-sm sm:text-base leading-[90%] text-[#7e7e7e] font-bold text-center'>
          {multiplier}x
        </div>
      </div>
      <button
        disabled={disable}
        onClick={() => setIsPlaying(true)}
        className='bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] text-[#0f0f0f] leading-normal font-extrabold text-sm sm:text-lg tracking-wide py-2 p-1.5 sm:py-3 sm:px-2.5 rounded-[5px] sm:rounded-[12px] w-44 sm:w-64 h-10 sm:h-[50px] mt-4'
      >
        Bet
      </button>
    </article>
  )
}
