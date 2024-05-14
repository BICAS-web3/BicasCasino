import { FC, useState } from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { SubmitBtn } from '../submitBtn/SubmitBtn'
import { toast } from 'sonner'
import { changePassword } from '@/api'
import { useUnit } from 'effector-react'
import { RegistrModel } from '@/states'
import { useTranslation } from 'react-i18next'

interface SettingsPasswordProps {}

export const SettingsPassword: FC<SettingsPasswordProps> = () => {
  const [access_token] = useUnit([RegistrModel.$access_token])
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { t } = useTranslation()

  const btnHandler = async () => {
    if (!currentPassword) {
      toast(t(`toast.password_1`))
    } else if (!newPassword) {
      toast(t(`toast.password_2`))
    } else if (!confirmPassword) {
      toast(t(`toast.password_3`))
    } else if (newPassword !== confirmPassword) {
      toast(t(`toast.password_4`))
    } else {
      const data = await changePassword({
        bareer: access_token,
        new_password: newPassword,
        old_password: currentPassword
      })
      if (data.status === 'OK') {
        toast(t(`toast.success`))
      } else {
        toast(t(`toast.error`))
      }
    }
  }

  return (
    <div className='border border-[#3E3E3E] rounded-[5px]'>
      <div className='p-[20px] flex flex-col gap-[20px]'>
        <InputBlock
          type={t(`pages.settings.password.password`)}
          value={currentPassword}
          setValue={setCurrentPassword}
          placeholder={t(`pages.settings.password.Current`)}
          disabled={false}
          title={t(`pages.settings.password.current`)}
          isNecessarily={true}
        />
        <InputBlock
          type={t(`pages.settings.password.password`)}
          value={newPassword}
          setValue={setNewPassword}
          placeholder={t(`pages.settings.password.New`)}
          disabled={false}
          title={t(`pages.settings.password.new`)}
          isNecessarily={true}
        />
        <InputBlock
          type={t(`pages.settings.password.password`)}
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder={t(`pages.settings.password.Confirm`)}
          disabled={false}
          title={t(`pages.settings.password.confirm`)}
          isNecessarily={true}
        />
      </div>
      <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]'>
        <SubmitBtn
          title={t(`pages.settings.password.btn`)}
          handler={btnHandler}
        />
      </div>
    </div>
  )
}
