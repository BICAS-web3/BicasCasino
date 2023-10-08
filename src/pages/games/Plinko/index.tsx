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

const WagerContent = () => {
  const [pressButton] = useUnit([WagerModel.pressButton]);
  return (
    <>
      <WagerInputsBlock />
      <button className={styles.poker_wager_drawing_cards_btn} onClick={pressButton}>
        Place a Bet
      </button>
      <WagerLowerBtnsBlock game="poker" />
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

