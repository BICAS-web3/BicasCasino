import { FC, useEffect, useState } from 'react'
import s from './styles.module.scss'
import { games_banner } from '@/app/(main)/(components)/data'
import { PopularGamesItem } from './PopularGamesItem'

interface PopularGamesBlockProps {}

export const PopularGamesBlock: FC<PopularGamesBlockProps> = () => {
  return (
    <div
      className='
      w-full sm:m-[20px_0] m-[0_20px] flex flex-col
    '
    >
      <span
        className='
        text-[#7e7e7e] sm:text-[1.25rem] text-[0.875rem] font-extrabold
        leading-[15px] mb-[16px] tracking-[0.8px] uppercase
      '
      >
        popular games
      </span>
      <div
        className='
        grid sm:grid-cols-4 grid-cols-2 sm:gap-[20px] gap-[8px]
      '
      >
        {games_banner.slice(0, 4).map((item, ind) => (
          <PopularGamesItem {...item} key={ind} />
        ))}
      </div>
    </div>
  )
}
