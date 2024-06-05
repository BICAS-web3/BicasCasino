'use client'

import { Button } from '@/components/ui/button'
import { WalletSVG } from './icons'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'

const Wallet = () => {
  const [setVisibility, visibility] = useUnit([
    PaymentModel.setTotalVisibility,
    PaymentModel.$totalVisibility
  ])

  const handleAction = () => {
    setVisibility(!visibility)
  }

  const { t } = useTranslation()

  return (
    <Button
  onClick={handleAction}
  variant='ghost'
  className='hidden sm:flex items-center justify-center gap-3 border border-black-acc rounded-[3.125rem] cursor-pointer'
  style={{
    background: 'conic-gradient(from 0deg at 50% 50%, #8752FC 0deg, #6F35E3 360deg)',
  }}
  onMouseOver={(e) => { e.currentTarget.style.background = 'conic-gradient(from 0deg at 50% 50%, #733EE8 0deg, #5B21CF 360deg)' }}
  onMouseOut={(e) => { e.currentTarget.style.background = 'conic-gradient(from 0deg at 50% 50%, #8752FC 0deg, #6F35E3 360deg)' }}
>
  <span className='text-sm font-semibold text-white'>{t('header.wallet')}</span>
  <WalletSVG className='w-5 aspect-square object-contain' />
</Button>
  )
}

export default Wallet
