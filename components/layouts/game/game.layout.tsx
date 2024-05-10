import Preload from '@/components/custom/preload'
import { GameModel, RegistrModel, UserModel } from '@/states'
import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import GameMenu from './(components)/game.menu'
import ReactHowler from 'react-howler'
import {
  Active2SVG,
  ActiveGroupSVG,
  Disabled2SVG,
  DisabledGroupSVG,
  Effects2SVG
} from './(icons)'

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

  const [playSounds, switchSounds] = useUnit([
    GameModel.$playSounds,
    GameModel.switchSounds
  ])

  const musicsList = [
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/3.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/4.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/5.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/6.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/7.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/8.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/9.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/10.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/12.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/13.mp3',
    'https://game.greekkeepers.io/static/media/games_assets/music/default_bg_music/14.mp3'
  ]
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0)
  const setNewMusic = () => {
    setCurrentSoundIndex(prevIndex => (prevIndex + 1) % musicsList.length)
  }
  const soundChange = () => {
    if (playSounds === 'off') {
      switchSounds('on')
    } else if (playSounds === 'on') {
      switchSounds('effects')
    } else if (playSounds === 'effects') {
      switchSounds('off')
    }
  }

  return (
    <div className='w-full sm:p-10 sm:pb-5 flex flex-col min-h-[calc(100vh-112px)] sm:min-h-[calc(100vh-100px)] xl:min-h-[calc(100vh-110px)] 3xl:min-h-[calc(100vh-90px)] relative'>
      <ReactHowler
        src={musicsList[currentSoundIndex]}
        playing={playSounds === 'on'}
        onEnd={() => setNewMusic()}
      />
      <div
        className={`relative flex flex-col ${
          isMines ? 'pb-[225px]' : 'pb-[165px]'
        } sm:pb-0 flex-[1_1_auto] sm:rounded-[20px_20px_0_0] overflow-hidden sm:max-h-max sm:min-h-[594px] xl:min-h-[618px] 3xl:min-h-[680px] ${
          isApples
            ? 'min-h-[328px] max-h-max-content'
            : 'min-h-[328px] max-h-max-content'
        }`}
      >
        {access_token && socketAuth ? children : <Preload />}
        <div
          className='absolute bottom-5 right-5 p-3 rounded-sm cursor-pointer'
          onClick={soundChange}
        >
          {playSounds === 'off' ? (
            <>
              <Disabled2SVG />
              {/* <DisabledGroupSVG /> */}
            </>
          ) : playSounds === 'effects' ? (
            <>
              <Effects2SVG />
              {/* <span>fx</span> */}
            </>
          ) : (
            <>
              <Active2SVG />
              {/* <ActiveGroupSVG /> */}
            </>
          )}
        </div>
      </div>
      <GameMenu />
    </div>
  )
}

export default GameLayout
