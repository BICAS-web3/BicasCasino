'use client'

import { useRef } from 'react'

import { Autoplay, EffectFade, Grid, Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import { Button } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import { games_banner } from './data'
import GameSlideItem from './games.slide-item'

const Carousel = dynamic(
  () => import('@/components/custom/carousel/carousel'),
  {
    loading: () => (
      <div className='flex flex-col flex-wrap gap-x-5 gap-y-4 w-full h-[570px]'>
        {[...Array(games_banner.length)].map((_, index) => (
          <div
            className='flex flex-col space-y-3 w-[206px]'
            key={`game-banner-skeleton--${index}`}
          >
            <Skeleton className='h-[206px] w-[206px] rounded-xl' />
            <div className='flex items-center justify-between gap-4'>
              <Skeleton className='h-7 w-[206px]' />
              <Skeleton className='h-7 w-7 rounded-full' />
            </div>
          </div>
        ))}
      </div>
    ),
    ssr: false
  }
)

const GameBanners = ({ className }: { className?: string }) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  return (
    <div className={`flex flex-col gap-[10px] overflow-hidden ${className}`}>
      <div className='flex items-center gap-[10px] ml-auto text-[#7E7E7E] font-bold'>
        Show all
        <div className='flex gap-[5px]'>
          <Button
            size={'icon'}
            id='swiper-button--prev-game'
            ref={navigationPrevRef}
            className='flex items-center justify-center w-[26px] h-[26px] duration-500 group rounded-[5px] bg-[#212121] hover:bg-[#282828] cursor-pointer'
          >
            <ChevronLeft className='duration-500 text-[#464646] group-hover:text-[#979797]' />
          </Button>
          <Button
            size={'icon'}
            id='swiper-button--next-game'
            ref={navigationNextRef}
            className='flex items-center justify-center w-[26px] h-[26px] duration-500 group rounded-[5px] bg-[#212121] hover:bg-[#282828] cursor-pointer'
          >
            <ChevronRight className='duration-500 text-[#464646] group-hover:text-[#979797]' />
          </Button>
        </div>
      </div>

      <Carousel
        slides='auto'
        spacing={20}
        containerClassName='w-full mb-2 h-[554px] sm:mb-5 gap-5'
        loop
        grid={{
          rows: 2
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current
        }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
        }}
        modules={[Navigation, Autoplay, Grid]}
      >
        {games_banner.map((item, index) => (
          <SwiperSlide
            key={`swiper-slide-${item.id}--${index}`}
            style={{ width: 206 }}
          >
            <GameSlideItem image={item.image} link={item.link} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  )
}

export default GameBanners
