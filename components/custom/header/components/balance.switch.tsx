'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { BonusCoinSVG, DraxMiniSVG } from './icons'

const switch_img = [
  {
    isDrax: false,
    icon: <BonusCoinSVG className='w-5 aspect-square object-contain' />,
    id: 'bonus-ico',
    token: 'bc'
  },
  {
    isDrax: true,
    icon: <DraxMiniSVG className='w-5 aspect-square object-contain' />,
    id: 'drax-ico',
    token: 'dc'
  }
]

const BalanceSwitcher = () => {
  const [isDrax, setIsDrax] = useState(false)

  return (
    <div
      className={cn(
        'h-[40px] flex items-center p-[5px] gap-[10px]',
        'bg-[#121212] border border-[#212121] rounded-[50px]'
      )}
    >
      {switch_img.map(item => (
        <div
          key={item.id}
          onClick={() => setIsDrax(item.isDrax)}
          className={cn(
            'w-full h-full flex items-center pl-2 pr-1 cursor-pointer rounded-[50px] gap-2',
            'text-grey-acc text-sm font-medium leading-6 text-left uppercase duration-500',
            isDrax === item.isDrax && 'bg-black-acc text-white'
          )}
        >
          {item.icon}
          <div className='flex items-center gap-1'>
            <span className='text-sm leading-4 truncate w-max max-w-12'>
              995.53
            </span>
            <span className='text-sm leading-4'>{item.token}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BalanceSwitcher
