'use client'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
// import 'swiper/css/effect-fade'
import 'swiper/css/effect-fade'
import 'swiper/css/grid'
import 'swiper/css/pagination'

import Carousel from '@/components/custom/carousel/carousel'
import { stringRemoveSpacing } from '@/lib/string'
import { useTranslation } from 'react-i18next'
import { main_banner } from './data'

export const Banner = () => {
  const { t } = useTranslation()
  return (
    <Carousel
      pagination={{
        el: '#custom_swiper_banner_pagination',
        clickable: true
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        512: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false
      }}
      modules={[Autoplay, Navigation, Pagination]}
      spacing={20}
      loop={true}
      containerClassName='p-[16px] sm:p-0'
    >
      {main_banner.map((item, i) => (
        <>
          <SwiperSlide
            style={{
              width: 507,
              backgroundSize: 'cover'
            }}
            key={`banner-item_${stringRemoveSpacing(item.title)}_${i}f`}
            className='rounded-xl max-h-40 p-[30px_20px] min-h-[136px] sm:min-h-[240px] overflow-hidden xxs:max-h-48 relative smm:max-h-56 mb-8'
          >
            <img
              src='/images/main_banner/banner1.png'
              alt='imag'
              className='h-[160px] sm:h-[240px] object-cover w-full sm:min-w-[490px] ob absolute right-0 top-0'
              width={507}
              height={240}
            />
            <span className='relative mb-[10px] block z-[10] text-[22px] sm:text-[34px] font-bold'>
              {t('pages.main.banners.affiliate.title')}
            </span>
            <p className='relative z-[10] text-[18px] sm:text-[24px] font-normal'>
              {t('pages.main.banners.affiliate.text_1')} <br />{' '}
              {t('pages.main.banners.affiliate.text_2')}
            </p>
          </SwiperSlide>

          <SwiperSlide
            style={{
              width: 507,
              backgroundSize: 'cover'
            }}
            key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
            className='rounded-xl max-h-40 min-h-[136px] sm:min-h-[240px] p-[30px_20px] overflow-hidden xxs:max-h-48 relative smm:max-h-56 mb-8'
          >
            <img
              src='/images/main_banner/banner2.png'
              alt='imag'
              className='h-[160px] sm:h-[240px] object-cover w-full sm:min-w-[490px] ob absolute right-0 top-0'
              width={507}
              height={240}
            />
            <span className='relative mb-[10px] block z-[10] text-[22px] sm:text-[34px] font-bold'>
              {t('pages.main.banners.nft.title')}
            </span>
            <p className='relative z-[10] text-[18px] sm:text-[24px] font-normal'>
              {t('pages.main.banners.nft.text_1')} <br />{' '}
              {t('pages.main.banners.nft.text_2')}
              <span className='font-bold'>
                {t('pages.main.banners.nft.text_3')}
              </span>{' '}
              <br /> {t('pages.main.banners.nft.text_4')}
            </p>
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: 507,
              backgroundSize: 'cover'
            }}
            key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
            className='rounded-xl max-h-40 min-h-[136px] sm:min-h-[240px] p-[30px_20px] overflow-hidden xxs:max-h-48 relative smm:max-h-56 mb-8'
          >
            <img
              src={'/images/main_banner/banner3.png'}
              alt='imag'
              className='h-[160px] sm:h-[240px] object-cover w-full sm:min-w-[490px] ob absolute right-0 top-0'
              width={507}
              height={240}
            />
            <span className='relative mb-[10px] block z-[10] text-[22px] sm:text-[34px] font-bold'>
              {t('pages.main.banners.club.title')}
            </span>
            <p className='relative z-[10] text-[18px] sm:text-[24px] font-normal'>
              {t('pages.main.banners.club.text_1')} <br />{' '}
              {t('pages.main.banners.club.text_2')}
            </p>
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: 507,
              backgroundSize: 'cover'
            }}
            key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
            className='rounded-xl max-h-40 min-h-[136px] sm:min-h-[240px] p-[30px_20px] overflow-hidden xxs:max-h-48 relative smm:max-h-56 mb-8'
          >
            <img
              src='/images/main_banner/banner1.png'
              alt='imag'
              className='h-[160px] sm:h-[240px] object-cover w-full sm:min-w-[490px] ob absolute right-0 top-0'
              width={507}
              height={240}
            />
            <span className='relative mb-[10px] block z-[10] text-[22px] sm:text-[34px] font-bold'>
              {t('pages.main.banners.affiliate.title')}
            </span>
            <p className='relative z-[10] text-[18px] sm:text-[24px] font-normal'>
              {t('pages.main.banners.affiliate.text_1')} <br />{' '}
              {t('pages.main.banners.affiliate.text_2')}
            </p>
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: 507,
              backgroundSize: 'cover'
            }}
            key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
            className='rounded-xl max-h-40 min-h-[136px] sm:min-h-[240px] p-[30px_20px] overflow-hidden xxs:max-h-48 relative smm:max-h-56 mb-8'
          >
            <img
              src='/images/main_banner/banner4.png'
              alt='imag'
              className='h-[160px] sm:h-[240px] object-cover w-full sm:min-w-[490px] ob absolute right-0 top-0'
              width={507}
              height={240}
            />
            <span className='relative mb-[10px] block z-[10] text-[22px] sm:text-[34px] font-bold'>
              {t('pages.main.banners.poker.title')}
            </span>
            <p className='relative z-[10] text-[18px] sm:text-[24px] font-normal'>
              {t('pages.main.banners.poker.text_1')} <br />{' '}
              {t('pages.main.banners.poker.text_2')}
            </p>
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: 507,
              backgroundSize: 'cover'
            }}
            key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
            className='rounded-xl max-h-40 min-h-[136px] sm:min-h-[240px] p-[30px_20px] overflow-hidden xxs:max-h-48 relative smm:max-h-56 mb-8'
          >
            <img
              src='/images/main_banner/banner5.png'
              alt='imag'
              className='h-[160px] sm:h-[240px] object-cover w-full sm:min-w-[490px] ob absolute right-0 top-0'
              width={507}
              height={240}
            />
            <span className='relative mb-[10px] block z-[10] text-[22px] sm:text-[34px] font-bold'>
              {t('pages.main.banners.chest.title')}
            </span>
            <p className='relative z-[10] text-[18px] sm:text-[24px] font-normal'>
              {t('pages.main.banners.chest.text_1')} <br />{' '}
              {t('pages.main.banners.chest.text_2')}
            </p>
          </SwiperSlide>
        </>
      ))}
    </Carousel>
  )
}

export default Banner
