'use client'
import { FC } from 'react'
import VipIco from '@/public/images/vip/pageIco.svg'
import { VipTable } from './components/VipTable'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import Footer from '@/components/custom/footer'


interface VipProps {}

const Vip:FC<VipProps> = () => {
    const router = useRouter()

    return (
        <>
            <div className="m-[0_0_60px_0] sm:m-[1.25rem_2.5rem] h-full box-border bg-[#151515] rounded-none sm:rounded-[20px]">
                <div className='p-[20px] relative'>
                    <X className='absolute top-[20px] right-[20px] text-[#363636] cursor-pointer' onClick={() => router.push('/')}></X>
                    <span className='flex gap-[4px] items-center text-[16px] font-extrabold text-[#eaeaea]'>
                        <VipIco className='w-[24px] h-[24px]' />
                        VIP Club
                    </span>
                    <span className='text-center mt-[25px] block text-[24px] font-semibold'>VIP Rules</span>
                    <VipTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Vip
