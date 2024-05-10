import Image from 'next/image'
import PaymentCrypto from './components/paymentCrypto'
import CryptoRoute from './components/crypto.route'
import { useEffect, useState } from 'react'
import CustomPayment from '../payment.custom'
import { useDropdown } from '@/lib/hooks/useDropdown'
import { useUnit } from 'effector-react'
import { PaymentModel, RegistrModel, UserModel } from '@/states'
import Arr from '@/public/images/payment/rightArr.svg'
import { getOneTimeToken } from '@/api'

const TabBuy = () => {
  const [isCrypto, setIsCrypto] = useState(false)
  const [isFiat, setIsFiat] = useState(false)
  const { open, close, isOpen, dropdownRef } = useDropdown()

  const [setIsBillline, setTotalVisibility] = useUnit([
    PaymentModel.setIsBillline,
    PaymentModel.setTotalVisibility
  ])
  const [access_token] = useUnit([RegistrModel.$access_token])
  const [userInfo] = useUnit([UserModel.$userInfo])

  const [otToken, setOtToken] = useState<any | undefined>()
  useEffect(() => {
    ;(async () => {
      if (access_token && !otToken) {
        const response = await getOneTimeToken({ bareer: access_token })
        if (response.status === 'OK') {
          setOtToken((response as any).body)
          console.log('ONE TIME TOKEN---', response.body)
        } else {
          console.log('ONE TIME TOKEN ERROR', response.body)
        }
      }
    })()
  }, [access_token, otToken])

  const init = () => {
    if (otToken?.token && userInfo) {
      // alert(2)
      const userId = userInfo.id.toString()
      const apiKey = process.env.NEXT_PUBLIC_P2WAY_KEY
      const callbackUrl = 'https://rew.greekkeepers.io/api/p2way/callback'
      const token = otToken.token

      const params = { userId, apiKey, callbackUrl, token }
      window.initP2PWidget(params)
      // setTotalVisibility(false)
      // alert(JSON.stringify(params))
    }
  }

  return (
    <div
      ref={dropdownRef}
      className='flex h-full flex-col gap-2 justify-between'
    >
      <div className='flex flex-col gap-3'>
        {isFiat && (
          <div className='flex items-center justify-between'>
            <div
              onClick={() => setIsFiat(false)}
              className='text-[#7E7E7E] text-[18px] cursor-pointer font-medium flex gap-[15px] items-center'
            >
              <Arr className='rotate-[180deg]' />
              Back
            </div>
            <span className='text-[18px] font-light text-[#7E7E7E]'>
              Buy/Bank card
            </span>
          </div>
        )}
        <div className='tab-buy--info flex border gap-[10px] justify-between items-center border-[#ffe09d] rounded-lg relative py-2 px-5'>
          <span className='text-[10px] sm:text-xs sm:text-sm'>
            <span className='font-extrabold text-[#ffe09d]'>DRAX tokens </span>
            won through play can be redeemed for
            <p className='text-[#f7931a] inline'> BTC, LTC</p> and more
          </span>

          <Image
            src='/payment/attentionCoins.webp'
            className='object-cover w-[60px] xxs:w-[80px] smm:w-[120px]'
            width={120}
            height={50}
            alt='coins'
          />
        </div>
        {!isCrypto && !isFiat && (
          <>
            <span className='text-center text-[14px] font-normal'>
              Choose payment system:
            </span>
            <CryptoRoute
              title='Bank card'
              text='You can buy DRAX coins by Visa or Mastercard'
              onClick={() => setIsFiat(true)}
            />
            <span className='uppercase text-[#7E7E7E] text-[11px] font-normal text-center leading-[14px]'>
              or buy with
            </span>
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
            <span className='text-center text-[14px] font-normal'>
              Choose payment system:
            </span>
            <div
              onClick={() => setIsBillline(true)}
              className='bg-[#252525] cursor-pointer rounded-[5px] p-[12px_20px_12px_12px] flex items-center justify-between'
            >
              <span className='text-[#979797] font-normal text-[15px]'>
                Ukraine / LA (Visa/Mastercard)
              </span>
              <Arr />
            </div>
            <div
              onClick={init}
              className='bg-[#252525] cursor-pointer rounded-[5px] p-[12px_20px_12px_12px] flex items-center justify-between'
            >
              <span className='text-[#979797] font-normal text-[15px]'>
                Ukraine (Visa/Mastercard){' '}
              </span>
              <Arr />
            </div>
            <div id='p2way_modal'></div>
          </>
        )}
        {isOpen && <CustomPayment close={close} />}
      </div>
      <span
        className={`text-[#979797] ${
          isFiat && 'border-t-[1px] border-[#252525] pt-[10px]'
        } flex items-center justify-center text-[12px] font-normal text-center`}
      >
        Maximum purchase of $5000 USD per day
      </span>
    </div>
  )
}

export default TabBuy
