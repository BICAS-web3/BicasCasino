'use client'

import clsx from 'clsx'
const gamesList = [
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

interface GameIconProps {
  iconId: string
}

const GameIcon: FC<GameIconProps> = ({ iconId }) => {
  if (iconId === 'coin') {
    return <CoinButton />
  } else if (iconId === 'dice') {
    return <DiceButton />
  } else if (iconId === 'rps') {
    return <RPCButton />
  } else if (iconId === 'poker') {
    return <PokerButton />
  } else if (iconId === 'mines') {
    return <MinesButton />
  } else if (iconId === 'plinko') {
    return <PlinkoButton />
  } else if (iconId === 'rocket') {
    return <RocketIcon />
  } else if (iconId === 'slots') {
    return <SlotsIcon />
  } else if (iconId === 'wheelFortune') {
    return <WheelFortuneIcon />
  } else if (iconId === 'apples') {
    return <AppleBtnIco />
  } else if (iconId === 'race') {
    return <RaceButton />
  } else if (iconId === 'cars') {
    return <CarBtn />
  } else if (iconId === 'blackJack') {
    return <BJBtn />
  } else if (iconId === 'thimbles') {
    return <ThimblesButton />
  } else if (iconId === 'crash') {
    return <CrashBtn />
  } else if (iconId === 'roulette') {
    return <RouletteBtnIconIcon />
  } else {
    return <h3>no games yet</h3>
  }
}
const Sidebar = () => {
  return <div></div>
}
export default Sidebar
import { FC, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import rightArr from '@/public/sidebar_icons/rightArrIco.webp'

import {
  CoinButton,
  DiceButton,
  RPCButton,
  PokerButton,
  GamesIcon,
  ArrowIcon,
  SupportIcon,
  RocketIcon,
  SlotsIcon,
  WheelFortuneIcon,
  AppleBtnIco,
  RaceButton,
  CarBtn,
  BJBtn,
  ThimblesButton,
  CrashBtn,
  RouletteBtnIconIcon,
  MinesButton,
  LeaderboardIcon,
  VipButton,
  SunIco,
  PlinkoButton,
  BonusIco,
  NftIco,
  AffilateIco,
  HTPico,
  CloseSbIco,
  MoonIco,
  HomeBtn
} from '@/components/icons'

import usaIco from '@/public/countries_images/usaIco.svg'
import uaIco from '@/public/countries_images/uaIco.svg'
import indIco from '@/public/countries_images/indiaIco.svg'
import chinaIco from '@/public/countries_images/chinaIco.svg'
import portugalIco from '@/public/countries_images/portugalIco.svg'
import spainIco from '@/public/countries_images/spainIco.svg'

import Link from 'next/link'

import { useRouter } from 'next/router'

interface ClosedSideBarProps {
  pickedGame: number | null
  activePage: string | undefined
}
const ClosedSideBar: FC<ClosedSideBarProps> = props => {
  const path = useRouter().pathname

  return (
    <>
      <div className={s.closed_sb_group}>
        <Link
          href={'/'}
          className={clsx(s.closed_sb_bonus_ico, path === '/' && s.active_link)}
        >
          <HomeBtn />

          <div className={s.closed_sb_tooltip} data-id='home-tooltip'>
            Home
          </div>
        </Link>
        <Link
          href={'/Bonus'}
          className={clsx(
            s.closed_sb_bonus_ico,
            path === '/Bonus' && s.active_link
          )}
        >
          <BonusIco />
          <div className={s.closed_sb_tooltip} data-id='bonus-tooltip'>
            Bonus
          </div>
        </Link>
        <Link
          href={'/VipClub'}
          className={clsx(
            s.closed_sb_bonus_ico,
            path === '/VipClub' && s.active_link
          )}
        >
          <LeaderboardIcon />
          <div className={s.closed_sb_tooltip} data-id='vip-tooltip'>
            Vip
          </div>
        </Link>
        <div
          className={`${clsx(
            s.games_button,
            path === '/games/CoinFlip' && s.active_link,
            path === '/games/Dice' && s.active_link,
            path === '/games/RockPaperScissors' && s.active_link,
            path === '/games/Poker' && s.active_link,
            path === '/games/Mines' && s.active_link,
            path === '/games/Plinko' && s.active_link,
            path === '/games/Rocket' && s.active_link,
            path === '/games/WheelFortune' && s.active_link,
            path === '/games/Slots' && s.active_link,
            path === '/games/Apples' && s.active_link,
            path === '/games/Race' && s.active_link,
            path === '/games/Cars' && s.active_link,
            path === '/games/BlackJack' && s.active_link,
            path === '/games/Thimbles' && s.active_link,
            path === '/games/Crash' && s.active_link,
            path === '/games/Roulette' && s.active_link,
            path === '/leaderboard' && s.active_link
          )}`}
        >
          <GamesIcon />
          <div className={s.games_tooltip_wrap}>
            <div className={s.games_button_tooltip}>
              <div className={s.tooltip_games_list}>
                {gamesList.map((item, ind) => (
                  <Link
                    href={item.link}
                    className={clsx(
                      s.tooltip_games_list_item,
                      path === item.link ? s.active_link : s.not_active
                    )}
                  >
                    <GameIcon iconId={item.icon} />
                    <span className={s.tooltip_games_list_item_title}>
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.closed_sb_other_info_list}>
        <div className={s.closed_sb_other_info_list_item}>
          <HTPico />
          <div className={s.closed_sb_tooltip} data-id='htp-tooltip'>
            How to play
          </div>
        </div>
        <Link
          href={'/nftmarket'}
          className={clsx(
            s.closed_sb_other_info_list_item,
            path === '/nftmarket' && s.active_link
          )}
        >
          <NftIco />
          <div className={s.closed_sb_tooltip} data-id='nft-tooltip'>
            NFT Market
          </div>
        </Link>
        <div
          className={s.closed_sb_other_info_list_item}
          onClick={() =>
            window.open('https://affiliate.greekkeepers.io/', '_blank')
          }
        >
          <AffilateIco />
          <div className={s.closed_sb_tooltip} data-id='affilate-tooltip'>
            Affiliate
          </div>
        </div>
        <div className={s.closed_swap_wrap}>
          <div className={s.closed_sb_tooltip} data-id='swap-tooltip'>
            Swap
          </div>
        </div>
        <Link
          href='/Support'
          className={clsx(
            s.closed_sb_other_info_list_item,
            path === '/Support' && s.active_link
          )}
        >
          <SupportIcon />
          <div className={s.closed_sb_tooltip} data-id='support-tooltip'>
            Support
          </div>
        </Link>
      </div>
    </>
  )
}

interface OpenedSideBarProps {
  pickedGame: number | null
  activePage: string | undefined
}
const OpenedSideBar: FC<OpenedSideBarProps> = props => {
  const [gamesAreOpen, setOpen] = useState(true)
  const [activeTheme, setActiveTheme] = useState('dark')
  const handleChangeTheme = () => {
    activeTheme === 'dark' ? setActiveTheme('light') : setActiveTheme('dark')
  }
  const [activeLanguage, setActiveLanguage] = useState(languagesList[0])
  const [activeLanguagesList, setActiveLanguagesList] = useState(languagesList)

  const handleLanguageChange = (id: any) => {
    const lang = languagesList.filter(item => item.id === id)[0]
    setActiveLanguage(lang)
  }

  const path = useRouter().pathname

  const active_link =
    path === '/games/CoinFlip' ||
    path === '/games/Dice' ||
    path === '/games/RockPaperScissors' ||
    path === '/games/Poker' ||
    path === '/games/Mines' ||
    path === '/games/Plinko' ||
    path === '/games/Rocket' ||
    path === '/games/Slots' ||
    path === '/games/WheelFortune' ||
    path === '/games/Apples' ||
    path === '/games/Race' ||
    path === '/games/Cars' ||
    path === '/games/BlackJack' ||
    path === '/games/Thimbles' ||
    path === '/games/Crash' ||
    path === '/games/Roulette' ||
    path === '/leaderboard'

  return (
    <>
      <div className={s.upper_blocks}>
        <div
        //   className={`${s.mobile_languages_block} ${
        //     activeLanguagesBlock === true && s.visible
        //   }`}
        >
          <div className={s.mobile_languages_block_body}>
            <div className={s.mobile_languages_block_nav}>
              <div
                className={s.mobile_languages_block_nav_left}
                // onClick={() => setActiveLanguagesBlock(false)}
              >
                <Image src={rightArr} alt='back' />
                Back
              </div>
              <span className={s.mobile_languages_block_title}>Language</span>
            </div>
            <div className={s.mobile_languages_block_list}>
              {activeLanguagesList.map((item, ind) => (
                <div
                  className={s.mobile_languages_block_list_item}
                  onClick={() => handleLanguageChange(item.id)}
                >
                  <div className={s.mobile_languages_block_list_item_left}>
                    <Image src={item.ico} alt={item.id} />
                    {item.mobTitle}
                  </div>
                  <div
                    className={`${
                      s.mobile_languages_block_list_item_checkbox
                    } ${activeLanguage.id === item.id && s.active_checkbox}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link
          href={'/'}
          className={clsx(s.bonus_button_block, path === '/' && s.active_link)}
        >
          <div className={s.home_ico_block}>
            <HomeBtn />
          </div>
          home
        </Link>
        <Link
          href={'/Bonus'}
          className={clsx(
            s.bonus_button_block,
            path === '/Bonus' && s.active_link
          )}
        >
          <div className={s.bonus_ico_block}>
            <BonusIco />
          </div>
          bonus
        </Link>
        <Link
          href='/VipClub'
          className={clsx(
            s.bonus_button_block,
            path === '/VipClub' && s.active_link
          )}
        >
          <div className={s.vip_ico_block}>
            <LeaderboardIcon />
          </div>
          vip club
        </Link>
        <div
          className={clsx(
            s.buttons_menu,
            !gamesAreOpen && s.buttons_menu_closed
          )}
        >
          <div
            className={s.menu_header}
            onClick={() => {
              setOpen(!gamesAreOpen)
            }}
          >
            <div
              className={clsx(
                s.header_icon_container,
                path === '/games/CoinFlip' && s.active_link,
                path === '/games/Dice' && s.active_link,
                path === '/games/RockPaperScissors' && s.active_link,
                path === '/games/Poker' && s.active_link,
                path === '/games/Mines' && s.active_link,
                path === '/games/Plinko' && s.active_link,
                path === '/games/Rocket' && s.active_link,
                path === '/games/Slots' && s.active_link,
                path === '/games/WheelFortune' && s.active_link,
                path === '/games/Apples' && s.active_link,
                path === '/games/Race' && s.active_link,
                path === '/games/Cars' && s.active_link,
                path === '/games/BlackJack' && s.active_link,
                path === '/games/Thimbles' && s.active_link,
                path === '/games/Crash' && s.active_link,
                path === '/games/Roulette' && s.active_link,
                path === '/leaderboard' && s.active_link,
                s.games
              )}
            >
              <GamesIcon />
              <span className={s.header_icon_title}>games</span>
            </div>
            <div
              className={(s.arrow, gamesAreOpen ? s.arrow_down : s.arrow_side)}
            >
              <ArrowIcon />
            </div>
          </div>
          <div className={s.game_rows}>
            <Link
              href={'/games/CoinFlip'}
              className={`${s.game_row} ${
                props.activePage === '/games/CoinFlip' && s.game_active
              }`}
            >
              <CoinButton />
              Coinflip
            </Link>
            <Link
              href={'/games/Dice'}
              className={`${s.game_row} ${
                props.activePage === '/games/Dice' && s.game_active
              }`}
            >
              <DiceButton />
              Dice
            </Link>
            <Link
              href={'/games/RockPaperScissors'}
              className={`${s.game_row} ${
                props.activePage === '/games/RockPaperScissors' && s.game_active
              }`}
            >
              <RPCButton />
              Rock Paper Scissors
            </Link>

            <Link
              href={'/games/Mines'}
              className={`${s.game_row} ${
                props.activePage === '/games/Mines' && s.game_active
              }`}
            >
              <MinesButton />
              Mines
            </Link>
            <Link
              href={'/games/Plinko'}
              className={`${s.game_row} ${
                props.activePage === '/games/Plinko' && s.game_active
              }`}
            >
              <PlinkoButton />
              Plinko
            </Link>
            <Link
              href={'/games/Rocket'}
              className={`${s.game_row} ${
                props.activePage === '/games/Rocket' && s.game_active
              }`}
            >
              <RocketIcon />
              Rocket
            </Link>

            <Link
              href={'/games/WheelFortune'}
              className={`${s.game_row} ${
                props.activePage === '/games/WheelFortune' && s.game_active
              }`}
            >
              <WheelFortuneIcon />
              Wheel of Fortune
            </Link>
            <Link
              href={'/games/Apples'}
              className={`${s.game_row} ${
                props.activePage === '/games/Apples' && s.game_active
              }`}
            >
              <AppleBtnIco />
              Apples
            </Link>
            <Link
              href={'/games/Race'}
              className={`${s.game_row} ${
                props.activePage === '/games/Race' && s.game_active
              }`}
            >
              <RaceButton />
              Race
            </Link>
            <Link
              href={'/games/Cars'}
              className={`${s.game_row} ${
                props.activePage === '/games/Cars' && s.game_active
              }`}
            >
              <CarBtn />
              Cars
            </Link>

            <Link
              href={'/games/Thimbles'}
              className={`${s.game_row} ${
                props.activePage === '/games/Thimbles' && s.game_active
              }`}
            >
              <ThimblesButton />
              Thimbles
            </Link>

            <Link
              href={'/leaderboard'}
              className={clsx(
                s.leaderboard,
                props.activePage === '/leaderboard' && s.game_active
              )}
            >
              <VipButton />
              LeaderBoard
            </Link>
          </div>
        </div>
        <div className={s.sb_other_info_list}>
          <div className={s.oth_info_list_item}>
            <div className={s.icon_wrapper}>
              <HTPico />
            </div>
            <div className={s.large_header_text}>
              how to play <span className={s.soon_page}>Soon…</span>
            </div>
          </div>
          <Link
            href={'/nftmarket'}
            className={clsx(
              s.oth_info_list_item,
              path === '/nftmarket' && s.active_link
            )}
          >
            <div className={s.icon_wrapper}>
              <NftIco />
            </div>
            <div className={s.large_header_text}>nft market</div>
          </Link>
          <div
            className={s.oth_info_list_item}
            onClick={() =>
              window.open('https://affiliate.greekkeepers.io/', '_blank')
            }
          >
            <div className={s.icon_wrapper}>
              <AffilateIco />
            </div>
            <div className={s.large_header_text}>affiliate</div>
          </div>
          <Link
            className={clsx(s.support, path === '/Support' && s.active_link)}
            href='/Support'
          >
            <div className={s.icon_wrapper}>
              <SupportIcon />
            </div>
            <div className={s.large_header_text}>support</div>
          </Link>
        </div>
        <div className={s.desk_hidden_language_block}>
          <div className={s.desk_hidden_active_language_block}>
            <Image src={activeLanguage.ico} alt='active_language_ico' />
            <span className={s.desk_hidden_language_title}>language</span>
          </div>
        </div>
        <div className={s.desk_hidden_theme_block}>
          <div className={s.desk_hidden_active_language_block}>
            <MoonIco />
            <span className={s.desk_hidden_language_title}>dark theme</span>
          </div>
          <div className={s.change_theme_block}></div>
        </div>
      </div>
    </>
  )
}

export interface SideBarProps {
  activePage: string | undefined
}
export const SideBar: FC<SideBarProps> = ({ activePage }) => {
  const [activeTheme, setActiveTheme] = useState('dark')
  const handleChangeTheme = () => {
    activeTheme === 'dark' ? setActiveTheme('light') : setActiveTheme('dark')
  }
  const [activeLanguage, setActiveLanguage] = useState(languagesList[0])
  const [activeLanguagesList, setActiveLanguagesList] = useState(languagesList)
  //   const [isOpen, currentPick, closeSb, openSb, languageMobileBlock] = useUnit([
  //     SideBarModel.$isOpen,
  //     SideBarModel.$currentPick,
  //     SideBarModel.Close,
  //     SideBarModel.Open,
  //     SideBarModel.$mobileLanguageBlock
  //   ])

  //   useEffect(() => {
  //     if (!languageMobileBlock) {
  //       const el = document.getElementById('sidebar')
  //       el?.classList.remove(s.scrollDisable)
  //     }
  //   }, [languageMobileBlock])

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

  //   const handleSidebar = () => {
  //     if (isOpen) {
  //       closeSb()
  //     } else {
  //       openSb()
  //     }
  //   }

  useEffect(() => {
    setActiveLanguagesList(
      languagesList.filter(item => item.id !== activeLanguage.id)
    )
  }, [activeLanguage])

  return (
    <div
      //   className={`${s.side_bar} ${
      //     isOpen ? s.side_bar_opened : s.side_bar_closed
      //   } ${languageMobileBlock && s.mobile_blocks_hidden}`}
      id='sidebar'
    >
      <div
        className={s.side_bar_upper}
        id='sidebar_id'
        style={{ '--st': `${sidebarScroll}px` } as any}
      >
        {/* {isOpen ? (
          <OpenedSideBar pickedGame={currentPick} activePage={activePage} />
        ) : (
          <ClosedSideBar pickedGame={currentPick} activePage={activePage} />
        )} */}
      </div>

      <div
      // className={`${s.bottom_fixed_block} ${!isOpen && s.bottom_nav_closed}`}
      >
        <div className={s.themes_block}>
          <div
            className={`${s.theme_block} ${activeTheme === 'dark' && s.active}`}
          >
            <MoonIco />
          </div>
          <div
            className={`${s.theme_block} ${
              activeTheme === 'light' && s.active
            }`}
          >
            <SunIco />
          </div>
          <div className={s.desk_hidden_theme_changer}>
            <MoonIco />
          </div>
        </div>
        <div className={s.language_changer_block}>
          <Image src={activeLanguage.ico} alt={activeLanguage.id} />
        </div>
        <div
          className={s.close_sb_ico}
          // onClick={handleSidebar}
        >
          <CloseSbIco />
        </div>
      </div>
    </div>
  )
}
