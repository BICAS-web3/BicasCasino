import {FC} from 'react'
import ShareIco from '@/public/images/chestCard/shareIco.svg'
import ChestIco from '@/public/images/chestCard/chest.svg'
import ChestMiniIco from '@/public/images/chestCard/chestMiniIco.svg'
import Image from 'next/image'

interface TabChestProps {}

export const TabChest:FC<TabChestProps> = () => {
    return (
        <div className="">
            <div className='flex items-center justify-between'>
                <span className='underline text-[13px] font-semibold leading-[18px] text-[#7e7e7e] cursor-pointer select-none'>History</span>
                <div className='p-[4px] select-none cursor-pointer rounded-[5px] text-[13px] font-bold text-[#fff] leading-[18px] bg-[#2e2e2e] flex items-center gap-[4px]'>
                    <ShareIco />
                    <span className='underline'>Share</span>
                    (+1 <ChestMiniIco />)
                </div>
            </div>
            <div className='flex h-[160px] relative top-[-20px] items-center justify-center'>
                <ChestIco />
            </div>
            <p className='text-center text-[13px] font-semibold block mt-[30px]'>The treasure chest you have: 25</p>
            <div className='flex gap-[10px]'>
                <div className='h-80px flex items-center justify-center bg-[#FFE09D] rounded-[5px] text-[15px] font-semibold text-center leading-[]'>
                    Single Open <br /> 400 BC
                </div>
            </div>
        </div>
    )
}