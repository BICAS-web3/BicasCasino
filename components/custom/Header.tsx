'use client'

import Link from 'next/link'
import Image from 'next/image'

import logo from '@/public/images/logo/header_logo.png'

import { BalanceSwitcher } from '@/components/ui/balance-switcher'
import { WalletBtn } from '@/components/icons'

import clsx from 'clsx'

const Header = () => {
  return (
    <header
      className={clsx(
        'flex justify-between items-center px-5 py-[10px] pb-[9px]',
        'border-b border-[#252525] box-border'
      )}
    >
      <Link href='/'>
        <Image src={logo} width={109} height={36} alt='logo' />
      </Link>
      <article className='flex items-center gap-[15px]'>
        <BalanceSwitcher />
        <button
          className={clsx(
            'w-[125px] h-[40px] flex items-center justify-center gap-[10px]',
            'border border-[rgba(32,32,32,1)] rounded-[50px] cursor-pointer duration-500'
          )}
        >
          <span
            className={clsx(
              'text-base leading-6 text-[rgba(126,126,126,1)]',
              'font-semibold duration-500'
            )}
          >
            Wallet
          </span>
          <WalletBtn />
        </button>
        <span className='w-[1px] h-10 bg-[#252525]'></span>
        <div
          className={clsx(
            'w-10 h-10 flex items-center justify-center',
            'text-lg font-bold rounded-full bg-[#F57731]'
          )}
        >
          B
        </div>
      </article>
    </header>
  )
}
export default Header
