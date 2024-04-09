import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FC } from 'react'

const seidebarBtns = [
  {
    title: 'Profile',
    value: 'profile'
  },
  {
    title: 'Email',
    value: 'email'
  },
  {
    title: 'Two Factor',
    value: 'auth2'
  },
  {
    title: 'Password',
    value: 'password'
  },
  {
    title: 'Preferences',
    value: 'preferences'
  },
  {
    title: 'Verify',
    value: 'verify'
  }
]

interface ProfileSidebarProps {}

export const ProfileSidebar: FC<ProfileSidebarProps> = () => {
  return (
    <div className='w-full max-w-[200px] h-fit bg-[#121212] rounded-[5px]'>
      <TabsList className='flex-col h-fit w-full bg-inherit items-start p-0'>
        {seidebarBtns.map((item, ind) => (
          <TabsTrigger
            key={ind}
            value={item.value}
            className='
                            bg-[#121212] h-[50px] p-[0_16px] data-[state=active]:border-l-[1px] data-[state=active]:border-[#FFE09D] box-border border-[#121212] border-l-[1px]
                            w-full text-start text-[#7E7E7E] text-[14px] font-bold leading-[18px] data-[state=active]:text-[#fff] relative overflow-hidden
                            after:bg-[rgba(198,_149,_81,_.9)] after:rounded-[50%] after:w-[13px] after:h-[13px] after:left-[-5px] after:blur-[4px] after:absolute after:hidden data-[state=active]:after:block after:top-[50%] after:translate-y-[-50%]
                            before:left-[-12px] before:rounded-[50%] before:bg-[rgba(198,_149,_81,_.9)] before:absolute before:blur-[20px] before:hidden data-[state=active]:before:block before:w-[20px] before:h-[20px]
                            
                        '
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}
