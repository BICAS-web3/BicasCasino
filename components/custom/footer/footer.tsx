'use client'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Social from './components/Social'
import { footer_text, games } from './data'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className='bg-[#181818] rounded-[12px_12px_0_0] mb-[40px] sm:mb-0 flex flex-col justify-center items-center w-full p-5 sm:p-[2.5rem_2.5rem_10px_2.5rem] gap-y-3'>
      <div className='flex justify-center mb-[15px] items-center flex-wrap w-full h-max'>
        <div className='flex-1 hidden sm:flex flex-wrap pr-16 sm:h-full sm:gap-[5vw]'>
          {games.map((item, ind) => (
            <div
              className='flex flex-col mt-[20px] gap-[15px]'
              key={`games-${ind}_column`}
            >
              {item.list.map((link, index) => (
                <Link
                  key={`${link.title}_link-${index}`}
                  className='uppercase hover:text-[#fff] text-sm font-extrabold text-[#979797]'
                  href={link.path}
                >
                  {t(`footer.titles.${link.title}`)}
                  {/* {link.title} */}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <Social />
      </div>
      <Separator />
      <div className='my-2 h-max flex-col items-center justify-center flex'>
        <div className='text-xs sm:text-sm text-[#7E7E7E] text-center'>
          {t('footer.undertitle')}
        </div>
      </div>
    </div>
  )
}

export default Footer
