import { useSession } from 'next-auth/react'
import GameMenu from './(components)/game.menu'
import Preload from '@/components/custom/preload'

const GameLayout = ({ children }) => {
  const { status } = useSession()
  return (
    <div className='w-full h-full p-5 sm:p-10 flex flex-col min-h-[880px]'>
      <div className='h-full'>
        {status === 'authenticated' ? children : <Preload />}
      </div>
      <GameMenu />
    </div>
  )
}

export default GameLayout
