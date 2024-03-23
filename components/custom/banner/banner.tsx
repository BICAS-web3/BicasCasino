'use client'

import { useRef } from 'react'

import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/css/effect-fade'

import swiperImg1 from '@/public/swiperBannerImgs/slide1Bg.webp'
import swiperImg2 from '@/public/swiperBannerImgs/slide2Bg.webp'
import swiperImg3 from '@/public/swiperBannerImgs/slide3Bg.webp'
import swiperImg4 from '@/public/swiperBannerImgs/slide4Bg.webp'
import swiperImg5 from '@/public/swiperBannerImgs/slide5Bg.webp'
import swiperImg6 from '@/public/swiperBannerImgs/tokenImage.webp'
import swiperImg6Mob from '@/public/swiperBannerImgs/tokenMobImg.webp'
import swiperImg7 from '@/public/swiperBannerImgs/xbotImage.webp'
import swiperImg5Mob from '@/public/swiperBannerImgs/slide5MobBg.webp'
import swiperImg8 from '@/public/swiperBannerImgs/draxImg.webp'
import swiperImg9 from '@/public/swiperBannerImgs/chainlinkImg.webp'

// import * as BlurModel from '@/widgets/Blur/model'
// import { checkPageClicking } from '@/shared/tools'
import { cn } from '@/lib/utils'
import BannerSlide from './components/banner.slide'

const swiperSlides = [
  {
    text: 'Web3.0 Games',
    subTitle: 'Without KYC just connect your wallet and play',
    isBtn: true,
    img: swiperImg1,
    btnFirstText: 'Join wallet',
    btnSecondText: 'Join wallet'
  },
  {
    text: 'Get your $100 deposit bonus in the DRAXB token',
    isBtn: true,
    img: swiperImg2,
    btnFirstText: 'Get your deposit bonus',
    btnSecondText: 'Join wallet'
  },
  {
    text: 'You can bet on the BSC, Polygon and Arbitrum networks',
    isBtn: false,
    img: swiperImg3
  },
  {
    text: 'Since our platform is web 3.0',
    isBtn: false,
    extraText: 'we do not keep user funds, your game is absolutely safe',
    img: swiperImg4
  },
  {
    text: '',
    isBtn: false,
    extraText: '',
    img: swiperImg5,
    imgMob: swiperImg5Mob
  },
  {
    text: '$TWB',
    subText:
      'The Twinby Ai utility token is your guide to multifaceted opportunities and limitless earnings in the world of cryptocurrency',
    isBtn: false,
    extraText: '',
    img: swiperImg6,
    imgMob: swiperImg6Mob
  },
  {
    text: 'X-BOT',
    subText:
      'An advanced algorithm for trading on DEX exchanges directly in Telegram',
    isBtn: false,
    extraText: '',
    img: swiperImg7
  },
  {
    text: '$DRAX',
    subText:
      'The DRAX token is a unique investment opportunity. 20% of ecosystem profits are used to buy this token and then burn it',
    isBtn: false,
    extraText: '',
    img: swiperImg8
  },
  {
    text: 'We are using audited and verified ChainLink VRF ORACLE CONTRACT',
    subText:
      'As a provider of randomness for fair and provable results of your bets',
    isBtn: false,
    extraText: '',
    img: swiperImg9
  }
]
const Banner = () => {
  const swiperRef = useRef<SwiperRef>(null)

  // const [setBlur] = useUnit([BlurModel.setBlur])

  return (
    <Swiper
      data-id={'connect-wallet-banner-block'}
      ref={swiperRef}
      slidesPerView={1}
      fadeEffect={{ crossFade: true }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false
      }}
      speed={1000}
      effect='fade'
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      className={
        'w-full h-[180px] mb-2 sm:h-[300px] md:h-[250px] xl:h-[350px] sm:mb-5 grid'
      }
      pagination={{
        el: '#custom_swiper_banner_pagination',
        clickable: true
      }}
    >
      {swiperSlides.map((slide, ind) => (
        <SwiperSlide
          key={ind}
          id='swiper-slide-banner'
          className={cn(
            's.main_banner_swiper_slide',
            'py-[25px] px-[10px] rounded-[12px] sm:px-[46px] sm:py-[51px] md:py-[33px] xl:py-[70px] xl:px-[105px]',
            'relative sm:rounded-[20px] justify-between flex flex-col cursor-pointer',
            (slide.subText || ind == 3) && 'justify-start',
            ind === 8 && 'items-end sm:items-center justify-center'
          )}
          style={{ display: 'flex !important' }}
        >
          <BannerSlide key={ind} ind={ind} slide={slide} />
        </SwiperSlide>
      ))}
      <div
        className={cn(
          'gap-1 xl:gap-2 duration-200 flex z-10',
          '-translate-x-1/2 left-1/2 absolute bottom-1 sm:bottom-[10px] xl:bottom-4'
        )}
        id='custom_swiper_banner_pagination'
      ></div>
    </Swiper>
  )
}

export default Banner
