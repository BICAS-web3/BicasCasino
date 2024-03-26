import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeftToLine } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  open: boolean
  handleAction: () => void
}

const SidebarSettings = ({ open, handleAction }: Props) => (
  <div
    className={cn(
      'flex justify-between items-center bg-[#121212] w-full py-4 px-5',
      open ? '' : 'flex-col gap-4'
    )}
  >
    <ThemeToggle disabled open={open} />
    <LanguageToggle disabled={false} />
    <Button
      onClick={handleAction}
      variant='ghost'
      size='icon'
      className='border border-[#202020]'
    >
      <ArrowLeftToLine
        className={cn(
          'h-4 w-4 aspect-square object-contain text-[#7E7E7E]',
          !open && 'rotate-180'
        )}
      />
    </Button>
  </div>
)

export default SidebarSettings
