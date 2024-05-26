import { ChatM, SidebarModel } from '@/states'
import { useUnit } from 'effector-react'
import {FC, ReactNode} from 'react'

interface MainWrapProps {
    children: ReactNode
}

export const MainWrap:FC<MainWrapProps> = ({children}) => {

    const [sbState, chatState] = useUnit([
        SidebarModel.$open,
        ChatM.$chatVisibility
    ])
    
    return (
        <div
                    id="mainContent"
                    className={`w-full flex transition-all tbbs:ml-[90px] mmd:ml-0 duration-200 justify-between flex-col overflow-hidden
                        ${chatState && sbState ? 'w-full mda:w-[calc(100%_-_450px)] mmd:w-[calc(100%_-_670px)]' : 'w-full'}
                        ${chatState && !sbState ? 'w-full mda:w-[calc(100%_-_450px)] mmd:w-[calc(100%_-_505px)]' : 'w-full'}
                    `}
                  >
                    {children}
                  </div>
    )
}