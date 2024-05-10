import { FC } from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { countries } from 'countries-list'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
const countriesList = Object.keys(countries).map(code => ({
  // @ts-ignore
  title: countries[code].name,
  id: code
}))
import SecurIco from '@/public/images/settings/secur.svg'
import { SubmitBtn } from '../submitBtn/SubmitBtn'

interface SettingsVerifyProps {}

export const SettingsVerify: FC<SettingsVerifyProps> = () => {
  const handleSubmit = () => {}

  return (
    <div>
      <span className='block mb-[20px] text-[14px] font-bold leading-[18px] text-[#eaeaea]'>
        Your account status:{' '}
        <span className='text-[#E84D62]'>Not Verified</span>
      </span>
      <div className='bg-[#181818]'>
        <div className='p-[20px] border-b-[1px] border-[#3E3E3E]'>
          Basic information: (Not Verified)
        </div>
        <div className='max-w-[400px] box-content p-[20px_15px] tmd:p-[40px_35px] flex flex-col gap-[20px]'>
          <div className='grid grid-cols-2 gap-[10px]'>
            <InputBlock
              title='First Name'
              isNecessarily={true}
              placeholder='name'
            />
            <InputBlock
              title='Last Name'
              isNecessarily={true}
              placeholder='last name'
            />
          </div>
          <InputBlock
            title='Date of Birth'
            isNecessarily={true}
            placeholder='Please select date of birth'
          />
          <div className='grid grid-cols-2 gap-[10px]'>
            <div className='flex flex-col justify-between'>
              <span className='text-white text-[14px] mb-[4px] font-bold leading-[18px] block h-[18px]'>
                Country <span className='text-[#29f061]'>*</span>
              </span>
              <Select>
                <SelectTrigger className='h-[43px] p-[8px] bg-[#121212] text-[#7E7E7E] text-[13px] font-normal'>
                  <SelectValue placeholder='Please select country' />
                </SelectTrigger>
                <SelectContent className='bg-[#151515]'>
                  {countriesList.map((item, ind) => (
                    <SelectItem
                      className='p-[8px] bg-[#151515]'
                      value={item.id}
                    >
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <InputBlock
              title='State / Province'
              isNecessarily={true}
              placeholder='state/province'
            />
          </div>
          <div className='flex gap-[10px] items-center'>
            <p className='text-[14px] font-medium text-[#aaa] leading-[18px] flex items-center gap-[12px]'>
              <SecurIco className='min-w-[20px] h-[20px]' />
              All data is safely stored and encrypted.
            </p>
            <SubmitBtn
              className='!max-w-[100px]'
              title='Submit'
              handler={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
