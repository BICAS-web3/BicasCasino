'use client'

import { cn } from '@/lib/utils'
import { SBottomMenu, SGames, STopMenu } from './data'

import { stringRemoveSpacing } from '@/lib/string'
import Menu from './components/DropdownMenu'
import MenuItem from './components/MenuItem'
import SidebarSettings from './components/Settings'
import { useUnit } from 'effector-react'
import { SidebarModel } from '@/states'

const Sidebar = () => {
  const [open, setOpen] = useUnit([SidebarModel.$open, SidebarModel.setOpen])
  return (
    <div
      id='sidebar'
      className={cn(
        'h-[calc(100vh_-_64px)] bg-[#181818] sticky left-0 top-16 flex flex-col min-w-max',
        open ? 'w-[257px]' : 'w-[90px]'
      )}
    >
      <div className={cn('flex flex-col py-4 px-5', open ? 'gap-1' : '')}>
        <div className={cn('flex flex-col', open ? 'gap-1' : '')}>
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
            'flex flex-col gap-1 rounded-[20px]',
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
      <div className='flex-1' />
      <SidebarSettings open={open} handleAction={() => setOpen(!open)} />
    </div>
  )
}

export default Sidebar
