'use client'

import Link from 'next/link'
import Image from 'next/image'

import logo from '@/public/images/logo/header_logo.png'
import { BalanceSwitcher } from '@/components/ui/balance-switcher'

const Header = () => {
  return (
    <header className='px-5 py-[10px] flex justify-between items-center'>
      <Link href='/'>
        <Image src={logo} width={109} height={36} alt='logo' />
      </Link>
      <article>
        <BalanceSwitcher />
      </article>
    </header>
  )
}
export default Header
