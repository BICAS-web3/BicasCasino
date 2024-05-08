import {FC, useState} from 'react'
import { X } from 'lucide-react'
import BetBorder from '@/public/images/mell/settBetBorder.svg'

import Border from '@/public/images/mell/borderImg.svg'
import Minus from '@/public/images/mell/minus.svg'
import Plus from '@/public/images/mell/plus.svg'
import AutoIco from '@/public/images/mell/autoIco.svg'
import { useUnit } from 'effector-react'
import { MellM } from '@/states'

const list = [
    {
      title: 'Sound',
      enabled: true
    },
    {
      title: 'Hide my purchase message',
      enabled: false
    },
    {
      title: 'Hide my redeem message',
      enabled: false
    },
    {
      title: "Don't show all buy&redeem message",
      enabled: false
    },
  ]

interface SettingsProps {}

export const Settings:FC<SettingsProps> = () => {
    const [bet, setBet] = useState(2)
    const [activeList, setActiveList] = useState(list)

    const betIncrement = () => {
        bet <= 0.50 ? null : setBet(bet - 0.5)
    }

    const betDecrement = () => {
        bet === 50 ? null : setBet(bet + 0.5)
    }

    const switchHandler = (title: string) => {
      const updatedList = activeList.map(item => {
        if (item.title === title) {
          return {
            ...item,
            enabled: !item.enabled
          }
        }
        return item
      })
  
      setActiveList(updatedList)
    }

    const [visibility, setVisibility] = useUnit([
        MellM.$betSettingsVisibility,
        MellM.setBetSettingsVisibility
    ])

    return (
    <div className={`w-full h-full flex justify-center absolute top-0 left-0 bg-[rgba(0,_0,_0,_0.6)] transition-all duration-300 z-[22] ${visibility ? 'opacity-1 visible' : 'opacity-0 invisible'}`}>
        <div className='w-full text-center min-h-[710px] max-w-[1115px] flex flex-col justify-between max-h-[500px] sm:max-h-[710px] relative h-[calc(100%_-_40px)] p-[40px_20px] m-[20px] bg-[#050505F5]'>
          <X onClick={() => setVisibility(false)} className='absolute top-[30px] right-[30px] text-[#363636] cursor-pointer' />
          <h1 
            className='text-[20px] mt-[40px] sm:text-[29px] font-bold uppercase settings-text'
          >
            настройки системы
            </h1>
            <div className='h-full flex flex-col items-center justify-center'>
                <div className='w-full gap-[60px] sm:gap-[20px] flex-col tmd:flex-row max-w-[850px] flex items-center justify-between'>
                    <div>
                        <div>
                            <h3 className='uppercase text-[16px] sm:text-[20px] font-bold mb-[10px]'>общая ставка</h3>
                        </div>
                        <div className='flex select-none items-center gap-[10px]'>
                            <div onClick={betIncrement} className='w-[80px] cursor-pointer h-[80px] relative inline-flex items-center justify-center'>
                                <Minus className='w-[40px] h-[40px]' />
                                <Border className='w-full h-full absolute top-0 left-0' />
                            </div>
                            <div className='w-[170px] relative flex items-center justify-center h-[80px] bg-[#181228] text-[24px] font-extrabold'>
                                ${bet.toFixed(2)}
                                <BetBorder className='w-[100%] h-[100%] absolute left-0 top-0' />
                            </div>
                            <div onClick={betDecrement} className='w-[80px] cursor-pointer h-[80px] relative inline-flex items-center justify-center'>
                                <Plus className='w-[40px] h-[40px]' />
                                <Border className='w-full h-full absolute top-0 left-0' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[30px]'>
                    {activeList.map((item, ind) => (
                    <div
                        key={ind}
                        className='w-full max-w-[400px] text-start gap-[30px] flex items-center justify-between'
                    >
                        <span
                        className={`${
                            item.enabled ? 'text-[#fff]' : 'text-[#464646]'
                        } leading-[18px] text-[26px] font-bold`}
                        >
                        {item.title}
                        </span>
                        <div
                        className={`min-w-[45px] cursor-pointer h-[24px] relative rounded-[15px] ${
                            item.enabled ? 'bg-[#00B664]' : 'bg-[#282828]'
                        }`}
                        onClick={() => switchHandler(item.title)}
                        >
                        <div
                            className={`h-[24px] w-[24px] absolute transition-all duration-300 rounded-[50%] ${
                            item.enabled ? 'bg-[#00B664]' : 'bg-[#3E3E3E]'
                            } ${item.enabled ? '!left-[calc(100%_-_24px)]' : 'left-0]'} ${
                            item.enabled
                                ? 'shadow-[0px_0px_4px_0px_#00000040]'
                                : 'shadow-[0px_0px_4px_0px_#00000040]'
                            }`}
                        ></div>
                        </div>
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}