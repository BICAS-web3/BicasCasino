import Link from 'next/link'
import { footer_text, games, socials } from './data'
import Social from './components/Social'
import { Separator } from '@/components/ui/separator'

const Footer = () => (
  <div className='bg-[#181818] flex flex-col justify-center items-center w-full p-10 gap-y-6'>
    <div className='flex justify-between items-center flex-nowrap w-full h-max'>
      <div className='flex-1 hidden sm:flex sm:items-start sm:h-full sm:gap-[5vw]'>
        {games.map((item, ind) => (
          <div className='flex flex-col gap-[15px]' key={`games-${ind}_column`}>
            {item.list.map((link, index) => (
              <Link
                key={`${link.title}_link-${index}`}
                className='uppercase text-sm font-extrabold text-[#979797]'
                href={link.path}
              >
                {link.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <Social />
    </div>
    <Separator />
    <div className='my-2 h-max flex-col  items-center justify-center p-5 flex gap-y-1'>
      {footer_text.map((text, id) => (
        <div
          key={`footer-text--${id}`}
          className='text-xs sm:text-sm text-[#7E7E7E]'
        >
          {text}
        </div>
      ))}
    </div>
  </div>
)

export default Footer
