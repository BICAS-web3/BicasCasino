import { FC } from 'react'
import DCoin from '@/components/custom/header/components/icons/draxMiniIco.svg'
import { SubmitBtn } from '@/app/profile/components/submitBtn/SubmitBtn'

interface AffiliatesFundsProps {}

export const AffiliatesFunds:FC<AffiliatesFundsProps> = () => {

    const btnHandler = () => {

    }

    return (
        <div className='border border-[#3E3E3E] rounded-[5px]'>
            <div className='p-[20px] sm:p-[20px] border-b-[1px] max-w-[450px] border-[#3E3E3E]'>
                <span className="text-[14px] font-bold leading-[18px] mb-[5px] block">Balance</span>
                <div className="bg-inherit sm:bg-[#181818] gap-[15px] w-full sm:w-fit p-[0px] sm:p-[20px_30px] rounded-[5px] flex items-center justify-between min-h-[115px]">
                    <div className="flex flex-col justify-between items-center gap-[10px] text-center">
                        <span className="text-[13px] sm:text-[14px] font-bold leading-[18px] text-[#676767]">Total <br /> Commission</span>
                        <div className='flex items-center gap-[10px]text-[13px ]sm:text-[16px] font-medium leading-[24px]'>
                            <DCoin className='sm:w-[24px] sm:h-[24px] h-[20px] w-[20px]' /> 0.000
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center gap-[10px] text-center">
                        <span className="text-[13px] sm:text-[14px] font-bold leading-[18px] text-[#676767]">Available <br /> Commission</span>
                        <div className='flex items-center gap-[10px] text-[13px ]sm:text-[16px] font-medium leading-[24px]'>
                            <DCoin className='sm:w-[24px] sm:h-[24px] h-[20px] w-[20px]' /> 0.000
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center gap-[10px] text-center">
                        <span className="text-[13px] sm:text-[14px] font-bold leading-[18px] text-[#676767]">Cashout <br /> History</span>
                        <div className='flex items-center gap-[10px] text-[13px ]sm:text-[16px] font-medium leading-[24px]'>
                            <DCoin className='sm:w-[24px] sm:h-[24px] h-[20px] w-[20px]' /> 0.000
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-[20px]">
                <div className="max-w-[460px]">
                    <div className='flex items-center justify-between'>
                        <span className="text-[13px] sm:text-[16px] font-bold leading-[22px] text-[#979797]">Min Transfer</span>
                        <span className="text-[13px] sm:text-[16px] font-bold leading-[22px] text-[#979797]">Avaliable</span>
                    </div>
                    <div className="flex items-center justify-between mt-[]">
                        <span className='text-[13px] sm:text-[16px] font-normal leading-[22px] text-[#979797]'>0.01 DC</span>
                        <div className='flex items-center'>
                            <span className='cursor-pointer underline uppercase text-[#FFE09D] text-[13px] sm:text-[16px] font-normal'>0.000 dc</span>
                            <span className='uppercase text-[#979797] text-[13px] sm:text-[16px] font-normal'>&nbsp;≈ 0.000 $</span>
                        </div>
                    </div>
                    <div className='relative h-[40px] mt-[5px]'>
                        <input type="text" className="text-[#fff] placeholder:text-[#fff] text-[13px] sm:text-[16px] font-normal p-[0_20px_0_10px] w-full h-full bg-[#121212] border border-[#252525] rounded-[5px]" placeholder='0.000' />
                        <DCoin className="absolute top-[8px] right-[20px] w-[24px] h-[24px]" />
                    </div>
                    <p className="mt-[3px] text-[14px] font-normal text-[#7e7e7e]">(Transfer affiliate commission to your game balance)</p>
                    <SubmitBtn className='mt-[20px] max-w-[100%]' title='Cashout To Game Balance' handler={btnHandler} />
                </div>
            </div>
        </div>
    )
}