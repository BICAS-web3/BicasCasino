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
import { useTranslation } from 'react-i18next'

const TabBuy = () => {
  const [isCrypto, setIsCrypto] = useUnit([
    PaymentModel.$buyCrypto,
    PaymentModel.setBuyCrypto
  ])
  const [isFiat, setIsFiat] = useUnit([
    PaymentModel.$buyFiat,
    PaymentModel.setBuyFiat
  ])
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
      setTotalVisibility(false)
      // alert(JSON.stringify(params))
    }
  }
  const { t } = useTranslation()
  return (
    <div
      ref={dropdownRef}
      className='flex h-full flex-col gap-2 justify-between'
    >
      <div className='flex flex-col gap-3'>
      <div className='tab-buy--info flex border gap-[10px] justify-between items-center border-[#ffe09d] rounded-lg relative py-2 px-5' >
          <span className='text-[10px] sm:text-xs'>
            <span className='font-extrabold text-[#ffe09d]'>
              {t(`modals.wallet.payment.buy.subtitle.text_1`)}{' '}
            </span>
            {t(`modals.wallet.payment.buy.subtitle.text_2`)}
            <p className='text-[#f7931a] inline'>
              {t(`modals.wallet.payment.buy.subtitle.text_3`)}
            </p>
            {t(`modals.wallet.payment.buy.subtitle.text_4`)}
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
              {t(`modals.wallet.payment.buy.crypto.text_1`)}
            </span>
            <CryptoRoute
              isBuy
              title={t(`modals.wallet.payment.buy.crypto.route_1.title`)}
              text={t(`modals.wallet.payment.buy.crypto.route_1.text`)}
              onClick={() => setIsFiat(true)}
            />
            <div className='w-fill flex items-center gap-5'>
              <span className='flex flex-auto h-[1px] w-full bg-[#252525]'></span>
              <span className='uppercase min-w-max text-[#7E7E7E] text-[11px] font-normal text-center leading-[14px]'>
                {t(`modals.wallet.payment.buy.crypto.text_2`)}
              </span>
              <span className='flex flex-auto h-[1px] w-full bg-[#252525]'></span>
            </div>
            <CryptoRoute
              isBuy
              isCrypto
              onClick={() => setIsCrypto(true)}
              title={t(`modals.wallet.payment.buy.crypto.route_2.title`)}
              text={t(`modals.wallet.payment.buy.crypto.route_2.text`)}
            />
          </>
        )}
        {isCrypto && <PaymentCrypto />}
              {isFiat && (
                <>
                  <span className='text-center text-[14px] font-normal'>
                    {t(`modals.wallet.payment.buy.fiat.text_1`)}
                  </span>
                  <div
                    onClick={() => setIsBillline(true)}
                    className='bg-[#252525] cursor-pointer rounded-[5px] p-[12px_20px_12px_12px] flex items-center justify-between hover:bg-[#2E2E2E]'
                  >
                    <span className='text-[#979797] font-normal text-[15px]'>
                      {t(`modals.wallet.payment.buy.fiat.text_2`)}
                    </span>
                    <Arr />
                  </div>
                  <div
                    onClick={init}
                    className='bg-[#252525] cursor-pointer rounded-[5px] p-[12px_20px_12px_12px] flex items-center justify-between hover:bg-[#2E2E2E]' 
                  >
                    <span className='text-[#979797] font-normal text-[15px]'>
                      {t(`modals.wallet.payment.buy.fiat.text_3`)}
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
        {t(`modals.wallet.payment.buy.limit`)}
      </span>
    </div>
  )
              }

export default TabBuy
