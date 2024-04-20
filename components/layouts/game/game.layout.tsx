import { useSession } from 'next-auth/react'
import GameMenu from './(components)/game.menu'
import Preload from '@/components/custom/preload'
import { useUnit } from 'effector-react'
import { RegistrModel } from '@/states'

const GameLayout = ({ children }) => {
  const [access_token] = useUnit([RegistrModel.$access_token])
  return (
    <div className='w-full h-full py-5 sm:p-10 flex flex-col min-h-[880px] relative'>
      <div className='h-full relative flex flex-col'>
        {access_token ? children : <Preload />}
      </div>
      <GameMenu />
    </div>
  )
}

export default GameLayout
