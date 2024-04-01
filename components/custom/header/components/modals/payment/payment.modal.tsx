'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { stringRemoveSpacing } from '@/lib/string'

import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { WalletSVG } from '../../icons'
import TabBuy from './tabs/tab.buy'

const tabData = ['Buy', 'Redeem', 'Tips']
const tabContent = [<TabBuy />]

const Payment = () => {
  const [totalVisibility, setTotalVisibility] = useUnit([
    PaymentModel.$totalVisibility,
    PaymentModel.setTotalVisibility
  ])
  const [tab, setTab] = useState(
    stringRemoveSpacing(tabData[0]).toLocaleLowerCase().toLocaleLowerCase()
  )

  const handleClose = () => {
    setTotalVisibility(false)
  }
  return (
    <Dialog open={totalVisibility} onOpenChange={handleClose}>
      <DialogContent
        customClose
        className='gap-5 max-w-[525px] bg-[#181818] px-[30px] py-5'
      >
        <DialogHeader>
          <div className='flex justify-between items-center flex-row pr-2'>
            <div className='flex items-center gap-4 text-[#979797]'>
              <WalletSVG className='w-5 aspect-square object-contain' />
              <h5 className='tracking-[4%] font-semibold text-xl leading-7'>
                Wallet
              </h5>
            </div>
            <div className='flex items-center gap-4'>
              <Link
                href='#'
                className='text-[#FFE09D] hover:text-white transition-all underline hover:no-underline'
              >
                Transactions
              </Link>
              <Button className='' size='icon' variant='ghost'>
                <X className='w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
              </Button>
            </div>
          </div>
          <Separator />
        </DialogHeader>
        <Tabs defaultValue={tab}>
          <TabsList className='w-full border border-[#252525]  bg-[#121212] py-[5px] px-1 rounded-full h-max gap-2'>
            {tabData.map((tabItem, index) => (
              <TabsTrigger
                value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                className='rounded-full min-h-10 text-lg data-[state=active]:bg-[#202020] hover:bg-[#181818] w-full'
                key={`payment-modal-title--${stringRemoveSpacing(
                  tabItem.toLocaleLowerCase()
                )}-${index}`}
                onClick={() =>
                  setTab(stringRemoveSpacing(tabItem).toLocaleLowerCase())
                }
              >
                {tabItem}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabData.map((tabItem, index) => (
            <TabsContent
              key={`payment-modal-content--${stringRemoveSpacing(
                tabItem.toLocaleLowerCase()
              )}-${index}`}
              value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
            >
              {tabContent[index]}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default Payment
