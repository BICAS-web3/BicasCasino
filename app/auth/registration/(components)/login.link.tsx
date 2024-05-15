import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const LoginLink = ({
  setIsSignup,
  className
}: {
  setIsSignup: (el: string) => void
  className?: string
}) => {
  const { t } = useTranslation()
  const signIn = () => setIsSignup('in')
  return (
    <Link href='/auth/login' className={`flex items-center ${className}`}>
      <span className='text-[13px] font-normal text-bets-title-color leading-[17px] tracking-def'>
        {t(`pages.auth.textes.have`)}
      </span>
      <span
        className='cursor-pointer text-orange text-[13px] font-normal leading-[22px] tracking-def mb-[3px]'
        onClick={signIn}
      >
        &nbsp; {t(`pages.auth.btns.in`)}
      </span>
    </Link>
  )
}

export default LoginLink
