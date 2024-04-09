'use client';
import {FC} from 'react'

interface SubmitBtnProps {
    title: string,
    handler: () => void;
}

export const SubmitBtn:FC<SubmitBtnProps> = ({title, handler}) => {
    return (
        <button className='
            rounded-[8px] border border-[#907640] flex items-center justify-center text-[#FFE09D] text-[16px] font-semibold w-full max-w-[180px] h-[40px] bg-[#252019]
        ' onClick={handler}>
            {title}
        </button>
    )
}