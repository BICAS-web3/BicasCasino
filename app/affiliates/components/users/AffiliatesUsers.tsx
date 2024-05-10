import {FC} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from '@/components/ui/select'


export const companies = [
    {
        title: 'c_kytmisha',
        id: 'ckytmisha'
    },
    {
        title: 'ghop',
        id: 'ghop'
    },
    {
        title: 'gamebc',
        id: 'gamebc'
    },
]

const sortList = [
    {
        title: "sort1",
        id: 'sort1'
    },
    {
        title: "sort2",
        id: 'sort2'
    },
    {
        title: "sort3",
        id: 'sort3'
    },
]
  
interface AffiliatesUsersProps {}

export const AffiliatesUsers:FC<AffiliatesUsersProps> = () => {
    return (
        <div className='border border-[#3E3E3E] rounded-[5px] p-[20px] min-h-[400px] flex flex-col'>
            <div className='pb-[20px] border-b-[1px] border-[#3E3E3E]'>
                <div className='max-w-[580px] w-full flex items-center gap-[10px]'>
                    <div className='flex flex-col gap-[5px] w-full'>
                        <span className='text-[#fff] text-[14px[ font-bold leading-[18px]'>Campaign name</span>
                        <Select>
                            <SelectTrigger className='h-[43px] w-full p-[8px] bg-[#121212] text-[#7E7E7E] text-[13px] font-normal'>
                            <SelectValue placeholder='Please select country' />
                            </SelectTrigger>
                            <SelectContent className='bg-[#151515]'>
                                {companies.map((item, ind) => (
                                    <SelectItem
                                    className='p-[8px] bg-[#151515]'
                                    value={item.id}
                                    >
                                    {item.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-[5px] w-full'>
                        <span className='text-[#fff] text-[14px[ font-bold leading-[18px]'>Sorted by</span>
                        <Select>
                            <SelectTrigger className='h-[43px] w-full p-[8px] bg-[#121212] text-[#7E7E7E] text-[13px] font-normal'>
                            <SelectValue placeholder='campaign' />
                            </SelectTrigger>
                            <SelectContent className='bg-[#151515]'>
                                {companies.map((item, ind) => (
                                    <SelectItem
                                    className='p-[8px] bg-[#151515]'
                                    value={item.id}
                                    >
                                    {item.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="mt-[20px] h-full flex-1 flex flex-col">
                <div className='flex items-center justify-between '>
                    <span className="text-[17px] font-medium text-[#7E7E7E] leading-[23px]">Username</span>
                    <span className="text-[17px] font-medium text-[#7E7E7E] leading-[23px]">Registered</span>
                    <span className="text-[17px] font-medium text-[#7E7E7E] leading-[23px]">Wager</span>
                    <span className="text-[17px] font-medium text-[#7E7E7E] leading-[23px]">Commission</span>
                </div>
                <div className='flex h-full w-full items-center justify-center flex-1'>
                    <span className='text-[#979797] font-medium text-[17px]'>No Data</span>
                </div>
            </div>
        </div>
    )
}