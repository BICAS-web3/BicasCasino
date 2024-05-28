import { useSocket } from '@/components/providers/socket.provider'
import TgIco from '@/public/images/chat/sendIco.svg'
import { ChatM, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'sonner'
import { MessageItem } from './MessageItem'
import { useTranslation } from 'react-i18next'

interface ChatProps {}

export const Chat: FC<ChatProps> = () => {
  const socket = useSocket()
  const [visibility, setVisibility, userInfo, access_token, messageData] =
    useUnit([
      ChatM.$chatVisibility,
      ChatM.setChatVisibility,
      UserModel.$userInfo,
      RegistrModel.$access_token,
      ChatM.$messageData
    ])

  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (socket && access_token && socket.readyState === WebSocket.OPEN) {
      if (!message) {
        toast.error('Need Message!')
      } else {
        socket.send(
          JSON.stringify({
            type: 'NewMessage',
            message,
            mentions: [],
            chat_room: 17
          })
        )
        setMessage('')
      }
    }
  }

  const handleChatClick = () => {
    setVisibility(false)
  }

  const { t } = useTranslation()

  return (
    <div
      className={`w-full tbs:w-[360px] ${
        visibility ? 'right-0' : 'right-[-150%]'
      } mmd:w-[415px] bg-[#181818] border-l border-[#252525] h-[calc(100%_-_112px)] sm:h-[calc(100vh_-_60px)] box-border pt-[24px] fixed right-0 top-[56px] sm:top-[60px] z-[99] flex flex-col transition-all duration-300`}
    >
      <div className='flex justify-between items-center gap-[10px] p-[0_16px]'>
        <div className='flex gap-[10px] items-center'>
          <span className='text-[18px] font-medium text-[#fff]'>
            {t('pages.chat.chat')}
          </span>
          <span className='gap-[5px] flex items-center'>
            <div className='rounded-[50%] w-[10px] h-[10px] bg-[#4ED26C] animate-pulse'></div>
            <span className='text-[16px] font-light'>
              {t('pages.chat.online')}: 858
            </span>
          </span>
        </div>
        <X
          onClick={handleChatClick}
          className='w-[20px] h-[20px] cursor-pointer text-[#464646]'
        ></X>
      </div>
      <div className='flex flex-col gap-[10px] mt-[45px] flex-[1] p-[0_16px] overflow-auto pb-[20px]'>
        {messageData.map((item, i) => (
          <MessageItem data={item} />
        ))}
      </div>
      <div className='h-[80px] bg-[#252525] border-t-[1px] border-[#1a1a1a] p-[16px] flex gap-[10px]'>
        <div className='p-[16px_10px_16px_8px] h-[50px] bg-[#151515] w-full gap-[20px] flex items-center justify-between rounded-[5px] border border-[#282828]'>
          <input
            value={message}
            onChange={el => setMessage(el.target.value)}
            type='text'
            placeholder={t('pages.chat.send_message')}
            className=' text-[#494949] w-full placeholder:text-[#494949] text-[16px] font-normal bg-inherit '
          />
          <div className='flex gap-[10px] items-center'>
            {/* <GifIco className='cursor-pointer w-[24px] h-[20px]' />
            <SmileIco className='hidden sm:block cursor-pointer w-[20px] h-[20px]' /> */}
            <TgIco
              onClick={handleSendMessage}
              className='w-[20px] h-[20px] block sm:hidden'
            />
          </div>
        </div>
        <div
          onClick={handleSendMessage}
          className='hidden sm:flex items-center justify-center min-w-[80px] h-[49px] border border-[#907640] bg-[#252019] rounded-[5px] cursor-pointer box-border'
        >
          <TgIco className='w-[20px] h-[20px]' />
        </div>
      </div>
    </div>
  )
}
