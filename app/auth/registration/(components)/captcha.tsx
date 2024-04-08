import HCaptcha from '@hcaptcha/react-hcaptcha'
import React, { useEffect, useRef } from 'react'
import getConfig from 'next/config'
import { toast } from 'sonner'

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

  // useEffect(() => toast('Event has been created.'), [])

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
          toast('Error, Cannot verify captcha.')
          console.error(err)
        }}
      />
    </>
  )
}

export default Captcha
