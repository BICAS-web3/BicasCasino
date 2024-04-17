import {FC} from 'react'


import GWord from '@/public/images/chestCard/gWord.svg'
import RWord from '@/public/images/chestCard/rWord.svg'
import EWord from '@/public/images/chestCard/eWord.svg'
import KWord from '@/public/images/chestCard/kWord.svg'


import gTest from '@/public/images/chestCard/gTest.png'
import GBig from '@/public/images/chestCard/gBig.svg'

import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

const wordList = [
    {
        img: <GWord />,
        userHave: false
    },
    {
        img: <RWord />,
        userHave: false
    },
    {
        img: <EWord />,
        userHave: false
    },
    {
        img: <EWord />,
        userHave: false
    },
    {
        img: <KWord />,
        userHave: false
    },
]

const swiperWord = [
    {
        img: gTest,
        userHave: false
    },
    {
        img: gTest,
        userHave: false
    },
    {
        img: gTest,
        userHave: false
    },
    {
        img: gTest,
        userHave: false
    },
    {
        img: gTest,
        userHave: false
    },
]

interface TabCardProps {}

export const TabCard:FC<TabCardProps> = () => {
    return (
        <div className=''>
            <div className='flex items-center justify-between'>
                <span className="text-[14px] font-semibold leading-[19px]">Completed words: <span className='text-[#7e7e7e]'>0</span> </span>
                <span className="text-[14px] font-semibold leading-[19px]"> Bonus Pool <span className='uppercase text-[#FFE09D]'>2000 DC</span> </span>
            </div>
            <div className={`grid mt-[10px] grid-cols-${wordList.length}`}>
                {
                    wordList.map((item, ind) => (
                        <div key={ind}>
                            {item.img}
                        </div>
                    ))
                }
            </div>
            <div className='h-[310px] mt-[20px]'>
                <Swiper slidesPerView={1} centeredSlides={true} centeredSlidesBounds={true} className='h-full' >
                    {
                        swiperWord.map((item, ind) => (
                            <SwiperSlide>
                                <div key={ind} className='w-full h-full flex justify-center tabCardSlide' >
                                    <Image className='max-h-[310px] max-w-[210px]' src={item.img} alt='sdf' />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}