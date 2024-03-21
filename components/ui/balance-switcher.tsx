import { useState } from 'react'

import Image from 'next/image'

import draxTokenIco from '@/public/payment/draxMiniIco.svg'
import bonusTokenIco from '@/public/payment/bonusCoin.svg'

import clsx from 'clsx'

const BalanceSwitcher = () => {
  const [isDrax, setIsDrax] = useState(false)

  const switch_img = [
    {
      isDrax: false,
      src: bonusTokenIco,
      alt: 'bonus-ico',
      token: 'bc'
    },
    {
      isDrax: true,
      src: draxTokenIco,
      alt: 'drax-ico',
      token: 'dc'
    }
  ]

  return (
    <div
      className={clsx(
        'h-[40px] flex items-center p-[5px] gap-[10px]',
        'bg-[#121212] border border-[#212121] rounded-[50px]'
      )}
    >
      {switch_img.map(item => (
        <div
          onClick={() => setIsDrax(item.isDrax)}
          className={clsx(
            'w-full h-full flex items-center pl-2 pr-1 cursor-pointer rounded-[50px]',
            'text-[#7e7e7e] text-sm font-medium leading-6 text-left uppercase duration-500',
            isDrax === item.isDrax && 'bg-[#202020] text-white'
          )}
        >
          <Image
            className='mr-[10px]'
            src={item.src}
            width={20}
            height={20}
            alt='bonus-ico'
          />
          123
          <span className='text-xs leading-4'>&nbsp;{item.token}</span>
        </div>
      ))}
    </div>
  )
}

export { BalanceSwitcher }
