import Link from 'next/link'
import Image from 'next/image'

import LogoImage from '@/public/images/logo/header_logo.png'

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        src={LogoImage}
        className='w-28 h-9 aspect-video object-contain'
        alt={''}
      />
    </Link>
  )
}

export default Logo
