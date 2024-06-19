'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PaymentModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { useMediaQuery } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'

const Preview = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery('(max-width: 400px)')
  const isTablet = useMediaQuery('(max-width: 700px)')
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  const isLargeScreen = useMediaQuery('(max-width: 1280px)')

  const [userInfo] = useUnit([UserModel.$userInfo])
  const [setVisibility, visibility] = useUnit([
    PaymentModel.setTotalVisibility,
    PaymentModel.$totalVisibility
  ])

  const handleAction = () => {
    setVisibility(!visibility)
  }
  const { t } = useTranslation()

  return (
    <article
      className={cn(
        'flex items-center flex-col w-full',
        isMobile
          ? 'h-[350px]'
          : isTablet
          ? 'h-[440px]'
          : isLargeScreen
          ? 'h-[480px]'
          : 'h-[500px]',
        'relative pt-10 p-4 overflow-hidden bg-cover preview',
        className
      )}
      style={{
        '--background-image': isMobile
          ? `url('/images/main_banner/0banner.png')`
          : isTablet
          ? `url('/images/main_banner/1xbanner.png')`
          : isLargeScreen
          ? `url('/images/main_banner/1xbanner.png')`
          : `url('/images/main_banner/2xbanner.png')`,
        backgroundImage: 'var(--background-image)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className={cn(
          'relative z-20 w-full ',
          isLargeScreen
            ? 'text-center mt-10'
            : 'lg:absolute lg:left-4 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:w-auto',
          isLargeScreen ? 'mt-20' : ''
        )}
      >
        <h2
          className={cn(
            'font-bold leading-tight',
            isMobile
              ? 'text-lg text-center'
              : isTablet
              ? 'text-2xl text-center'
              : isLargeScreen
              ? 'text-2xl text-center'
              : 'text-3xl text-left',
            isMobile
              ? 'leading-snug'
              : isTablet
              ? 'leading-snug'
              : 'leading-normal'
          )}
        >
          {t('pages.main.preview.hello')} {userInfo?.username || ''} <br />
          {t('pages.main.preview.about_deposit')}
        </h2>
        <h1
          className={cn(
            'uppercase font-black text-[#B4E915] mt-2',
            isMobile
              ? 'text-xl text-center'
              : isTablet
              ? 'text-3xl text-center'
              : isLargeScreen
              ? 'text-3xl text-center'
              : 'text-5xl text-left',
            isMobile
              ? 'leading-snug'
              : isTablet
              ? 'leading-snug'
              : 'leading-normal'
          )}
        >
          {t('pages.main.preview.offer_reward')} $100.00
          <br />
          <span
            className={cn(
              'block uppercase font-black text-[#B4E915] mt-1',
              isMobile
                ? 'text-lg text-center'
                : isTablet
                ? 'text-2xl text-center'
                : isLargeScreen
                ? 'text-2xl text-center'
                : 'text-4xl text-left',
              isMobile
                ? 'leading-snug'
                : isTablet
                ? 'leading-snug'
                : 'leading-normal'
            )}
          >
            {t('pages.main.preview.reward')}
          </span>
        </h1>
        <div
          className={cn(
            'mt-4 flex',
            isLargeScreen ? 'justify-center' : 'justify-center lg:justify-start'
          )}
        >
          <Button
            onClick={handleAction}
            variant='secondary'
            className={cn(
              'w-full h-10 bg-[#20202050] backdrop-blur-md transition duration-500 border border-[#FFEF29] flex items-center justify-center',
              {
                'text-sm': isMobile,
                'text-base': isTablet || isLargeScreen,
                'text-lg': !isMobile && !isTablet && !isLargeScreen
              },
              {
                'w-full': isMobile,
                'w-48': isTablet || isLargeScreen,
                'w-56': !isMobile && !isTablet && !isLargeScreen
              },
              'shadow-[inset_0px_0px_10px_0px_#EC8125] shadow-[0px_0px_10px_0px_#EC8125E5]'
            )}
          >
            {t('pages.main.preview.btn')}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default Preview
