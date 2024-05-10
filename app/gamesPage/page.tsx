'use client'
import { FC } from 'react'
import { PopularGamesBlock } from './components/PopularGamesBlock/PopularGamesBlock'
import { GamesPageBlock } from './components/GamesPageBlock/GamesPageBlock'

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
