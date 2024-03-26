import { FC, memo, useEffect, useState } from 'react'
import purchaseIco from '@/public/payment/purchaseIco.png'
import closeIco from '@/public/payment/closeIco.webp'
import { PaymentDropdown } from '../PaymentDropdown/PaymentDropdown'
import { coinsList } from '../PaymentRedeem/PaymentRedeem'
import copyIco from '@/public/payment/copyIco.png'
import clsx from 'clsx'
import { WaitIco } from '@/src/shared/SVGs/WaitIco'
import bonusCoinIco from '@/public/payment/bonusCoin.webp'
import draxCoinIco from '@/public/payment/draxMiniIco.webp'
// import * as api from '@/shared/api'
// import * as RegistrModel from '@/widgets/Registration/model'
import { useUnit } from 'effector-react'
import * as PaymentM from '../Payment/model'
import Image from 'next/image'
import { memoryUsage } from 'process'
import s from './styles.module.scss'

// import { PaymentCopied } from '../PaymentCopied/PaymentCopied'
interface PaymentPurchaseProps {
  purchasePrice: any
  bonusPrice: any
  ref?: any
  close?: () => void
}

interface IInvoiceCreate {
  type: string
  id: string
  merchant_id: string
  order_id: string
  create_date: number
  status: number
  pay_url: string
  user_id: number
  amount: string
  currency: string
}

export const PaymentPurchase: FC<PaymentPurchaseProps> = ({
  purchasePrice,
  bonusPrice,
  ref,
  close
}) => {
  // const [access_token] = useUnit([RegistrModel.$access_token])
  const [amount, setAmount] = useState('')
  const [invoiceCreate, setInvoiceCreate] = useState<null | IInvoiceCreate>(
    null
  )
  const [activeCoin, setActiveCoin] = useState(coinsList[0])

  const [networkActive, setNetworkActive] = useState<'ETHEREUM' | 'TRON'>(
    'ETHEREUM'
  )
  const [sendAddress, setSendAddress] = useState('address')

  const [activeCopied, setActiveCopied] = useState(false)

  const addressToClipboard = () => {
    navigator.clipboard.writeText(sendAddress)
    setActiveCopied(true)
  }

  const [ercActive, setErcActive] = useState(true)
  const [memoWarning, setMemoWarning] = useState(false)

  useEffect(() => {
    if (activeCoin.title === 'xrp') {
      setMemoWarning(true)
    }
  }, [activeCoin])

  const [send, setSend] = useState(true)
  const [response, setResponse] = useState<any>(null)
  // useEffect(() => {
  //   if (access_token && purchasePrice) {
  //     ;(async () => {
  //       const data = await api.invoiceCreate({
  //         amount: purchasePrice,
  //         currency:
  //           activeCoin.title === 'USDT' ||
  //           activeCoin.title === 'USDC' ||
  //           activeCoin.title === 'TUSD'
  //             ? `${activeCoin.title}_${networkActive}`
  //             : activeCoin.title,
  //         bareer: access_token
  //       })
  //       if (data.status === 'OK') {
  //         setInvoiceCreate(data.body as any)
  //         setSendAddress((data.body as any)?.pay_url)
  //       }
  //       console.log(data)
  //     })()
  //   }

  //   setSend(false)
  // }, [
  //   send,
  //   access_token,
  //   purchasePrice,
  //   activeCoin,
  //   activeCoin.title,
  //   networkActive
  // ])

  const [setPurchaseVisibility] = useUnit([PaymentM.setPurcahseVisibility])

  const [priceList, setPriceList] = useState<any>([])

  // useEffect(() => {
  //   if (access_token && priceList?.length === 0) {
  //     ;(async () => {
  //       const response = await api.getInvoicePrices({ bareer: access_token })
  //       if (response.status === 'OK') {
  //         console.log('invoice prices', response.body)
  //         setPriceList(response.body?.prices)
  //       }
  //     })()
  //   }
  // }, [access_token])

  const [showNetworks, setShowNetworks] = useState(false)

  useEffect(() => {
    if (
      activeCoin.title === 'USDT' ||
      activeCoin.title === 'USDC' ||
      activeCoin.title === 'TUSD'
    ) {
      setShowNetworks(true)
    } else {
      setShowNetworks(false)
    }
  }, [activeCoin.title])

  return (
    <div
      // ref={ref}
      className={` p-0 sm:p-[30px] bg-black-def w-full max-w-[660px]
      rounded-[12px] relative h-full overflow-scroll max-h-[780px]
      `}
    >
      {/* <PaymentCopied active={activeCopied} setDisable={setActiveCopied} /> */}
      <div
        className='
          flex items-center justify-between border-b border-[#252525]
          p-[16px] sm:p-[0_0_10px_0] 
        '
      >
        <div
          className='
            flex gap-[10px] text-inp-col text-[24px] font-semibold 
            leading-[34px] tracking-[0.04em] text-center
            items-center
          '
        >
          <Image
            src={purchaseIco}
            className='w-[18px] h-[20px]'
            alt='purcahse-ico'
          />
          Purchase
        </div>
        <img
          onClick={() => {
            setPurchaseVisibility(false)
          }}
          src={closeIco.src}
          className='w-[16px] h-[16px]'
          alt='close-ico'
        />
      </div>
      <div
        className='
        scroll -webkit-scrollbar:w-[4px] -webkit-scrollbar:ml-[4px] -webkit-scrollbar:rounded-[3px]
        mt-[20px] flex flex-col gap-[20px] h-full sm:h-auto overflow-y-scroll sm:overflow-y-visible

        '
      >
        <div
          className='
            flex flex-col gap-[5px] mx-[16px] sm:mx-0
          '
        >
          <span
            className='text-inp-col text-[14px] sm:text-[16px] 
            leading-[22px] font-semibold tracking-[0.04em] text-left
            '
          >
            Estimate Receive
          </span>
          <div
            className='
              grid grid-cols-2 py-[5px] px-[25px] gap-[10px] bg-[#202020]
              border border-[#252525] rounded-[8px] min-h-[55px] box-border 
            '
          >
            <div>
              <span
                className='
                  text-text-w-def text-[14px] font-light leading-[20px] tracking-[0.04em] text-left
                '
              >
                DRAX Coin
                <span
                  className='
                    flex gap-[10px] items-center text-text-w-def text-[14px] sm:text-[18px]
                    mt-[6px] sm:mt-[10px] font-normal leading-[25px] tracking-[0.04em]
                  '
                >
                  <img
                    className='w-[24px] h-[24px]'
                    src={draxCoinIco.src}
                    alt=''
                  />
                  {purchasePrice}
                </span>
              </span>
            </div>
            <div>
              <span
                className='
                  text-text-w-def text-[14px] font-light leading-[20px] tracking-[0.04em] text-left
                '
              >
                Bonus Coin
                <span
                  className='
                    flex gap-[10px] items-center text-text-w-def text-[14px] sm:text-[18px]
                    mt-[6px] sm:mt-[10px] font-normal leading-[25px] tracking-[0.04em]
                  '
                >
                  <img
                    className='w-[24px] h-[24px]'
                    src={bonusCoinIco.src}
                    alt=''
                  />
                  {bonusPrice}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div
          className='
            flex flex-col gap-[5px] mx-[16px] sm:mx-0 
          '
        >
          <div
            className='
              flex items-center justify-between
            '
          >
            <span
              onClick={() => setSend(true)}
              className='
                text-inp-col text-[14px] sm:text-[16px] leading-[22px] font-extrabold
                tracking-[0.04em] text-left
              '
            >
              Send Amount
            </span>
            <span
              className='
                text-inp-col text-[14px] sm:text-[16px] font-extrabold
                leading-[22px] traxking-[0.04em] text-left uppercase
              '
            >
              ≈{purchasePrice}usdt
            </span>
          </div>
          <div
            className='
              flex items-center h-[40px]
            '
          >
            <input
              value={
                purchasePrice &&
                purchasePrice /
                  priceList
                    ?.find((item: any) => item?.monetary === activeCoin.title)
                    ?.rates?.find((el: any) => el.fiatCurrency === 'USD').rate
              }
              // onChange={(el) => setAmount(el.target.value)}
              type='text'
              className='
                outline-none box-border w-full bg-[#121212] py-[15px] px-[20px]
                border border-[#252525] text-text-w-def text-[18px] leading-[25px]
                tracking-[0.04em] rounded-[8px_0_0_8px] h-full
              '
            />
            <div
              className='
                w-full h-full max-w-[155px]
              '
            >
              <PaymentDropdown list={coinsList} setActive={setActiveCoin} />
            </div>
          </div>
        </div>
        {memoWarning && (
          <div
            className='
              bg-[#121212] rounded-[8px] bpx-border px-[30px]
              py-[10px] h-[320px] w-full flex flex-col justify-center items-center
              gap-[30px] 
            '
          >
            <span
              className='
                text-text-w-def text-[24px] font-semibold leading-[33px]
                tracking-[0.04em] text-center
              '
            >
              Warning: <br /> If the Memo is not included in your transaction,
              we cannot credit your account.
            </span>
            <button
              className='
                rounded-[8px] cursor-pointer flex items-center justify-center
                h-[40px] w-full text-[#121212] text-[21px] font-bold outline-none border-none
                leading-[29px] tracking-[0.04em] text-center 
                bg-[linear-gradient(90deg,_#f8eeb8_0%,_#dbb370_56.25%,_#8e5b2d_100%)]
              '
              onClick={() => setMemoWarning(false)}
            >
              Got it
            </button>
          </div>
        )}
        <div
          // className={clsx(s.send_address_block, memoWarning && s.hidden)}
          className={`
            transition-all duration-150 flex flex-col items-center gap-[5px]
            mx-[16px] sm:mx-0 ${memoWarning && 'opacity-0 h-0 invisible'}
          `}
        >
          {showNetworks && (
            <div
              className='
                flex items-center gap-[60px]
              '
            >
              <div
                // className={clsx(
                //   s.usdt_network_item,
                //   ercActive && s.usdt_network_active
                // )}
                className={`
                  cursor-pointer flex gap-[10px] items-center text-[#20e793]
                  text-[20px] font-extrabold leading-[27px] tracking-[0.04em]
                `}
                onClick={() => {
                  setNetworkActive('ETHEREUM')
                  setErcActive(true)
                }}
              >
                <div
                  className={`
                    box-border rounded-[50%] transition-all duration-300 border-2 border-[#7e7e7e]
                    w-[180px] h-[18px] mb-[2px] ${
                      ercActive && 'bg-[#20e793] border-none'
                    }
                  `}
                ></div>
                ERC20
              </div>
              <div
                className={`
                cursor-pointer flex gap-[10px] items-center text-[#20e793]
                text-[20px] font-extrabold leading-[27px] tracking-[0.04em]
              `}
                onClick={() => {
                  setNetworkActive('TRON')
                  setErcActive(false)
                }}
              >
                <div
                  className={`
                    box-border rounded-[50%] transition-all duration-300 border-2 border-[#7e7e7e]
                    w-[180px] h-[18px] mb-[2px] ${
                      ercActive && 'bg-[#20e793] border-none'
                    }
                  `}
                ></div>
                TRC20
              </div>
            </div>
          )}{' '}
          <span
            className='
              text-inp-col text-[14px] sm:text-[16px] font-extrabold leading-[22px] tracking-[0.04em]
              text-left
            '
          >
            <span className='uppercase'>
              {activeCoin.title?.split('_')[0]}{' '}
              {activeCoin.title?.split('_')[1] &&
                (activeCoin.title?.split('_')[1] === 'ETHEREUM' ||
                  activeCoin.title?.split('_')[1] === 'TRON') &&
                activeCoin.title?.split('_')[0] !== 'ETH' &&
                activeCoin.title?.split('_')[0] !== 'TRX' &&
                activeCoin.title?.split('_')[1]}
            </span>{' '}
            Send Address
          </span>
          <div
            className='
                    box-border w-full rounded-[8px] bg-[#121212]
                    border border-[#252525] px-[20px] text-text-w-def
                    h-[40px] text-[18px] font-normal leading-[25px] tracking-[0.04em]
                    text-left flex items-center justify-between
            '
          >
            {invoiceCreate?.pay_url}
            <img
              src={copyIco.src}
              onClick={addressToClipboard}
              alt='copy-ico'
              className='cursor-pointer'
            />
          </div>
        </div>
        <div
          // className={clsx(s.barcode_wrap, memoWarning && s.hidden)}
          className={`
            transition-all duration-150 flex items-center justify-center mx-[16px] sm:mx-0
            ${memoWarning && 'opacity-0 invisible h-0'}
        `}
        >
          <img
            width={200}
            height={200}
            src={`https://game.greekkeepers.io/api/invoice/qr/${
              invoiceCreate?.order_id || 1
            }`}
            alt='text'
          />
        </div>
        <div
          className='
            text-inp-col text-[12px] sm:text-[13px] p-[10px] sm:p-[10px_20px]
            mx-[16px] sm:mx-0 font-normal leading-[18px] tracking-[0.04em] text-left
            rounded-[8px] bg-[#212121]
          '
        >
          Disclaimer: <br /> The exact amount you receive is subject to
          real-time exchange rate and the actual send amount at the time
          arrival.
        </div>
        <div
          // className={clsx(s.purchase_status_block, memoWarning && s.hidden)}
          className={`
            sm:w-full flex gap-[10px] transition-all duration-400
            pb-[100px] sm:pb-0 w-[calc(100%_-_32px)] mx-[16px] sm:mx-0
            ${memoWarning && 'opacity-0 invisible h-0'}
          `}
        >
          <div
            className='
            h-[45px] sm:h-[40px] p-[10px] sm:p-[0_20px] bg-[#212121] w-full box-border
            text-[14px] sm:text-[16px] flex items-center justify-start
            tracking-[0.04em] leading-[24px] text-white 
          '
          >
            Waiting for payment
          </div>
          <div
            className='
              h-[45px] sm:h-[40px] box-border flex items-center justify-center
              bg-[#212121] rounded-[8px] w-[150px]
            '
          >
            <WaitIco />
          </div>
        </div>
      </div>
    </div>
  )
}
