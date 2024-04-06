'use client'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { BonusCoinSVG, DraxMiniSVG, WalletSVG } from '../../icons'
import { stringRemoveSpacing } from '@/lib/string'

const Purchase = () => {
  const [purchaseVisibility, setPurcahseVisibility, bonus, purchase] = useUnit([
    PaymentModel.$purchaseVisibility,
    PaymentModel.setPurcahseVisibility,
    PaymentModel.$bonus,
    PaymentModel.$purchase
  ])

  const estimateData = [
    {
      icon: <DraxMiniSVG className='w-6 h-6 aspect-square object-contain' />,
      title: 'DRAX Coin',
      count: purchase
    },
    {
      icon: <BonusCoinSVG className='w-6 h-6 aspect-square object-contain' />,
      title: 'Bonus Coin',
      count: bonus
    }
  ]

  const handleClose = () => {
    setPurcahseVisibility(false)
  }

  return (
    <Dialog
      open={purchaseVisibility}
      key={`purchase-modal--${purchase}-${bonus}`}
      onOpenChange={handleClose}
    >
      <DialogContent
        customClose
        className='gap-5 max-w-[525px] bg-[#181818] px-[30px] py-5'
      >
        <DialogHeader>
          <div className='flex justify-between items-center flex-row pr-2'>
            <div className='flex items-center gap-4 text-[#979797]'>
              <WalletSVG className='w-5 aspect-square object-contain' />
              <h5 className='tracking-[4%] font-semibold text-xl leading-7'>
                Purchase
              </h5>
            </div>
          </div>
          <Separator />
        </DialogHeader>

        <div className='flex flex-col'>
          <div className='flex flex-col gap-1 mx-4 sm:mx-0'>
            <h6 className='text-[#979797] text-sm sm:text-lg leading-6 font-semibold tracking-wider'>
              Estimate Receive
            </h6>
            <div className='grid grid-cols-2 py-1 px-6 gap-1 bg-[#202020] border border-[#252525] rounded-lg min-h-14 box-border'>
              {estimateData.map((item, index) => (
                <div
                  key={`purcahse-modal--estimate-${stringRemoveSpacing(
                    item.title
                  )}-${index}`}
                  className='text-[#979797] text-sm font-light leading-5 tracking-wider'
                >
                  {item.title}
                  <div className='flex gap-2 items-center text-[#979797] mt-2'>
                    {item.icon}
                    <span className='text-sm sm:text-lg'>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Purchase
