import {FC, useState} from 'react'
import InfoIco from '@/public/images/mell/mellInfoIco.svg'
import { MelSettings } from './MelSettings'
import { MellM } from '@/states'
import { useUnit } from 'effector-react'

interface MelCreditBetProps {}

export const MelCreditBet:FC<MelCreditBetProps> = () => {


    const [mobileVisibility, setMobileVisibility, setDesktopVisibility, desktopVisibility, setInfo] = useUnit([
        MellM.$mobileRules,
        MellM.setMobileRules,
        MellM.setGameInfoVisibility,
        MellM.$gameInfoVisibility,
        MellM.setGameInfoVisibility
    ])

    const rulesHandler = () => {
        if(window.innerWidth < 650) {
            setMobileVisibility(!mobileVisibility)
        } else {
            setDesktopVisibility(!desktopVisibility)
        }
    }

    return (
        <div className='flex justify-between sm:justify-start w-full sm:w-auto gap-[10px] items-center'>
            <MelSettings />
            <InfoIco onClick={rulesHandler} className='cursor-pointer hidden sm:block sm:w-[57px] sm:h-[57px] ' />
            <div className='flex flex-row gap-[10px] tbb:gap-[0] tbb:flex-col items-cente justify-between'>
                <div className='flex tbb:grid grid-cols-2 gap-[10px]'>
                    <span className='uppercase text-[#FFA63E] text-[20px] font-normal'>credit</span>
                    <span className='text-[20px] font-normal text-[#fff] gap-[5px] flex items-center'>
                        00.00 <span className='uppercase text-[14px]'>dc</span>
                    </span>
                </div>
                <div className='flex tbb:grid grid-cols-2 gap-[10px]'>
                    <span className='uppercase text-[#FFA63E] text-[20px] font-normal'>bet</span>
                    <span className='text-[20px] font-normal text-[#fff] gap-[5px] flex items-center'>
                        00.00 <span className='uppercase text-[14px]'>dc</span>
                    </span>
                </div>
            </div>
            <InfoIco onClick={rulesHandler} className='cursor-pointer block sm:hidden w-[30px] h-[30px] sm:w-[57px] sm:h-[57px] ' />
        </div>
    )
}