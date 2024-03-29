import Multibets from '@/components/custom/multibets'
import StopGain from '@/components/custom/stopGain/stop.gain'
import Wager from '@/components/custom/wager'

function GameLayout({ children }) {
  return (
    <div
      // className='grid grid-cols-[auto_292px] flex-[1_1_auto] h-full'

      className='w-full h-full'
    >
      {children}
      {/* <div className='w-full rounded-tr-[20px] p-5 bg-[#151515]'>
        <Wager />
        <StopGain />
        <Multibets />
      </div> */}
    </div>
  )
}

export default GameLayout
