import Link from 'next/link'
import { socials } from '../data'

const Social = () => {
  return (
    <div className='flex flex-col gap-y-6'>
      <h6 className='text-[#979797] text-base font-normal'>
        Join our Community
      </h6>
      <div className='grid w-auto justify-evenly gap-3 grid-cols-2 md:grid-cols-4'>
        {socials.map((item, index) => (
          <Link
            href={item.href}
            target='_blank'
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
