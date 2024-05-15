import { FC } from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { SubmitBtn } from '../submitBtn/SubmitBtn'
import { useTranslation } from 'react-i18next'

interface SettingsEmailProps {}

export const SettingsEmail: FC<SettingsEmailProps> = () => {
  const btnHandler = () => {
    console.log('Button clicked')
  }

  const { t } = useTranslation()
  return (
    <div className='border border-[#3E3E3E] rounded-[5px] '>
      <div className='p-[20px]'>
        <InputBlock
          isNecessarily={true}
          placeholder={t(`pages.settings.email.current`)}
          disabled={false}
          title={t(`pages.settings.email.user`)}
        />
      </div>
      <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]'>
        <SubmitBtn
          title={t(`pages.settings.email.send`)}
          handler={btnHandler}
        />
      </div>
      <div className='p-[20px] border-[#3E3E3E] border-t-[1px]'>
        <InputBlock
          isNecessarily={true}
          placeholder={t(`pages.settings.email.code`)}
          disabled={false}
          title={t(`pages.settings.email.user`)}
          subTitle={t(`pages.settings.email.send`)}
        />
      </div>
      <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]'>
        <SubmitBtn title={t(`pages.settings.email.btn`)} handler={btnHandler} />
      </div>
    </div>
  )
}
