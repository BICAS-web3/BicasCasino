import {
	CustomWagerRangeInput,
	CustomWagerRangeInputModel,
} from '@/widgets/CustomWagerRangeInput'
import { GamePage } from '@/widgets/GamePage/GamePage'
import { Layout } from '@/widgets/Layout'
import { LiveBetsWS } from '@/widgets/LiveBets'
import { Mines } from '@/widgets/Mines/Mines'
import { WagerModel } from '@/widgets/Wager'
import { WagerInputsBlock } from '@/widgets/WagerInputsBlock'
import { WagerLowerBtnsBlock } from '@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock'
import { useUnit } from 'effector-react'
import { useAccount } from 'wagmi'
import styles from './styles.module.scss'

type Props = {}
const WagerContent = () => {
	const { isConnected } = useAccount()
	const [pressButton] = useUnit([WagerModel.pressButton])
	return (
		<>
			<WagerInputsBlock />
			<CustomWagerRangeInput
				inputTitle='Number of games'
				min={50}
				max={100}
				inputType={CustomWagerRangeInputModel.RangeType.Bets}
			/>

			<CustomWagerRangeInput
				inputTitle='Number of mines'
				min={8}
				max={16}
				inputType={CustomWagerRangeInputModel.RangeType.Rows}
			/>
			<button className={styles.connect_wallet_btn} onClick={pressButton}>
				{isConnected ? 'Place bet' : 'Connect Wallet'}
			</button>
			<WagerLowerBtnsBlock game='mines' />
		</>
	)
}

export default function MinesGame() {
	return (
		<Layout gameName='Mines'>
			<LiveBetsWS
				subscription_type={'Subscribe'}
				subscriptions={['Mines', 'MinesStart']}
			/>
			<div className={styles.mines_container}>
				<GamePage
					gameInfoText='test'
					gameTitle='Mines'
					wagerContent={<WagerContent />}
				>
					<Mines />
				</GamePage>
			</div>
		</Layout>
	)
}
