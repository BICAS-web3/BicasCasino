import s from './styles.module.scss'
import { FC } from 'react'

import livechatIco from '@/public/images/support/liveChatIco.webp'
import tgIco from '@/public/images/support/tgIco.webp'
import twitterIco from '@/public/images/support/twitterIco.webp'
import mailIco from '@/public/images/support/mailIco.webp'

import livechatBg from '@/public/images/support/first.webp'
import tgBg from '@/public/images/support/second.webp'
import twitterBg from '@/public/images/support/third.webp'
import mailBg from '@/public/images/support/fourth.webp'
import Link from 'next/link'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const supportList = [
  {
    title: 'Live Chat',
    ico: livechatIco,
    href: '/',
    bg: livechatBg
  },
  {
    title: 'Telegram',
    ico: tgIco,
    href: 'https://t.me/greekkeepers',
    bg: tgBg
  },
  {
    title: 'Twitter',
    ico: twitterIco,
    href: 'https://twitter.com/GreekKeepers',
    bg: twitterBg
  },
  {
    title: 'Email us',
    ico: mailIco,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=greekkeeper@greekkeepers.io',
    bg: mailBg
  }
]

interface SupportBlockProps {}

export const SupportBlock: FC<SupportBlockProps> = () => {
  return (
    <div className='w-full m-[20px]'>
      <h2
        className='
        text-white text-[1.25rem] sm:text-[2.25rem] mb-[14px] sm:mb-[20px] leading-[30px]
        sm:leading-[46px] tracking-[1.44px] font-bold
      '
      >
        Support
      </h2>
      <div className='grid gap-[20px] grid-cols-1 md:grid-cols-2'>
        {supportList.map((item, ind) => (
          <Card
            key={ind}
            className='
            group
            relative overflow-hidden rounded-[20px] h-[185px] sm:h-[260px]
          '
          >
            <img
              src={item.bg.src}
              alt='item-bg'
              className='
                rounded-[20px] absolute w-full h-full object-cover top-0 transition-all duration-500
                group-hover:scale-[1.2]
              '
            />
            <CardContent
              className='
              box-border h-full relative z-[10] p-[20px] sm:p-[30px] flex flex-col justify-between
            '
            >
              <CardHeader
                className='
                flex flex-row p-0 items-center gap-[26px]
              '
              >
                <div
                  className='
                  rounded-[50%] bg-[#EAEAEA] w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]
                  flex items-center justify-center
                '
                >
                  <img
                    src={item.ico.src}
                    className='w-[40x] h-[40px] sm:w-auto sm:h-auto'
                    alt='item-ico'
                  />
                </div>
                <span
                  className='
                    text-text-w-def text-[1.875rem] font-normal leading-[42px] 
                  '
                >
                  {item.title}
                </span>
              </CardHeader>
              <CardFooter className='p-0'>
                <Link target='_blank' href={item.href}>
                  <Button variant='supportLink'>Send a message</Button>
                </Link>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}