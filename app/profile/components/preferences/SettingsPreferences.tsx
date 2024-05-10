import { FormField } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { FC, useState } from 'react'

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
  {
    title: 'Hide my buy amount',
    enabled: true
  },
  {
    title: 'Hide my redeem amount',
    enabled: false
  },
  {
    title: 'Hide my total wagered from public',
    enabled: false
  },
  {
    title: 'Ghost mode (make my bets hidden)',
    enabled: true
  },
  {
    title: 'Always refuse friend request',
    enabled: true
  },
  {
    title: "Don't @me in chatroom",
    enabled: true
  },
  {
    title: 'Hide top instant notification',
    enabled: true
  }
]

interface SettingsPreferencesProps {}

export const SettingsPreferences: FC<SettingsPreferencesProps> = () => {
  const [activeList, setActiveList] = useState(list)

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

  return (
    <div className='border border-[#3E3E3E] rounded-[5px]'>
      <div className='flex flex-col items-center justify-center p-[20px] gap-[22px]'>
        {activeList.map((item, ind) => (
          <div
            key={ind}
            className='w-full max-w-[400px] flex items-center justify-between'
          >
            <span
              className={`${
                item.enabled ? 'text-[#979797]' : 'text-[#464646]'
              } leading-[18px] text-[14px] font-medium`}
            >
              {item.title}
            </span>
            <div
              className={`w-[30px] cursor-pointer h-[16px] relative rounded-[15px] ${
                item.enabled ? 'bg-[#C3A86E]' : 'bg-[#282828]'
              }`}
              onClick={() => switchHandler(item.title)}
            >
              <div
                className={`h-[16px] w-[16px] absolute transition-all duration-300 rounded-[50%] ${
                  item.enabled ? 'bg-[#FFE09D]' : 'bg-[#3E3E3E]'
                } ${item.enabled ? '!left-[calc(100%_-_16px)]' : 'left-0]'} ${
                  item.enabled
                    ? 'shadow-[0px_0px_4px_0px_#00000040]'
                    : 'shadow-[0px_0px_4px_0px_#00000040]'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center text-center justify-center border-t-[1px] border-[#3E3E3E] p-[25px] text-[14px] font-normal text-[#7E7E7E]'>
        * You can see your hidden info, but others can't *
      </div>
    </div>
  )
}
