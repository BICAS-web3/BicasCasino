import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import s from "./styles.module.scss";

export default function PokerGame() {
  return (
    <Layout>
      <div className={s.poker_container}>
        <GamePage gameInfoText="test" gameTitle="poker" game="poker">
          <Poker />
        </GamePage>
      </div>
    </Layout>
  );
}
