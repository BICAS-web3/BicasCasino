'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PaymentModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { useSession } from 'next-auth/react'

const Preview = ({ className }: { className?: string }) => {
  const [userInfo] = useUnit([UserModel.$userInfo])
  const [setVisibility, visibility] = useUnit([
    PaymentModel.setTotalVisibility,
    PaymentModel.$totalVisibility
  ])

  const handleAction = () => {
    setVisibility(!visibility)
  }
  return (
    <article
      className={cn(
        'flex items-center flex-col lg:block w-full h-[350px] sm:h-[440px]',
        'relative pt-10 p-[10px] overflow-hidden bg-cover preview',
        className
      )}
      style={{
        backgroundImage: `url('/images/main_banner/2xbanner.png')`,
        backgroundSize: 'cover',
        backgroundPositionX: '70%'
      }}
    >
      <h2 className='text-center z-20 lg:text-left font-bold text-2xl sm:text-[34px] leading-[46px] relative'>
        Hello {userInfo?.username || ''} <br />
        Bonus on the first deposit
      </h2>
      <h1 className='text-center uppercase leading-[65px] sm:leading-[100px] z-20 lg:text-left text-[50px] sm:text-[78px] font-black relative text-[#B4E915]'>
        +$100
        <br />{' '}
        <span className='-translate-y-5 block text-center uppercase leading-[65px] sm:leading-[100px] z-20 lg:text-left text-[50px] sm:text-[68px] font-black relative text-[#B4E915]'>
          Reward
        </span>
      </h1>
      <div className='h-full items-end sm:h-auto mt-3 z-20 relative flex flex-nowrap gap-2 sm:gap-2.5 px-4 w-full'>
        <Button
          onClick={handleAction}
          variant='secondary'
          style={{
            boxShadow:
              '0px 0px 10px rgba(236, 129, 37, 0.9), inset 0px 0px 10px #EC8125'
          }}
          className='w-1/2 sm:w-[182px] flex items-center justify-center box-border h-9 bg-[#20202050] backdrop-blur-md duration-500 transition-colors border border-[#FFEF29]'
        >
          Deposit and play
        </Button>
        <Button
          variant='secondary'
          className='w-1/2 sm:w-[182px] flex items-center justify-center box-border h-9 bg-[#20202050] backdrop-blur-md duration-500 transition-colors border border-[#363636]'
        >
          Free Play
        </Button>
      </div>
    </article>
  )
}

export default Preview
