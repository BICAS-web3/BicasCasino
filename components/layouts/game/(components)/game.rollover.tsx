import {FC} from 'react'
import Close from '@/public/images/misc/rollClose.svg'
import Change from '@/public/images/misc/rollChange.svg'

interface GameRollOverProps {}

export const GameRollOver:FC<GameRollOverProps> = () => {
    return (
        <div className="absolute left-[50%] translate-x-[-50%] top-[-38%] sm:top-[-30%] tbs:top-[-60%] flex items-center gap-[10px]">
            <div className='flex flex-col gap-[5px]'>
                <span className="text-[#7e7e7e] text-[10px] font-medium">Multiplier</span>
                <div className='rounded-[100px] w-[80px] sm:w-[125px] h-[30px] border border-[#2E2E2E] flex items-center justify-between gap-[15px]'>
                    <span className="text-[#aaa] text-[13px] font-medium m-[1px_0_0_16px]">1.98</span>
                    <div className='flex items-center justify-center bg-[#20202066] rounded-[0_100px_100px_0] w-[20px] sm:w-[40px] h-full cursor-pointer'>
                        <Close />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <span className="text-[#7e7e7e] text-[10px] font-medium">Roll Over</span>
                <div className='rounded-[100px] w-[80px] sm:w-[125px] h-[30px] border border-[#2E2E2E] flex items-center justify-between gap-[15px]'>
                    <span className="text-[#aaa] text-[13px] font-medium m-[2px_0_0_16px]">50</span>
                    <div className='flex items-center justify-center bg-[#20202066] rounded-[0_100px_100px_0] w-[20px] sm:w-[40px] h-full cursor-pointer'>
                        <Change />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
                <span className="text-[#7e7e7e] text-[10px] font-medium">Win Chance</span>
                <div className='rounded-[100px] w-[80px] sm:w-[125px] h-[30px] border border-[#2E2E2E] flex items-center justify-between gap-[15px]'>
                    <span className="text-[#aaa] text-[13px] font-medium m-[2px_0_0_16px]">50</span>
                    <div className='flex items-center justify-center rounded-[0_100px_100px_0] w-[20px] sm:w-[40px] h-full cursor-pointer text-[#7E7E7E] text-[12px] font-bold'>
                        %
                    </div>
                </div>
            </div>
        </div>
    )
}