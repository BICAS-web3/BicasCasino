import Link from 'next/link'

const LoginLink = ({ setIsSignup }: { setIsSignup: (el: string) => void }) => {
  return (
    <Link href='/auth/login' className='flex items-center'>
      <span
        className='text-[13px] font-normal text-bets-title-color leading-[17px]
              tracking-def'
      >
        Already have an account?
      </span>
      <span
        className='cursor-pointer text-orange text-[16px] font-semibold leading-[22px] tracking-def mb-[3px]
            '
        onClick={() => setIsSignup('in')}
      >
        &nbsp; Sign in
      </span>
    </Link>
  )
}

export default LoginLink
