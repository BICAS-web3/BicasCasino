import {FC, useState} from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Input } from '@/components/ui/input'

import { ScrollArea } from '@/components/ui/scroll-area'
import DCoin from '@/components/custom/header/components/icons/draxMiniIco.svg'
import BCoin from '@/components/custom/header/components/icons/bonusCoin.svg'

interface StoreTabProps {}

const list = [
    {
        title: 'Redeemable DC',
        ico: <DCoin />,
        id: 'dc'
    },
    {
        title: 'Redeemable BC',
        ico: <BCoin />,
        id: 'bc'
    },
]

export const StoreTab:FC<StoreTabProps> = () => {
  const [coinList, setCoinList] = useState(list[0])


  const handleSelect = (value: string) => {
        console.log('VALUE', value)
  }

    return (
        <div className=''>
            <div>
                <span>Account Balance</span>
                <div className='flex gap-0 rounded-lg overflow-hidden border border-[#202020]'>
                    <Input
                        className='w-full flex-1 bg-[#121212] h-10 rounded-none'
                        type='number'
                        placeholder='amount'
                    />
                     <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                </div>
            </div>
        </div>
    )
}