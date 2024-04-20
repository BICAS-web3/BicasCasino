import {FC} from 'react'


import GWord from '@/public/images/chestCard/g.png'
import RWord from '@/public/images/chestCard/r.png'
import EWord from '@/public/images/chestCard/e.png'
import KWord from '@/public/images/chestCard/k.png'


import gTest from '@/public/images/chestCard/gTest.png'


import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { LeftArrow } from '@/public/icons/chest/leftArrow'
import { RightArrow } from '@/public/icons/chest/rightArrow'
import { Navigation } from 'swiper/modules'
import { useUnit } from 'effector-react'
import { ChestModel } from '@/states'

const wordList = [
    {
        img: GWord,
        userHave: false
    },
    {
        img: RWord,
        userHave: false
    },
    {
        img: EWord,
        userHave: false
    },
    {
        img: EWord,
        userHave: false
    },
    {
        img: KWord,
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

    const [setVisibility, setHistoryVisibility] = useUnit([
        ChestModel.setModalVisibility,
        ChestModel.setHistoryVisibility,
    ])

    return (
        <div className=''>
            <div className='flex items-center justify-between'>
                <span className="text-[14px] font-semibold leading-[19px]">Completed words: <span className='text-[#7e7e7e]'>0</span> </span>
                <span className="text-[14px] font-semibold leading-[19px]"> Bonus Pool <span className='uppercase text-[#FFE09D]'>2000 DC</span> </span>
            </div>
            <div className={`flex items-center justify-between gap-[10px] mt-[10px]`}>
                {
                    wordList.map((item, ind) => (
                        <div key={ind} className='smm:w-full smm:h-full w-[60px] h-[80px]' >
                            <img src={item.img.src} className='w-full h-full' />
                        </div>
                    ))
                }
            </div>
            <div className='h-[310px] mt-[20px] relative'>
                <div className='prev-arr-chest bg-[#282828] rounded-[5px] absolute z-[9999] flex items-center justify-center top-[50%] left-[20%] w-[25px] h-[25px] translate-y-[-50%]'>
                    <LeftArrow />
                </div>
                <div className='next-arr-chest bg-[#282828] rounded-[5px] w-[25px] z-[9999] flex items-center justify-center h-[25px] absolute top-[50%] right-[20%] translate-y-[-50%]'>
                    <RightArrow />
                </div>
                <Swiper slidesPerView={1} centeredSlides={true} centeredSlidesBounds={true} modules={[Navigation]} navigation={{
                    prevEl: '.prev-arr-chest',
                    nextEl: '.next-arr-chest'
                }} className='h-full' >
                    {
                        swiperWord.map((item, ind) => (
                            <SwiperSlide>
                                <div key={ind} className='select-none w-full h-full flex justify-center tabCardSlide' >
                                    <Image className='max-h-[310px] max-w-[210px] swiper-tab-chest-img' src={item.img} alt='sdf' />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className='flex mt-[15px] items-center justify-between'>
                <span className='text-[14px] font-bold text-[#fff]'>Duration <span className='text-[#7E7E7E]'>2024.04.08-2024.04.15</span></span>
                <span className="text-[14px] font-bold">Status: <span className="text-[#FFE09D]">Active</span></span>
            </div>
            <div className='flex mt-[5px] justify-center cursor-pointer text-center underline text-[14px] font-semibold' onClick={() => {
                setHistoryVisibility(true)
                setVisibility(false)
            }} >View History {`>`}</div>
        </div>
    )
}