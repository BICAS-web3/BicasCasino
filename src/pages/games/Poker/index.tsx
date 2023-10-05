import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import s from "./styles.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";

const WagerContent = () => {
  return (
    <>
      <WagerInputsBlock />
      <button className={s.poker_wager_drawing_cards_btn}>Drawing cards</button>
      <WagerLowerBtnsBlock game="poker" />
    </>
  );
};

export default function PokerGame() {
  return (
    <Layout>
      <div className={s.poker_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="poker"
          wagerContent={<WagerContent />}
        >
          <Poker />
        </GamePage>
      </div>
    </Layout>
  );
}
