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

  const backgroundImageUrl = isMobile
    ? '/images/main_banner/0banner.png'
    : isTablet || isLargeScreen
    ? '/images/main_banner/1xbanner.png'
    : '/images/main_banner/2xbanner.png'

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
      style={
        {
          '--background-image': `url(${backgroundImageUrl})`,
          backgroundImage: 'var(--background-image)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } as React.CSSProperties
      }
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
              isMobile
                ? 'text-sm'
                : isTablet
                ? 'text-base'
                : isLargeScreen
                ? 'text-base'
                : 'text-lg',
              isMobile
                ? 'w-full'
                : isTablet
                ? 'w-48'
                : isLargeScreen
                ? 'w-48'
                : 'w-56'
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
