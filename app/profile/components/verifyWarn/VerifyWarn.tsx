import { FC } from 'react'
import WarnIco from '@/public/images/settings/warn.svg'

interface VerifyWarnProps {}

export const VerifyWarn: FC<VerifyWarnProps> = () => {
  return (
    <div className='flex items-center justify-center rounded-[12px] absolute w-full flex-col text-center h-full top-0 left-0 bg-[#070707B2]  z-10'>
      <span className='flex items-center gap-[5px] text-[17px] font-bold text-white leading-[22px]'>
        <WarnIco />
        Warning:
      </span>
      <p className='text-[15px] text-white leading-[18px] font-bold'>
        Please complete the email setting first
      </p>
    </div>
  )
}
