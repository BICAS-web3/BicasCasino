import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";

export default function PokerGame() {
  return (
    <Layout>
      <GamePage gameInfoText="test" gameTitle="poker" game="poker">
        <Poker />
      </GamePage>
    </Layout>
  );
}
