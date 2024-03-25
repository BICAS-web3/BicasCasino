'use client'
import { FC, useEffect, useState } from 'react'
import s from './styles.module.scss'
import upArr from '@/public/payment/upArrow.webp'

interface PaymentDropdownProps {
  list: any[]
  setActive: any
}

export const PaymentDropdown: FC<PaymentDropdownProps> = ({
  list,
  setActive
}) => {
  const [activeItem, setActiveItem] = useState(list[0])
  const [currentList, setCurrentList] = useState(list)
  const [listVisibility, setListVisibility] = useState(false)

  useEffect(() => {
    setCurrentList(list.filter(item => item.title !== activeItem.title))
  }, [activeItem])

  const handleChangeActiveItem = (title: string) => {
    setListVisibility(false)
    const newActiveItem = currentList.filter(item => item.title === title)[0]
    setActiveItem(newActiveItem)
    setActive(newActiveItem)
  }

  return (
    <div
      // className={clsx(s.dropdown_body, listVisibility && s.dropdown_visible)}
      className={`w-full h-[40px] relative`}
    >
      <div
        className={`
          cursor-pointer h-full px-[15px] bg-[#202020]
          flex items-center justify-between gap-[10px] rounded-[8px]
          duration-400  transition-all ${
            listVisibility && 'rounded-[8px_8px_0_0]'
          }
        `}
        onClick={() => setListVisibility(!listVisibility)}
      >
        <div
          className='flex items-center gap-[10px] text-text-w-def
          text-[18px] font-medium leading-[25px] tracking-[0.04em]

          '
        >
          <img className='w-[24px] h-[24px]' src={activeItem.ico.src} alt='' />
          {activeItem.title.split('_')[0]}
        </div>
        <img
          src={upArr.src}
          className={`w-[10px] h-[6px] ${listVisibility && 'rotate-[180deg]'}`}
          alt='arr-ico'
        />
      </div>
      <div
        className={`
        scroll -webkit-scrollbar:w-[4px] -webkit-scrollbar:ml-[4px] -webkit-scrollbar:rounded-[3px]
        absolute w-full left-0 top-[100%] rounded-[0_0_8px_8px] duration-400 transition-all
        opacity-0 invisible ${
          listVisibility && 'opacity-100 !visible max-h-[250px] overflow-y-auto'
        }
        
        `}
      >
        {currentList.map((item, ind) => (
          <div
            className='h-[50px] px-[15px] duration-400 bg-[#202020] flex items-center justify-start 
            gap-[10px] text-text-w-def text-[18px] font-medium leading-[25px] tracking-[0.04em] text-left cursor-pointer last:rounded-[0_0_8px_8px]
            hover:bg-[#282828]
            '
            onClick={() => handleChangeActiveItem(item.title)}
          >
            <img
              className='w-[24px] h-[24px] rounded-[100%]'
              src={item.ico.src}
              key={ind}
              alt='coin-ico'
            />
            {item.title.split('_')[0]}
          </div>
        ))}
      </div>
    </div>
  )
}
