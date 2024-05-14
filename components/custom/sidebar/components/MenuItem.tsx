import { Button } from '@/components/ui/button'
import { stringRemoveSpacing } from '@/lib/string'
import { cn } from '@/lib/utils'
import { ChestModel } from '@/states'
import { SidebarModel } from '@/states'
import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import wheelIco from './icons/wheelAnim.png'
import wheelBranch from './icons/wheelStatic.png'
import { useTranslation } from 'react-i18next'

type ItemProps = {
  title: string
  icon: ReactNode
  color?: string
  id?: string
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
  const router = useRouter()

  const [setOpen] = useUnit([ChestModel.setModalVisibility])

  const handleClick = data => {
    if (href === '/404') return
    if (data.id === 'modal') {
      setOpen(true)
    } else {
      router.push(`/${href === 'home' ? '' : href}`)
    }
  }

  const { t } = useTranslation()

  return (
    <>
      {data.buttons ? (
        <div
          className={cn(
            'flex items-center justify-center flex-nowrap min-h-[50px] min-w-[50px] relative',
            open
              ? 'px-3 gap-3  bg-[#121212] rounded-[20px] min-h-12'
              : 'p-0 gap-1  flex-col rounded-xl'
          )}
        >
          {open && (
            <span className='absolute right-4 top-0 text-[12px] text-[#979797] rotate-2 z-[20]'>
              {t('common.soon')}
            </span>
          )}
          {data.buttons.map((item, index) => (
            <Button
              size={open ? 'sm' : 'icon'}
              key={`sidebar-buttons--${stringRemoveSpacing(
                item.title
              )}_${index}`}
              style={{ background: open ? item.color : '#121212' }}
              // href={`/games/${stringRemoveSpacing(item.title)}`}
              className={cn(
                ' text-slate-50 cursor-default flex items-center gap-2 w-full rounded-xl relative',
                open ? '' : 'aspect-square h-[50px] w-[50px] flex-col gap-0',
                href === '/404' && 'cursor-default',
                href !== '/404' && 'hover:text-white'
                // data.title === 'Bonus' && 'bonus-block'
              )}
            >
              {!open && (
                <div
                  style={{ background: item.color }}
                  className='left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[11px] rounded-full  w-6 h-w-6 aspect-square absolute overflow-hidden'
                />
              )}
              <span className='relative z-10 min-w-[20px]'>
                {item.title === 'Goals' ? (
                  item.icon
                ) : (
                  <div className='relative'>
                    <img
                      src={wheelIco.src}
                      className='animate-spin max-w-[20px] max-h-[20px]'
                      alt='img-wheel'
                    />
                    <img
                      src={wheelBranch.src}
                      className='absolute h-[13px] top-[25%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                      alt='img-palka'
                    />
                  </div>
                )}
              </span>
              <span
                className={cn(
                  'leading-5 font-bold tracking-wide  relative z-10 uppercase',
                  open ? 'text-xs' : 'text-[9px] truncate w-full max-w-12'
                )}
              >
                {t(`sidebar.titles.double.${item.title}`)}
              </span>
            </Button>
          ))}
        </div>
      ) : (
        <Button
          onClick={() => {
            if (href === '/404') {
              return
            }
            handleClick(data)
          }}
          className={cn(
            'w-full flex items-center flex-nowrap text-[#979797] relative overflow-hidden  min-h-[50px] min-w-[50px]',
            open
              ? 'justify-start open rounded-[20px] gap-3 bg-[#121212]'
              : 'justify-center rounded-xl flex-col bg-transparent hover:bg-transparent gap-1',
            // `/${href === 'home' ? '' : href}` === params
            //   ? 'text-[#FFE09D] sidebar-item--active'
            //   : 'text-[#979797]',
            className,
            data.title === 'Bonus' && open && 'bonus-block',
            data.title === 'Home' && 'home-btn',
            href === '/404' && 'cursor-default',
            href !== '/404' && 'hover:text-white'
          )}
          variant='secondary'
          size={open ? 'default' : 'icon'}
        >
          {href === '/404' && open && (
            <span className='absolute right-4 top-1 text-[12px] text-[#979797] rotate-2'>
              {t('common.soon')}
            </span>
          )}
          {data.icon}
          <span
            className={cn(
              'leading-5 text-base font-bold tracking-wide text-nowrap uppercase',
              open ? 'text-base' : 'text-[9px] truncate w-full max-w-12'
            )}
          >
            {t(`sidebar.titles.${data.title}`)}
          </span>
        </Button>
      )}
    </>
  )
}

export default MenuItem
