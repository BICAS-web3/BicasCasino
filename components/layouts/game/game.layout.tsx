import Preload from '@/components/custom/preload'
import { GameModel, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import GameMenu from './(components)/game.menu'

const GameLayout = ({ children }) => {
  const [access_token, socketAuth, setIsPlaying, setGameStatus] = useUnit([
    RegistrModel.$access_token,
    UserModel.$socketAuth,
    GameModel.setIsPlaying,
    GameModel.setGameStatus
  ])
  const path = usePathname()

  const [isApples, setIsApples] = useState(false)
  const [isWheel, setIsWheel] = useState(false)

  useEffect(() => {
    if (path.includes('apples')) {
      setIsApples(true)
    } else {
      setIsApples(false)
    }
    if (path.includes('wheel_of_fortune')) {
      setIsWheel(true)
    } else {
      setIsWheel(false)
    }
  }, [path])

  useEffect(() => {
    setGameStatus(null)
    setIsPlaying(false)
  }, [path])

  return (
    <div className='w-full sm:p-10 sm:pb-5 flex flex-col min-h-[calc(100vh-112px)] sm:min-h-[calc(100vh-100px)] xl:min-h-[calc(100vh-110px)] 3xl:min-h-[calc(100vh-90px)] relative'>
      <div
        className={`relative flex flex-col flex-[1_1_auto] sm:rounded-[20px_20px_0_0] overflow-hidden sm:max-h-max sm:min-h-[594px] xl:min-h-[618px] 3xl:min-h-[680px] ${
          isApples
            ? 'min-h-[418px] max-h-max-content'
            : 'min-h-[328px] max-h-max-content'
        }`}
      >
        {access_token && socketAuth ? children : <Preload />}
      </div>
      <GameMenu />
    </div>
  )
}

export default GameLayout
