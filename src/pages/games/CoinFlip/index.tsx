import { CoinFlip } from "@/widgets/CoinFlip/CoinFlip";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import s from "./styles.module.scss";

export default function CoinFlipGame() {
  return (
    <Layout>
      <div className={s.coinflip_container}>
        <GamePage gameInfoText="test" gameTitle="coinflip" game="coinflip">
          <CoinFlip />
        </GamePage>
      </div>
    </Layout>
  );
}
