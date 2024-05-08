import Image from 'next/image'
import { MutableRefObject, RefObject } from 'react'

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
  return (
    <div
      key={ind}
      className={`sm:top-5 flex flex-col justify-center items-center transition-all duration-500 relative
                ${showAnimation && `thimble_wrap_${ind + 1}`}`}
      onClick={() => {
        if (!showAnimation && !openGame && isPlaying) {
          setSelected(ind)
        }
      }}
      ref={animatedRefs.current[ind]}
    >
      {activeThimble === ind || openGame == ind ? (
        <Image
          width={179}
          height={144}
          src='/images/thimbles/activeThimble.png'
          className={`absolute select-none z-[2] transition-all duration-400
                    w-[71px] h-[57px] sm:w-[127px] sm:h-[103px] xl:w-[179px] xl:h-[144px] min-w-[71px] min-h-[57px] sm:min-w-[127px] sm:min-h-[103px] xl:min-w-[179px] xl:min-h-[144px] bottom-[45px] sm:bottom-[94px] tbb:bottom-[80px]
                    ${
                      selectedShow?.includes(ind) &&
                      'bottom-[45px] sm:bottom-[105px]'
                    }`}
          alt='thimble'
        />
      ) : (
        <Image
          width={179}
          height={144}
          src='/images/thimbles/thimble.png'
          className={`select-none z-[3] absolute bottom-0 transition-all duration-400
                    w-[71px] h-[57px] sm:w-[127px] sm:h-[103px] xl:w-[179px] xl:h-[144px] min-w-[71px] min-h-[57px] sm:min-w-[127px] sm:min-h-[103px] xl:min-w-[179px] xl:min-h-[144px]
                    ${
                      selectedShow?.includes(ind) &&
                      'bottom-[45px] sm:bottom-[105px]'
                    }
                    ${
                      !showAnimation &&
                      !openGame &&
                      isPlaying &&
                      'cursor-pointer'
                    }
                  `}
          alt='thimble'
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
        className='select-none w-[88px] sm:w-[180px] top-[0px] sm:top-[2px] relative'
        alt='thimble-static-shadow'
      />
    </div>
  )
}

export default Thimble
