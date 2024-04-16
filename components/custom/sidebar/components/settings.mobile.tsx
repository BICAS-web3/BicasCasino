import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BurgerMenuSVG, ChatSVG, GamesSVG, UserSVG } from './icons/mobile'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import { useMediaQuery } from 'usehooks-ts'

type Props = {
  open: boolean
  handleAction: () => void
}

const SidebarMobileSettings = ({ open, handleAction }: Props) => {
  const isMobile = useMediaQuery('(max-width:768px)')
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
      <Button variant='ghost' size='icon'>
        <GamesSVG className='object-contain text-[#7E7E7E]' />
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
