'use client'

import { FC } from 'react'
import { games_banner } from './data'
import GameSlideItem from './games.slide-item'
import { useMediaQuery } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'

interface MobileListProps {}

export const MobileList: FC<MobileListProps> = () => {
  const isMobile = useMediaQuery('(max-width:650px)')
  const { t } = useTranslation()
  return (
    <>
      <h2 className='font-bold sm:hidden ml-4'>
        {t('pages.main.games.title')}
      </h2>{' '}
      <div className='grid grid-cols-2 mt-[10px] p-[16px] gap-[16px] sm:hidden game_mob_list pt-0'>
        {games_banner.map((item, index) => (
          <GameSlideItem
            players={Number(item?.id) || 1}
            onClick={() => {
              if (isMobile) {
                const element = document.documentElement
                if (element.requestFullscreen) {
                  element.requestFullscreen()
                } else if ((element as any).webkitRequestFullscreen) {
                  /* Safari */
                  ;(element as any).webkitRequestFullscreen()
                } else if ((element as any).msRequestFullscreen) {
                  /* IE11 */
                  ;(element as any).msRequestFullscreen()
                }
              }
            }}
            key={index}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </>
  )
}
