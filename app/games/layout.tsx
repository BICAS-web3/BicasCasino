// import Multibets from '@/components/custom/multibets'
// import StopGain from '@/components/custom/stopGain/stop.gain'
// import Wager from '@/components/custom/wager'
import { GameLayout as Layout } from '@/app/games/components/gameLayout/GameLayout'
import { Poker } from '@/app/games/Poker/components/poker/Poker'

function GameLayout({ children }) {
  return <Layout>{children}</Layout>
}

export default GameLayout
