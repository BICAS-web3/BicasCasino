import {FC, useEffect, useState} from 'react'
import { Input } from '@/components/ui/input'

import DCoin from '@/components/custom/header/components/icons/draxMiniIco.svg'
import { Button } from '@/components/ui/button'

interface StoreTabProps {}

export const list = [
    {
        name: 'Redeemable DC',
        ico: <DCoin />,
        id: 'redem'
    },
    {
        name: 'Irredeemable DC',
        ico: <DCoin />,
        id: 'irredem'
    },
]

export const StoreTab:FC<StoreTabProps> = () => {
  const [activeBalance, setActiveBalance] = useState(list[0])
  const [activeList, setActiveList] = useState(list.filter(item => item.id !== 'redem'))
  const [listVisibility, setListVisibility] = useState(false)

    const handleSelect = (id) => {
        const item = list.filter(item => item.id === id)
        setActiveBalance(item[0])
        setListVisibility(false)
    }

    useEffect(() => {
        setActiveList(
            list.filter(item => item.id !== activeBalance.id)
        )
    }, [activeBalance])

    return (
        <div className=''>
            <div>
                <span className="text-[#979797] mb-[5px] ml-[2px] block text-[16px] font-semibold">Account Balance</span>
                <div className='flex gap-0 rounded-[8px] h-[40px] border-[2px] border-[#202020]'>
                    <Input
                        className='w-full flex-1 bg-[#121212] h-[30px] rounded-none'
                        type='number'
                        placeholder='amount'
                    />
                    <div className="w-full select-none max-w-[235px] flex items-center p-[0_15px] bg-[#181818] relative">
                        <div onClick={() => setListVisibility(!listVisibility)} className='cursor-pointer flex items-center gap-[10px] text-nowrap text-[16px] font-medium'>
                            <div className='min-w-[24px] h-[24px] '>
                            {activeBalance.ico}
                            </div>
                            {activeBalance.name}
                        </div>
                        <div className={`absolute left-0 ${listVisibility ? 'opacity-1 visible' : 'opacity-0 invisible'} rounded-[0_0_8px_8px] w-full h-full flex flex-col bottom-[-100%] transition-all duration-150`}>
                            {
                                activeList.map((item, ind) => (
                                    <div onClick={() => handleSelect(item.id)} key={ind} className="text-[16px] h-[40px] text-wrap bg-[#202020] hover:bg-[#282828] transition-all duration-100 cursor-pointer p-[10px_15px] flex items-center gap-[10px] font-medium">
                                        <div className='min-w-[24px] h-[24px]'>
                                            {item.ico}
                                        </div>
                                        {item.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col mt-[15px]'>
                <span className="text-[#979797] mb-[5px] ml-[2px] text-[16px] font-semibold">Amount</span>
                <div className='flex gap-0 rounded-[8px] h-[40px] border-[2px] border-[#202020]'>
                    <div className='relative flex items-center w-full'>
                        <Input
                            className='w-full flex-1 bg-[#121212] pr-[45px] h-[full]'
                            type='number'
                            placeholder='amount'
                        />
                        <DCoin className='w-[24px] h-[24px] absolute right-[10px]' />
                    </div>
                    <div className='flex items-center justify-center cursor-pointer min-w-[110px] text-[#eaeaea] text-[16px] font-medium'>
                        Max
                    </div>
                </div>
            </div>
            <Button
                className='w-full mt-[25px] max-w-full text-sm border border-[#907640] bg-[#252019] hover:bg-[#25201950] transition-all duration-300 text-[#FFE09D] font-bold'
            >
                Store To Vault
            </Button>
        </div>
    )
}