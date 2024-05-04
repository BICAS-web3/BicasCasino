"use client"
import {FC} from 'react'
import VipIco from '@/public/images/vip/pageIco.svg'
import { VipTable } from './components/VipTable'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'


interface VipProps {}

const Vip:FC<VipProps> = () => {
    const router = useRouter()

    return (
        <div className="m-[1.25rem_2.5rem] h-full box-border bg-[#151515] rounded-[20px]">
            <div className='p-[20px] relative'>
                <X className='absolute top-[30px] right-[30px] cursor-pointer' onClick={() => router.push('/')}></X>
                <span className='flex gap-[4px] items-center text-[16px] font-extrabold text-[#eaeaea]'>
                    <VipIco className='w-[24px] h-[24px]' />
                    VIP Club
                </span>
                <span className='text-center mt-[25px] block text-[24px] font-semibold'>VIP Rules</span>
                <VipTable />
            </div>
        </div>
    )
}

export default Vip