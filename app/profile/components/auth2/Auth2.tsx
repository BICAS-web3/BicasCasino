import {FC} from 'react'
import { InputBlock } from '../inputBlock/InputBlock'

interface Auth2Props {}

export const Auth2:FC<Auth2Props> = () => {
    return (
        <div className='border border-[#3E3E3E] rounded-[5px]'>
            <div className='max-w-[480px]'>
                <div className='p-[20px] flex flex-col gap-[20px]'>
                    <InputBlock
                        copy={true}
                        placeholder='key here'
                        disabled={false}
                        title='Google Secret Key'
                        subTitle={'(Must save this key to restore 2fa once you lost it)'}
                    />
                </div>
                <div className='p-[0_20px_20px_20px] flex flex-col items-center'>
                    <span className="text-[#7E7E7E] text-[14px] font-normal leading-[18px] text-center">
                        Sweep the qr code with google authenticator
                    </span>

                    {/* temp block */}
                    <div className='w-[160px] h-[160px] flex items-center justify-center'>
                        qr here
                    </div>
                </div>
                <div className='p-[20px] flex flex-col gap-[20px]'>
                    <InputBlock
                        placeholder='email'
                        disabled={false}
                        title='Email'
                        isNecessarily={true}
                    />
                </div>
            </div>
        </div>
    )
}