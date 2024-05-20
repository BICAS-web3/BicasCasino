import { FC, useEffect, useState } from 'react'
import Corner from '@/public/images/chat/chatCorner.svg'
import { IMessage } from '@/states/chat.store'
import { getUserInfo } from '@/api'
import { useUnit } from 'effector-react'
import { RegistrModel } from '@/states'
import { toast } from 'sonner'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
interface MessageItemProps {
  data: IMessage
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const MessageItem: FC<MessageItemProps> = ({ data }) => {
  const [level, setLevel] = useState<null | number>(null)
  const [access_token] = useUnit([RegistrModel.$access_token])

  // Получить текущее время в момент создания компонента
  const time = formatTime(new Date())

  useEffect(() => {
    if (data.user_id && access_token) {
      ;(async () => {
        const data = await getUserInfo({ bareer: access_token })
        if (data.status === 'OK') {
          setLevel((data as any).body?.user_level)
        } else {
          toast.error('Error data!')
        }
      })()
    }
  }, [data.user_id, access_token])

  return (
    <div
      className='flex items-end gap-[10px]'
      //bg-[#9746B5]
    >
      <div className='min-w-[30px] h-[30px] uppercase rounded-[50%] flex items-center justify-center relative ava'>
        <span className='relative uppercase z-[2] text-white'>
          {data.username[0]}
        </span>
        <Jazzicon seed={jsNumberForAddress(data.username)} />
        <div className='absolute z-[2] bottom-[-10px] rounded-[12px] bg-[#252525] w-full flex justify-center items-center leading-[16px] !text-[10px] font-semibold h-[16px] box-border p-[2px] lowercase'>
          lvl {level}
        </div>
      </div>
      <div className='box-border relative w-full p-[8px] bg-[#252525] rounded-[5px_5px_5px_0] flex flex-col gap-[4px]'>
        <div className='items-center flex justify-between'>
          <span className='text-[16px] font-medium text-[#9746B5]'>
            {data.username}
          </span>
          <span className='text-[12px] font-medium text-[#676767]'>
            {data.time}
          </span>
        </div>
        <p className='text-[#aaa] text-[16px] font-normal'>{data.message}</p>
        <Corner className='absolute bottom-0 left-[-4px]' />
      </div>
    </div>
  )
}
