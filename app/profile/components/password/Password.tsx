import {FC} from 'react'
import { InputBlock } from '../inputBlock/InputBlock'

interface SettingsPasswordProps {}

export const SettingsPassword:FC<SettingsPasswordProps> = () => {
    return (
        <div className='border border-[#3E3E3E] rounded-[5px]'>
            <div className='p-[20px] flex flex-col gap-[20px]'>
                <InputBlock
                    placeholder='Current password'
                    disabled={false}
                    title='current password'
                    isNecessarily={true}
                />   
                <InputBlock
                    placeholder='New password'
                    disabled={false}
                    title='new password'
                    isNecessarily={true}
                /> 
                <InputBlock
                    placeholder='Confirm password'
                    disabled={false}
                    title='confirm password'
                    isNecessarily={true}
                />   
            </div>
        </div>
    )
}