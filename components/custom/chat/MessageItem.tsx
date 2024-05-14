import {FC} from 'react'
import Corner from '@/public/images/chat/chatCorner.svg'

interface MessageItemProps {
    userLvL: number,
    username: string,
    userMessage: string,
    time: string
}

export const MessageItem:FC<MessageItemProps> = ({userLvL, userMessage, username, time}) => {
    return (
        <div className="flex items-end gap-[10px]">
            <div className='min-w-[30px] h-[30px] bg-[#9746B5] uppercase rounded-[50%] flex items-center justify-center relative'>
                {username[0]}
                <div className='absolute bottom-[-10px] rounded-[12px] bg-[#252525] w-full flex justify-center items-center leading-[16px] !text-[10px] font-semibold h-[16px] box-border p-[2px] lowercase'>lvl {userLvL}</div>
            </div>
            <div className='box-border relative p-[8px] bg-[#252525] rounded-[5px_5px_5px_0] flex flex-col gap-[4px]'>
                <div className='items-center flex justify-between'>
                    <span className='text-[16px] font-medium text-[#9746B5]'>{username}</span>
                    <span className='text-[12px] font-medium text-[#676767]'>{time}</span>
                </div>
                <p className='text-[#aaa] text-[16px] font-normal'>
                    {userMessage}
                </p>
                <Corner className='absolute bottom-0 left-[-4px]' />
            </div>
        </div>
    )
}