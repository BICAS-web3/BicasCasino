import Link from 'next/link'
import { socials } from '../data'
import { useTranslation } from 'react-i18next'

const Social = () => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col gap-y-6 '>
      <h6 className='text-[#979797] tracking-[1px] text-center font-normal'>
        {t('footer.join')}
      </h6>
      <div className='grid w-auto justify-evenly gap-x-6 gap-y-4 sm:gap-3 grid-cols-4'>
        {socials.map((item, index) => (
          <Link
            href={item.href}
            target='_blank'
            className='flex justify-center'
            key={`${item.title}_${index}`}
            rel='noopener noreferrer'
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Social
