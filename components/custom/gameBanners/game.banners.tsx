'use client'

import { FC, useRef } from 'react'

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Grid, Navigation } from 'swiper/modules'
import 'swiper/css/grid'

import banner_1 from '@/public/new_banners/1.png'
import banner_2 from '@/public/new_banners/2.png'
import banner_3 from '@/public/new_banners/3.png'
import banner_4 from '@/public/new_banners/4.png'
import banner_5 from '@/public/new_banners/5.png'
import banner_6 from '@/public/new_banners/6.png'
import banner_7 from '@/public/new_banners/7.png'
import banner_8 from '@/public/new_banners/8.png'
import banner_9 from '@/public/new_banners/9.png'
import banner_10 from '@/public/new_banners/10.png'
import banner_11 from '@/public/new_banners/11.png'
import banner_12 from '@/public/new_banners/12.png'
import banner_13 from '@/public/new_banners/13.png'
import banner_14 from '@/public/new_banners/14.png'
import banner_15 from '@/public/new_banners/15.png'
import banner_16 from '@/public/new_banners/16.png'

import GameBanner from './components/game.banner'
import GameNavigation from './components/game.navigation'
import { cn } from '@/lib/utils'

interface IGameBanners {
  className?: string
}

const GameBanners: FC<IGameBanners> = ({ className }) => {
  const banners = [
    {
      bg: banner_1,
      link: '/games/Rocket'
    },
    {
      bg: banner_2,
      link: '/games/Dice'
    },
    {
      bg: banner_3,
      link: '/games/Crash'
    },
    {
      bg: banner_4,
      link: '/games/Plinko'
    },
    {
      bg: banner_5,
      link: '/games/CoinFlip'
    },
    {
      bg: banner_6,
      link: '/games/Mines'
    },
    {
      bg: banner_7,
      link: '/games/Roulette'
    },
    {
      bg: banner_8,
      link: '/games/Wheel'
    },
    {
      bg: banner_9,
      link: '/games/RPS'
    },
    {
      bg: banner_10,
      link: '/games/Apples'
    },
    {
      bg: banner_11,
      link: '/games/Slots'
    },
    {
      bg: banner_12,
      link: '/games/Poker'
    },
    {
      bg: banner_13,
      link: '/games/Horses'
    },
    {
      bg: banner_14,
      link: '/games/BlackJack'
    },
    {
      bg: banner_15,
      link: '/games/Thimbles'
    },
    {
      bg: banner_16,
      link: '/games/Cars'
    }
  ]
  const swiperRef = useRef<SwiperRef>(null)
  return (
    <div
      className={cn(
        'flex flex-col gap-[10px]  max-w-[1562px] overflow-hidden',
        className
      )}
    >
      <GameNavigation />
      <Swiper
        ref={swiperRef}
        slidesPerView={'auto'}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false
        }}
        speed={1000}
        modules={[Navigation, Grid]}
        spaceBetween={20}
        grid={{ rows: 2 }}
        className={'w-[calc(100vw-324px)] mb-2 h-[554px] sm:mb-5 gap-5'}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev'
        }}
      >
        {banners.map(item => (
          <SwiperSlide key={item.link} className='w-[206px] max-w-[206px]'>
            <GameBanner img={item.bg} link={item.link} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default GameBanners
