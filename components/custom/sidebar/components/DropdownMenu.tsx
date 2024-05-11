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
import React, { useState } from 'react'
import { GamesSVG } from './icons/top'
import { useUnit } from 'effector-react'
import { ModalsModel } from '@/states'

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
const Menu = ({ data, open }: Props) => {
  const params = usePathname()
  const [setOpen, openGames] = useUnit([
    ModalsModel.setGamesModal,
    ModalsModel.$gamesModal
  ])

  return (

    <div onClick={() => setOpen(!openGames)} className={`text-center ${open ? 'bg-[#121212]' : 'bg-inherit rounded-none p-[0.5rem_0] justify-center'} py-2 min-h-[50px] cursor-pointer p-[0.5rem_1rem] font-bold uppercase min-w-[50px] rounded-[20px] w-full flex items-center flex-nowrap relative overflow-hidden bg-[#121212] text-[#979797] hover:text-white`}>
      <div className={`flex items-center ${open ? 'flex-row gap-[0.75rem]' : 'flex-col text-[9px] gap-[0.5rem]'}`}>
        <GamesSVG className='w-5 h-5 object-contain aspect-square' />
        Games
      </div>
      {
        open && <ChevronRight className={`w-5 ml-[10px] ${openGames ? 'ml-[auto]' : 'ml-0'} transition-all duration-300 aspect-square`} />
      }
    </div>
  )
}

export default Menu
