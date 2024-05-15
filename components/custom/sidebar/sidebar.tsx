'use client'

import { cn } from '@/lib/utils'
import { MobMenu, SBottomMenu, SGames, SMobileMenu, STopMenu } from './data'

import { stringRemoveSpacing } from '@/lib/string'
import { SidebarModel } from '@/states'
import { useUnit } from 'effector-react'
import Menu from './components/DropdownMenu'
import MenuItem from './components/MenuItem'
import SidebarSettings from './components/Settings'
import SidebarMobileSettings from './components/settings.mobile'
import { useMediaQuery } from 'usehooks-ts'
import { useEffect } from 'react'
import { AffilateSVG, NftSVG, SupportSVG } from './components/icons/bottom'
import { BonusSVG, HomeSVG, VipSVG } from './components/icons/top'
import Image from 'next/image'
import ChestIco from '@/public/images/chestCard/sidebarIco.svg'
import { LanguageToggle } from './components/LanguageToggle'

const Sidebar = () => {
  const [open, setOpen] = useUnit([SidebarModel.$open, SidebarModel.setOpen])
  const isMobile = useMediaQuery('(max-width:768px)')

  useEffect(() => {
    if (!isMobile) {
      setOpen(!open)
    }
  }, [])

  return (
    <>
      {isMobile ? (
        <div
          id='sidebar'
          className={cn(
            `bg-[#181818] fixed sm:sticky z-50 left-0 bottom-0 sm:top-[59px] flex flex-col w-full border-r-[1px] border-[#252525]`,
            open
              ? 'sm:w-[257px] h-[calc(100vh_-_56px)] sm:h-[calc(100vh_-_60px)]'
              : 'sm:w-[90px] h-max sm:h-[calc(100vh_-_60px)]'
          )}
        >
          <div
            className={cn(
              'flex-col py-2 sm:py-4 px-5 h-full',
              open ? 'flex gap-1.5' : 'hidden sm:flex'
            )}
          >
            <div className={cn('flex flex-col gap-[5px]')}>
              {SMobileMenu.map((item, index) => (
                <MenuItem
                  open={open}
                  href={item.href}
                  data={item}
                  key={`sidebar-top-${stringRemoveSpacing(
                    item.title
                  )}-${index}`}
                />
              ))}
              {MobMenu.map((item, index) => (
                <MenuItem
                  open={open}
                  href={item.href || '/'}
                  data={item}
                  key={`sidebar-top-${stringRemoveSpacing(
                    item.title
                  )}-${index}`}
                />
              ))}
            </div>
          </div>
          <div className='flex flex-1' />
          {open && (
            <div className='mt-auto w-full p-5 flex justify-end'>
              <LanguageToggle disabled={false} />
            </div>
          )}
          <SidebarMobileSettings
            open={open}
            handleAction={() => setOpen(!open)}
          />
        </div>
      ) : (
        <div
          id='sidebar'
          className={cn(
            `bg-[#181818] fixed mmd:sticky z-50 left-0 bottom-0 sm:top-[59px] flex flex-col w-full border-r-[1px] border-[#252525]`,
            open
              ? 'w-[90px] sm:w-[259px] h-[calc(100vh_-_60px)] sm:h-[calc(100vh_-_60px)]'
              : 'sm:w-[90px] h-max sm:h-[calc(100vh_-_60px)]'
          )}
        >
          <div
            className={cn(
              'flex-col py-2 sm:py-4 px-5 h-full',
              open ? 'flex gap-1.5' : 'hidden sm:flex'
            )}
          >
            <div className={cn('flex flex-col', open ? 'gap-[5px]' : '')}>
              <MenuItem
                  open={open}
                  href={'/'}
                  data={{
                    icon: <HomeSVG className='w-5 h-5 object-contain aspect-square' />,
                    title: 'Home',
                  }}
              />
              <MenuItem
                  open={open}
                  href={'/404'}
                  data={
                    {
                      icon: <BonusSVG className='w-5 h-5 object-contain aspect-square' />,
                      title: 'Bonus',
                    }
                  }
              />
              <MenuItem
                  open={open}
                  href={'/404'}
                  data={
                    {
                      icon: <BonusSVG className='w-5 h-5 object-contain aspect-square' />,
                      title: 'double',
                      buttons: [
                        {
                          icon: (
                            <Image
                              src='/images/sidebar-icons/goals.png'
                              alt='icon goals'
                              width={20}
                              height={20}
                              className='object-contain aspect-square'
                            />
                          ),
                          title: 'Goals',
                          color: 'linear-gradient(40deg, #44278A 0%, #24232E 100%)'
                        },
                        {
                          icon: (
                            <Image
                              src='/images/sidebar-icons/wheel.png'
                              alt='icon wheel'
                              width={20}
                              height={20}
                              className='object-contain aspect-square'
                            />
                          ),
                          title: 'Wheel',
                          color: 'linear-gradient(40deg, #61194F 0%, #272229 100%)'
                        }
                      ]
                    }
                  }
              />
              <MenuItem
                  open={open}
                  href={'/vip'}
                  data={
                    {
                      icon: <ChestIco className='w-5 h-5 object-contain aspect-square' />,
                      title: open ? 'CHEST & CARD' : 'CHEST',
                      id: 'modal'
                    }
                  }
              />
              <MenuItem
                  open={open}
                  href={'/vip'}
                  data={
                    {
                      icon: <VipSVG className='w-5 h-5 object-contain aspect-square' />,
                      title: 'VIP Club',
                    }
                  }
              />
            </div>

            <Menu data={SGames} open={open} />

            <div
              className={cn(
                'flex flex-col gap-[5px] sm:gap-[5px] rounded-[20px]',
                open ? 'bg-[#121212]' : 'bg-transparent'
              )}
            >
              <MenuItem
                open={open}
                href='/404'
                data={{
                  icon: (
                    <NftSVG className='w-5 h-5 object-contain aspect-square' />
                  ),
                  title: open ? 'NFT Market' : 'NFT'
                }}
              />
              <MenuItem
                open={open}
                href={'affiliates'}
                data={{
                  icon: (
                    <AffilateSVG className='w-5 h-5 object-contain aspect-square' />
                  ),
                  title: 'Affiliate'
                }}
              />
              <MenuItem
                open={open}
                // href={stringRemoveSpacing('NFT Market')}
                href='support'
                data={{
                  icon: (
                    <SupportSVG className='w-5 h-5 object-contain aspect-square' />
                  ),
                  title: 'Support'
                }}
              />
              {/* {SBottomMenu.map((item, index) => (
                <MenuItem
                  open={open}
                  href={stringRemoveSpacing(item.title)}
                  data={item}
                  key={`sidebar-bottom-${stringRemoveSpacing(
                    item.title
                  )}-${index}`}
                />
              ))} */}
            </div>
          </div>
          <div className='flex flex-1' />
          <SidebarSettings open={open} handleAction={() => setOpen(!open)} />
        </div>
      )}
    </>
  )
}

export default Sidebar
