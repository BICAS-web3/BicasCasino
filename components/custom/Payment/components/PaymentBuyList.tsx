import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC, useState } from 'react'
import { draxTypesList } from './data'
import attentionCoins from '@/public/payment/attentionCoins.webp'
import miniDraxIco from '@/public/payment/draxMiniIco.webp'
import draxCoin from '@/public/payment/draxCoin.webp'

interface PaymentBuyListProps {
  setPurchaseV: (price: number) => void
  setBonusV: (bonusPrice: number) => void
}

export const PaymentBuyList: FC<PaymentBuyListProps> = ({
  setPurchaseV,
  setBonusV
}) => {
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

  const handlePurchaseBtn = (price: any, bonusPrice: any) => {
    setPurchaseV(price)
    setBonusV(bonusPrice)
    setPurchaseVisibility(true)
  }

  return (
    <>
      <div
        className='sm:mx-[30px] mx-[20px] shadow-[0px_0px_14px_0px_#9c740e_inset]
              border border-[#ffe09d] bg-[linear-gradient(0deg,_#252019,_#252019),_linear-gradient(0deg,_#ffe09d,_#ffe09d)]
              rounded-[8px] flex gap-[10px] items-center justify-between
              '
      >
        <span
          className='text-[10px] leading-[13px]
              m-[5px_0_5px_10px] sm:m-[10px_0_10px_20px] sm:text-[16px] font-semibold sm:leading-[22px] tracking-[0.04em] text-white text-left'
        >
          <span className='font-extrabold text-[#ffe09d] '>DRAX tokens</span>{' '}
          won through play can be <br /> redeemed for
          <p className='text-[#f7931a] inline'> BTC, LTC</p> and more
        </span>
        <div
          className='relative overflow-hidden m-[0_20px_0_0]
                h-full flex justify-center items-center
              '
        >
          <div
            className='absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]
                  bg-[#ffce6399] w-[30px] sm:w-[50px] h-[40px] mix-blend-hard-light blur-[20px] rounded-[50%]
                '
          ></div>
          <img
            src={attentionCoins.src}
            className='
                  sm:h-[50px] h-[37px]
                '
            alt='coins'
          />
        </div>
      </div>
      <div
        className='
            sm:px-[30px] p-[0_16px_90px_16px] grid grid-cols-2 sm:gap-[20px] gap-[10px]  h-full overflow-y-scroll overflow-x-hidden
            scroll -webkit-scrollbar:w-[4px] -webkit-scrollbar:ml-[4px] -webkit-scrollbar:rounded-[3px]
          '
      >
        {draxTypesList.map((item, ind) => (
          <div
            className='
                flex flex-col rounded-[8px]
              '
            key={ind}
          >
            <div
              className='rounded-[8px_8px_0_0] bg-[#212121] px-[10px] py-[8px]
                    flex justify-center items-center gap-[8px]
                  '
            >
              <img
                src={miniDraxIco.src}
                className='
                      w-[25px] h-[25px]
                    '
                alt='mini-drax-static'
              />
              <span
                className='text-text-w-def leading-[16px] tracking-[0.05em]
                    text-left text-[10px] sm:text-[12px] font-medium
                    '
              >
                {item.usdPrice} DRAX Coins
              </span>
            </div>
            <div
              className='
                    flex flex-col items-center rounded-[0_0_8px_8px] bg-[#0f0f0f]
                    p-[20px_10px_10px_10px] sm:p-[30px_20px_20px_20px]
                  '
            >
              <div
                className='
                      relative w-[50px] h-[50px] sm:w-[40px] sm:h-[50px]
                    '
              >
                <img
                  src={draxCoin.src}
                  className='w-full h-full'
                  alt='drax-coin-static'
                />
              </div>
              <span
                className='text-text-w-def mt-[10px] text-[14px] sm:text-[16px]
                    font-semibold leading-[22px] tracking-[0.04em] text-center uppercase
                    '
              >
                {item.bonusCoins} <br /> bonus coins
              </span>
              <button
                className='
                      cursor-pointer w-full h-[30px] text-[13px] mt-[14px] sm:text-[16px]
                      sm:mt-[20px] sm:h-[40px] rounded-[5px] flex justify-center items-center
                      border border-[#ffe09d] bg-[linear-gradient(0deg,_#252019,_#252019),_linear-gradient(0deg,_#ffe09d,_#ffe09d)]
                      text-[#ffe09d] font-bold leading-[16px] tracking-[0.04em] px-[10px] text-center
                      '
                onClick={() =>
                  handlePurchaseBtn(item.usdPrice, item.bonusCoins)
                }
              >
                ${item.usdPrice}
              </button>
            </div>
          </div>
        ))}
        <span
          className='
                text-[#979797] text-[18px] leading-[25px] tracking-[0.04em]
                text-center col-start-1 col-end-3 mt-[15px]
              '
        >
          Maximum purchase of $5000 USD per day
        </span>
      </div>
    </>
  )
}
