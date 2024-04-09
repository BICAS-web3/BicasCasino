'use client'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { FC } from 'react'
import { ProfileSidebar } from './components/profileSidebar/ProfileSidebar'
import SettingsIco from '@/public/images/settings/settings.svg'
import { SettingsProfile } from './components/profile/SettingsProfile'
import { SettingsEmail } from './components/email/SettingsEmail'
import { Auth2 } from './components/auth2/Auth2'
import { SettingsPassword } from './components/password/Password'
import { SettingsPreferences } from './components/preferences/SettingsPreferences'
import { SettingsVerify } from './components/verify/SettingsVerify'
import { VerifyWarn } from './components/verifyWarn/VerifyWarn'

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  return (
    <Tabs
      className='p-[1.25rem_2.5rem] box-border h-full'
      defaultValue='profile'
    >
      <div className='h-full  p-[1.25rem_2.5rem] rounded-[20px] bg-[#151515]'>
        <span className='flex gap-[5px] text-[16px] font-extrabold leading-[20.5px] tracking-[4%] items-center'>
          <SettingsIco />
          Settings
        </span>
        <div className='flex gap-[2.5rem] mt-[20px] h-[calc(100%_-_2.5rem)] box-border'>
          <ProfileSidebar />
          <div className='bg-[#121212] rounded-[12px] box-border p-[2rem] w-full h-fit relative'>
            {/* <VerifyWarn /> */}
            <TabsContent value='profile' className='!mt-0'>
              <SettingsProfile />
            </TabsContent>
            <TabsContent value='email' className='!mt-0'>
              <SettingsEmail />
            </TabsContent>
            <TabsContent value='auth2' className='!mt-0'>
              <Auth2 />
            </TabsContent>
            <TabsContent value='password' className='!mt-0'>
              <SettingsPassword />
            </TabsContent>
            <TabsContent value='preferences' className='!mt-0'>
              <SettingsPreferences />
            </TabsContent>
            <TabsContent value='verify' className='!mt-0'>
              <SettingsVerify />
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  )
}

export default Profile
