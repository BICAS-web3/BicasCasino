'use client'

import { DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import {
  BitcoinSVG,
  BonusCoinSVG,
  DogeSVG,
  DraxMiniSVG,
  EthereumSVG,
  LoaderSVG,
  LtcSVG,
  UsdtSVG,
  WalletSVG
} from '@/components/custom/header/components/icons'
import { Input } from '@/components/ui/input'
import { copyToClipboard, stringRemoveSpacing } from '@/lib/string'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Copy, X } from 'lucide-react'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import QRCode from 'react-qr-code'
import { crypto_data } from '../data'

type CryptoProps = {
  id: string
  network: 'default' | string[]
  label: string
  value: string
  address: string
  icon: React.ReactNode
}

const WaitingModal = () => {
  const [amount, setAmount] = useState<number>(0.002454)
  const [purchaseI, setPurchaseI] = useState<CryptoProps>({
    id: '1',
    network: 'default',
    label: 'BTC',
    value: 'btc',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <BitcoinSVG className='aspect-square object-contain' />
  })
  const [setPurcahseVisibility, bonus, purchase] = useUnit([
    PaymentModel.setPurcahseVisibility,
    PaymentModel.$bonus,
    PaymentModel.$purchase
  ])

  const estimateData = [
    {
      icon: <DraxMiniSVG className='w-6 h-6 aspect-square object-contain' />,
      title: 'DRAX Coin',
      count: purchase.toLocaleString('en-US')
    },
    {
      icon: <BonusCoinSVG className='w-6 h-6 aspect-square object-contain' />,
      title: 'Bonus Coin',
      count: bonus.toLocaleString('en-US')
    }
  ]
  const handleClose = () => {
    setPurcahseVisibility(false)
  }

  const handleSelect = (value: string) => {
    crypto_data.filter((item: any) =>
      item.id === value ? setPurchaseI(item) : null
    )
  }

  return (
    <>
      <DialogHeader>
        <div className='flex justify-between items-center flex-row pr-2'>
          <div className='flex items-center gap-4 text-[#979797]'>
            <WalletSVG className='w-5 aspect-square object-contain' />
            <h5 className='tracking-[4%] font-semibold text-xl leading-7'>
              Purchase
            </h5>
          </div>
          <Button size='icon' variant='ghost' onClick={handleClose}>
            <X className='w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
          </Button>
        </div>
        <Separator />
      </DialogHeader>

      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <h6 className='text-[#979797] text-sm sm:text-lg leading-6 font-semibold tracking-wider'>
            Estimate Receive
          </h6>
          <div className='grid grid-cols-2 py-1.5 px-2.5 gap-1 bg-[#202020] border border-[#252525] rounded-lg min-h-14 box-border'>
            {estimateData.map((item, index) => (
              <div
                key={`purcahse-modal--estimate-${stringRemoveSpacing(
                  item.title
                )}-${index}`}
                className='text-[#979797] text-sm font-light leading-5 tracking-wider'
              >
                {item.title}
                <div className='flex gap-2 items-center text-[#979797] mt-2'>
                  {item.icon}
                  <span className='text-sm sm:text-lg'>{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <h6 className='text-base font-semibold text-[#979797]'>
              Send Amount
            </h6>
            <h6 className='text-base font-semibold text-[#979797]'>
              &asymp;{purchase.toLocaleString().slice(-3)}USDT
            </h6>
          </div>
          <div className='flex gap-0 rounded-lg overflow-hidden border border-[#202020]'>
            <Input
              className='w-full flex-1 bg-[#121212] h-10 rounded-none'
              value={amount}
              readOnly
              type='number'
              placeholder='amount'
            />
            <Select onValueChange={handleSelect}>
              <SelectTrigger className='w-[140px] h-10 rounded-none bg-[#202020]'>
                <span className='mr-2'>{purchaseI.icon}</span>
                <SelectValue
                  placeholder={purchaseI.label}
                  className='uppercase text-xs font-bold text-[#eaeaea]'
                />
              </SelectTrigger>
              <SelectContent className='gap-4'>
                {crypto_data.map((item, index) => (
                  <SelectItem
                    value={item.id}
                    key={index}
                    icon={item.icon}
                    className='py-2 gap-2'
                  >
                    <span className='uppercase text-xs font-bold text-[#eaeaea]'>
                      {item.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            {purchaseI.network === 'default' ? (
              <div className='w-full flex gap-1 items-center justify-center text-base font-semibold text-[#979797]'>
                <span>{purchaseI.label}</span>
                <span>Send Address</span>
              </div>
            ) : (
              <RadioGroup
                defaultValue={purchaseI.network[0]}
                className='flex flex-nowrap gap-2 justify-center w-full'
              >
                {purchaseI.network.map(networkItem => (
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value={networkItem}
                      id={networkItem}
                      className='peer'
                    />
                    <Label
                      htmlFor={networkItem}
                      className={`uppercase text-base font-bold text-[#7E7E7E] cursor-pointer peer-aria-checked:text-[#20E793]`}
                    >
                      {networkItem}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          <div className='flex gap-0 rounded-lg overflow-hidden border border-[#202020]'>
            <Input
              className='w-full flex-1 bg-[#121212] h-10 rounded-none'
              value={purchaseI.address}
              readOnly
              onDoubleClick={() => copyToClipboard(purchaseI.address)}
              type='string'
            />
            <Button
              size='icon'
              variant='ghost'
              onClick={() => copyToClipboard(purchaseI.address)}
            >
              <Copy className='w-4 h-4 aspect-square object-contain' />
            </Button>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <QRCode value={purchaseI.address} className='p-2 bg-white' />
        </div>

        <div className='flex flex-col p-[10px] w-full bg-[#212121] rounded-lg'>
          <h6 className='text-sm text-[#979797] font-medium'>Disclaimer:</h6>
          <p className='text-sm text-[#979797] font-medium'>
            The exact amount you receive is subject to real-time exchange rate
            and the actual send amount at the time arrival.
          </p>
        </div>

        <div className='flex flex-nowrap gap-5'>
          <Button className='flex-1 text-base font-semibold' variant='gray'>
            Waiting for payment
          </Button>
          <Button className='min-w-36' variant='gray'>
            <LoaderSVG className='animate-spin duration-1000' />
          </Button>
        </div>
      </div>
    </>
  )
}

export default WaitingModal
