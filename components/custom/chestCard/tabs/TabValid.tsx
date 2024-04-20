import {FC} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules';
// import 'swiper/css/pagination';

const testList = [
    {
        receiveList: [
            'test1',
            'test1',
            'test1',
            'test1',
        ],
        idList: [
            'test2'
        ],
        expiredList: [
            'test3'
        ],
    },
    {
        receiveList: [
            'test1',
            'test1',
            'test1',
            'test1',
        ],
        idList: [
            'test2'
        ],
        expiredList: [
            'test3'
        ],
    },
    {
        receiveList: [
            'test1',
            'test1',
            'test1',
            'test1',
        ],
        idList: [
            'test2'
        ],
        expiredList: [
            'test3'
        ],
    },
]

interface TabValidProps {}

export const TabValid:FC<TabValidProps> = () => {

    const pagination = {
        clickable: true,
        el: '.swiper-pagination-custom',
        renderBullet: function (index, className) {
          return `<span class="valid-pagination-bullet swiper-pagination-bullet">${index+1}</span>`;
        },
      };

    return (
        <div className='min-h-[400px]'>
            <div className='flex items-center mt-[10px] justify-between'>
                <span className='text-[15px] font-normal text-start text-[#7e7e7e] leading-[20.1px]'>Receive Time</span>
                <span className='text-[15px] font-normal text-center text-[#7e7e7e] leading-[20.1px]'>Chest ID</span>
                <span className='text-[15px] font-normal text-end text-[#7e7e7e] leading-[20.1px]'>Expired Time</span>
            </div>
            <Swiper
                className='mt-[10px]'
                slidesPerView={1}
                pagination={pagination}
                spaceBetween={3}
                modules={[Pagination]}
            >
                {
                    testList.map((item, ind) => (
                        <SwiperSlide key={ind}>
                            <div className='flex justify-between'>
                                <div className='flex flex-col justify-start gap-[10px]'>
                                    {
                                        item.receiveList.map((item, ind) => (
                                            <span className="text-[14px] font-normal text-[#7e7e7e]">{item}</span>
                                        ))
                                    }
                                </div>
                                <div className='flex flex-col h-full items-start justify-start gap-[10px]'>
                                    {
                                        item.idList.map((item, ind) => (
                                            <span className="text-[14px] font-normal text-[#7e7e7e]">{item}</span>
                                        ))
                                    }
                                </div>
                                <div className='flex flex-col justify-start gap-[10px]'>
                                    {
                                        item.expiredList.map((item, ind) => (
                                            <span className="text-[14px] font-normal text-[#7e7e7e]">{item}</span>
                                        ))
                                    }
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className='swiper-pagination-custom'></div>
        </div>
    )
}