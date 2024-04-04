import HCaptcha from '@hcaptcha/react-hcaptcha'
import React, { useEffect, useRef } from 'react'
import getConfig from 'next/config'
// import { showNotification } from '@mantine/notifications'

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

  useEffect(() => {
    if (startCaptcha) {
      captchaRef.current?.execute()
    }
  }, [startCaptcha])

  return (
    <>
      <h3 className='text-sm text-gray-400'>Please verify</h3>
      <HCaptcha
        ref={captchaRef}
        theme={'dark'}
        sitekey={process.env.SITE_KEY || 'acc50dba-cb02-4c2c-b131-5870b6e6dce7'}
        onVerify={onToken}
        onExpire={() => onToken('')}
        onError={err => {
          onToken('')
          // showNotification({
          //   title: 'Error',
          //   message: 'Cannot verify captcha'
          // })
          console.error(err)
        }}
      />
    </>
  )
}

export default Captcha
