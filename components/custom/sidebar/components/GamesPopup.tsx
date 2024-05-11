import {FC} from 'react'
import { SGames } from '../data'
import { stringRemoveSpacing } from '@/lib/string'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { LeaderboardSVG } from './icons/games'
import { useUnit } from 'effector-react'
import { ModalsModel, SidebarModel } from '@/states'

interface GamesPopupProps {}

export const GamesPopup:FC<GamesPopupProps> = ({}) => {
    const params = usePathname()
    const [open, isGames] = useUnit([SidebarModel.$open, ModalsModel.$gamesModal])

    return (
        <div className={`fixed ${open ? 'left-0 sm:left-[257px]' : 'left-0 sm:left-[90px]'} ${isGames ? "scale-[1] origin-left opacity-1 visible" : "scale-[0.6] opacity-0 invisible"} transition-all duration-200 flex flex-col justify-between z-[99999] h-[calc(100%_-_112px)] sm:h-[calc(100%_-_60px)] top-[56px] sm:top-[60px] bg-[#121212] w-[225px] p-[0_20px] box-bordeer`}>
          <div>
            {SGames.items.map((item, index) => (
                <div
                // href={`/games/${stringRemoveSpacing(item.title)}`}
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
                </div>
            ))}
          </div>
          <div className='flex h-[72px] items-center'>
            <div
                // href={`/games/${stringRemoveSpacing(data.second.title)}`}
                className={cn(
                    'text-[#979797] hover:text-white w-full flex gap-3 cursor-pointer justify-start items-center flex-nowrap bg-[#121212] relative min-h-12 overflow-hidden rounded-xl',
                )}
            >
            <LeaderboardSVG className='w-5 h-5 object-contain aspect-square' />
            <span className='leading-5 text-base font-bold tracking-wide w-full max-w-36 text-left truncate'>
                LeaderBoard
            </span>
          </div>
        </div>
      </div>
    )
}