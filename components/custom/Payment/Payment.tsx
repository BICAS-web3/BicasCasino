'use client'
import { FC, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { PaymentModel } from '@/states'
import storeIco from '@/public/payment/storeIco.webp'
import closeIco from '@/public/payment/closeIco.webp'
import { PaymentRedeem } from '../PaymentRedeem/PaymentRedeem'
import { PaymentTips } from '../PaymentTips/PaymentTips'
// import * as PaymentRedeemM from "@/widgets/PaymentRedeem/model";
import { PaymentPurchase } from '../PaymentPurchase/PaymentPurchase'
import { PaymentStatus } from '../PaymentStatus/PaymentStatus'
import { PaymentNav } from './components/PaymentNav'
import { PaymentBuyList } from './components/PaymentBuyList'
// import { useDropdown } from "@/shared/tools";
// import { WalletBtn } from "@/shared/SVGs";
// import * as api from "@/shared/api";
// import * as RegistModel from "@/widgets/Registration/model";

interface PaymentProps {}

export const Payment: FC<PaymentProps> = () => {
  const [
    totalVisibility,
    setTotalVisibility,
    paymentVisibility,
    setPaymentVisibility,
    storeType,
    setStoreType,
    // securityModal,
    // setSecurityModal,
    purchaseVisibility,
    setPurchaseVisibility
    // access_token
  ] = useUnit([
    PaymentModel.$totalVisibility,
    PaymentModel.setTotalVisibility,
    PaymentModel.$paymentVisibility,
    PaymentModel.setPaymentVisibility,
    PaymentModel.$storeType,
    PaymentModel.setStoreType,
    // PaymentRedeemM.$securityModalVisibility,
    // PaymentRedeemM.setSecurityModalVisibility,
    PaymentModel.$purchaseVisibility,
    PaymentModel.setPurcahseVisibility
    // RegistModel.$access_token
  ])

  const [purchaseValue, setPurchaseValue] = useState<number>()
  const [bonusValue, setBonusValue] = useState<number>()

  const [link, setLink] = useState(1)

  useEffect(() => {
    console.log(totalVisibility)
  }, [totalVisibility])

  return (
    <>
      <div
        className={`
          z-[170] sm:z-[200] w-screen h-screen fixed left-0 top-0 flex
          justify-center items-center box-border p-0 sm:py-[90px] 
          bg-[rgba(0,_0,_0,_0.7)]
          duration-700 transition-all
          ${totalVisibility ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        {paymentVisibility && !purchaseVisibility ? (
          <div
            // ref={dropdownRef}
            // className={clsx(
            //   s.payment_body,
            //   storeType === 'buy' && s.padding_bottom,
            //   storeType === 'redeem' && s.redeem_active,
            //   storeType === 'tips' && s.tips_active
            //   // securityModal && s.security_modal_active
            // )}
            className={`
      overflow-hidden m-0 sm:mx-[20px] sm:w-[630px] w-full
      min-h-[300px] max-h-[9999px] sm:max-h-[730px] bg-black-def
      sm:rounded-[12px] rounded-none flex h-full sm:h-full flex-col relative
      duration-500 transition-all pb-0 
      ${storeType === 'buy' ? ' pb-[5px] h-full' : ''}
      ${storeType === 'redeem' ? '!h-full' : ''}
      ${storeType === 'tips' ? '!h-full pb-[45px] sm:pb-0 sm:!h-auto' : ''}
      ${totalVisibility ? 'scale-1' : 'scale-0'}
    `}
          >
            <div
              className='flex items-center justify-between
      sm:p-[20px_30px_20px_20px] p-[16px] border-b border-[#252525]

      '
            >
              <span
                className='
          flex items-center gap-[10px] font-semibold
          leading-[28px] tracking-[0.04em] text-center text-[#979797]
        '
              >
                <img
                  src={storeIco.src}
                  className='w-[18px] h-[18px] '
                  alt='store-ico'
                />
                Wallet
              </span>
              <div className='flex items-center gap-[10px]'>
                <img
                  onClick={() => setTotalVisibility(false)}
                  src={closeIco.src}
                  className='w-[16px] h-[16px] cursor-pointer'
                  alt='close-ico'
                />
              </div>
            </div>
            <div
              className={`flex flex-col h-full gap-[20px] ${
                storeType === 'buy' && 'gap-[20px]'
              }`}
            >
              <PaymentNav />
              {storeType === 'buy' ? (
                <PaymentBuyList
                  setBonusV={setBonusValue}
                  setPurchaseV={setPurchaseValue}
                />
              ) : storeType === 'redeem' ? (
                <PaymentRedeem />
              ) : (
                <PaymentTips />
              )}
            </div>
          </div>
        ) : (
          <PaymentPurchase
            purchasePrice={purchaseValue}
            bonusPrice={bonusValue}
            // ref={dropdownRef}
          />
        )}
      </div>
    </>
  )
}
