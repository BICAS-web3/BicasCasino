'use client'

import { DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { OpenLinkSVG } from '@/components/custom/header/components/icons'
import { Input } from '@/components/ui/input'
import { PaymentModel } from '@/states'
import { useUnit } from 'effector-react'

import { Button } from '@/components/ui/button'
import { Check, Copy, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { format } from 'date-fns'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { copyToClipboard, stringRemoveSpacing } from '@/lib/string'

const data = [
  {
    title: 'Invoice amount',
    value: '3.85 EUR',
    variant: 'primary'
  },
  {
    title: 'Exchange rate',
    value: '0.9260 EUR'
  },
  {
    title: 'Payment amount',
    value: '4.1577 USDT'
  },
  {
    title: 'Date / Time',
    value: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }
]

const SuccessModal = () => {
  const [address, setAddress] = useState('37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d')

  const [setPurcahseVisibility] = useUnit([PaymentModel.setPurcahseVisibility])

  const handleClose = () => {
    setPurcahseVisibility(false)
  }
  return (
    <>
      <DialogHeader className='relative gap-5 items-center'>
        <div className='flex justify-center items-center flex-row'>
          <h5 className='tracking-[4%] text-[#20E793] font-semibold text-xl leading-7'>
            Success!
          </h5>
          <Button
            size='icon'
            variant='ghost'
            className='absolute right-0'
            onClick={handleClose}
          >
            <X className='w-5 h-5 aspect-square object-contain text-[#3E3E3E]' />
          </Button>
        </div>
        <Button
          size='sm'
          variant='ghost'
          className='bg-[#25202019] w-max gap-[10px] px-5 py-3 border border-[#907640] text-[#FFE09D]'
          href='#'
        >
          <span className='text-base font-semibold'>tronscan.io</span>
          <OpenLinkSVG className='aspect-square object-contain' />
        </Button>
        <Separator />
      </DialogHeader>

      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <h5 className='text-base font-semibold text-[#979797]'>
              Payment ID:
            </h5>
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

        <div className='flex'>
          <Table>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={`purchase-modal--detectedData-${stringRemoveSpacing(
                    row.title
                  )}-${index}`}
                >
                  <TableCell className='font-medium text-[#979797]'>
                    {row.title}
                  </TableCell>
                  <TableCell
                    className={`text-right text-base ${
                      row.variant === 'primary'
                        ? 'text-[#20E793] font-bold'
                        : 'text-white/90'
                    }`}
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='flex flex-nowrap gap-5'>
          <Button
            onClick={handleClose}
            className='flex-1 text-base font-semibold bg-[#1C2519] text-[#20E793] hover:bg-[#1C2519]'
          >
            Done
          </Button>
          <Button
            onClick={handleClose}
            className='min-w-36 bg-[#1C2519] text-[#20E793] hover:bg-[#1C2519]'
          >
            <Check className='w-5 h-5 aspect-square object-contain' />
          </Button>
        </div>
        <p className='text-xs text-center leading-4 text-[#979797]'>
          The payment will be considered successful when transaction
          is confirmed on the network
        </p>
      </div>
    </>
  )
}

export default SuccessModal
