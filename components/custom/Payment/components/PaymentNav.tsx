import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC } from 'react'

interface PaymentNavProps {}

export const PaymentNav: FC<PaymentNavProps> = () => {
  const [storeType, setStoreType] = useUnit([
    PaymentModel.$storeType,
    PaymentModel.setStoreType
  ])

  return (
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
  )
}
