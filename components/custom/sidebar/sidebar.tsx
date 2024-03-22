'use client'

import { useEffect, useState } from 'react'

import usaIco from '@/public/countries_images/usaIco.svg'
import uaIco from '@/public/countries_images/uaIco.svg'
import indIco from '@/public/countries_images/indiaIco.svg'
import chinaIco from '@/public/countries_images/chinaIco.svg'
import portugalIco from '@/public/countries_images/portugalIco.svg'
import spainIco from '@/public/countries_images/spainIco.svg'
import ClosedSideBar from './components/closed.sidebar'
import OpenedSideBar from './components/opened.sidebar'
import { cn } from '@/lib/utils'
import { CloseSb, MoonSVG, SunSVG, UsaIco } from './components/icons'
const languagesList = [
  {
    ico: usaIco,
    id: 'usa',
    title: 'en',
    mobTitle: 'english'
  },
  {
    ico: uaIco,
    id: 'ua',
    title: 'ua',
    mobTitle: 'ukranian'
  },
  {
    ico: indIco,
    id: 'india',
    title: 'in',
    mobTitle: 'indian'
  },
  {
    ico: chinaIco,
    id: 'china',
    title: 'cn',
    mobTitle: 'chinise'
  },
  {
    ico: portugalIco,
    id: 'portugal',
    title: 'pt',
    mobTitle: 'portuguese'
  },
  {
    ico: spainIco,
    id: 'spain',
    title: 'es',
    mobTitle: 'spanish'
  }
]
export interface SideBarProps {
  activePage: string | undefined
}

export const gamesList = [
  {
    title: 'Coinflip',
    icon: 'coin',
    link: '/games/CoinFlip'
  },
  {
    title: 'Dice',
    icon: 'dice',
    link: '/games/Dice'
  },
  {
    title: 'Rock paper scissors',
    icon: 'rps',
    link: '/games/RockPaperScissors'
  },
  {
    title: 'Mines',
    icon: 'mines',
    link: '/games/Mines'
  },
  {
    title: 'Plinko',
    icon: 'plinko',
    link: '/games/Plinko'
  },
  {
    title: 'Rocket',
    icon: 'rocket',
    link: '/games/Rocket'
  },
  {
    title: 'Wheel of Fortune',
    icon: 'wheelFortune',
    link: '/games/WheelFortune'
  },
  {
    title: 'Apples',
    icon: 'apples',
    link: '/games/Apples'
  },
  {
    title: 'Race',
    icon: 'race',
    link: '/games/Race'
  },
  {
    title: 'Cars',
    icon: 'cars',
    link: '/games/Cars'
  },
  {
    title: 'Thimbles',
    icon: 'thimbles',
    link: '/games/Thimbles'
  }
]

const SideBar = () => {
  const [activeTheme, setActiveTheme] = useState('dark')
  const [activeLanguage, setActiveLanguage] = useState(languagesList[0])
  const [activeLanguagesList, setActiveLanguagesList] = useState(languagesList)
  // const handleChangeTheme = () => {
  //   activeTheme === 'dark' ? setActiveTheme('light') : setActiveTheme('dark')
  // }
  //   const [isOpen, currentPick, closeSb, openSb, languageMobileBlock] = useUnit([
  //     SideBarModel.$isOpen,
  //     SideBarModel.$currentPick,
  //     SideBarModel.Close,
  //     SideBarModel.Open,
  //     SideBarModel.$mobileLanguageBlock
  //   ])
  const languageMobileBlock = false
  useEffect(() => {
    if (!languageMobileBlock) {
      const el = document.getElementById('sidebar')
      // el?.classList.remove(s.scrollDisable)
    }
  }, [languageMobileBlock])

  const [sidebarScroll, setSidebarScroll] = useState(0)

  useEffect(() => {
    const el = document.getElementById('sidebar_id')

    const handleScroll = (e: any) => {
      setSidebarScroll(e.target.scrollTop)
    }

    el?.addEventListener('scroll', handleScroll)

    return () => {
      el?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setActiveLanguagesList(
      languagesList.filter(item => item.id !== activeLanguage.id)
    )
  }, [activeLanguage])

  const [open, setOpen] = useState(true)

  const handleSidebar = () => {
    setOpen(prev => !prev)
  }
  return (
    <div
      className={cn(
        'h-full bg-[#181818] fixed justify-between min-h-screen duration-500 flex flex-col',
        open ? 'w-[257px]' : 'w-[90px]'
      )}
      id='sidebar'
    >
      <div
        className={
          's.side_bar_upper overflow-auto bg-[#181818] w-full pt-[75px] pb-[30px] flex flex-col items-center overflow-y-scroll scroll overflow-x-hidden relative'
        }
        id='sidebar_id'
        style={{ '--st': `${sidebarScroll}px` } as any}
      >
        {open ? <OpenedSideBar /> : <ClosedSideBar />}
      </div>

      <div
        className={`min-h-[70px] border-t border-[#121212] w-full mt-5 flex px-5 justify-between items-center bg-[#121212] ${
          !open && 'px-[30px] py-5 min-h-[170px] grid grid-cols-1 gap-[15px]'
        }`}
      >
        <div className='{s.themes_block} h-10 flex items-center rounded-[12px] border border-[#202020] '>
          <div
            className={`flex sm:hidden h-[50px] px-4 rounded-[5px] py-5 w-full items-center justify-between bg-[#121212] ${
              activeTheme === 'dark' && 's.active bg-[#202020]'
            }`}
          >
            <MoonSVG />
          </div>
          <div
            className={`flex sm:hidden h-[50px] px-4 rounded-[5px] py-5 w-full items-center justify-between bg-[#121212] ${
              activeTheme === 'light' && 'bg-[#202020]'
            }`}
          >
            <SunSVG
              className={activeTheme === 'light' ? 'fill-[#7e7e7e]' : ''}
            />
          </div>
          <div className='{s.desk_hidden_theme_changer} hidden justify-center items-center w-10 h-10'>
            <MoonSVG />
          </div>
        </div>
        <div className='{s.language_changer_block} flex justify-center items-center cursor-pointer'>
          <UsaIco />
        </div>
        <div
          className='{s.close_sb_ico} cursor-pointer flex justify-center items-center'
          onClick={handleSidebar}
        >
          <CloseSb
            className={cn(
              'duration-200 cursor-pointer',
              !open && 'rotate-[180deg]'
            )}
          />
        </div>
      </div>
    </div>
  )
}
export default SideBar
