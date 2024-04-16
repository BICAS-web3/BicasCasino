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
  animatedRefs
}: {
  ind: number
  selectedShow: number | null
  showAnimation: boolean
  isPlaying: boolean
  openGame: number | null
  activeThimble: number | null
  setSelected: (el: number) => void
  animatedRefs: MutableRefObject<RefObject<HTMLDivElement>[]>
}) => {
  return (
    <div
      key={ind}
      className={`
                flex flex-col justify-center items-center transition-all duration-500 relative
                ${showAnimation && `thimble_wrap_${ind + 1}`}
              `}
      onClick={() => {
        if (!showAnimation && !openGame && isPlaying) {
          setSelected(ind)
        }
      }}
      ref={animatedRefs.current[ind]}
    >
      {activeThimble === ind || openGame == ind ? (
        <img
          src='/images/thimbles/activeThimble.webp'
          className={`
                    absolute select-none opacity-0 invisible z-[2] transition-all duration-400
                    bottom-[-10.5px] h-[79px] max-w-[92px] smm:bottom-[-20.5px] smm:h-[142px] smm:max-w-[165.5px] smm:w-full
                    opacity-100 !visible bottom-[94px] smm:bottom-[85px] tbb:bottom-[80px] tbb:max-w-[186px] tbb:h-[160px]
                    ${selectedShow === ind && 'bottom-[105px]'}
                  `}
          alt='thimble'
        />
      ) : (
        <img
          src='/images/thimbles/thimble.webp'
          className={`
                    select-none z-[3] absolute bottom-0 transition-all duration-400
                    max-w-[70px] h-[57px] smm:h-[104px] smm:max-w-[130px] smm:w-full tbb:w-[auto] tbb:h-[auto]
                    ${selectedShow === ind && 'bottom-[105px]'}
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
      {(activeThimble === ind || openGame == ind) && (
        <Image
          width={40}
          height={40}
          src='/images/thimbles/ball.png'
          alt='ball'
          className={`select-none left-[48%] translate-x-[-50%]
                    absolute w-[22px] h-[20px] bottom-[7px]
                    smm:w-[40px] smm:h-[36px] tbb:h-[40px] tbb:w-[40px]
                    tbb:bottom-[15px]`}
        />
      )}
      <img
        src='/images/thimbles/thimbleShadow.webp'
        className='
                  select-none w-[92%] xxxs:w-[75%] xxs:w-[55%] smm:w-[90%] tbb:w-[95%]
                '
        alt='thimble-static-shadow'
      />
    </div>
  )
}

export default Thimble
