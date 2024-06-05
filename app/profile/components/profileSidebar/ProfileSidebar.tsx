import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FC } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

const seidebarBtns = [
  {
    title: 'Profile',
    value: 'profile'
  },
  // {
  //   title: 'Email',
  //   value: 'email'
  // },
  // {
  //   title: 'Two Factor',
  //   value: 'auth2'
  // },
  {
    title: 'Password',
    value: 'password'
  },
  {
    title: 'Preferences',
    value: 'preferences'
  },
  {
    title: 'Avatar',
    value: 'avatar'
  }
  
  // {
  //   title: 'Verify',
  //   value: 'verify'
  // },
  // {
  //   title: 'Bonus Drop',
  //   value: 'bonusDrop'
  // },
  // {
  //   title: 'Responsible Gambling',
  //   value: 'respGambl'
  // }
]

interface ProfileSidebarProps {
  setTab: (v) => void
}

export const ProfileSidebar: FC<ProfileSidebarProps> = ({ setTab }) => {
  const { t } = useTranslation()
  return (
    <div className='w-full max-w-[200px] h-fit bg-[#121212] rounded-[5px] overflow-hidden'>
      <TabsList className='flex-col h-fit w-full bg-inherit items-start p-0'>
        <div className='block tb:hidden w-full'>
          <Select onValueChange={v => setTab(v)}>
            <SelectTrigger className='h-[43px] p-[8px] bg-[#121212] text-[#7E7E7E] text-[13px] font-normal'>
              <SelectValue placeholder='Profile' />
            </SelectTrigger>
            <SelectContent className='bg-[#151515]'>
              {seidebarBtns.map((item, ind) => (
                <SelectItem
                  key={ind}
                  className='p-[8px] bg-[#151515]'
                  value={item.value}
                >
                  {t(`pages.settings.navigation.${item.title}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='hidden tb:block'>
          {seidebarBtns.map((item, ind) => (
            <TabsTrigger
              key={ind}
              value={item.value}
              onClick={() => setTab(item.value)}
              className='bg-[#121212] flex justify-start h-[50px] p-[0_16px] data-[state=active]:border-l-[1px] data-[state=active]:border-[#FFE09D] box-border border-[#121212] border-l-[1px]
                            w-full text-left text-[#7E7E7E] text-[14px] font-bold leading-[18px] data-[state=active]:text-[#fff] relative overflow-hidden
                            after:bg-[rgba(198,_149,_81,_.9)]  after:w-[13px] after:h-[13px] after:left-[-5px] after:blur-[4px] after:absolute after:hidden data-[state=active]:after:block after:top-[50%] after:translate-y-[-50%]
                            before:left-[-12px]  before:bg-[rgba(198,_149,_81,_.9)] before:absolute before:blur-[20px] before:hidden data-[state=active]:before:block before:w-[20px] before:h-[20px] rounded-[0]'
            >
              
              {t(`pages.settings.navigation.${item.title}`)}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
    </div>
  )
}
