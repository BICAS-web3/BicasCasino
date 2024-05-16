import Link from 'next/link'
import { UsersSVG } from './icons'
import { useTranslation } from 'react-i18next'

interface Props {
  image: string
  link: string
  title: string
  className?: string
  onClick?: () => void
}

const GameSlideItem = ({ image, link, title, className, onClick }: Props) => {
  const { t } = useTranslation()
  if (title === 'Wheel') {
    return (
      <div
        className={`flex flex-col relative rounded-[8px] overflow-hidden w-fit game_slide_wrap ${className}`}
      >
        <span className='absolute left-4 top-0 text-[16px] text-white rotate-2 z-[20]'>
          {t('common.soon')}
        </span>
        <div className='relative w-[206px] aspect-square p-[10px] flex flex-col items-end game_slide'>
          <img
            className='absolute top-0 left-0 aspect-square object-contain'
            src={image}
            alt={`game-slider--${link}-image`}
            sizes='206'
          />
          <div className='flex items-center gap-1 bg-black/60 relative w-max px-2 py-[2px] rounded-[13px] text-xs text-white z-10'>
            <UsersSVG />
            <span>330</span>
          </div>
          <span className='z-10 absolute text-red uppercase text-[20px] font-bold self-start bottom-[10px]'>
            {t(`pages.main.games.titles.${title}`)}
          </span>
        </div>
        {/* footer */}
        <div className='w-full items-center flex justify-between px-[10px] py-4 bg-[#181818]'>
          <span className='text-[#7E7E7E]'>
            {' '}
            {t(`pages.main.games.originals`)}
          </span>
        </div>
      </div>
    )
  } else {
    return (
      <Link
        onClick={onClick}
        href={link}
        className={`flex flex-col rounded-[8px] overflow-hidden w-fit game_slide_wrap ${className}`}
      >
        <div className='relative w-[206px] aspect-square p-[10px] flex flex-col items-end game_slide'>
          <img
            className='absolute top-0 left-0 aspect-square object-contain'
            src={image}
            alt={`game-slider--${link}-image`}
            sizes='206'
          />
          <div className='flex items-center gap-1 bg-black/60 relative w-max px-2 py-[2px] rounded-[13px] text-xs text-white z-10'>
            <UsersSVG />
            <span>330</span>
          </div>
          <span className='z-10 absolute text-red uppercase text-[20px] font-bold self-start bottom-[10px]'>
            {t(`pages.main.games.titles.${title}`)}
          </span>
        </div>
        {/* footer */}
        <div className='w-full items-center flex justify-between px-[10px] py-4 bg-[#181818]'>
          <span className='text-[#7E7E7E]'>
            {' '}
            {t(`pages.main.games.originals`)}
          </span>
        </div>
      </Link>
    )
  }
}
export default GameSlideItem
