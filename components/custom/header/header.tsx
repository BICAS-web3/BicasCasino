import { Separator } from '@/components/ui/separator'
import BalanceSwitcher from './components/balance.switch'
import Logo from './components/logo'
import User from './components/user'
import Wallet from './components/wallet'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='flex justify-between items-center px-5 py-3 box-border sticky min-h-max top-0 z-[2] w-full bg-black'>
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
