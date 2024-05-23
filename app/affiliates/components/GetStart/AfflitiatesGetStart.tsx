import { FC, useEffect, useState } from 'react'
import CopyIco from '@/public/images/payment/copyIco.svg'
import { SubmitBtn } from '@/app/profile/components/submitBtn/SubmitBtn'
import { useTranslation } from 'react-i18next'
import { useUnit } from 'effector-react'
import { RegistrModel, UserModel } from '@/states'
import { getLink } from '@/api'
import { toast } from 'sonner'

interface AffiliatesGetStartProps {}

export const AffiliatesGetStart: FC<AffiliatesGetStartProps> = () => {
  const copy = () => {
    navigator.clipboard.writeText(
      link || 'https://greekepeers.vip/?c=c_kytmisha'
    )
    toast('Copy!')
  }

  const { t } = useTranslation()
  const [userInfo, access_token] = useUnit([
    UserModel.$userInfo,
    RegistrModel.$access_token
  ])
  const [link, setLink] = useState('')

  useEffect(() => {
    if (access_token && userInfo?.username) {
      ;(async () => {
        const response = await getLink({
          bareer: access_token,
          user_name: userInfo.username
        })
        if (response.status === 'OK') {
          setLink((response.body as any)?.message)
        } else {
          toast('Error!')
        }
      })()
    }
  }, [access_token, userInfo?.username])

  return (
    <div className='border border-[#3E3E3E] rounded-[5px]'>
      <div className='p-[20px]'>
        <p className='text-sm leading-[18px] font-bold max-w-[555px] block mb-[14px]'>
          {t(`pages.affiliates.start.text`)}
        </p>
        <div className='flex flex-col gap-[4px] max-w-[390px]'>
          <span className='text-sm font-bold leading-[18px] '>
            {t(`pages.affiliates.start.for_games`)}
          </span>
          <div className='bg-[#181818] rounded-[5px] box-border p-[12px_10px_12px_10px] text-[#7e7e7e] text-[11px] sm:text-[13px] leading-[18px] font-normal'>
            {t(`pages.affiliates.start.games_text`)}
          </div>
        </div>
        <div className='flex flex-col gap-[4px] max-w-[390px] mt-[14px]'>
          <span className='text-sm font-bold leading-[18px] '>
            {t(`pages.affiliates.start.for_party`)}
          </span>
          <div className='bg-[#181818] rounded-[5px] box-border p-[12px_10px_12px_10px] text-[#7e7e7e] text-[11px] sm:text-[13px] leading-[18px] font-normal'>
            {t(`pages.affiliates.start.wagered_text`)}
          </div>
        </div>
        <p className='text-[14px] font-normal mt-[5px] text-[#7E7E7E] leading-[18px] max-w-[337px]'>
          {t(`pages.affiliates.start.comission`)}
        </p>
        <div className='max-w-[360px] mt-[14px]'>
          <span>{t(`pages.affiliates.start.referal`)}</span>
          <div
            onClick={copy}
            className='flex cursor-pointer  box-border items-center p-[0_20px_0_10px] justify-between gap-[10px] rounded-[5px] bg-[#121212] border border-[#252525] h-[40px] '
          >
            <p className='text-nowrap text-ellipsis overflow-hidden'>
              {link || ' https://greekepeers.vip/?c=c_kytmisha'}
            </p>{' '}
            <CopyIco className='min-w-[24px]' />
          </div>
        </div>
      </div>
      <div className='flex justify-end items-center border border-[#3E3E3E] p-[20px]'>
        <a
          type='download'
          className={`
            rounded-[5px] border border-[#907640] flex items-center justify-center text-[#FFE09D] text-[14px] sm:text-[16px] font-regular w-full ${
              window.innerWidth < 650 ? '!max-w-[200px]' : 'max-w-[120px]'
            } ${
            false ? '!max-w-[100%]' : 'max-w-[120px]'
          } p-[0px_10px] sm:w-full sm:max-w-[250px] min-h-[40px] bg-[#252019]
        `}
          href='/data/Banners-Affiliate.rar'
        >
          {t(`pages.affiliates.start.btn`)}
        </a>
      </div>
    </div>
  )
}
