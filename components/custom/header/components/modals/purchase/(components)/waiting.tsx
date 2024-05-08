'use client'

import { DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import {
  BonusCoinSVG,
  DraxMiniSVG,
  LoaderSVG,
  WalletSVG
} from '@/components/custom/header/components/icons'
import { Input } from '@/components/ui/input'
import { copyToClipboard, stringRemoveSpacing } from '@/lib/string'
import { PaymentModel, RegistrModel } from '@/states'
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
import { useEffect, useState } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { coins_list, networks_list } from '../data'

import * as api from '@/api'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { InvoiceCreate, InvoicePriceItem, Rate } from '@/types/payment.types'
import Image from 'next/image'

const WaitingModal = () => {
  const [address, setAddress] = useState('')
  const [priceList, setPriceList] = useState<any>([])
  const [coinList, setCoinList] = useState(coins_list[0])

  const [invoiceCreate, setInvoiceCreate] = useState<null | InvoiceCreate>(null)
  const [showNetworks, setShowNetworks] = useState(false)

  const [setPurcahseVisibility, bonus, purchase, access_token] = useUnit([
    PaymentModel.setPurcahseVisibility,
    PaymentModel.$bonus,
    PaymentModel.$purchase,
    RegistrModel.$access_token
  ])
  const [amount, setAmount] = useState<number>(0)

  const estimateData = [
    {
      icon: <DraxMiniSVG className='w-[20px] h-[20px] aspect-square object-contain' />,
      title: 'DRAX Coin',
      count: purchase.toLocaleString('en-US')
    },
    {
      icon: <BonusCoinSVG className='w-[20px] h-[20px] aspect-square object-contain' />,
      title: 'Bonus Coin',
      count: bonus.toLocaleString('en-US')
    }
  ]

  const handleClose = () => {
    setPurcahseVisibility(false)
  }

  const handleSelect = (value: string) => {
    coins_list.filter((item: any) => {
      if (item.title === value) {
        setCoinList(item)
        switch (item.title) {
          case 'USDT':
            setShowNetworks(true)
            break
          case 'USDC':
            setShowNetworks(true)
            break
          case 'TUSD':
            setShowNetworks(true)
            break
          default:
            setShowNetworks(false)
            break
        }
      } else {
        null
      }
    })
  }

  const [networkActive, setNetworkActive] = useState<'ETHEREUM' | 'TRON'>(
    'ETHEREUM'
  )

  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const response = await api.invoiceCreate({
          amount: purchase,
          currency:
            coinList.title === 'USDT' ||
            coinList.title === 'USDC' ||
            coinList.title === 'TUSD'
              ? `${coinList.title}_${networkActive}`
              : coinList.title,
          bareer: access_token
        })
        if (response.status === 'OK') {
          setInvoiceCreate(response.body as any)
          setAddress((response.body as any)?.pay_url)
        } else {
          console.error('Error:', response.body)
        }
      })()
    }
  }, [access_token, purchase, coinList, networkActive])

  const handleGetList = async () => {
    const response: any = await api.getInvoicePrices({
      bareer: access_token
    })

    if (response.status === 'OK') {
      setPriceList(response.body.prices)
    } else {
      console.error('Error:', response.body)
    }
  }

  useEffect(() => {
    !!access_token && handleGetList()
  }, [access_token])

  useEffect(() => {
    if (priceList) {
      const amount =
        purchase /
        priceList
          .find((item: InvoicePriceItem) => item.monetary === coinList.title)
          ?.rates.find((el: Rate) => el.fiatCurrency === 'USD').rate

      setAmount(amount)
    }
  }, [priceList, coinList])

  const [ercActive, setErcActive] = useState(true)
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
          <div className='grid grid-cols-2 h-[55px] p-[5px_10px] gap-1 bg-[#202020] border border-[#252525] rounded-lg min-h-14 box-border'>
            {estimateData.map((item, index) => (
              <div
                key={`purcahse-modal--estimate-${stringRemoveSpacing(
                  item.title
                )}-${index}`}
                className='text-[#979797] text-sm font-light leading-5 tracking-wider'
              >
                {item.title}
                <div className='flex gap-2 h-[20px] items-center text-[#979797] mt-1'>
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
              &asymp;{purchase.toLocaleString('en-US')}USDT
            </h6>
          </div>
          <div className='flex gap-0 rounded-lg overflow-hidden border border-[#202020]'>
            <Input
              className='w-full flex-1 bg-[#121212] h-10 rounded-none'
              value={amount || 0}
              readOnly
              type='number'
              placeholder='amount'
            />
            <Select onValueChange={handleSelect}>
              <SelectTrigger className='w-40 h-10 rounded-none bg-[#202020]'>
                <span className='mr-2'>{coinList.icon}</span>
                <SelectValue
                  placeholder={coinList.title.split('_')[0]}
                  className='uppercase text-xs font-bold text-[#eaeaea]'
                />
              </SelectTrigger>
              <SelectContent className='gap-4 bg-[#202020]'>
                <ScrollArea className='h-[160px]' variant='ghost'>
                  {coins_list.map((item, index) => (
                    <SelectItem
                      value={item.title}
                      key={index}
                      icon={item.icon}
                      className='py-2 gap-2'
                    >
                      <span className='uppercase text-xs font-bold text-[#eaeaea]'>
                        {item.title.split('_')[0]}
                      </span>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            {(coinList.title === 'USDT' ||
              coinList.title === 'USDC' ||
              coinList.title === 'TUSD') && (
              <RadioGroup
                defaultValue={networks_list[0].id}
                onValueChange={value => {
                  setNetworkActive(value as any)
                  if (value === 'TRON') {
                    setErcActive(false)
                  } else {
                    setErcActive(true)
                  }
                }}
                className='flex flex-nowrap gap-2 justify-center w-full'
              >
                {networks_list.map((networkItem, index) => (
                  <div
                    className='flex items-center space-x-2'
                    key={`purchase-modal--networks-${networkItem.id.toLocaleLowerCase()}-${index}`}
                  >
                    <RadioGroupItem
                      value={networkItem.id}
                      id={networkItem.id}
                      className='peer'
                    />
                    <Label
                      htmlFor={networkItem.id}
                      className='uppercase text-base font-bold text-[#7E7E7E] cursor-pointer peer-aria-checked:text-[#20E793]'
                    >
                      {networkItem.title}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            <div className='w-full flex gap-1 items-center justify-center text-base font-semibold text-[#979797]'>
              <span>{coinList.title.split('_')[0]}</span>
              <span>Send Address</span>
            </div>
          </div>

          <div className='flex gap-0 rounded-lg overflow-hidden border border-[#202020]'>
            <Input
              className='w-full flex-1 bg-[#121212] h-10 rounded-none'
              value={address}
              readOnly
              onDoubleClick={() => copyToClipboard(address)}
              type='string'
            />
            <Button
              size='icon'
              variant='ghost'
              onClick={() => copyToClipboard(address)}
            >
              <Copy className='w-4 h-4 aspect-square object-contain' />
            </Button>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          {invoiceCreate?.id ? (
            <Image
              src={`https://rew.greekkeepers.io/api/invoice/qr/${invoiceCreate.id}`}
              alt='qr-code / address'
              width={184}
              height={184}
              className='aspect-square object-contain'
            />
          ) : (
            <Skeleton className='w-[184px] h-[184px] aspect-square object-contain' />
          )}
        </div>

        <div className='flex flex-col p-2.5 w-full bg-[#212121] rounded-lg'>
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
