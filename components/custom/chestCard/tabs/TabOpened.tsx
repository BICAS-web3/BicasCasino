import {FC} from 'react'
import noDataImg from '@/public/images/chestCard/noData.png'

interface TabOpenedProps {}

export const TabOpened:FC<TabOpenedProps> = () => {
    return (
        <div className="">
            <div className='flex items-center justify-between'>
                <span className="text-[15px] font-normal text-[#7e7e7e] leading-[20.1px]">Open Time</span>
                <span className="text-[15px] font-normal text-[#7e7e7e] leading-[20.1px]">Chest ID</span>
                <span className="text-[15px] font-normal text-[#7e7e7e] leading-[20.1px]">Gift</span>
            </div>
            <div className='flex mt-[25px] flex-col gap-[15px] justify-center items-center'>
                <img src={noDataImg.src} className='max-w-[113px] max-h-[105px]' alt='nodata' />
                <span className="text-[14px] font-normal text-center text-[#7e7e7e]">No Data</span>
            </div>
        </div>
    )
}