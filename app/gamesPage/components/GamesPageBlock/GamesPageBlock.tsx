import { games_banner } from '@/app/(main)/(components)/data'
import s from './styles.module.scss'
import { FC } from 'react'
import { GamesItem } from './GamesItem'

interface GamesPageBlockProps {}

export const GamesPageBlock: FC<GamesPageBlockProps> = () => {
  return (
    <div
      className='
      m-[20px_20px_60px_20px] sm:m-[20px_0_60px_0] flex flex-col
      w-full
    '
    >
      <span
        className='
        text-[#7e7e7e] text-[0.875rem] sm:text-[1.25rem]
        leading-[15px] font-extrabold mb-[16px] tracking-[0.8px] uppercase
      '
      >
        games
      </span>
      <div
        className='
        grid gap-[8px] tb:grid-cols-3 sm:gap-[8px] grid-cols-2 tb:gap-[20px] mmd:gap-[30px] 
      '
      >
        {games_banner.map((item, ind) => (
          <GamesItem {...item} key={ind} />
        ))}
      </div>
    </div>
  )
}