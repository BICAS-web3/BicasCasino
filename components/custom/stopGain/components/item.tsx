import { FC } from 'react'

import { cn } from '@/lib/utils'

interface IGainItem {
  setValue: (el: number | null) => number | null
  title: string
}

const GainItem: FC<IGainItem> = ({ setValue, title }) => {
  const pickValue = (
    setValue: (value: number | null) => number | null,
    value: string
  ) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setValue(num)
    } else {
      setValue(null)
    }
  }

  return (
    <div className='flex flex-col'>
      <span className='text-[#7e7e7e] text-sm font-semibold'>{title}</span>
      <div
        className={cn(
          'rounded-mb sm:rounded-lp mt-1.5 bg-[#0f0f0f]',
          'px-[10px] py-5 flex justify-start items-center h-10'
        )}
      >
        <input
          type='text'
          className={cn(
            'outline-none w-full bg-inherit border-none',
            'text-[#7e7e7e] text-xs font-bold placeholder:text-[#7E7E7E]'
          )}
          placeholder='No limit'
          onChange={e => pickValue(setValue, e.target.value)}
        />
      </div>
    </div>
  )
}

export default GainItem
