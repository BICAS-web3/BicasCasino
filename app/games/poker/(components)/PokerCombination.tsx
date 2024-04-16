interface PokerCombinationProps {
  combinationName: string
  tokenImage: React.ReactNode
  profit?: string | number
  multiplier: string | number
}

export const PokerCombination = ({
  combinationName,
  tokenImage,
  multiplier
}: PokerCombinationProps) => {
  return (
    <article className='w-[220px] py-5 px-[15px]'>
      <h3 className='text-center text-xl sm:text-2xl tmd:text-4xl font-black tracking-def bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] uppercase'>
        {combinationName}
      </h3>
      <span className='text-xl sm:text-2xl tmd:text-4xl font-black leading-[90%] bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] text-transparent bg-clip-text'>
        you win
      </span>
      <div className='flex flex0col items-center'>
        <div className='flex items-center gap-2.5'>
          <div>{tokenImage}</div>
          <div className='text-center text-sm sm:text-base tmd:text-lg font-black leading-[90%] text-[#eaeaea]'>
            12
          </div>
        </div>
        <div className='text-sm sm:text-base mt-3.5 leading-[90%] text-[#7e7e7e] font-bold text-center'>
          {multiplier}x
        </div>
      </div>
      <button className='bg-[linear-gradient(114deg,_#f8eeb8_-4.17%,_#dbb370_59.03%,_#8e5b2d_112.39%)] text-[#0f0f0f] leading-normal font-extrabold text-sm sm:text-lg tracking-wide py-2 p-1.5 sm:py-3 sm:px-2.5 rounded-[5px] sm:rounded-[12px] w-44 sm:w-64 h-10 sm:h-[50px]'>
        Bet on my winnings
      </button>
    </article>
  )
}
