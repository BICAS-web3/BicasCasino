'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { stringRemoveSpacing } from '@/lib/string'

import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WalletSVG } from '../../icons'
import { TabBuy, TabRedeem, TabTips } from './tabs'
import Billline from './billline'
import { useTranslation } from 'react-i18next'
import TabWithdraw from './tabs/tab.withdraw'
import Arr from '@/public/images/payment/rightArr.svg'
const tabData = ['Buy', 'Redeem', 'Tips']
const tabContent = [<TabBuy />, <TabWithdraw />, <TabTips />]

const Payment = () => {
  const [
    totalVisibility,
    setTotalVisibility,
    isBillline,
    setShowTransaction,
    withdrewCrypto,
    withdrewFiat,
    setWithdrewCrypto,
    setWithdrewFiat,
    buyCrypto,
    buyFiat,
    setBuyCrypto,
    setBuyFiat
  ] = useUnit([
    PaymentModel.$totalVisibility,
    PaymentModel.setTotalVisibility,
    PaymentModel.$isBillline,
    PaymentModel.setShowTransaction,
    PaymentModel.$withdrewCrypto,
    PaymentModel.$withdrewFiat,
    PaymentModel.setWithdrewCrypto,
    PaymentModel.setWithdrewFiat,

    PaymentModel.$buyCrypto,
    PaymentModel.$buyFiat,
    PaymentModel.setBuyCrypto,
    PaymentModel.setBuyFiat
  ])
  const [tab, setTab] = useState(
    stringRemoveSpacing(tabData[0]).toLocaleLowerCase().toLocaleLowerCase()
  )

  const handleClose = () => {
    setTotalVisibility(false)
  }

  const { t } = useTranslation()

  const handleBack = () => {
    if (withdrewFiat) {
      setWithdrewFiat(false)
    } else if (withdrewCrypto) {
      setWithdrewCrypto(false)
    } else if (buyCrypto) {
      setBuyCrypto(false)
    } else if (buyFiat) {
      setBuyFiat(false)
    }
  }

  console.log(withdrewCrypto, withdrewFiat)

  return (
    <Dialog open={totalVisibility} onOpenChange={handleClose}>
      <DialogContent
        customClose
        className={`gap-3 rounded-none !w-full !h-full max-w-[525px]  ${
          tab !== 'tips'
            ? 'max-h-[100%] h-full sm:max-h-[725px]'
            : 'max-h-[100%] h-full sm:h-fit sm:max-h-[725px]'
        } flex flex-col  bg-[#181818] px-[18px] py-5`}
      >
        <DialogHeader className='h-[55px]'>
          <div className='flex justify-between items-center flex-row'>
            <div className='flex items-center gap-4 text-[#979797]'>
              <WalletSVG className='w-5 aspect-square object-contain' />
              <h5 className='tracking-[4%] font-semibold text-xl leading-7'>
                {t(`modals.wallet.payment.Wallet`)}
              </h5>
            </div>
            <div className='flex items-center gap-4 sm:gap-[47px]'>
              {/* <span
                onClick={() => setShowTransaction(true)}
                className='underline cursor-pointer text-[15px] text-[#FFE09D]'
              >
                {t(`modals.wallet.payment.Transactions`)}
              </span> */}
              <div className='flex items-center gap-4'>
                <Button
                  className='relative translate-x-2.5 bg-transparent hover:bg-transparent group'
                  size='icon'
                  onClick={handleClose}
                >
                  <X className='w-5 h-5 duration-500 aspect-square object-contain text-[#3E3E3E] group-hover:text-[#979797]' />
                </Button>
              </div>
            </div>
          </div>
          <Separator />
        </DialogHeader>
        {isBillline ? (
          <Billline />
        ) : (
          <Tabs className='h-full flex flex-col' value={tab}>
            {!withdrewCrypto && !withdrewFiat && !buyCrypto && !buyFiat ? (
              <TabsList className='w-full border border-[#252525] bg-[#121212] py-[5px] h-[50px] px-[5px] rounded-full gap-2'>
                {tabData.map((tabItem, index) => (
                  <TabsTrigger
                    value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                    className='rounded-full 0 text-base font-normal h-10 !p-0 data-[state=active]:font-bold data-[state=active]:bg-[#202020] hover:bg-[#181818] w-full'
                    key={`payment-modal-title--${stringRemoveSpacing(
                      tabItem.toLocaleLowerCase()
                    )}-${index}`}
                    onClick={() =>
                      setTab(stringRemoveSpacing(tabItem).toLocaleLowerCase())
                    }
                  >
                    {t(`modals.wallet.payment.${tabItem}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
            ) : (
              <div className='flex items-center justify-between'>
                <div
                  onClick={handleBack}
                  className='text-[#7E7E7E] text-[18px] cursor-pointer font-medium flex gap-[15px] items-center'
                >
                  <Arr className='rotate-[180deg]' />
                  {t(`modals.back`)}
                </div>
                <span className='text-[18px] font-light text-[#7E7E7E]'>
                  {tab === 'redeem' && withdrewFiat
                    ? 'Withdraw/Bank card' : tab === 'redeem' && withdrewCrypto ? 'Withdraw crypto' : t(`modals.wallet.payment.buy.title`)}
                    
                </span>
              </div>
            )}
            {tabData.map((tabItem, index) => (
              <TabsContent
                key={`payment-modal-content--${stringRemoveSpacing(
                  tabItem.toLocaleLowerCase()
                )}-${index}`}
                value={stringRemoveSpacing(tabItem).toLocaleLowerCase()}
                className='pt-1'
              >
                {tabContent[index]}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Payment
