'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'usehooks-ts'

const Logo = () => {
  const isMobile = useMediaQuery('(max-width:768px)')
  return (
    <Link href='/' className='flex justify-start items-center w-max'>
      {isMobile ? (
        <Image
          src='/images/logo/header_logo-mini.png'
          className='flex aspect-square object-contain'
          width={39}
          height={30}
          alt={'gamekeeper / logo'}
        />
      ) : (
        <Image
          src='/images/logo/header_logo.png'
          className='max-h-9 object-contain'
          width={112}
          height={36}
          alt={'gamekeeper / logo'}
        />
      )}
    </Link>
  )
}

export default Logo
