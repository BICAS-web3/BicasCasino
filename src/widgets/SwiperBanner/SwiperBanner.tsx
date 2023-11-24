import {FC, useEffect, useRef, useState} from 'react';
import s from './styles.module.scss';

import SwiperCore, { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/scss";
import 'swiper/css/effect-fade';
// import "swiper/scss/ef";
import {Autoplay, Navigation, Pagination, EffectFade} from 'swiper/modules'
import Image from 'next/image';


///images 

import swiperImg1Desk from '@/public/media/swiperBannerImgs/swiperBanner1Desk.png';
import swiperImg2Desk from '@/public/media/swiperBannerImgs/swiperBanner2Desk.png';
import swiperImg3Desk from '@/public/media/swiperBannerImgs/swiperBanner3Desk.png';
import swiperImg4Desk from '@/public/media/swiperBannerImgs/swiperBanner4Desk.png';

import swiperImg1Laptop from '@/public/media/swiperBannerImgs/swiperBanner1Laptop.png';
import swiperImg2Laptop from '@/public/media/swiperBannerImgs/swiperBanner2Laptop.png';
import swiperImg3Laptop from '@/public/media/swiperBannerImgs/swiperBanner3Laptop.png';
import swiperImg4Laptop from '@/public/media/swiperBannerImgs/swiperBanner4Laptop.png';

import swiperImg1Tablet from '@/public/media/swiperBannerImgs/swiperBanner1Tablet.png';
import swiperImg2Tablet from '@/public/media/swiperBannerImgs/swiperBanner2Tablet.png';
import swiperImg3Tablet from '@/public/media/swiperBannerImgs/swiperBanner3Tablet.png';
import swiperImg4Tablet from '@/public/media/swiperBannerImgs/swiperBanner4Tablet.png';

import swiperImg1Mobile from '@/public/media/swiperBannerImgs/swiperBanner1Mobile.png';
import swiperImg2Mobile from '@/public/media/swiperBannerImgs/swiperBanner2Mobile.png';
import swiperImg3Mobile from '@/public/media/swiperBannerImgs/swiperBanner3Mobile.png';
import swiperImg4Mobile from '@/public/media/swiperBannerImgs/swiperBanner4Mobile.png';

import kycIco from '@/public/media/swiperBannerImgs/kycIco.svg'

///

const swiperSlides = [
    {
        text: 'Web3.0 Games',
        subTitle: 'Without KYC just connect your wallet and play',
        isBtn: true,
        deskImg: swiperImg1Desk,
        laptopImg: swiperImg1Laptop,
        tabletImg: swiperImg1Tablet,
        mobileImg: swiperImg1Mobile,
    },
    {
        text: 'Get your $100 deposit bonus in the DRAXB token',
        isBtn: true,
        deskImg: swiperImg2Desk,
        laptopImg: swiperImg2Laptop,
        tabletImg: swiperImg2Tablet,
        mobileImg: swiperImg2Mobile,
    },
    {
        text: 'You can bet on the BSC, Polygon and Arbitrum networks',
        isBtn: false,
        deskImg: swiperImg3Desk,
        laptopImg: swiperImg3Laptop,
        tabletImg: swiperImg3Tablet,
        mobileImg: swiperImg3Mobile,
    },
    {
        text: 'Since our casino is web 3.0 we do not keep user funds, your game is absolutely safe',
        isBtn: false,
        deskImg: swiperImg4Desk,
        laptopImg: swiperImg4Laptop,
        tabletImg: swiperImg4Tablet,
        mobileImg: swiperImg4Mobile,
    }
]

interface SwiperBannerProps {};

export const SwiperBanner:FC<SwiperBannerProps> = () => {
    const [is1280, setIs1280] = useState(false)
    const [is700, setIs700] = useState(false)
    const [is650, setIs650] = useState(false)
    const swiperRef = useRef<SwiperRef>(null);

    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          if(width < 1280 && width > 700) {
            setIs1280(true)
            setIs700(false)
            setIs650(false)
          } else if (width < 700 && width > 650) {
            setIs1280(false)
            setIs700(true)
            setIs650(false)
          } else if (width < 650) {
            setIs1280(false)
            setIs700(false)
            setIs650(true)
          } else {
            setIs1280(false)
            setIs700(false)
            setIs650(false)
          }
        };
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <div className={s.swiper_banner_wrap}>
            <Swiper
                ref={swiperRef}
                slidesPerView={1}
                fadeEffect={{crossFade: true}}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                speed={1000}
                effect='fade'
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className={s.main_banner_swiper}
                
            >
                {
                    swiperSlides.map((slide, ind) => (
                        <SwiperSlide key={ind} id="swiper-slide-banner" className={s.main_banner_swiper_slide} >
                            <Image className={s.slide_bg_img} src={ is1280 ? slide.laptopImg : is700 ? slide.tabletImg : is650 ? slide.mobileImg : slide.deskImg } alt='slide-imd' />
                            <span className={`${s.slide_text} ${ind===0 && s.title}`}>{slide.text}</span>
                            {
                                slide.subTitle && (
                                    <div className={s.kyc_block}>
                                        <Image src={kycIco} alt="kyc-ico" />
                                        Without KYC <br /> just connect your wallet and play
                                    </div>
                                )
                            }
                            {
                                slide.isBtn === true && (
                                    <button className={s.join_wallet_btn}>Join wallet</button>
                                )
                            }
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
};
// src={ is1280 ? slide.laptopImg : is700 ? slide.tabletImg : is650 ? slide.mobileImg : slide.deskImg }