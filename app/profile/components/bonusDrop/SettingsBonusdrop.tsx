import { FC } from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { SubmitBtn } from '../submitBtn/SubmitBtn'

interface SettingsBonusdropProps {}

export const SettingsBonusdrop: FC<SettingsBonusdropProps> = () => {
  const handleSubmit = () => {}

  return (
    <div className='border-[1px] rounded-[5px] border-[#3E3E3E]'>
      <div className='flex flex-col gap-[5px] border-b-[1px] border-[#3E3E3E] m-[20px_20px_0_20px] pb-[20px]'>
        <span className='text-[17px] font-bold leading-[22px] text-white'>
          Redeem Bonus Drop
        </span>
        <span className='text-[14px] font-normal leading-[18px] text-[#7E7E7E]'>
          Find bonus drop codes on our social media's such as Twitter & Telegram
        </span>
      </div>
      <div className='p-[20px] mt-[10px]'>
        <InputBlock isNecessarily={true} title='Code' placeholder='code here' />
      </div>
      <div className='flex items-center justify-end p-[20px] border-t-[1px] border-[#3E3E3E]'>
        <SubmitBtn title='Submit' handler={handleSubmit} />
      </div>
    </div>
  )
}
