'use client'
import { GamesPageBlock } from '@/src/widgets/GamesPageBlock/GamesPageBlock'
import { PopularGamesBlock } from '@/src/widgets/PopularGamesBlock/PopularGamesBlock'
import { FC } from 'react'

interface GamesPageProps {}

const GamesPage: FC<GamesPageProps> = () => {
  return (
    <section className='flex flex-col items-center justify-center w-full h-full p-[20px]'>
      <PopularGamesBlock />
      <GamesPageBlock />
    </section>
  )
}

export default GamesPage
