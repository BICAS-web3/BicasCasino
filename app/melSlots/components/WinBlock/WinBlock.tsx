import {FC} from 'react'
import winBlock from '@/public/images/mell/winBlock.png'
import winBorder from '@/public/images/mell/winValueBorder.png'
import { useUnit } from 'effector-react'
import { MellM } from '@/states'

interface WinBlockProps {
    title: string
    text: string
    winValue: number
}

export const WinBlock:FC<WinBlockProps> = () => {

    const [visibility, setVisibility] = useUnit([
        MellM.$winVisibility,
        MellM.setWinVisibility
    ])

    return (
        <div className={`w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,_0,_0,_0.6)] transition-all duration-300 z-[22]`}>
            <div className="w-full max-w-[1110px] h-[450px] m-[20px] relative flex flex-col items-center justify-center text-center">
                <img src={winBlock.src} className='absolute top-0 left-0 w-full h-full' />
                <div className='relative z-[10] flex flex-col items-center'>
                    <h2 className="text-[70px] leading-[90px] font-bold uppercase mb-[10px]">поздравляем!</h2>
                    <span className="text-[28px] font-bold mb-[15px] uppercase">вы выиграли</span>
                    <div className='max-w-[270px] mb-[20px] w-full h-[70px]  flex items-center justify-center relative'>
                        <img src={winBorder.src} className='absolute w-full h-full left-0 top-0' />
                        <p className='win-text text-[40px] font-black'>15</p>
                    </div>
                    <span className='text-[28px] font-bold uppercase'>бесплатных вращений</span>
                    <p className="text-[12px] font-medium uppercase mt-[10px]">нажмите в любом месте, чтобы продолжить...</p>
                </div>
            </div>
        </div>
    )
}