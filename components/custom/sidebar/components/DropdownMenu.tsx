import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { stringRemoveSpacing } from '@/lib/string'
import { usePathname } from 'next/navigation'

type Props = {
  data: any
  open: boolean
}

const Menu = ({ data, open }: Props) => {
  const params = usePathname()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'px-4 py-2 min-h-[50px] min-w-[50px] w-full flex justify-start items-center flex-nowrap relative overflow-hidden text-[#979797] hover:text-white',
          open
            ? 'justify-start open bg-[#121212] hover:bg-[#121212] gap-3 rounded-[20px]'
            : 'justify-center flex-col gap-1 rounded-xl bg-transparent hover:bg-transparent'
        )}
      >
        <span>{data.main.icon}</span>
        <div className='flex items-center gap-4'>
          <span
            className={cn(
              'leading-5 text-base font-bold tracking-wide truncate uppercase',
              open ? 'text-base' : 'text-[9px]'
            )}
          >
            {data.main.title}
          </span>
          {open ? <ChevronRight className='w-5 aspect-square' /> : null}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        side='right'
        className='h-[calc(100vh_-_64px)] flex flex-col justify-between w-56 bg-[#121212] border-none rounded-none'
      >
        <ScrollArea className='h-[calc(100vh_-_148px)] w-full rounded-md pr-4'>
          {data.items.map((item, index) => (
            <DropdownMenuItem
              href={`/games/${stringRemoveSpacing(item.title)}`}
              className={cn(
                'w-full flex gap-3 cursor-pointer justify-start items-center flex-nowrap bg-[#121212] relative min-h-12 overflow-hidden rounded-xl',
                `/${stringRemoveSpacing(item.title)}` === params
                  ? 'text-[#FFE09D] hover:text-white sidebar-item--active'
                  : 'text-[#979797] hover:text-white'
              )}
              key={`sidebar-games-${stringRemoveSpacing(item.title)}-${index}`}
            >
              <span>{item.icon}</span>
              <span className='leading-5 text-base font-bold tracking-wide w-full max-w-36 text-left truncate'>
                {item.title}
              </span>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
        <div className='flex h-[72px] items-center p-2'>
          <DropdownMenuItem
            href={`/games/${stringRemoveSpacing(data.second.title)}`}
            className={cn(
              'w-full flex gap-3 cursor-pointer justify-start items-center flex-nowrap bg-[#121212] relative h-12 overflow-hidden rounded-xl',
              `/${
                data.second.title.toLocaleLowerCase() === 'home'
                  ? ''
                  : stringRemoveSpacing(data.second.title)
              }` === params
                ? 'text-[#FFE09D] hover:text-white sidebar-item--active'
                : 'text-[#979797] hover:text-white'
            )}
          >
            <span>{data.second.icon}</span>
            <span className='leading-5 text-base font-bold tracking-wide w-full max-w-36 text-left truncate'>
              {data.second.title}
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
