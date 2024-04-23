
import {FC} from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { SubmitBtn } from '../submitBtn/SubmitBtn'

interface SettingsEmailProps {}

export const SettingsEmail:FC<SettingsEmailProps> = () => {

    const btnHandler = () => {
        console.log('Button clicked');
    }


    return (
        <div className='border border-[#3E3E3E] rounded-[5px] '>
            <div className='p-[20px]' >
                <InputBlock
                  isNecessarily={true}
                  placeholder='current email'
                  disabled={false}
                  title='User email'
                />
            </div>
            <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]' >
                <SubmitBtn title='Send' handler={btnHandler} />
            </div>
            <div className='p-[20px] border-[#3E3E3E] border-t-[1px]' >
                <InputBlock
                  isNecessarily={true}
                  placeholder='code'
                  disabled={false}
                  title='User email'
                  subTitle={"(haven't receive? please check junk email)"}
                />
            </div>
            <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]' >
                <SubmitBtn title='Submit' handler={btnHandler} />
            </div>
        </div>
    )
}