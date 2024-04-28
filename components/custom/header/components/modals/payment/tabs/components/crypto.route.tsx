import { FC } from 'react'

interface ICryptoRoute {
  title: string
  text: string
  className?: string
  onClick?: () => void
  isCrypto?: boolean
}

const CryptoRoute: FC<ICryptoRoute> = ({
  text,
  title,
  className,
  isCrypto,
  onClick
}) => {
  return (
    <div
      className={`flex flex-col relative rounded-[8px] overflow-hidden p-5 pb-6 w-full ${
        isCrypto && ''
      } ${className}`}
    >
      {isCrypto ? (
        <img
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full  h-full object-cover'
          src='/images/payment/crypto.png'
          alt=''
        />
      ) : (
        <img
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full  h-full object-cover'
          src='/images/payment/card.png'
          alt=''
        />
      )}

      <h2 className='relative text-xl font-medium leading-[27px]'>{title}</h2>
      <p className='relative max-w-[153px] text-[13px] text-[#AAAAAA] mt-[5px]'>
        {text}
      </p>
      <button
        className={`relative py-2 px-[53px] w-fit h-fit mt-[38px] text-[12px] text-white overflow-hidden ${
          isCrypto ? 'btn_2' : 'btn'
        }`}
        onClick={onClick}
      >
        Continue
      </button>
    </div>
  )
}

export default CryptoRoute
