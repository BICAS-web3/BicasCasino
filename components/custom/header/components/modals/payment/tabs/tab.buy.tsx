import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { draxTypesList } from '../data'

const TabBuy = () => {
  const [setPurchaseVisibility] = useUnit([PaymentModel.setPurcahseVisibility])
  const handlePurchase = useCallback((price, bonusPrice) => {
    // setPurchaseV(price)
    // setBonusV(bonusPrice)
    // setPurchaseVisibility(true)
  }, [])

  return (
    <div className='flex flex-col gap-5 py-5'>
      <div className='tab-buy--info flex border border-[#ffe09d] rounded-lg relative py-3 px-5'>
        <span className='w-2/3'>
          <span className='font-extrabold text-[#ffe09d]'>DRAX tokens </span>
          won through play can be redeemed for
          <p className='text-[#f7931a] inline'> BTC, LTC</p> and more
        </span>

        <Image
          src='/payment/attentionCoins.webp'
          className='object-contain absolute right-5 top-1/2 -translate-y-1/2'
          width={120}
          height={50}
          alt='coins'
        />
      </div>
      <ScrollArea className='h-[45vh] w-full rounded-md border border-none'>
        <div className='grid grid-cols-2 gap-[10px] h-full'>
          {draxTypesList.map((item, ind) => (
            <div
              className='w-full flex flex-col rounded-lg overflow-hidden h-full min-h-56'
              key={ind}
            >
              <div className='bg-[#212121] px-[10px] py-[8px] flex justify-center items-center gap-[8px]'>
                <Image
                  src='/payment/draxMiniIco.webp'
                  className='aspect-square object-contain'
                  width={25}
                  height={25}
                  alt='mini-drax-static'
                />
                <span className='text-text-w-def leading-[16px] tracking-[0.05em] text-left text-[10px] sm:text-[12px] font-medium'>
                  {item.usdPrice} DRAX Coins
                </span>
              </div>
              <div className='flex flex-col items-center bg-[#0f0f0f] h-full px-5 justify-center gap-2'>
                <Image
                  src='/payment/draxCoin.webp'
                  width={50}
                  height={50}
                  className='aspect-square object-contain'
                  alt='drax-coin-static'
                />
                <div className='flex flex-col justify-center items-center font-semibold uppercase'>
                  <h6 className='text-lg'>{item.bonusCoins}</h6>
                  <span className='text-sm'>bonus coins</span>
                </div>
                <Button
                  className='w-full max-w-full text-sm border border-[#907640] bg-[#252019] hover:bg-[#25201950] transition-all duration-300 text-[#FFE09D] font-bold'
                  onClick={() => handlePurchase(item.usdPrice, item.bonusCoins)}
                >
                  ${item.usdPrice}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <span className='text-[#979797] text-lg text-center'>
        Maximum purchase of $5000 USD per day
      </span>
    </div>
  )
}

export default TabBuy
