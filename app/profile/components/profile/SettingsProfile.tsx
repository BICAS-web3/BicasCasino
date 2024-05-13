import { FC, useState } from 'react'
import { InputBlock } from '../inputBlock/InputBlock'
import { SubmitBtn } from '../submitBtn/SubmitBtn'
import { toast } from 'sonner'
import { useUnit } from 'effector-react'
import { RegistrModel, UserModel } from '@/states'
import { changeName } from '@/api'

interface SettingsProfileProps {}

export const SettingsProfile: FC<SettingsProfileProps> = () => {
  const [username, setUsername] = useState('')
  const [userInfo, access_token] = useUnit([
    UserModel.$userInfo,
    RegistrModel.$access_token
  ])

  const btnHandler = async () => {
    if (!username) {
      toast('Fill username!')
    } else {
      const data = await changeName({ bareer: access_token, name: username })
      if (data.status === 'OK') {
        toast('Success!')
      } else {
        toast('Error!')
      }
    }
  }

  return (
    <div className='border border-[#3E3E3E] rounded-[5px] '>
      <div className='p-[20px] flex flex-col gap-[20px]'>
        <InputBlock
          placeholder={userInfo?.username || ''}
          disabled={true}
          title='Username'
          subTitle='(The username and email are the only credentials for login)'
        />
        <InputBlock
          placeholder='username'
          disabled={false}
          title='Username'
          isNecessarily={true}
          value={username}
          setValue={setUsername}
        />
      </div>
      <div className='flex items-center justify-end p-[20px] border-[#3E3E3E] border-t-[1px]'>
        <SubmitBtn title='Update' handler={btnHandler} />
      </div>
    </div>
  )
}
