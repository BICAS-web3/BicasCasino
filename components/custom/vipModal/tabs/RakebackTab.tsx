import {FC, useEffect, useState} from 'react'
import DCoin from '@/components/custom/header/components/icons/draxMiniIco.svg'
import { Input } from '@/components/ui/input'

const tipsList = [
    {
      ico: <DCoin />,
      name: "1.77 dc",
      id: 'dc'
    },
    {
      ico: <DCoin />,
      name: "170.000 bc",
      id: 'bc'
    },
  ];

interface RakebackTabProps {}

export const RakebackTab:FC<RakebackTabProps> = () => {
    const [activeBalance, setActiveBalance] = useState(tipsList[0])
    const [activeList, setActiveList] = useState(tipsList.filter(item => item.id !== 'redem'))
    const [listVisibility, setListVisibility] = useState(false)
  
      const handleSelect = (id) => {
          const item = tipsList.filter(item => item.id === id)
          setActiveBalance(item[0])
          setListVisibility(false)
      }
  
      useEffect(() => {
          setActiveList(
              tipsList.filter(item => item.id !== activeBalance.id)
          )
      }, [activeBalance])

    return (
        <div className='relative rounded-[5px] p-[10px]'>
            <div className='absolute rounded-[5px] w-full top-0 left-0 h-full bg-[#070707B2] z-[3000] flex items-center justify-center text-[15px] font-bold'>
                VIP Level 1 required
            </div>
            <div className="w-full m-[0_auto] select-none max-w-[235px] flex items-center rounded-[8px] bg-[#181818] relative">
                <div onClick={() => setListVisibility(!listVisibility)} className='cursor-pointer bg-[#202020] w-full h-[40px] p-[10px_15px] box-border flex items-center gap-[10px] text-nowrap text-[16px] font-medium'>
                    <div className='min-w-[24px] h-[24px] '>
                        {activeBalance.ico}
                    </div>
                    {activeBalance.name}
                </div>
                <div className={`absolute left-0 ${listVisibility ? 'opacity-1 visible' : 'opacity-0 invisible'} rounded-[0_0_8px_8px] w-full h-full flex flex-col bottom-[-100%] transition-all duration-150`}>
                    {
                        activeList.map((item, ind) => (
                            <div onClick={() => handleSelect(item.id)} key={ind} className="text-[16px] h-[40px] text-wrap bg-[#202020] hover:bg-[#282828] transition-all box-border duration-100 cursor-pointer p-[10px_15px] flex items-center gap-[10px] font-medium">
                                <div className='min-w-[24px] h-[24px]'>
                                    {item.ico}
                                </div>
                                {item.name}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-full'>
            <div className='flex flex-col gap-[3px] mt-[30px]'>
                <div className='flex items-center justify-between'>
                    <span className='text-[#979797] text-[16px] font-semibold'>Rakeback</span>
                    <span className='text-[#979797] text-[16px] font-semibold'>(Rate: 5%)</span>
                </div>
                <div className='relative flex border-[2px] rounded-[8px] border-[#202020] items-center w-full'>
                    <Input
                        className='w-full flex-1 bg-[#121212] pr-[45px] h-[full]'
                        type='number'
                        placeholder='amount'
                    />
                    <DCoin className='w-[24px] h-[24px] absolute right-[10px]' />
                </div>
            </div>   
            <div className='flex flex-col gap-[3px] mt-[20px]'>
                <div className='flex items-center justify-between'>
                    <span className='text-[#979797] text-[16px] font-semibold'>Redeem from Rake Balance</span>
                    <span className='text-[#979797] text-[16px] font-semibold'>(Min: 1.000)</span>
                </div>
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
        </div>  
    </div>
    )
}