import Image from 'next/image'
import { MutableRefObject, RefObject, useEffect, useState } from 'react'
import { ThimbleSVG } from './icons'
import { useUnit } from 'effector-react'
import { GameModel, RegistrModel } from '@/states'
import useSound from 'use-sound'

const Thimble = ({
  ind,
  selectedShow,
  showAnimation,
  isPlaying,
  openGame,
  activeThimble,
  setSelected,
  animatedRefs,
  openBall
}: {
  ind: number
  selectedShow: number[] | null
  showAnimation: boolean
  isPlaying: boolean
  openGame: number | null
  activeThimble: number | null
  setSelected: (el: number) => void
  animatedRefs: MutableRefObject<RefObject<HTMLDivElement>[]>
  openBall?: boolean
}) => {
  const [setIsPlaying, access_token] = useUnit([
    GameModel.setIsPlaying,
    RegistrModel.$access_token
  ])
  const [localPlay, setLocalPlay] = useState(false)
  useEffect(() => {
    setLocalPlay(false)
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      setLocalPlay(true)
    } else {
      // alert(2)
      setLocalPlay(false)
    }
  }, [isPlaying])
  const [playSounds] = useUnit([GameModel.$playSounds])
  const [thimbleSelect] = useSound('/music/thimble_select.mp3')
  return (
    <div
      key={ind}
      className={`sm:top-5 mb-5 sm:mb-0 flex flex-col justify-center items-center transition-all duration-500 relative
                ${showAnimation && `thimble_wrap_${ind + 1}`}`}
      onClick={() => {
        if (!showAnimation && !openGame && isPlaying) {
          setSelected(ind)

          playSounds !== 'off' && thimbleSelect()
        } else if (!access_token) {
          setSelected(ind)
          playSounds !== 'off' && thimbleSelect()
        }
      }}
      ref={animatedRefs.current[ind]}
    >
      {activeThimble === ind || openGame == ind ? (
        <ThimbleSVG
          width={159}
          height={124}
          className={`absolute select-none z-[2] transition-all duration-400 thible
                    w-[71px] h-[57px] sm:w-[127px] sm:h-[103px] xl:w-[159px] xl:h-[124px] min-w-[71px] min-h-[57px] sm:min-w-[127px] sm:min-h-[103px] xl:min-w-[159px] xl:min-h-[124px] bottom-[45px] sm:bottom-[94px] tbb:bottom-[80px]
                    ${
                      selectedShow?.includes(ind) &&
                      'bottom-[45px] sm:bottom-[105px]'
                    }`}
        />
      ) : (
        <ThimbleSVG
          width={159}
          height={124}
          className={`select-none z-[3] absolute bottom-0 transition-all duration-400 
                    w-[71px] h-[57px] sm:w-[127px] sm:h-[103px] xl:w-[159px] xl:h-[124px] ￼in-w-[71px] min-h-[57px] sm:min-w-[127px] sm:min-h-[103px] xl:min-w-[159px] xl:min-h-[124px]
                    ${
                      selectedShow?.includes(ind) &&
                      'bottom-[45px] sm:bottom-[105px]'
                    }
                    ${
                      !showAnimation &&
                      !openGame &&
                      localPlay &&
                      'cursor-pointer thible_select_animation'
                    }
                  `}
        />
      )}
      {(activeThimble === ind || openGame == ind || openBall) && (
        <Image
          width={40}
          height={40}
          src='/images/thimbles/ball.png'
          alt='ball'
          className={`select-none left-[48%] translate-x-[-50%] z-[1] absolute w-[18px] h-[18px] sm:w-8 sm:h-8 bottom-[7px] xl:h-[40px] xl:w-[40px] sm:bottom-[15px]`}
        />
      )}
      <img
        src='/images/thimbles/thimbleShadow.webp'
        className='select-none w-[88px] sm:w-[180px] top-[10px] sm:top-[17px] relative'
        alt='thimble-static-shadow'
      />
    </div>
  )
}

export default Thimble
