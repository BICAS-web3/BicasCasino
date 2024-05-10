import { cn } from '@/lib/utils'

import { ScrollArea } from '@/components/ui/scroll-area'
import PlayIco from '@/public/images/misc/play.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { stringRemoveSpacing } from '@/lib/string'
import { usePathname } from 'next/navigation'

export interface Item {
  title: string
  icon: React.ReactNode
}

type Props = {
  data: {
    main: Item
    second: Item
    items: Item[]
  }
  open: boolean
}

const GamesMobileMenu = ({ data, open }: Props) => {
  const params = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'sm:px-4  py-2 min-h-[50px] min-w-[50px] w-[50px] flex justify-start items-center flex-nowrap relative overflow-hidden text-[#979797] hover:text-white',
          open
            ? 'justify-start open bg-[#121212] hover:bg-[#121212] gap-3 rounded-[20px]'
            : 'justify-center flex-col gap-1 rounded-xl bg-transparent hover:bg-transparent'
        )}
      >
        <PlayIco className='object-contain text-[#7E7E7E]' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side='bottom'
        className='h-[calc(100vh_-_112px)] relative top-[7px] sm:top-0 w-full max-w-full flex flex-col justify-between bg-[#121212] border-none rounded-none'
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

export default GamesMobileMenu
