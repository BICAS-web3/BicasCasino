import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import styles from "./styles.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import {Plinko} from "@/widgets/Plinko/Plinko";
import {useAccount} from "wagmi";
import {CustomWagerRangeInput} from "@/widgets/CustomWagerRangeInput";
import {WagerGainLoss} from "@/widgets/WagerGainLoss";
import {ProfitBlock} from "@/widgets/ProfitBlock";
import {SidePicker} from "@/widgets/CoinFlipSidePicker";
import s from "@/pages/games/CoinFlip/styles.module.scss";
import {CustomRiskSelector} from "@/widgets/CustomRiskSelector/CustomRiskSelector";

const WagerContent = () => {
    const { isConnected } = useAccount();
    return (
        <>
            <SidePicker />
            <WagerInputsBlock />
            <CustomWagerRangeInput inputTitle="Rows" min={8} max={16} />
            {/*<WagerGainLoss />*/}
            {/*<ProfitBlock />*/}
            <button className={s.connect_wallet_btn}>
                {isConnected ? "Place a bet" : "Connect Wallet"}
            </button>
            <CustomRiskSelector />
            <WagerLowerBtnsBlock game="plinko" />
        </>
    );
};

export default function PlinkoGame() {

  return (
    <Layout gameName="Plinko">
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["Plinko", "PlinkoStart"]}
      />
      <div className={styles.plinko_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="plinko"
          wagerContent={<WagerContent />}
        >
          <Plinko />
        </GamePage>
      </div>
    </Layout>
  );
}

