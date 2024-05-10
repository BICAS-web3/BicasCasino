import {FC, useEffect, useState} from 'react'
import CampaignIco from '@/public/images/settings/campaignIco.svg'
import CloseIco from '@/public/images/settings/closeIco.svg'
import { InputBlock } from '@/app/profile/components/inputBlock/InputBlock'
import { SubmitBtn } from '@/app/profile/components/submitBtn/SubmitBtn'

interface CampaignModalProps {
    setClose: (state) => void
    visible: boolean
}

export const CampaignModal:FC<CampaignModalProps> = ({setClose, visible}) => {

    useEffect(() => {
        console.log(visible)
    }, [visible])

    const handleCreate = () => {

    }   

    return (
        <div className={`fixed top-0 left-0 bg-[rgba(0,_0,_0,_0.6)] transition-all duration-300 invisible opacity-0 w-full h-full flex items-center justify-center p-[20px] ${visible ? 'opacity-100 !visible' : ''}`}>
            <div className="w-full max-w-[460px] rounded-[12px] bg-[#181818] box-border p-[10px_30px_30px_30px]">
                <div className="flex items-center justify-between border-b-[1px] border-[#252525] pb-[5px] gap-[10px]">
                    <div className='flex items-center gap-[10px] text-[16px] font-bold text-[#979797]'>
                        <CampaignIco className='w-[24px] h-[24px]' />
                        Create New Campaign
                    </div>
                    <CloseIco className='cursor-pointer' onClick={() => setClose(false)} />
                </div>
                <div className='flex mt-[20px] flex-col gap-[20px]'>
                    <InputBlock 
                        title="Campaign Name"
                        placeholder='campaign'
                    />
                    <InputBlock 
                        title="Campaign Name"
                        placeholder='campaign'
                    />
                </div>
                <div className='mt-[30px]'>
                    <SubmitBtn fullWidth title="Create New Campaign" handler={handleCreate} />
                </div>
            </div>
        </div>
    )
}