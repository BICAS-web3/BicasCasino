import Logo from './components/logo'
import BalanceSwitcher from './components/balance.switch'
import Wallet from './components/wallet'
import { Separator } from '@/components/ui/separator'
import User from './components/user'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='flex justify-between items-center px-5 py-3 border-b border-[#252525] box-border fixed z-[12] w-full bg-black'>
      <Logo />
      <div className='flex items-center gap-4'>
        <BalanceSwitcher />
        <Wallet />
        <Separator orientation='vertical' className='min-h-10' />
        <User />
      </div>
    </header>
  )
}

export default Header
