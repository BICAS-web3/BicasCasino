import { GameModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const list = [
  {
    title: 'Sound',
    enabled: true
  },
  {
    title: 'notification',
    enabled: false
  }
]

interface SettingsPreferencesProps {}

export const SettingsPreferences: FC<SettingsPreferencesProps> = () => {
  const [switchSounds, playSounds, setShowNotification, showNotification] =
    useUnit([
      GameModel.switchSounds,
      GameModel.$playSounds,
      UserModel.setShowNotification,
      UserModel.$showNotification
    ])
  const [activeList, setActiveList] = useState(list)

  useEffect(() => {
    setActiveList(prevActiveList =>
      prevActiveList.map(item =>
        item.title === 'Sound'
          ? { ...item, enabled: playSounds === 'on' }
          : item
      )
    )
  }, [playSounds])

  useEffect(() => {
    setActiveList(prevActiveList =>
      prevActiveList.map(item =>
        item.title !== 'Sound' ? { ...item, enabled: !showNotification } : item
      )
    )
  }, [showNotification])

  const switchHandler = (title: string) => {
    const updatedList = activeList.map(item => {
      if (item.title === title) {
        if (title === 'Sound') {
          if (item.enabled) {
            switchSounds('off')
          } else {
            switchSounds('on')
          }
        } else {
          setShowNotification(!showNotification)
        }
        return {
          ...item,
          enabled: !item.enabled
        }
      }
      return item
    })

    setActiveList(updatedList)
  }

  const { t } = useTranslation()
  return (
    <div className='border border-[#3E3E3E] rounded-[5px]'>
      <div className='flex flex-col items-center justify-center p-[20px] gap-[22px]'>
        {activeList.map((item, ind) => (
          <div
            key={ind}
            className='w-full max-w-[400px] flex items-center justify-between'
          >
            <span
              className={`${
                item.enabled ? 'text-[#979797]' : 'text-[#464646]'
              } leading-[18px] text-[14px] font-medium`}
            >
              {t(`pages.settings.Preferences.${item.title}`)}
            </span>
            <div
              className={`w-[30px] cursor-pointer h-[16px] relative rounded-[15px] ${
                item.enabled ? 'bg-[#C3A86E]' : 'bg-[#282828]'
              }`}
              onClick={() => switchHandler(item.title)}
            >
              <div
                className={`h-[16px] w-[16px] absolute transition-all duration-300 rounded-[50%] ${
                  item.enabled ? 'bg-[#FFE09D]' : 'bg-[#3E3E3E]'
                } ${item.enabled ? '!left-[calc(100%_-_16px)]' : 'left-0]'} ${
                  item.enabled
                    ? 'shadow-[0px_0px_4px_0px_#00000040]'
                    : 'shadow-[0px_0px_4px_0px_#00000040]'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center text-center justify-center border-t-[1px] border-[#3E3E3E] p-[25px] text-[14px] font-normal text-[#7E7E7E]'>
        {t(`pages.settings.Preferences.text`)}
      </div>
    </div>
  )
}
// {
//   title: 'purchase',
//   enabled: false
// },
// {
//   title: 'redeem',
//   enabled: false
// },
// {
//   title: 'hide_message',
//   enabled: false
// },
// {
//   title: 'amount',
//   enabled: true
// },
// {
//   title: 'hide_redeem',
//   enabled: false
// },
// {
//   title: 'total',
//   enabled: false
// },
// {
//   title: 'ghost',
//   enabled: true
// },
// {
//   title: 'refuse_req',
//   enabled: true
// },
// {
//   title: 'chatroom',
//   enabled: true
// },
