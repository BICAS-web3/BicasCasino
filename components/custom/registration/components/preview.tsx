import Link from 'next/link'
import Image from 'next/image'

import HeaderLogo from '@/public/images/brand_images/logoLeft.png'

import bg from '@/public/images/registration/formBg.webp'
import { useTranslation } from 'react-i18next'

const Preview = () => {
  const { t } = useTranslation()
  return (
    <div className='relative p-[30px] hidden sm:block'>
      <Image
        src={bg}
        className='absolute object-cover w-full h-full top-0 left-0 rounded-[12px_0_0_12px]'
        alt=''
      />
      <Link className='relative z-[5] flex items-center' href='/'>
        <Image src={HeaderLogo} alt={''} width={51} height={40} />
        <Image
          className='ml-[7px]'
          src='/images/brand_images/HeaderBrandText.svg'
          alt={''}
          width={54.71}
          height={23.71}
        />
      </Link>
      <div className='mt-[150px] flex flex-col gap-[10px] z-[5] relative items-center text-center'>
        <p className='text-white text-[23px] leading-[31px] font-extrabold tracking-def text-center'>
          {t(`pages.auth.banner.title.text_1`)}
          <span>{t(`pages.auth.banner.title.text_2`)}</span>
        </p>
        <span className='text-white text-[16px] text-center font-light tracking-def leading-[22px]'>
          {t(`pages.auth.banner.subtitle`)}
        </span>
      </div>
    </div>
  )
}

export default Preview
