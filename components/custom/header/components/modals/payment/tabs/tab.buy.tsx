import Image from 'next/image'
import PaymentCrypto from './components/paymentCrypto'
import CryptoRoute from './components/crypto.route'
import { useState } from 'react'
import CustomPayment from '../payment.custom'
import { useDropdown } from '@/lib/hooks/useDropdown'

const TabBuy = () => {
  const [isCrypto, setIsCrypto] = useState(false)
  const [isFiat, setIsFiat] = useState(false)
  const { open, close, isOpen, dropdownRef } = useDropdown()
  return (
    <div ref={dropdownRef} className='flex flex-col gap-5'>
      <div className='tab-buy--info flex border border-[#ffe09d] rounded-lg relative py-3 px-5'>
        <span className='w-3/5 sm:w-2/3 text-xs sm:text-sm'>
          <span className='font-extrabold text-[#ffe09d]'>DRAX tokens </span>
          won through play can be redeemed for
          <p className='text-[#f7931a] inline'> BTC, LTC</p> and more
        </span>

        <Image
          src='/payment/attentionCoins.webp'
          className='object-contain absolute right-5 top-1/2 -translate-y-1/2'
          width={120}
          height={50}
          alt='coins'
        />
      </div>
      {!isCrypto && !isFiat && (
        <>
          <CryptoRoute
            title='Bank card'
            text='You can buy DRAX coins by Visa or Mastercard'
            onClick={() => setIsFiat(true)}
          />
          <CryptoRoute
            isCrypto
            onClick={() => setIsCrypto(true)}
            title='Crypto payments'
            text='You also can buy DRAX coinsby crypto-currency'
          />
        </>
      )}
      {isCrypto && <PaymentCrypto />}
      {isFiat && (
        <>
          <CryptoRoute
            title='BillLine'
            text='You can buy DRAX coinsby Visa or Mastercard'
            onClick={open}
          />
          <CryptoRoute
            // onClick={() => setIsCrypto(true)}
            title='P2WAY'
            text='We support Ukranian Cards'
          />
        </>
      )}
      {isOpen && <CustomPayment close={close} />}
      <span className='text-[#979797] text-lg text-center'>
        Maximum purchase of $5000 USD per day
      </span>
    </div>
  )
}

export default TabBuy
