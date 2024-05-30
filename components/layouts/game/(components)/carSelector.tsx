import { CarModel, GameModel } from '@/states'
import { useUnit } from 'effector-react'
import { useMediaQuery } from 'usehooks-ts'

const CarSelector = () => {
  const [setCarNumber, carNumber, isPlaying, visible] = useUnit([
    CarModel.setCarNumber,
    CarModel.$carNumber,
    GameModel.$isPlaying,
    GameModel.$carVisible
  ])

  const handleCarNumber = (value: 1 | 2) => {
    setCarNumber(value)
  }

  const isMobile = useMediaQuery('(max-width: 1280px)')
  return (
    <div
      className={`flex flex-col z-[111] min-w-[calc(100vw-32px)] sm:min-w-min duration-500  gap-2 max-w-[288px] w-full lg:top-0 lg:right-0 mx-0 lg:mx-2 ${
        visible || !isMobile
          ? 'opacity-1 visible mt-4'
          : 'opacity-0 invisible h-0 !p-0 mt-0'
      }`}
    >
      <h3 className='text-[#7E7E7E] font-medium text-[13px] leading-[18.51px]'>
        Car number
      </h3>
      <div className='flex w-full h-9 p-[2px] rounded-[99px] border border-[#2E2E2E] gap-[5px]'>
        <button
          disabled={isPlaying}
          onClick={handleCarNumber.bind('', 1)}
          className={`w-full h-full border rounded-[99px] duration-500 text-sm font-medium flex items-center justify-center ${
            carNumber === 1
              ? 'bg-[#282828] text-white border-[#2E2E2E]'
              : 'bg-transparent text-[#7E7E7E] border-transparent'
          }`}
        >
          1 Car
        </button>
        <button
          disabled={isPlaying}
          onClick={handleCarNumber.bind('', 2)}
          className={`w-full h-full border rounded-[99px] duration-500 text-sm font-medium flex items-center justify-center ${
            carNumber === 2
              ? 'bg-[#282828] text-white border-[#2E2E2E]'
              : 'bg-transparent text-[#7E7E7E] border-transparent'
          }`}
        >
          2 Car
        </button>
      </div>
    </div>
  )
}

export default CarSelector
