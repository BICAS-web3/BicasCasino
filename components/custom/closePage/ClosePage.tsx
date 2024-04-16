import {FC} from 'react'
import CloseIco from '@/public/images/vip/closeIco.svg'
import { useRouter } from 'next/navigation';

interface ClosePageProps {}

export const ClosePage:FC<ClosePageProps> = () => {
    const router = useRouter()

    return (
        <div className='absolute top-[30px] right-[30px] cursor-pointer' onClick={() => router.push('/')} >
            <CloseIco />
        </div>
    )
}