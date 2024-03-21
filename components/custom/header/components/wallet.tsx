'use client'

import { Button } from '@/components/ui/button'
import { WalletSVG } from './icons'

const Wallet = () => {
  const handleAction = () => {}
  return (
    <Button
      onClick={handleAction}
      variant='ghost'
      className='flex items-center justify-center gap-3 text-[#7e7e7e] hover:text-white border border-[#202020] rounded-[3.125rem] cursor-pointer'
    >
      <span className='text-sm font-semibold'>Wallet</span>
      <WalletSVG className='w-5 aspect-square object-contain' />
    </Button>
  )
}

export default Wallet
