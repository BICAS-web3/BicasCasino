import { CoinFlip } from "@/widgets/CoinFlip/CoinFlip";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import s from "./styles.module.scss";
import { CustomWagerRangeInput } from "@/widgets/CustomWagerRangeInput/CustomWagerRangeInput";
import { CoinFlipWagerGainLoss } from "@/widgets/CoinFlip/CoinFlipWagerGainLoss/CoinFlipWagerGainLoss";
import { CoinFlipProfitBlock } from "@/widgets/CoinFlip/CoinFlipProfitBlock/CoinFlipProfitBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock/WagerInputsBlock";
import { useAccount } from "wagmi";

const WagerContent = () => {
  const { isConnected } = useAccount();
  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput inputTitle="Bets" min={0} max={100} />
      <CoinFlipWagerGainLoss />
      <CoinFlipProfitBlock />
      <button className={s.connect_wallet_btn}>
        {isConnected ? "Place bet" : "Connect Wallet"}
      </button>
      <WagerLowerBtnsBlock game="coinflip" />
    </>
  );
};

export default function CoinFlipGame() {
  return (
    <Layout gameName={"CoinFlip"}>
      <div className={s.coinflip_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="coinflip"
          wagerContent={<WagerContent />}
        >
          <CoinFlip />
        </GamePage>
      </div>
    </Layout>
  );
}
