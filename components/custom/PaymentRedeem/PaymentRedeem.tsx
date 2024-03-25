import s from './styles.module.scss'
import { FC, useEffect, useState } from 'react'
import btcIco from '@/public/payment/BTC_BITCOIN.webp'
import bnb from '@/public/payment/bnb.webp'
import ethIco from '@/public/payment/ETH_ETHEREUM.webp'
import busd from '@/public/payment/busd.webp'
import ltcIco from '@/public/payment/LTC_LITECOIN.webp'
import usdtIco from '@/public/payment/USDT_ETHEREUM.webp'
import trxIco from '@/public/payment/TRX_TRON.webp'
import dai from '@/public/payment/dai-2.webp'
import usdc from '@/public/payment/usdc.webp'
// import { useDropdown } from "@/shared/tools";
import upArrow from '@/public/payment/upArrow.webp'
import clsx from 'clsx'
import { useUnit } from 'effector-react'
import * as PaymentRedeemM from './model'
import closeIco from '@/public/payment/closeIco.webp'
import tusd from '@/public/payment/tusd.webp'
import ton from '@/public/payment/ton.webp'

// export const coinsList = [
//   {
//     title: "btc",
//     ico: btcIco,
//   },
//   {
//     title: "eth",
//     ico: ethIco,
//   },
//   {
//     title: "doge",
//     ico: doceIco,
//   },
//   {
//     title: "ltc",
//     ico: ltcIco,
//   },
//   {
//     title: "bch",
//     ico: bchIco,
//   },
//   {
//     title: "usdt",
//     ico: usdtIco,
//   },
//   {
//     title: "trx",
//     ico: trxIco,
//   },
//   {
//     title: "xrp",
//     ico: xrpIco,
//   },
//   {
//     title: "xlm",
//     ico: xlmIco,
//   },
// ];

// export const coinsList = [
//   { title: "BTC_BITCOIN", ico: btcIco },
//   { title: "ETH_ETHEREUM", ico: ethIco },
//   { title: "USDT/_ETHEREUM", ico: usdtIco },
//   { title: "USDC/_ETHEREUM", ico: usdc },
//   { title: "TUSD/_ETHEREUM", ico: tusd },
//   { title: "DAI_ETHEREUM", ico: dai },
//   { title: "TRX_TRON", ico: trxIco },
//   { title: "USDT/_TRON", ico: usdtIco },
//   { title: "USDC/_TRON", ico: usdc },
//   { title: "TUSD/_TRON", ico: tusd },
//   { title: "LTC_LITECOIN", ico: ltcIco },
//   { title: "BNB_BSC", ico: bnb },
//   { title: "BUSD_BSC", ico: busd },
//   { title: "TON_TON", ico: ton },
// ];

export const coinsList = [
  { title: 'BTC_BITCOIN', ico: btcIco },
  { title: 'ETH_ETHEREUM', ico: ethIco },
  { title: 'USDT', ico: usdtIco },
  { title: 'USDC', ico: usdc },
  { title: 'TUSD', ico: tusd },
  { title: 'DAI_ETHEREUM', ico: dai },
  { title: 'TRX_TRON', ico: trxIco },
  { title: 'LTC_LITECOIN', ico: ltcIco },
  { title: 'BNB_BSC', ico: bnb },
  { title: 'BUSD_BSC', ico: busd },
  { title: 'TON_TON', ico: ton }
]

interface PaymentRedeemProps {}

export const PaymentRedeem: FC<PaymentRedeemProps> = () => {
  const [activeCoin, setActiveCoin] = useState(coinsList[0])
  // const { dropdownRef, isOpen: isVisible, toggle, close } = useDropdown()
  const [currentCoinsList, setCurrentCoinsList] = useState(coinsList)
  const [coinsListVisibility, setCoinsListVisibility] = useState(false)

  const [mailValue, setMailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const [userBalance, setUserBalance] = useState(1.7737) ////temp

  const [valueToPayout, setValueToPayout] = useState<number>()

  useEffect(() => {
    setCurrentCoinsList(
      coinsList.filter(item => item.title !== activeCoin.title)
    )
  }, [activeCoin])

  const handleChangeCoin = (title: string) => {
    const activeCoin = currentCoinsList.filter(item => item.title === title)[0]
    setActiveCoin(activeCoin)
    setCoinsListVisibility(false)
  }

  const handleSetMaxBalancePayout = () => {
    setValueToPayout(userBalance)
  }

  const [securityModalVisibility, setSecurityModalVisibility] = useUnit([
    PaymentRedeemM.$securityModalVisibility,
    PaymentRedeemM.setSecurityModalVisibility
  ])

  return (
    <div
      className='flex mt-[20px] flex-col gap-[20px] sm:p-[0_30px_90px_30px] p-[0_16px_90px_16px]
      overflow-y-scroll overflow-x-hidden scroll -webkit-scrollbar:w-[4px] -webkit-scrollbar:ml-[4px] -webkit-scrollbar:rounded-[3px]

      '
    >
      <div
        className={`
        absolute w-full h-full top-0 left-0 bg-[rgba(0,_0,_0,_0.7)]
        duration-400 transition-all z-[15] opacity-0 invisible ${
          securityModalVisibility && '!opacity-100 !visible'
        }
        `}
      >
        <div
          className='
          sm:rounded-[8px] rounded-0 flex flex-col sm:block sm:p-[30px] p-[16px] box-border bg-black-def absolute top-[50%] left-[50%]
          w-full h-full sm:w-[calc(100%_-_14px)] translate-x-[-50%] translate-y-[-50%]
          
        '
        >
          <div
            className='
              flex items-center justify-between border-b border-[#252525]
              pb-[10px] gap-[20px] 
            '
          >
            <span
              className='text-white text-[24px] font-semibold leading-[34px]
              tracking-[0.04em] text-center
              '
            >
              Security Question
            </span>
            <img
              src={closeIco.src}
              className='w-[16px] h-[16px]'
              alt='close-ico'
              onClick={() => setSecurityModalVisibility(false)}
            />
          </div>
          <div
            className='
              flex flex-col gap-[20px] 
            '
          >
            <div
              className='
                  flex flex-col gap-[5px] first:mt-[20px]
                '
            >
              <span
                className='
                  text-[#979797] text-[12px] sm:text-[18px] font-normal leading-[25px]
                  tracking-[0.04em] text-left
                '
              >
                Full your email address (ivan*****@****.****)
              </span>
              <input
                type='text'
                className='
                  bg-[linear-gradient(0deg,_#121212,_#121212),_linear-gradient(0deg,_#252525,_#252525)]
                  border border-[#252525] sm:px-[20px] sm:py-[15px] text-text-w-def text-[14px] sm:text-[18px]
                  box-border h-[40px] p-[10px]
                '
                value={mailValue}
                onChange={e => setMailValue(e.target.value)}
              />
            </div>
            <div
              className='
              flex flex-col gap-[5px] first:mt-[20px]
            '
            >
              <span
                className='
                text-[#979797] text-[12px] sm:text-[18px] font-normal leading-[25px]
                tracking-[0.04em] text-left
              '
              >
                Input your account password
              </span>
              <input
                type='password'
                className='
                  bg-[linear-gradient(0deg,_#121212,_#121212),_linear-gradient(0deg,_#252525,_#252525)]
                  border border-[#252525] sm:px-[20px] sm:py-[15px] text-text-w-def text-[14px] sm:text-[18px]
                  box-border h-[40px] p-[10px]
                '
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
              />
            </div>
          </div>
          <div
            className='
              mt-[20px] flex flex-col sm:flex-row sm:items-center items-start justify-between gap-[10px] sm:gap-[15px]
              flex-1 sm:flex-auto

            '
          >
            <span
              className='
                text-[#979797] text-[14px] sm:text-[18px] font-normal
                leading-[25px] tracking-[0.0em] text-left cursor-pointer
                '
            >
              Forget password?
            </span>
            <div
              className='
                w-full sm:w-auto gap-[10px] flex
              '
            >
              <button
                className='
                  flex justify-center items-center h-[50px] sm:w-[113px] text-[16px]
                  w-full font-bold leading-[16px] tracking-[0.0em] text-center rounded-[8px]
                  cursor-pointer px-[10px] text-[#7e7e7e] border border-[#363636]
                  bg-[linear-gradient(0deg,_#202020,_#202020),_linear-gradient(0deg,_#363636,_#363636)]
                '
              >
                Cancel
              </button>
              <button
                className='flex justify-center items-center h-[50px] sm:w-[113px] text-[16px]
                  w-full font-bold leading-[16px] tracking-[0.0em] text-center rounded-[8px]
                  cursor-pointer px-[10px] text-[#ffe09d] border border-[#ffe09d] bg-[#231f18]'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div
          // className={clsx(
          //   s.payment_redeem_coins_list_block,
          //   coinsListVisibility && s.active_list
          // )}
          className='
            w-full h-[40px] sm:w-[200px] rounded-[8px] relative
          '
        >
          <div
            className={`
            h-[40px] sm:h-full transition-all duration-400
            bg-[#202020] rounded-[8px] px-[20px] py-[10px] box-border
            cursor-pointer flex items-center justify-between gap-[10px]
            ${coinsListVisibility && 'rounded-[8px_8px_0_0]'}
            `}
            onClick={() => setCoinsListVisibility(!coinsListVisibility)}
          >
            <div
              className='
                gap-[10px] flex items-center
              '
            >
              <img
                src={activeCoin.ico.src}
                className='w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] rounded-[100%]'
                alt=''
              />
              <span
                className='
                  text-text-w-def text-[12px] font-bold leading-[18px] tracking-[0.04em]
                  text-left uppercase
                '
              >
                {activeCoin.title}
              </span>
            </div>
            <img
              src={upArrow.src}
              className={`transition-all duration-400 w-[10px] h-[6px] ${
                coinsListVisibility && 'rotate(180deg)'
              }`}
              alt='up-arrow-static'
            />
          </div>
          <div
            className={`
            absolute w-full top-[100%] left-0 transition-all duration-400
            opacity-0 invisible ${
              coinsListVisibility && '!opacity-100 !visible'
            }
            `}
          >
            {currentCoinsList.map((item, ind) => (
              <div
                className='
                  cursor-pointer h-[50px] box-border px-[20px] py-[0px] flex
                  items-center gap-[10px] bg-[#202020] last:rounded-[0_0_8px_8px]
                '
                onClick={() => handleChangeCoin(item.title)}
              >
                <img
                  src={item.ico.src}
                  className='
                    w-[24px] h-[24px] rounded-[100%]
                  '
                  alt='coin-ico'
                />
                <span className='text-text-w-def text-[12px] font-bold leading-[18px] tracking-[0.04em] text-left'>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div
          className='
              flex flex-col
          '
        >
          <div className='flex items-center justify-between'>
            <span
              className='
              text-inp-col text-[14px] sm:text-[16px] font-extrabold
              leading-[22px] tracking-[0.04em] text-left
            '
            >
              Amount to Redeem
            </span>
            <span
              className='
              uppercase text-[14px] sm:text-[16px] font-semibold
              leading-[16px] tracking-[0.04em] text-left text-inp-col
            '
            >
              Redeemable
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[12px] sm:text-[16px] text-inp-col font-normal leading-[22px] tracking-def text-left'>
              (Min 20DT)
            </span>
            <span className='text-orange cursor-pointer text-[12px] sm:text-[16px] font-normal leading-[22px] tracking-def '>
              <span
                className='
                  cursor-pointer 
                '
                onClick={handleSetMaxBalancePayout}
              >
                {userBalance} DC
              </span>
              <span
                className='
                  text-[12px] sm:text-[16px] text-inp-col font-light leading-[22px] tracking-def text-left
                  
                '
              >
                {' '}
                ≈ 1.77 $
              </span>
            </span>
          </div>
          <input
            className='
              outline-0 outline-none text-text-w-def mt-[7px] border border-[#252525]
              bg-[linear-gradient(0deg,_#121212,_#121212),_linear-gradient(0deg,_#252525,_#252525)]
              rounded-[8px] text-[14px] sm:text-[16px] leading-[22px] tracking-def font-normal
              text-left flex items-center justify-between sm:text-clip text-ellipsis h-[40px] sm:h-auto
              p-[10px] sm:py-[15px] sm:px-[20px] box-border disable-arrs
            '
            value={valueToPayout}
            inputMode='none'
            onChange={(e: any) => setValueToPayout(e.target.value)}
            type='number'
          />
        </div>
      </div>
      <div className={s.redeem_coin_wallet_address_block}>
        <span className={s.transaction_fee_title}>
          <span>{activeCoin.title}</span> Address
        </span>
        <div className={s.input_common}>
          <span
            className='max-w-[234px] sm:max-w-[auto] text-clip sm:text-ellipsis sm:overflow-visible overflow-hidden
          '
          >
            23sad21sddqwerffs2dwWDfcadweQ23418TZ5d
          </span>
          {/* temp */}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <span
          className='
              text-inp-col text-[14px] sm:text-[16px] font-extrabold leading-[22px] tracking-def
              text-left
              '
        >
          Transaction Fee:
        </span>
        <span
          className='
          text-orange text-[14px] uppercase sm:text-[16px] font-extrabold leading-[22px] tracking-def
              
          '
        >
          1.5
          <span className='!text-inp-col'> {activeCoin.title}</span>
        </span>
      </div>
      <div>
        <div className='flex items-center justify-between'>
          <span
            className='text-inp-col text-[14px] sm:text-[16px] font-extrabold leading-[22px] tracking-def
            text-left'
          >
            Estimate Receive
          </span>
          <span
            className='
              uppercase text-[12px] sm:text-[16px] text-inp-col font-normal
              leading-[22px] tracking-def text-left
            '
          >
            ≈0usdt
          </span>
        </div>
        <div
          className='
          outline-0 outline-none text-text-w-def mt-[7px] border border-[#252525]
          bg-[linear-gradient(0deg,_#121212,_#121212),_linear-gradient(0deg,_#252525,_#252525)]
          rounded-[8px] text-[14px] sm:text-[16px] leading-[22px] tracking-def font-normal
          text-left flex items-center justify-between sm:text-clip text-ellipsis h-[40px] sm:h-auto
          p-[10px] sm:py-[15px] sm:px-[20px] box-border
          '
        >
          Amount
          <img
            src={activeCoin.ico.src}
            className='
              w-[24px] h-[24px] rounded-[100%]
            '
            alt='static-fee-ico'
          />
        </div>
      </div>
      <div
        className='
              bg-[#212121] p-[10px] sm:px-[20px] sm:py-[10px] rounded-[8px]
        '
      >
        <p
          className='
              text-inp-col text-[12px] sm:text-[13px] font-normal
              leading-[16px] sm:leading-[18px] tracking-def text-left
          '
        >
          Disclaimer: <br /> The exact amount you receive is subject to
          real-time exchange rate and the actual send amount at the time
          arrival.
        </p>
      </div>
      <button
        className='
            min-h-[40px] text-[14px] sm:text-[16px] sm:min-h-[45px]
            flex justify-center items-center w-full border border-orange
            bg-[linear-gradient(0deg,_#252019,_#252019),_linear-gradient(0deg,_#ffe09d,_#ffe09d)]
            tracking-def font-bold leading-[16px] text-center text-orange cursor-pointer rounded-[8px]
        '
        onClick={() => setSecurityModalVisibility(true)}
      >
        Redeem
      </button>
    </div>
  )
}
