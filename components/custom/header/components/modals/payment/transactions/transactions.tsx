import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import { ArrsSVG } from './icons'
import { stringRemoveSpacing } from '@/lib/string'
import { useState } from 'react'
import Image from 'next/image'
const Transactions = () => {
  const [showTransaction, setShowTransaction] = useUnit([
    PaymentModel.$showTransaction,
    PaymentModel.setShowTransaction
  ])

  const handleClose = () => {
    setShowTransaction(false)
  }

  const data = []
  const tabData = ['Buy', 'Redeem', 'Tips', 'Vault', 'Rakeback']

  const [tab, setTab] = useState(
    stringRemoveSpacing(tabData[0]).toLocaleLowerCase().toLocaleLowerCase()
  )

  return (
    <Dialog open={showTransaction} onOpenChange={handleClose}>
      <DialogContent
        className='pt-2.5 px-4 sm:px-[30px] pb-[30px] fixed top-[56px] sm:top-1/2 left-1/2 -translate-x-1/2 translate-y-0 sm:-translate-y-1/2 bg-[#181818] w-screen sm:w-[525px] h-[calc(100vh-112px)] sm:h-[416px] sm:rounded-xl flex flex-col items-center gap-5'
        customClose
      >
        <DialogHeader className='w-full flex items-center justify-between flex-row border-b border-[#252525]'>
          <div className='flex items-center gap-2.5'>
            <ArrsSVG />
            <span className='text-[17px] text-[#979797] font-medium'>
              Transactions
            </span>
          </div>
          <Button
            className='relative translate-x-2.5 bg-transparent hover:bg-transparent group'
            size='icon'
            // variant='ghost'
            onClick={handleClose}
          >
            <X className='w-5 h-5 duration-500 aspect-square object-contain text-[#3E3E3E] group-hover:text-[#979797]' />
          </Button>
        </DialogHeader>
        <div className='w-[calc(100vw-32px)] sm:w-full min-h-[55px] scrollbar overflow-x-scroll '>
          <Tabs className='w-full'>
            <TabsList className='w-full min-w-max border border-[#252525] bg-[#121212] py-[5px] h-[40px] px-[5px] rounded-full gap-2'>
              {tabData.map((tabItem, index) => (
                <TabsTrigger
                  value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                  className='rounded-full 0 text-[16px] font-medium h-[30px] px-4 data-[state=active]:font-bold data-[state=active]:bg-[#202020] hover:bg-[#181818] w-full min-w-max'
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
          </Tabs>
        </div>
        {data.length === 0 ? (
          <>
            <div className='w-full h-full flex flex-col flex-auto justify-center items-center gap-5 text-center text-sm text-[#7E7E7E]'>
              <Image
                width={113}
                height={105}
                src={'/images/payment/empty_data.png'}
                alt='empty data'
              />
              No Data
            </div>
          </>
        ) : (
          <div className='flex justify-between gap-5 h-full w-full flex-auto'>
            <p className='text-center'>
              If you have any issues with depositing or withdrawing,
              please contact our support.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Transactions
