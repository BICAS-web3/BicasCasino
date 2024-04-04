import Link from 'next/link'

interface INavigation {
  isSignup: 'up' | 'in' | 'recovery'
}

const Navigation = ({ isSignup }: INavigation) => (
  <div className='mt-[20px] flex'>
    <Link
      href={'/auth/registration'}
      className={`
                    transition-all duration-400 cursor-pointer flex h-[45px]
                    items-center justify-center w-[80px] text-[14px] font-normal
                    leading-[19px] tracking-def border-b border-border-black
                    ${
                      isSignup === 'up'
                        ? 'bg-[linear-gradient(180deg,_rgba(255,_183,_0,_0)_19.23%,_rgba(255,_183,_0,_0.15)_100%)] border-b !border-orange !text-white'
                        : ''
                    }
                  `}
    >
      Sign Up
    </Link>
    <Link
      href='/auth/login'
      className={`
                  transition-all duration-400 cursor-pointer flex h-[45px]
                  items-center justify-center w-[80px] text-[14px] font-normal
                  leading-[19px] tracking-def border-b border-border-black
                  ${
                    isSignup === 'in'
                      ? 'bg-[linear-gradient(180deg,_rgba(255,_183,_0,_0)_19.23%,_rgba(255,_183,_0,_0.15)_100%)] border-b !border-orange !text-white'
                      : ''
                  }
                `}
    >
      Sign In
    </Link>
  </div>
)

export default Navigation
