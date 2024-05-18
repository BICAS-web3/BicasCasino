import { FC, useState } from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { SubmitBtn } from '../submitBtn/SubmitBtn'
import { toast } from 'sonner'
import { useUnit } from 'effector-react'
import { RegistrModel, UserModel } from '@/states'
import { changeName } from '@/api'
import { useTranslation } from 'react-i18next'

interface SettingsProfileProps {}

export const SettingsProfile: FC<SettingsProfileProps> = () => {
  const [username, setUsername] = useState('')
  const [
    userInfo,
    access_token,
    showNotification,
    setUpdateUserInfo,
    updateUserInfo
  ] = useUnit([
    UserModel.$userInfo,
    RegistrModel.$access_token,
    UserModel.$showNotification,
    UserModel.setUpdateUserInfo,
    UserModel.$updateUserInfo
  ])
  const { t } = useTranslation()

  const btnHandler = async () => {
    if (!username) {
      showNotification && toast(t(`toast.full_name`))
    } else {
      const data = await changeName({ bareer: access_token, name: username })
      if (data.status === 'OK') {
        showNotification && toast(t(`toast.success`))
        setUpdateUserInfo(updateUserInfo + 1)
      } else {
        showNotification && toast(t(`toast.error`))
      }
    }
  }

  return (
    <div className='border border-[#3E3E3E] rounded-[5px] '>
      <div className='p-[20px] flex flex-col gap-[20px]'>
        <InputBlock
          placeholder={userInfo?.username || ''}
          disabled={true}
          title={t(`pages.settings.Profile.Username`)}
          subTitle={t(`pages.settings.Profile.text_1`)}
        />
        <InputBlock
          placeholder={t(`pages.settings.Profile.username`)}
          disabled={false}
          title={t(`pages.settings.Profile.Username`)}
          isNecessarily={true}
          value={username}
          setValue={setUsername}
        />
      </div>
      <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]'>
        <SubmitBtn
          title={t(`pages.settings.Profile.btn`)}
          handler={btnHandler}
        />
      </div>
    </div>
  )
}
