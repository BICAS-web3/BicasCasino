'use client'
import { FC, useEffect, useState } from 'react'
import { useDropdown, useMediaQuery } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useUnit } from 'effector-react'
import { CloseSwapIcon } from '@/src/shared/SVGs/CloseSwapIcon'
import { SwapToken } from '../Swap/ui/SwapToken'
import { ArrowSwapIcon } from '@/src/shared/SVGs/ArrowSwapIcon'
import Link from 'next/link'

import Image from 'next/image'
import { games, socials } from './data'

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  //   const [sidebarState] = useUnit([SidebarM.$isOpen])
  // const { address, isConnected } = useAccount();
  // const router = useRouter()

  // const profileRedirect = () => {
  //   if (isConnected) {
  //     router.push(`/account/${address?.toLocaleLowerCase}`);
  //   } else if (!isConnected && window.innerWidth < 650) {
  //     router.push(`/AccountFallback`);
  //   } else {
  //     return null;
  //   }
  // };

  //   const [isSidebarOpen, setClose] = useUnit([$isOpen, Close])

  return (
    <div
      className='bg-black-def flex flex-col justify-center items-center w-full z-10 self-end mt-100'
      //   className={`${s.footer} ${!sidebarState && s.sidebar_closed}`}
    >
      <div className='w-full flex justify-center items-center sm:ml-[130px] sm:mr-auto sm:mt-0 sm:mb-0 sm:w-[calc(100%_-_160px)] md:w-[calc(100%_-_165px)] md:ml-[130px] '>
        <div className='box-border p-[30px_0] flex items-center justify-center w-full gap-20 border-b-2 border-border-def sm:justify-between '>
          <div className='hidden sm:flex sm:items-start sm:h-full sm:gap-[5vw]'>
            {games.map((item, ind) => (
              <div className='flex flex-col gap-[15px]'>
                {item.list.map((link, ind) => (
                  <Link
                    className='uppercase text-footer-links'
                    href={link.path}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div>
            <span className='block mb-[25px] text-white text-center text-footer-title font-normal'>
              Join our Community
            </span>
            <div className='grid w-auto justify-evenly gap-[14px] grid-cols-4'>
              {socials.map((item, ind) => (
                <Link
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ backgroundColor: item.bg }}
                  className={`rounded-full group transition-all hover:after:opacity-80 hover:after:shadow-sm hover:after:shadow-white ${
                    ind === 0 && 'pr-[3px]'
                  } box-border w-[32px] h-[32px] flex justify-center items-center ease-in duration-500 relative`}
                >
                  <div
                    className={` group-hover:opacity-100 group-hover:shadow-white shadow-xl absolute w-[1px] h-[1px] top-[50%] left-[50%] rounded-full duration-500 transition-all`}
                  ></div>
                  <Image src={item.img} alt={item.title} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        //  className={s.footer_below}
        className='mt-[7px] mb-[7px] text-footer-text-xs sm:footer-text-md h-[60px] sm:h-full sm:text-footer-text-md  text-footer-text border-border-def text-center  items-center justify-center p-5 flex'
      >
        BSC METAVERSE LIMITED Suite 305,
        <br />
        Griffith Corporate Centre
        <br />
        P.O. Box 1510, Beachmont Kingstown St. Vincent and the Grenadines
        <br />
        6818 BC 2023
      </div>
    </div>
  )
}
