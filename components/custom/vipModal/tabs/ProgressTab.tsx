import {FC} from 'react'
import pathBg from '@/public/images/modals/vipPathBg.png'
import Chest from '@/public/images/modals/miniChest.svg'

import Progress1 from '@/public/images/modals/progress1.svg'
import Progress2 from '@/public/images/modals/progress2.svg'
import Progress3 from '@/public/images/modals/progress3.svg'
import Progress4 from '@/public/images/modals/progress4.svg'
import Progress5 from '@/public/images/modals/progress5.svg'
import Progress6 from '@/public/images/modals/progress6.svg'

const list = [
    {
        img: <Progress1 />,
        title: 'Vip Login Bonus'
    },
    {
        img: <Progress2 />,
        title: 'Daily Bonus for VIP5+'
    },
    {
        img: <Progress3 />,
        title: 'Weekly Bonus'
    },
    {
        img: <Progress4 />,
        title: 'Monthly Bonus for VIP7+'
    },
    {
        img: <Progress5 />,
        title: 'CASHBACK'
    },
    {
        img: <Progress6 />,
        title: 'Rakeback Up to 21%'
    },
]

interface ProgressTabProps {}

export const ProgressTab:FC<ProgressTabProps> = () => {
    return (
        <div>
            <div className="h-[80px] p-[10px] bg-[#252525] rounded-[5px] relative">
                <img src={pathBg.src} className='absolute w-full object-cover h-full top-0 left-0' />
                <div className='flex justify-between relative z-10'>
                    <span className='text-[13px] font-semibold'>Level 0</span>
                    <div>
                        <Chest />
                    </div>
                </div>
                <div className='relative z-10 flex items-center justify-between gap-[10px]'>
                    <div className='w-full h-[8px] bg-[#3E3E3E] rounded-[10px]'>
                        <div className='w-[5%] rounded-[10px] bg-[#29F061] h-full'></div>
                    </div>
                    <span className="text-[13px] font-semibold text-nowrap">Level 1</span>
                </div>
            </div>
            <span className='text-end mt-[5px] w-full block underline text-[#7E7E7E] text-[13px] font-semibold'>Rule</span>
            <div className='flex flex-col'>
                <span className="text-[14px] font-semibold">VIP Club - Exclusive Benefits</span>
                <div className='grid grid-cols-2 mt-[10px] gap-[10px]'>
                    {
                        list.map((item, ind) => (
                            <div key={ind} className='p-[10px] bg-[#252525] flex items-center gap-[10px] text-[14px] font-medium text-[#979797]'>
                                {item.img}
                                {item.title}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}