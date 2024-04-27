import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Social from './components/Social'
import { footer_text, games } from './data'

const Footer = () => (
  <div className='bg-[#181818] rounded-[20px_20px_0_0] mb-[40px] sm:mb-0 flex flex-col justify-center items-center w-full p-5 sm:p-[2.5rem_2.5rem_10px_2.5rem] gap-y-3'>
    <div className='flex justify-center mb-[15px] items-center flex-wrap w-full h-max'>
      <div className='flex-1 hidden sm:flex flex-wrap pr-16 sm:h-full sm:gap-[5vw]'>
        {games.map((item, ind) => (
          <div className='flex flex-col mt-[20px] gap-[15px]' key={`games-${ind}_column`}>
            {item.list.map((link, index) => (
              <Link
                key={`${link.title}_link-${index}`}
                className='uppercase hover:text-[#fff] text-sm font-extrabold text-[#979797]'
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
    <div className='my-2 h-max flex-col items-center justify-center flex'>
      {footer_text.map((text, id) => (
        <div
          key={`footer-text--${id}`}
          className='text-xs sm:text-sm text-[#7E7E7E] text-center'
        >
          {text}
        </div>
      ))}
    </div>
  </div>
)

export default Footer
