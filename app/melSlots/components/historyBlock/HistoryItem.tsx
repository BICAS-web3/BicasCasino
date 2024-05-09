import {FC} from 'react'
import testImg from '@/public/images/mell/testImg.png'

interface HistoryItemProps {}

export const HistoryItem:FC<HistoryItemProps> = () => {
    return (
        <div
            className='history-mell-item p-[10px] w-full flex items-center justify-between relative z-[2]'
        >
            <div className='flex items-center gap-[5px] text-[16px] font-bold'>
                10
                <img src={testImg.src} className='min-w-[22px] h-[22px]' />
            </div>
            $2,40
        </div>
    )
}