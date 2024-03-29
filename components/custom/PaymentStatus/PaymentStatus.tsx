import { FC, useState } from 'react'
import closeIco from '@/public/payment/closeIco.webp'
import linkIco from '@/public/payment/linkIco.png'
import allowArr from '@/public/payment/allowIco.png'
import copyIco from '@/public/payment/copyIco.png'
import clsx from 'clsx'
import { WaitIco } from '@/src/shared/SVGs/WaitIco'
// import { PaymentCopied } from '../PaymentCopied/PaymentCopied'

const tableInfo = [
  {
    title: 'Invoice amount',
    content: 'none'
  },
  {
    title: 'Exchange rate',
    content: 'none'
  },
  {
    title: 'Payment amount',
    content: 'none'
  },
  {
    title: 'Date / Time',
    content: 'none'
  }
]

interface PaymentStatusProps {}

export const PaymentStatus: FC<PaymentStatusProps> = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState(tableInfo)

  const [activeCopied, setActiveCopied] = useState(false)

  return (
    <div
      className='
        p-[16px] sm:p-[30px] box-border flex sm:block flex-col rounded-0 sm:rounded-[12px] bg-black-def
        relaitve h-full sm:h-auto w-full max-w-[660px] 
      '
    >
      {/* <PaymentCopied active={activeCopied} setDisable={setActiveCopied} /> */}
      <img
        src={closeIco.src}
        className={
          'w-[24px] h-[24px] cursor-pointer absolute top-[30px] right-[40px]'
        }
        alt='close-ico'
      />
      <div
        className='
          flex text-center flex-col items-center gap-[20px] pb-[20px] border-b border-[#252525]
        '
      >
        <span
          // className={clsx(s.payment_status_title, isSuccess && s.success)}
          className={`
            text-[20px] sm:text-[24px] font-semibold leading-[33px] tracking-[0.04em] text-[#ffa800]
            ${isSuccess && 'text-[#20e793]'}
          `}
        >
          {isSuccess ? 'Success!' : 'Payment detected'}
        </span>
        <div
          className='border border-orange rounded-[5px] flex justify-center items-center
          gap-[10px] w-[160px] h-[40px] px-[10px] cursor-pointer text-orange text-[16px] font-bold
          leading-[16px] tracking-[0.04em] text-center
          '
        >
          tronscan.io
          <img src={linkIco.src} alt='link-ico' />
        </div>
      </div>
      <div
        className='
          mt-[10px] sm:mt-[20px] gap-[4px] sm:gap-[20px] pb-[20px] border-b border-[#252525]
          flex flex-col
        '
      >
        <span
          className='
            text-white text-[14px] sm:text-[24px] font-semibold leading-[33px] tracking-[0.04em]
            text-start
          '
        >
          Payment ID:
        </span>
        <div
          className='
            h-[40px] sm:h-[40px] text-[14px] sm:text-[18px] w-full box-border border rounded-[5px] bg-[#121212]
            px-[20px] py-[15px] text-text-w-def font-normal leading-[25px] tracking-[0.04em] flex items-center justify-between
          '
        >
          payment id{' '}
          <img
            src={copyIco.src}
            alt='copy-ico'
            onClick={() => setActiveCopied(true)}
          />
        </div>
      </div>
      <div
        className='
          mt-[10px] sm:mt-[20px] gap-[20px] flex flex-col
          pb-[20px] border-b border-[#252525] 
        '
      >
        {paymentInfo.map((item, ind) => (
          <div
            // className={clsx(s.payment_info_item, s.success_price)}
            className={`
            flex items-center justify-between
          `}
            key={ind}
          >
            <span
              className='
                text-inp-col text-[14px] sm:text-[18px] font-normal leading-[25px] tracking-[0.04em] text-left
              '
            >
              {item.title}
            </span>
            <span
              className={`  
              ${ind === 0 && '!text-[#20e793]'}
              text-white text-[14px] sm:text-[18px] font-normal leading-[25px] tracking-[0.04em] text-left
              `}
            >
              {item.content}
            </span>
          </div>
        ))}
      </div>
      <div
        className='
          flex-1 flex sm:block flex-col-reverse
        '
      >
        <div
          // className={clsx(
          //   s.pending_confirm_block,
          //   isSuccess && s.succes_pending
          // )}
          className={`
            mt-[10px] sm:mt-[20px] flex gap-[10px] 
          `}
        >
          <div
            className='
              p-[10px] sm:p-[15px_20px_15px_20px] text-[14px] sm:text-[16px]
              w-full text-[#ffa800] bg-[#252019] font-medium leading-[24px] tracking-[0.04em]
              text-left rounded-[8px]
            '
          >
            Pending confirmation
          </div>
          <div
            className='
              w-[150px] flex justify-center items-center bg-[#252019] rounded-[8px]
              
            '
          >
            {isSuccess ? (
              <img src={allowArr.src} alt='' />
            ) : (
              <WaitIco orange={true} />
            )}
          </div>
        </div>
        <div
          className='
              text-center text-inp-col text-[12px] sm:text-[18px]
              mt-[20px] font-light leading-[25px] tracking-[0.04em]
          '
        >
          The payment will be considered successful when transaction is
          confirmed on the network
        </div>
      </div>
    </div>
  )
}
