import Preload from '@/components/custom/preload'
import { GameModel, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import GameMenu from './(components)/game.menu'
import { MelBottomMenu } from './(components)/melBottomMenu/MelBottomMenu'

const GameLayout = ({ children }) => {
  const [
    access_token,
    socketAuth,
    setIsPlaying,
    setGameStatus,
    setShowAnimation,
    isPlaying,
    gameStatus
  ] = useUnit([
    RegistrModel.$access_token,
    UserModel.$socketAuth,
    GameModel.setIsPlaying,
    GameModel.setGameStatus,
    GameModel.setShowAnimation,
    GameModel.$isPlaying,
    GameModel.$gameStatus
  ])
  const path = usePathname()

  const [isApples, setIsApples] = useState(false)
  const [isMines, setIsMines] = useState(false)
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
    if (path.includes('mines')) {
      setIsMines(true)
    } else {
      setIsMines(false)
    }
  }, [path])

  useEffect(() => {
    setGameStatus(null)
    setShowAnimation(false)
    if (isPlaying) {
      setIsPlaying(false)
    }
  }, [path])

  useEffect(() => {
    if (gameStatus !== null) {
      setGameStatus(null)
    }
  }, [gameStatus])

  return (
    <div className='w-full sm:p-10 sm:pb-5 flex flex-col min-h-[calc(100vh-112px)] sm:min-h-[calc(100vh-100px)] xl:min-h-[calc(100vh-110px)] 3xl:min-h-[calc(100vh-90px)] relative'>
      <div
        className={`relative flex flex-col ${
          isMines ? 'pb-[225px]' : 'pb-[165px]'
        } sm:pb-0 flex-[1_1_auto] sm:rounded-[20px_20px_0_0] overflow-hidden sm:max-h-max sm:min-h-[594px] xl:min-h-[618px] 3xl:min-h-[680px] ${
          isApples
            ? 'min-h-[418px] max-h-max-content'
            : 'min-h-[328px] max-h-max-content'
        }`}
      >
        {access_token && socketAuth ? children : <Preload />}
        {/* <MelBottomMenu /> */}
      </div>
      <GameMenu />
    </div>
  )
}

export default GameLayout
