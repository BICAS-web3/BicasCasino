import { FC } from 'react'
import { SubmitBtn } from '../submitBtn/SubmitBtn'

interface SettingsExclusionProps {}

export const SettingsExclusion: FC<SettingsExclusionProps> = () => {
  const handleSubmit = () => {}

  return (
    <div className='border-[1px] p-[20px] rounded-[5px] border-[#3E3E3E]'>
      <div className='pb-[20px] border-[#3E3E3E] border-b-[1px] flex flex-col gap-[5px]'>
        <span className='text-[17px] font-bold leading-[22px] text-white'>
          Self Exclusion
        </span>
        <span className='text-[14px] font-normal leading-[18px] text-[#7E7E7E] max-w-[675px]'>
          Need a break from GreekKepeers.io? To start the automated self
          exclusion process, please click the button br below to receive
          confirmation instructions via email.
        </span>
      </div>
      <div className='flex items-center justify-end p-[20px_20px_0_20px] border-t-[1px] border-[#3E3E3E]'>
        <SubmitBtn
          isWidth={true}
          title='Request Self exclusion'
          handler={handleSubmit}
        />
      </div>
    </div>
  )
}
