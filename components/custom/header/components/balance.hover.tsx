import { FC } from 'react'
import { BonusCoinSVG, DraxMiniSVG } from './icons'
import { useUnit } from 'effector-react'
import { UserModel } from '@/states'
import { useTranslation } from 'react-i18next'

interface BalanceHoverProps {
  balance: any
}

export const BalanceHover: FC<BalanceHoverProps> = ({ balance }) => {
  const zero = 0

  const { t } = useTranslation()

  return (
    <div
      className={`balance-hover absolute w-[265px] sm:w-[330px] overflow-hidden left-[auto] sm:right-[auto] right-[-30px] xxxs:right-0 sm:left-[50%] sm:translate-x-[-50%] top-[calc(100%_+_20px)] z-[99999] bg-[#181818] rounded-[20px] transition-all duration-200 border border-[#212121] p-[14px_20px]`}
    >
      <div className='absolute top-[50%] translate-y-[-50%] right-[-100px] rounded-[50%] blur-[50px] w-[200px] h-[200px] bg-[#F3AC6B1A] mix-blend-hard-light '></div>
      <div className='flex flex-col items-center justify-center gap-[5px] mb-[10px] pb-[10px] border-b-[1px] border-[#2e2e2e]'>
        <span className='text-[13px] font-semibold text-[#fff] leading-[17px]'>
          {t(`modals.balance.bonus`)}
        </span>
        <div className='flex gap-[5px] items-center'>
          <BonusCoinSVG className='w-[20px] aspect-square object-contain' />
          <span className='text-[14px] leading-[19px] flex gap-[5px] items-end'>
            <span className='uppercase text-[12px] leading-[18px]'>bc</span>
            {balance
              ? Number(
                  balance.amounts.find(item => item.name === 'DraxBonus')
                    ?.amount
                ).toFixed(2)
              : zero.toFixed(3)}
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-[5px] mb-[10px] pb-[10px] border-b-[1px] border-[#2e2e2e]'>
        <span className='text-[13px] font-semibold text-[#fff] leading-[17px]'>
          {t(`modals.balance.coin`)}
        </span>
        <div className='flex gap-[5px] items-center'>
          <DraxMiniSVG className='w-[20px] aspect-square object-contain' />
          <span className='text-[14px] leading-[19px] flex gap-[5px] items-end'>
            <span className='uppercase text-[12px] leading-[18px]'>bc</span>
            {balance
              ? Number(
                  balance.amounts.find(item => item.name === 'Drax')?.amount
                ).toFixed(2)
              : zero.toFixed(3)}
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-[5px] mb-[10px] pb-[10px] border-b-[1px] border-[#2e2e2e]'>
        <span className='text-[13px] font-semibold text-[#fff] leading-[17px]'>
          {t(`modals.balance.redeem`)}
        </span>
        <div className='flex gap-[5px] items-center'>
          <DraxMiniSVG className='w-[20px] aspect-square object-contain' />
          <span className='text-[14px] leading-[19px] flex gap-[5px] items-end'>
            <span className='uppercase text-[12px] leading-[18px]'>bc</span>
            {balance
              ? Number(
                  balance.amounts.find(item => item.name === 'Drax')?.amount
                ).toFixed(2)
              : zero.toFixed(3)}
          </span>
        </div>
      </div>
      <p className='text-[#979797] text-[12px] font-normal text-center'>
        {t(`modals.balance.text`)}
      </p>
    </div>
  )
}
