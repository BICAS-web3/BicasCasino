'use client'

import { FC, useEffect, useState } from 'react'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useUnit } from 'effector-react'
import { GameModel } from '@/states'

interface IWinMessage {
  cf?: number
  resIco: number | undefined
  profit: number
  multiplier?: number | string
}

const WinMessage: FC<IWinMessage> = ({ cf, profit, resIco, multiplier }) => {
  const [apper, setApper] = useState(false)
  const [invisible, setInvisible] = useState(false)
  const [setGameStatus] = useUnit([GameModel.setGameStatus])
  useEffect(() => {
    // const winBlock = document.getElementById('apples_win_block')
    setTimeout(() => {
      // winBlock?.classList.add(s.block_appearing)
      setApper(true)

      setTimeout(() => {
        // winBlock?.classList.remove(s.block_appearing)
        setApper(false)
        setInvisible(true)
        setTimeout(() => {
          setGameStatus(GameModel.GameStatus.Draw)
        }, 100)
      }, 1400)
    }, 200)
  }, [])
  return (
    <div
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] duration-700'
      id='apples_win_block'
    >
      <Image
        width={270}
        height={270}
        src={'/images/apples/explosion.gif'}
        className={
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        }
        alt='explosion-gif'
      />
      <div
        className={cn(
          'duration-700 text-center w-[180px] h-[180px] flex flex-col justify-center items-center rounded-[180px] border border-[#105453] bg-[rgba(6,40,54,1)] shadow-[0px_0px_24.6px_0px_rgba(25,102,101,0.89)]',
          apper ? 'opacity-[1] visible' : 'opacity-[0] invisible',
          invisible && 'z-[-1]'
        )}
      >
        <h3 className='text-[#4ed26c] mb-4 text-2xl font-bold'>You win!</h3>
        <div className='flex items-center flex-col gap-1.5'>
          <span className='flex gap-2 text-white text-base font-medium'>
            {profit}
            <Image
              src={
                resIco === 0
                  ? '/images/apples/tokenIco.svg'
                  : '/images/apples/bCoin.svg'
              }
              width={24}
              height={24}
              alt='token-static'
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default WinMessage
