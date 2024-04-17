import {FC} from 'react'
import ShareIco from '@/public/images/chestCard/shareIco.svg'
import ChestIco from '@/public/images/chestCard/chest.svg'
import ChestMiniIco from '@/public/images/chestCard/chestMiniIco.svg'
import Image from 'next/image'

interface TabChestProps {}

export const TabChest:FC<TabChestProps> = () => {
    return (
        <div className="overflow-scroll h-[70vh] max-h-[530px]">
            <div className='flex items-center justify-between'>
                <span className='underline text-[13px] font-semibold leading-[18px] text-[#7e7e7e] cursor-pointer select-none'>History</span>
                <div className='p-[4px] select-none cursor-pointer rounded-[5px] text-[13px] font-bold text-[#fff] leading-[18px] bg-[#2e2e2e] flex items-center gap-[4px]'>
                    <ShareIco />
                    <span className='underline'>Share</span>
                    (+1 <ChestMiniIco />)
                </div>
            </div>
            <div className='flex h-[160px] relative top-[-20px] items-center justify-center'>
                <ChestIco />
            </div>
            <p className='text-center text-[13px] font-semibold block mt-[30px]'>The treasure chest you have: 25</p>
            <div className='flex mt-[10px] gap-[10px]'>
                <div className='h-[80px] w-full flex items-center justify-center cursor-pointer bg-[#FFE09D] rounded-[5px] text-[15px] text-[#0F0F0F] font-semibold text-center leading-[]'>
                    Single Open <br /> 400 BC
                </div>
                <div className='h-[80px] w-full flex items-center justify-center bg-[#2E2E2E] rounded-[5px] cursor-pointer text-[15px] font-semibold text-center text-[#fff]'>
                    All Open <br /> 1000 BC
                </div>
            </div>
                <p className="text-[#7E7E7E] block mt-[20px] text-[14px] font-normal">
                    Game Rule: <br />
                    1. What's in the treasure chest <br />
                    Different amount of DC, BC, Chest, Letter Cards (Share Bonus Pool after Spell), Maybe NFT in future <br />
                    2. Requirements to open the treasure chest <br />
                    a. Email already set <br />
                    b. Level 4 or higher (Buy Drax Coins and wager, easy to reach) <br />
                    3. How to get the treasure chest <br />
                    a. Daily login, regular users can get 2, vip 3 <br />
                    b. Spend $10 on the store, get 1 treasure chest <br />
                    c. Be active in the chat room <br />
                    d. Share to get 1 every day <br />
                    4. Expiration time of treasure chest <br />
                    The treasure chest is valid for 2 weeks, please open it in time to avoid expiration can not be used. <br />
                    5. Maximum number of valid treasure chests limit <br />
                    You can have up to 50 treasure chests at the same time, so please open them in time! <br />
                </p>
        </div>
    )
}