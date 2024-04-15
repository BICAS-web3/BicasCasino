import {FC} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from "swiper/modules";
import "swiper/scss";
import "swiper/css/effect-fade";
import DisabledIco from '@/public/images/vip/vipDisabled.svg'
import ActiveIco from '@/public/images/vip/vipActive.svg'
import MinusIco from '@/public/images/vip/minusIco.svg'
import ArrowIco from '@/public/images/vip/arrow.svg'

const slides = [
    {
        title: 'Vip LVL',
        list: [
            {
                ico: <DisabledIco />,
                title: 'Level 1'
            },
            {
                ico: <DisabledIco />,
                title: 'Level 2'
            },
            {
                ico: <DisabledIco />,
                title: 'Level 3'
            },
            {
                ico: <DisabledIco />,
                title: 'Level 4'
            },
            {
                ico: <DisabledIco />,
                title: 'Level 5'
            },
            {
                ico: <ActiveIco />,
                title: 'Level 6'
            },
            {
                ico: <ActiveIco />,
                title: 'Level 7'
            },
            {
                ico: <ActiveIco />,
                title: 'Level 8'
            },
            {
                ico: <ActiveIco />,
                title: 'Level 9'
            },
            {
                ico: <ActiveIco />,
                title: 'Level 10'
            },
        ]
    },
    {
        title: 'Wager Amount',
        list: [
            {
                title: '7000 DC'
            },
            {
                title: '10000 DC'
            },
            {
                title: '20000 DC'
            },
            {
                title: '40000 DC'
            },
            {
                title: '100000 DC'
            },
            {
                title: '150000 DC'
            },
            {
                title: '200000 DC'
            },
            {
                title: '500000 DC'
            },
            {
                title: '1000000 DC'
            },
            {
                title: '2000000 DC'
            },
        ]
    },
    {
        title: 'Login Bonus',
        list: [
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
        ]
    },
    {
        title: 'Weekly Bonus',
        list: [
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
        ]
    },
    {
        title: 'Monthly Bonus',
        list: [
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
        ]
    },
    {
        title: 'Rakeback',
        list: [
            {
                title: '5%'
            },
            {
                title: '7.50%'
            },
            {
                title: '10%'
            },
            {
                title: '12%'
            },
            {
                title: '15%'
            },
            {
                title: '16.50%'
            },
            {
                title: '18%'
            },
            {
                title: '20%'
            },
            {
                title: '20.50%'
            },
            {
                title: '21%'
            },
        ]
    },
    {
        title: 'Cash Back',
        list: [
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
        ]
    },
    {
        title: 'Level Up Bonus',
        list: [
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
            {
                ico: <ArrowIco />
            },
        ]
    },
    {
        title: 'Welcome Bonus',
        list: [
            {
                ico: <ArrowIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
            {
                ico: <MinusIco />
            },
        ]
    },
]

interface VipTableProps {}

export const VipTable:FC<VipTableProps> = () => {
    return (
        <Swiper 
            slidesPerView={'auto'} 
            breakpoints={{
                1280: {
                    slidesPerView: slides.length 
                }
            }} 
            className='vip_swiper mt-[20px]' 
            spaceBetween={2} 
        >
            {
                slides.map((item, ind) => (
                    <SwiperSlide key={ind} className='vip_swiper_slide h-full flex flex-col gap-[2px]' >
                        <div className="bg-[#181818] h-[80px] flex text-center p-[0_2px] prewrap items-center justify-center text-[18px] font-semibold text-[#7E7E7E]">
                            {item.title}
                        </div>
                        <div className='flex flex-col h-full'>
                            {
                                item.list.map((item2, ind2) => (
                                    <div key={ind2} data-bg={ind2 % 2===0} className={`flex min-h-[70px] gap-[5px] h-full items-center justify-center ${ind2 % 2===0 ? 'bg-[#1A1A1A]' : "bg-[#181818]"}`}>
                                        {
                                            item2.ico && item2.ico
                                        }
                                        {
                                            item2.title && <span className='text-[15px] font-semibold'>{item2.title}</span>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}