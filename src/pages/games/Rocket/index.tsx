import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import styles from "./style.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { useAccount, useConnect } from "wagmi";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import s from "@/pages/games/CoinFlip/styles.module.scss";

import * as ConnectModel from "@/widgets/Layout/model";
import Head from "next/head";
import clsx from "clsx";
import * as PGM from "@/widgets/Plinko/model";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { useRouter } from "next/router";
import * as GameModel from "@/widgets/GamePage/model";
import { Rocket } from "@/widgets/Rocket/Rocket";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";

const WagerContent = () => {
  const [startConnect, setStartConnect, setIsEmtyWager] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
  ]);
  const { isConnected, isConnecting } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);

  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
        inputTitle="Multiple Bets"
        min={1}
        max={100}
      />
      <WagerGainLoss />
      <ProfitBlock />
      <button
        className={clsx(
          s.connect_wallet_btn,
          styles.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (cryptoValue > 0.0 && !isPlaying && isConnected) {
            pressButton();
          } else if (cryptoValue <= 0.0 && isConnected) {
            setIsEmtyWager(true);
          } else {
            router.push(
              isPartner
                ? `/RegistrManual?partner_address=${partner_address}&site_id=${site_id}&sub_id=${sub_id}`
                : "/RegistrManual"
            );
          }
        }}
      >
        {isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button>
    </>
  );
};

export default function RocketGame() {
  return (
    <>
      <Head>
        <title>Games - Rocket</title>
      </Head>
      <Layout activePageLink="/games/Rocket" gameName="Rocket">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Rocket"]}
        />
        <div className={styles.rocket_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Plinko is this exciting game, players launch a ball from the top of a complex triangular pyramid arranged in multiple rows. As if in a dance, the ball bounces off the pins located on each level of the pyramid, creating an unpredictable and exciting path to the finish line. At the bottom of the pyramid, slots with a variety of payouts await players, from modest ones in the center to amazing ones - up to 1000x - on the periphery. The game features the ability to customize the number of rows from 8 to 16, as well as the choice of risk level, whether low, medium or high. Each player choice affects the payout potential, making each roll of the ball a unique test of luck and strategy."
            gameTitle="rocket"
            wagerContent={<WagerContent />}
            custom_height={styles.height}
            soundClassName={styles.sound_btn}
          >
            <Rocket gameText="Rocket is this exciting game, players launch a ball from the top of a complex triangular pyramid arranged in multiple rows. As if in a dance, the ball bounces off the pins located on each level of the pyramid, creating an unpredictable and exciting path to the finish line. At the bottom of the pyramid, slots with a variety of payouts await players, from modest ones in the center to amazing ones - up to 1000x - on the periphery. The game features the ability to customize the number of rows from 8 to 16, as well as the choice of risk level, whether low, medium or high. Each player choice affects the payout potential, making each roll of the ball a unique test of luck and strategy." />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
