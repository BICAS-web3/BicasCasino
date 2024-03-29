import { FC } from 'react'
import s from './styles.module.scss'
import { RegistrM } from '@/states'
import { useUnit } from 'effector-react'

interface PasswordRecoveryProps {}

export const PasswordRecovery: FC<PasswordRecoveryProps> = () => {
  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup
  ])

  return (
    <div
      className='
        flex flex-col sm:gap-[20px] gap-[10px] mt-[10px] sm:mt-[20px] 
      '
    >
      <div className='flex flex-col gap-[5px]'>
        <span
          className='
            text-[14px] sm:text-[16px] font-normal text-left text-bets-title-color
            tracking-def
          '
        >
          Email
        </span>
        <input
          type='text'
          className='
          bg-[#121212] rounded-[8px] sm:p-[15px_20px] p-[7.5px_10px]
          text-white text-[14px] sm:text-[16px] font-normal leading-[22px]
          tracking-def text-left outline-none border border-border-black
        '
        />
      </div>
      <button
        className='
        text-[16px] h-[40px] border border-orange cursor-pointer flex
            justify-center items-center rounded-[8px] w-full text-orange
            font-bold leading-[16px] tracking-def text-center transition-all duration-300
            relative overflow-hidden after:transition-all after:opacity-0 after:duration-300
            after:invisible after:w-[40px] after:h-[40px] after:absolute after:bottom-[-20px]
            after:left-[50%] after:translate-x-[-50%] after:bg-[#ffb800] after:mix-blend-hard-light
            after:rounded-[100px] after:blur-[50px] hover:after:opacity-100 hover:after:visible
            active:after:blur-[45px] active:after:w-[50px] active:after:h-[50px]
        '
      >
        Reset Password
      </button>
      <span
        className='
          text-[16px] font-normal leading-[22px] tracking-def
          text-left text-bets-title-color flex
        '
        onClick={() => setIsSignup('in')}
      >
        Already have an account?{' '}
        <p
          className='
          font-semibold text-orange 
        '
        >
          &nbsp;Sign In
        </p>
      </span>
    </div>
  )
}
