import { cn } from '@/lib/utils'

import { ArrSVG } from './icons'

const GameNavigation = () => {
  return (
    <div
      className={cn(
        'flex items-center gap-[10px] ml-auto',
        'text-grey-acc font-bold'
      )}
    >
      Show all
      <div className='hidden sm:flex gap-[5px]'>
        <div
          className={cn(
            'flex items-center justify-center w-[26px] h-[26px] duration-500 group',
            'rounded-[5px] bg-[#212121] hover:bg-[#282828] cursor-pointer prev'
          )}
        >
          <ArrSVG className='rotate-180 duration-500 text-[#464646] group-hover:text-[#979797]' />
        </div>
        <div
          className={cn(
            'flex items-center justify-center w-[26px] h-[26px] duration-500',
            'rounded-[5px] bg-[#212121] hover:bg-[#282828] cursor-pointer next'
          )}
        >
          <ArrSVG className='duration-500 text-[#464646] group-hover:text-[#979797]' />
        </div>
      </div>
    </div>
  )
}

export default GameNavigation
