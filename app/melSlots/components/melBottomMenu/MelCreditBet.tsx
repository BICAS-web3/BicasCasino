import {FC, useState} from 'react'
import InfoIco from '@/public/images/mell/mellInfoIco.svg'
import { MelSettings } from './MelSettings'
import { MellM } from '@/states'
import { useUnit } from 'effector-react'

interface MelCreditBetProps {}

export const MelCreditBet:FC<MelCreditBetProps> = () => {

    const [setInfo] = useUnit([
        MellM.setGameInfoVisibility
    ])

    return (
        <div className='flex gap-[10px] items-center'>
            <MelSettings />
            <InfoIco onClick={() => setInfo(true)} className='cursor-pointer' />
            <div className='flex flex-col items-cente justify-between'>
                <div className='grid grid-cols-2 gap-[10px]'>
                    <span className='uppercase text-[#FFA63E] text-[20px] font-normal'>credit</span>
                    <span className='text-[20px] font-normal text-[#fff] gap-[5px] flex items-center'>
                        00.00 <span className='uppercase text-[14px]'>dc</span>
                    </span>
                </div>
                <div className='grid grid-cols-2 gap-[10px]'>
                    <span className='uppercase text-[#FFA63E] text-[20px] font-normal'>bet</span>
                    <span className='text-[20px] font-normal text-[#fff] gap-[5px] flex items-center'>
                        00.00 <span className='uppercase text-[14px]'>dc</span>
                    </span>
                </div>
            </div>
        </div>
    )
}