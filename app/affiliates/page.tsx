'use client'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { FC, useEffect, useState } from 'react'
import { AfiSidebar } from './components/afiSidebar/AfiSidebar'
import AffiliatesIco from '@/public/images/settings/affiliateIco.svg'
import { AffiliatesGetStart } from './components/GetStart/AfflitiatesGetStart'
import { AffiliatesFunds } from './components/funds/AffiliatesFunds'
import { AffiliatesUsers } from './components/users/AffiliatesUsers'
import { AffiliatesCampaigns } from './components/campaigns/AffiliatesCampaigns'

interface AffiliatesProps {}

const Affiliates: FC<AffiliatesProps> = () => {
  const [tab, setTab] = useState('getStart')

  return (
    <Tabs
      className='p-[1.25rem_2.5rem] box-border h-full'
      defaultValue='getStart'
      value={tab}
    >
      <div className='h-full p-[1.25rem] tb:p-[1.25rem_2.5rem] rounded-[20px] bg-[#151515]'>
        <span className='flex gap-[5px] text-[16px] font-extrabold leading-[20.5px] tracking-[4%] items-center'>
          <AffiliatesIco />
          Affiliates
        </span>
        <div className='flex flex-col emd:flex-row gap-[1.25rem] emd:gap-[2.5rem] mt-[20px] h-[calc(100%_-_2.5rem)] box-border'>
          <AfiSidebar setTab={setTab} />
          <div className='bg-[#121212] rounded-0 sm:rounded-[12px] box-border p-[0px] sm:p-[2rem] w-full h-fit relative'>
            <TabsContent value='getStart'>
              <AffiliatesGetStart />
            </TabsContent>
            <TabsContent value='funds'>
              <AffiliatesFunds />
            </TabsContent>
            <TabsContent value='users'>
              <AffiliatesUsers />
            </TabsContent>
            <TabsContent value='campaigns'>
              <AffiliatesCampaigns />
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  )
}

export default Affiliates
