import { cn } from '@/lib/utils'
import { HeaderM, ModalsModel, PaymentModel, SidebarModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import {
  BurgerMenuSVG,
  ChatSVG,
  UserSVG,
} from './icons/mobile'
import PlayIco from '@/public/images/misc/play.svg'

import Wallet from '@/components/custom/sidebar/components/icons/mobile/walIco.svg'

type Props = {
  open: boolean
  handleAction: () => void
}

const SidebarMobileSettings = ({ open, handleAction }: Props) => {
  const isMobile = useMediaQuery('(max-width:768px)')

  const [setVisibility, visibility, setUserModal, setGames, gamesState,setSidebar] = useUnit([
    PaymentModel.setTotalVisibility,
    PaymentModel.$totalVisibility,
    HeaderM.setUserModalVisibility,
    ModalsModel.setGamesModal,
    ModalsModel.$gamesModal,
    SidebarModel.setOpen
  ])

  const handlePaymentAction = () => {
    setUserModal(false) 
    setVisibility(!visibility)
  }
  const handleGamesOpen = () => {
    setUserModal(false)

    if(open && window.innerWidth < 650) {
      setSidebar(false)
      setGames(!gamesState)
    } else {
      setGames(!gamesState)
    }
  }
  return (
    <div
      className={cn(
        'flex justify-between items-center bg-[#121212] w-full py-2 px-5',
        open ? '' : 'gap-4'
      )}
    >
      <div onClick={handleAction} className="w-[40px] bottom-svg flex items-center justify-center h-[40px]" >
        <BurgerMenuSVG className='object-contain text-[#7E7E7E]' />
      </div>
      <div data-games={true} className="w-[40px] h-[40px] bottom-svg flex items-center justify-center" onClick={handleGamesOpen}>
        <PlayIco data-games={true} className='object-contain text-[#7E7E7E]' />
      </div>
      <div className="w-[40px] h-[40px] flex items-center justify-center" onClick={handlePaymentAction}>
        <div className='p-[5px] rounded-[30px] bottom-svg border border-[#202020] bg-[#121212] min-w-[60px] flex justify-center items-center'>
          <Wallet />
        </div>
      </div>
      <div onClick={handleAction} className="w-[40px] bottom-svg flex items-center justify-center h-[40px]">
        <UserSVG className=' text-[#7e7e7e]' />
      </div>
      <div onClick={handleAction} className="w-[40px] bottom-svg flex items-center justify-center h-[40px]">
        <ChatSVG  />
      </div>
    </div>
  )
}
export default SidebarMobileSettings
