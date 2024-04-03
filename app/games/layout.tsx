// import Multibets from '@/components/custom/multibets'
// import StopGain from '@/components/custom/stopGain/stop.gain'
// import Wager from '@/components/custom/wager'
import { GameLayout as Layout } from '@/components/custom/gameLayout/GameLayout'
import { Poker } from '@/components/custom/poker/Poker'

function GameLayout({ children }) {
  return (
    <Layout>
      <Poker gameText='s' />
    </Layout>
  )
}

export default GameLayout
