import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HeaderM, PaymentModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { SGames } from '../data'
import GamesMobileMenu from './games.mobile'
import {
  BurgerMenuSVG,
  ChatSVG,
  GamesSVG,
  UserSVG,
} from './icons/mobile'


import Wallet from '@/components/custom/sidebar/components/icons/mobile/walIco.svg'

type Props = {
  open: boolean
  handleAction: () => void
}

const SidebarMobileSettings = ({ open, handleAction }: Props) => {
  const [gamesOpen, setGamesOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')

  const [setVisibility, visibility, setUserModal] = useUnit([
    PaymentModel.setTotalVisibility,
    PaymentModel.$totalVisibility,
    HeaderM.setUserModalVisibility
  ])

  const handlePaymentAction = () => {
    setUserModal(false)
    setVisibility(!visibility)
  }
  const handleGamesOpen = () => {
    setUserModal(false)
    setGamesOpen(!gamesOpen)
  }
  return (
    <div
      className={cn(
        'flex justify-between items-center bg-[#121212] w-full py-2 px-5',
        open ? '' : 'gap-4'
      )}
    >
      <Button onClick={handleAction} variant='ghost' size='icon'>
        <BurgerMenuSVG className='object-contain text-[#7E7E7E]' />
      </Button>
      <Button variant='ghost' size='icon' onClick={handleGamesOpen}>
        <GamesMobileMenu data={SGames} open={gamesOpen} />
      </Button>
      <Button variant='ghost' size='icon' onClick={handlePaymentAction}>
        <div className='p-[5px] rounded-[30px] border border-[#202020] bg-[#121212] min-w-[60px] flex justify-center items-center'>
          <Wallet />
        </div>
      </Button>
      <Button onClick={handleAction} variant='ghost' size='icon'>
        <UserSVG className='object-contain text-[#7E7E7E]' />
      </Button>
      <Button onClick={handleAction} variant='ghost' size='icon'>
        <ChatSVG className='object-contain' />
      </Button>
    </div>
  )
}
export default SidebarMobileSettings
