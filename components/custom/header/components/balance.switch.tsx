'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { BonusCoinSVG, DraxMiniSVG } from './icons'
import { Button } from '@/components/ui/button'

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
        <Button
          variant='ghost'
          key={item.id}
          onClick={() => setIsDrax(item.isDrax)}
          className={cn(
            'w-full h-full flex items-center pl-2 pr-1 cursor-pointer rounded-[50px] gap-2',
            'text-[#7e7e7e] text-sm font-medium leading-6 text-left uppercase duration-500',
            isDrax === item.isDrax && 'bg-[#202020] text-white'
          )}
        >
          {item.icon}
          <div className='flex items-center gap-1'>
            <span className='text-sm leading-4 truncate w-max max-w-12'>
              995.53
            </span>
            <span className='text-sm leading-4'>{item.token}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}

export default BalanceSwitcher
