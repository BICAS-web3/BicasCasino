'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'

import WaitingModal from './(components)/waiting'
import DetectedModal from './(components)/detected'
import SuccessModal from './(components)/success'

const Purchase = () => {
  const [purchaseVisibility, setPurcahseVisibility, status, setStatus] =
    useUnit([
      PaymentModel.$purchaseVisibility,
      PaymentModel.setPurcahseVisibility,

      PaymentModel.$status,
      PaymentModel.setStatus
    ])

  const handleClose = () => {
    setPurcahseVisibility(false)
  }

  return (
    <Dialog open={purchaseVisibility} onOpenChange={handleClose}>
      <DialogContent
        customClose
        className='gap-5 max-w-[525px] bg-[#181818] px-[30px] py-5'
      >
        <WaitingModal />
        {/* <DetectedModal /> */}
        {/* <SuccessModal /> */}
      </DialogContent>
    </Dialog>
  )
}

export default Purchase
