import { stringRemoveSpacing } from '@/lib/string'
import { UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'

const data = {
  titles: ['credit', 'bet'],
  values: [
    {
      value: 8181,
      currency: 'dc'
    },
    {
      value: 10,
      currency: 'dc'
    }
  ]
}

const GameCreditBet = () => {
  const [cryptoValue, balance, isDrax] = useUnit([
    WagerModel.$cryptoValue,
    UserModel.$balance,
    UserModel.$isDrax
  ])
  const { t } = useTranslation()
  return (
    <div className='grid-cols-2 gap-2 row-start-3 col-start-1 col-end-3 m-[20px_auto] tbs:m-[20px_auto_0_auto] hidden sm:grid min-w-[100px] w-fit -order-10 sm:order-none'>
      <div className='flex flex-col gap-1'>
        {data.titles.map((item, index) => (
          <span
            key={`game-creditbet-title--${stringRemoveSpacing(item)}-${index}`}
            className='text-right block font-extrabold leading-4 uppercase text-[#7E7E7E] tracking-[4%] text-sm'
          >
            {t(`pages.games.${item}`)}
          </span>
        ))}
      </div>
      <div className='flex flex-col gap-1 min-w-[80px]'>
        <div className='flex flex-nowrap gap-1 items-center justify-start'>
          <span className='leading-4 text-[#7e7e7e] tracking-[4%] text-sm font-medium nowrap'>
            {balance.toFixed(2)}
          </span>
          <span className='text-[10px] text-[#7e7e7e] leading-3 uppercase'>
            {isDrax ? 'dc' : 'bc'}
          </span>
        </div>
        <div className='flex flex-nowrap gap-1 items-center justify-start'>
          <span className='leading-4 text-[#7e7e7e] tracking-[4%] text-sm font-medium nowrap'>
            {cryptoValue}
          </span>
          <span className='text-[10px] text-[#7e7e7e] leading-3 uppercase'>
            {isDrax ? 'dc' : 'bc'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GameCreditBet
