import { Button } from '@/components/ui/button'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { useCallback } from 'react'
import { draxTypesList } from '../../data'
import { BonusCoinSVG, DraxMiniSVG } from '../../../../icons'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'

const PaymentCrypto = () => {
  const [setPurchaseVisibility, setTotalVisibility, setPurchase, setBonus] =
    useUnit([
      PaymentModel.setPurcahseVisibility,
      PaymentModel.setTotalVisibility,
      PaymentModel.setPurchase,
      PaymentModel.setBonus
    ])
  const handlePurchase = useCallback((price, bonusPrice) => {
    setPurchase(price)
    setBonus(bonusPrice)
    setTotalVisibility(false)
    setPurchaseVisibility(true)
  }, [])
  const { t } = useTranslation()
  return (
    <div className='payment-crypto-list w-full rounded-md border border-none overflow-auto'>
      <div className='grid grid-cols-2 gap-[10px] h-full'>
        {draxTypesList.map((item, ind) => (
          <div
            className='w-full flex flex-col rounded-lg overflow-hidden h-full min-h-56'
            key={ind}
          >
            <div className='bg-[#212121] px-[10px] h-[30px] py-2 flex justify-center items-center gap-2'>
              <DraxMiniSVG className='w-[20px] h-[20px] aspect-square object-contain' />
              <span className='text-text-w-def leading-4 tracking-wider text-left text-[10px] sm:text-[12px] font-medium'>
                {item.usdPrice} {t(`modals.drax`)}
              </span>
            </div>
            <div className='flex flex-col items-center bg-[#0f0f0f] h-full px-5 justify-center gap-2'>
              <BonusCoinSVG className='w-[40px] h-[40px] aspect-square object-contain' />
              <div className='flex flex-col justify-center items-center font-semibold uppercase'>
                <h6 className='text-[12px] sm:text-[16px] font-semibold uppercase'>
                  {item.bonusCoins.toLocaleString('en-US')}
                </h6>
                <span className='text-[12px] sm:text-[16px] font-semibold uppercase text-center'>
                  {t(`modals.bonus`)}
                </span>
              </div>
              <Button
                className='w-full h-[30px] max-w-full text-[16px] border border-[#907640] bg-[#201F1C] hover:bg-[#252019] transition-all duration-300 text-[#FFE09D] font-bold'
                onClick={() => handlePurchase(item.usdPrice, item.bonusCoins)}
              >
                ${item.usdPrice}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentCrypto
