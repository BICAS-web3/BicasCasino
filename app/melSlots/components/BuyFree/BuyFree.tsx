import {FC} from 'react'
import Border from '@/public/images/mell/buyFreeBorder.svg'
import { useUnit } from 'effector-react'
import { MellM } from '@/states'
import DeclineBorder from '@/public/images/mell/approveBorder.svg'
import ApproveBorder from '@/public/images/mell/declineBorder.svg'

interface BuyFreeProps {}

export const BuyFree:FC<BuyFreeProps> = () => {

    const [modalVisibility, setModalVisibility] = useUnit([
        MellM.$buy,
        MellM.setBuy
    ])

    return (
        <div className={`w-full p-[20px] h-full flex justify-center items-center absolute top-0 left-0 transition-all duration-300 bg-[rgba(0,_0,_0,_0.6)] z-[22] ${modalVisibility ? 'opacity-1 visible' : 'opacity-0 invisible'}`}>
            <div className='w-full relative flex flex-col items-center p-[30px] max-w-[435px] h-full bg-[#000] max-h-[280px]'>
                <Border className='w-full h-full absolute top-0 left-0' />
                <span className='buy-text uppercase text-center text-[28px] font-medium'>купить <br/> бесплатные спины</span>
                <span className='buy-qt-text flex items-end text-[44px] font-extrabold leading-[60px] gap-[15px]'>20,00 <span className='uppercase text-[36px] leading-[53px]'>dc</span></span>
                <div className='mt-[20px] justify-center w-full flex items-center gap-[20px]'>
                    <div className='w-full max-w-[130px] h-[56px] relative cursor-pointer' onClick={() => setModalVisibility(false)} >
                        <DeclineBorder className='absolute top-0 left-0 w-full h-full' />
                    </div>
                    <div className='w-full max-w-[130px] h-[56px] relative cursor-pointer'>
                        <ApproveBorder className='absolute top-0 left-0 w-full h-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}