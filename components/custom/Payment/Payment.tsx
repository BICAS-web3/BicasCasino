'use client'
import { FC, useEffect, useState } from 'react'
import s from './styles.module.scss'
import { useUnit } from 'effector-react'
import * as PaymentM from './model'
import storeIco from '@/public/payment/storeIco.webp'
import closeIco from '@/public/payment/closeIco.webp'
import clsx from 'clsx'
import attentionCoins from '@/public/payment/attentionCoins.webp'
import miniDraxIco from '@/public/payment/draxMiniIco.webp'
import draxCoin from '@/public/payment/draxCoin.webp'
import { PaymentRedeem } from '../PaymentRedeem/PaymentRedeem'
import { PaymentTips } from '../PaymentTips/PaymentTips'
// import * as PaymentRedeemM from "@/widgets/PaymentRedeem/model";
import { PaymentPurchase } from '../PaymentPurchase/PaymentPurchase'
import { PaymentStatus } from '../PaymentStatus/PaymentStatus'
// import { useDropdown } from "@/shared/tools";
// import { WalletBtn } from "@/shared/SVGs";
// import * as api from "@/shared/api";
// import * as RegistModel from "@/widgets/Registration/model";

const draxTypesList = [
  {
    bonusCoins: '100,000',
    usdPrice: 10
  },
  {
    bonusCoins: '50,000',
    usdPrice: 50
  },
  {
    bonusCoins: '100,000',
    usdPrice: 100
  },
  {
    bonusCoins: '500,000',
    usdPrice: 500
  },
  {
    bonusCoins: '1,000,000',
    usdPrice: 1000
  },
  {
    bonusCoins: '2,000,000',
    usdPrice: 2000
  }
]

interface PaymentProps {}

export const Payment: FC<PaymentProps> = () => {
  // const { toggle, open, close, isOpen, dropdownRef } = useDropdown()
  const [
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
    PaymentM.$paymentVisibility,
    PaymentM.setPaymentVisibility,
    PaymentM.$storeType,
    PaymentM.setStoreType,
    // PaymentRedeemM.$securityModalVisibility,
    // PaymentRedeemM.setSecurityModalVisibility,
    PaymentM.$purchaseVisibility,
    PaymentM.setPurcahseVisibility
    // RegistModel.$access_token
  ])

  const [purchaseValue, setPurchaseValue] = useState()
  const [bonusValue, setBonusValue] = useState()

  const handlePurchaseBtn = (price: any, bonusPrice: any) => {
    setPurchaseValue(price)
    setBonusValue(bonusPrice)
    // setPurchaseVisibility(true)
  }

  const [link, setLink] = useState(1)

  return (
    <>
      {/* <button
        onClick={() => {
          console.log(2)
          open()
          setLink(prev => prev + 1)
        }}
        className={s.wallet_btn}
      >
        <span> Wallet</span> <WalletBtn />
      </button>{' '} */}
      {/* , isOpen && s.payment_wrap_open */}
      <div
        className={`
          z-[170] sm:z-[200] w-screen h-screen fixed left-0 top-0 flex
          justify-center items-center box-border p-0 sm:py-[90px] 
          bg-[rgba(0,_0,_0,_0.7)]
          duration-700 transition-all

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
                  onClick={() => {
                    close()
                  }}
                  src={closeIco.src}
                  className='w-[16px] h-[16px] cursor-pointer'
                  alt='close-ico'
                />
              </div>
            </div>
            <div className='flex flex-col h-full gap-[20px]'>
              <div>
                <div
                  className='sm:m-[20px_30px_0_30px] m-[20px_16px_0_16px] flex p-[5px]
                  bg-[#121212] border border-[#252525] gap-[5px]
                  rounded-[50px] box-border
                  '
                >
                  <button
                    className={`
                      w-full bg-[#121212] duration-300 transition-all
                      cursor-pointer flex justify-center items-center
                      h-[40px] text-bets-title-color rounded-[50px] hover:bg-black-def ${
                        storeType === 'buy' && 'bg-[#202020] text-white'
                      }
                    `}
                    onClick={() => setStoreType('buy')}
                  >
                    Buy
                  </button>
                  <button
                    className={`
                    w-full bg-[#121212] duration-300 transition-all
                    cursor-pointer flex justify-center items-center
                    h-[40px] text-bets-title-color rounded-[50px] hover:bg-black-def ${
                      storeType === 'redeem' && 'bg-[#202020] text-white'
                    }
                  `}
                    onClick={() => setStoreType('redeem')}
                  >
                    Redeem
                  </button>
                  <button
                    className={`
                    w-full bg-[#121212] duration-300 transition-all
                    cursor-pointer flex justify-center items-center
                    h-[40px] text-bets-title-color rounded-[50px] hover:bg-black-def ${
                      storeType === 'tips' && 'bg-[#202020] text-white'
                    }`}
                    onClick={() => setStoreType('tips')}
                  >
                    Tips
                  </button>
                </div>
              </div>
              {storeType === 'buy' ? (
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
                      <span className='font-extrabold text-[#ffe09d] '>
                        DRAX tokens
                      </span>{' '}
                      won through play can be <br /> redeemed for
                      <p className='text-[#f7931a] inline'> BTC, LTC</p> and
                      more
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
              ) : storeType === 'redeem' ? (
                <PaymentRedeem />
              ) : (
                <PaymentTips />
              )}
            </div>
          </div>
        ) : (
          // <PaymentPurchase
          //   purchasePrice={purchaseValue}
          //   bonusPrice={bonusValue}
          //   close={close}
          //   // ref={dropdownRef}
          // />
          123
        )}
      </div>
    </>
  )
}
