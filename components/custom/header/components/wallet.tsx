'use client'

import { Button } from '@/components/ui/button'
import { WalletSVG } from './icons'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'

const Wallet = () => {
  const [setVisibility, visibility] = useUnit([
    PaymentModel.setTotalVisibility,
    PaymentModel.$totalVisibility
  ])

  const handleAction = () => {
    setVisibility(!visibility)
  }
  return (
    <Button
      onClick={handleAction}
      variant='ghost'
      className='flex items-center justify-center gap-3 text-grey-acc hover:text-white border border-black-acc rounded-[3.125rem] cursor-pointer'
    >
      <span className='text-sm font-semibold'>Wallet</span>
      <WalletSVG className='w-5 aspect-square object-contain' />
    </Button>
  )
}

export default Wallet
