'use client'

import { useRef } from 'react'

import { Autoplay, Grid, Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import { Button } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'
import { useMediaQuery } from 'usehooks-ts'
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
    <div
      className={`flex-col gap-2.5 hidden sm:flex overflow-hidden ${className}`}
    >
      <div className='w-full flex items-center justify-center'>
        <h2 className='font-bold sm:text-xl'>GreekKeepers originals</h2>
        <div className='flex items-center gap-2.5 ml-auto text-[#7E7E7E] font-bold'>
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
      </div>

      <Carousel
        slides='auto'
        spacing={20}
        containerClassName='w-full mb-10 sm:mb-2 h-max sm:h-[290px] sm:mb-5 gap-5'
        loop
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current
        }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
        }}
        modules={[Navigation, Autoplay]} // Grid
      >
        {games_banner.map((item, index) => (
          <SwiperSlide
            key={`swiper-slide-${item.id}--${index}`}
            style={{ width: 206 }}
            className='pt-[10px]'
          >
            <GameSlideItem
              className='duration-500 hover:-translate-y-[8px] mt-2'
              image={item.image}
              title={item.title}
              link={item.link}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  )
}

export default GameBanners
