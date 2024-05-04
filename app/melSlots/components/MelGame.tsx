"use client"
import {FC} from 'react'
import melBg from '@/public/images/mell/mellBg.png'
import { MelBottomMenu } from './melBottomMenu/MelBottomMenu'
import SlotsBorder from '@/public/images/mell/slotsBorder.svg'
import { MelRules } from './MelRules/MelRules'
import { Settings } from './Settings/Settings'
import { WinBlock } from './WinBlock/WinBlock'
import { AutoPlaySettings } from './AutoPlaySettings/AutoPlaySettings'

interface MelGameProps {}

export const MelGame:FC<MelGameProps> = () => {
    return (
        <div className='w-full min-h-[910px] pb-5 sm:p-10 sm:pb-5 flex flex-col relative'>
            <div
                className={`relative flex justify-center flex-col flex-[1_1_auto] sm:rounded-[20px_20px_0_0] overflow-hidden sm:max-h-max sm:min-h-[594px] xl:min-h-[618px] 3xl:min-h-[680px] `}
            >
                <MelRules />
                <AutoPlaySettings />
                <Settings />
                {/* <WinBlock winValue={10} title='ad' text='asd' /> */}
                <div className='mel-slots-table h-full max-h-[600px] z-[20] items-center flex justify-center mb-[70px]'>
                    <div className='max-w-[760px] h-[100vh] w-full relative items-center flex justify-center max-h-[530px]'>
                        <div className='w-full h-[84vw] sm:h-full grid grid-cols-6 p-[80px_70px] sm:p-[30px_110px_30px_130px] z-[10]'>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                        </div>
                        <SlotsBorder className='absolute p-[20px] top-0 left-0 slots-border w-full' />
                    </div>
                </div>
                <img src={melBg.src} className='absolute object-cover w-full h-full top-0 left-0' />
                <MelBottomMenu />
            </div>
        </div>
    )
}