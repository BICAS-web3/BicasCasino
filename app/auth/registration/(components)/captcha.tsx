import HCaptcha from '@hcaptcha/react-hcaptcha'
import React, { useEffect, useRef } from 'react'
import getConfig from 'next/config'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useUnit } from 'effector-react'
import { UserModel } from '@/states'

export interface CaptchaProps {
  show: boolean
  onToken: (token: string) => void
  startCaptcha: boolean
}

export const Captcha: React.FunctionComponent<CaptchaProps> = ({
  show,
  onToken,
  startCaptcha
}) => {
  if (!show) {
    return null
  }

  const captchaRef = useRef<HCaptcha>(null)
  const [showNotification] = useUnit([UserModel.$showNotification])
  useEffect(() => {
    if (startCaptcha) {
      captchaRef.current?.execute()
    }
  }, [startCaptcha])

  const { t } = useTranslation()

  return (
    <>
      <h3 className='text-sm text-gray-400'>Please verify</h3>
      <HCaptcha
        ref={captchaRef}
        theme={'dark'}
        sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
        onVerify={onToken}
        onExpire={() => onToken('')}
        onError={err => {
          onToken('')
          showNotification && toast(t(`toast.captcha`))
          console.error(err)
        }}
      />
    </>
  )
}

export default Captcha
