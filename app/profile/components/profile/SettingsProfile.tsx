import {FC} from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { SubmitBtn } from '../submitBtn/SubmitBtn'

interface SettingsProfileProps {}

export const SettingsProfile:FC<SettingsProfileProps> = () => {

    const btnHandler = () => {
        console.log('Button clicked');
    }

    return (
        <div className='border border-[#3E3E3E] rounded-[5px] '>
            <div className='p-[20px] flex flex-col gap-[20px]'>
                <InputBlock 
                    placeholder='current mail'
                    disabled={true}
                    title='Username'
                    subTitle='(The username and email are the only credentials for login)'
                />
                <InputBlock 
                    placeholder='username'
                    disabled={false}
                    title='Username'
                    isNecessarily={true}
                />
            </div>
            <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]' >
                <SubmitBtn title='Update' handler={btnHandler} />
            </div>
        </div>
    )
}