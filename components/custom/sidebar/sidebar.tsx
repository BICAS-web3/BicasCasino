'use client'

import { cn } from '@/lib/utils'
import { SBottomMenu, SGames, STopMenu } from './data'

import { stringRemoveSpacing } from '@/lib/string'
import { SidebarModel } from '@/states'
import { useUnit } from 'effector-react'
import Menu from './components/DropdownMenu'
import MenuItem from './components/MenuItem'
import SidebarSettings from './components/Settings'
import SidebarMobileSettings from './components/settings.mobile'
import { useMediaQuery } from 'usehooks-ts'

const Sidebar = () => {
  const [open, setOpen] = useUnit([SidebarModel.$open, SidebarModel.setOpen])
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <div
      id='sidebar'
      className={cn(
        `bg-[#181818] fixed sm:sticky z-50 left-0 bottom-0 sm:top-16 flex flex-col w-full`,
        open
          ? 'sm:w-[257px] h-[calc(100vh_-_56px)] sm:h-[calc(100vh_-_64px)]'
          : 'sm:w-[90px] h-max sm:h-[calc(100vh_-_64px)]'
      )}
    >
      <div
        className={cn(
          'flex-col py-2 sm:py-4 px-5 h-full',
          open ? 'flex gap-1.5' : 'hidden sm:flex'
        )}
      >
        <div className={cn('flex flex-col', open ? 'gap-.5 sm:gap-1' : '')}>
          {STopMenu.map((item, index) => (
            <MenuItem
              open={open}
              href={stringRemoveSpacing(item.title)}
              data={item}
              key={`sidebar-top-${stringRemoveSpacing(item.title)}-${index}`}
            />
          ))}
        </div>

        <Menu data={SGames} open={open} />

        <div
          className={cn(
            'flex flex-col gap-.5 sm:gap-1 rounded-[20px]',
            open ? 'bg-[#121212]' : 'bg-transparent'
          )}
        >
          {SBottomMenu.map((item, index) => (
            <MenuItem
              open={open}
              href={stringRemoveSpacing(item.title)}
              data={item}
              key={`sidebar-bottom-${stringRemoveSpacing(item.title)}-${index}`}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-1' />
      {isMobile ? (
        <SidebarMobileSettings
          open={open}
          handleAction={() => setOpen(!open)}
        />
      ) : (
        <SidebarSettings open={open} handleAction={() => setOpen(!open)} />
      )}
    </div>
  )
}

export default Sidebar
