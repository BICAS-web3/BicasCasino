import { Button } from '@/components/ui/button'
import { stringRemoveSpacing } from '@/lib/string'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type ItemProps = {
  title: string
  icon: ReactNode
  color?: string
}

type Props = {
  href: string
  open: boolean
  data: ItemProps & {
    buttons?: ItemProps[]
  }
  className?: string
}

const MenuItem = ({ href, data, open, className }: Props) => {
  const params = usePathname()
  return (
    <>
      {data.buttons ? (
        <div
          className={cn(
            'flex items-center justify-center flex-nowrap min-h-[50px] min-w-[50px]',
            open
              ? 'px-3 gap-3  bg-[#121212] rounded-[20px] min-h-12'
              : 'p-0 gap-1  flex-col rounded-xl'
          )}
        >
          {data.buttons.map((item, index) => (
            <Button
              size={open ? 'sm' : 'icon'}
              key={`sidebar-buttons--${stringRemoveSpacing(
                item.title
              )}_${index}`}
              style={{ background: open ? item.color : '#121212' }}
              href={`/games/${stringRemoveSpacing(item.title)}`}
              className={cn(
                'hover:text-white text-slate-50 flex items-center gap-2 w-full rounded-xl relative',
                open ? '' : 'aspect-square h-[50px] w-[50px] flex-col gap-0'
              )}
            >
              {!open && (
                <div
                  style={{ background: item.color }}
                  className='left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[11px] rounded-full  w-6 h-w-6 aspect-square absolute overflow-hidden'
                />
              )}
              <span className='relative z-10'>{item.icon}</span>
              <span
                className={cn(
                  'leading-5 font-bold tracking-wide relative z-10 uppercase',
                  open ? 'text-xs' : 'text-[9px] truncate w-full max-w-12'
                )}
              >
                {item.title}
              </span>
            </Button>
          ))}
        </div>
      ) : (
        <Button
          href={`/${href === 'home' ? '' : href}`}
          className={cn(
            'w-full flex items-center flex-nowrap relative overflow-hidden hover:text-white min-h-[50px] min-w-[50px]',
            open
              ? 'justify-start open rounded-[20px] gap-3 bg-[#121212]'
              : 'justify-center rounded-xl flex-col bg-transparent hover:bg-transparent gap-1',
            `/${href === 'home' ? '' : href}` === params
              ? 'text-[#FFE09D] sidebar-item--active'
              : 'text-[#979797]',
            className
          )}
          variant='secondary'
          size={open ? 'default' : 'icon'}
        >
          {data.icon}
          <span
            className={cn(
              'leading-5 text-base font-bold tracking-wide uppercase',
              open ? 'text-base' : 'text-[9px] truncate w-full max-w-12'
            )}
          >
            {data.title}
          </span>
        </Button>
      )}
    </>
  )
}

export default MenuItem
