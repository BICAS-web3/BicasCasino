'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { HomeSVG } from './icons'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

interface IClosedLink {
  link: string
  Icon: FC<{ className?: string }>
  title: string
  id: string
}

const ClosedLink: FC<IClosedLink> = ({ link, title, Icon, id }) => {
  const path = usePathname()
  return (
    <Link
      href={link}
      className={cn(
        'cursor-pointer flex justify-center rounded-xl duration-100 mx-auto items-center w-[50px] h-[50px] hover:bg-[#0f0f0f]',
        path === link && 'text-white'
      )}
    >
      <Icon className={path === link ? ' text-white' : ''} />

      <div
        className={cn(
          'fixed left-20 w-auto rounded-[8px] bg-[#282828] none justify-center items-center h-9 px-5',
          'color-[#7e7e7e] text-base whitespace-nowrap font-semibold leading-[90%]',
          'before:content-[""] before:absolute top-[18px] right-full -mt-[7px] border-[7px] rounded-[2px] border-transparent',
          'group-hover:flex'
        )}
        data-id={id}
      >
        {title}
      </div>
    </Link>
  )
}

export default ClosedLink
