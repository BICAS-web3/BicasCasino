import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import styles from "./style.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
// import { useAccount } from "wagmi";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";

import s from "@/pages/games/CoinFlip/styles.module.scss";

import * as ConnectModel from "@/widgets/Layout/model";
import Head from "next/head";
import clsx from "clsx";
import * as PGM from "@/widgets/Plinko/model";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { useRouter } from "next/router";
import * as GameModel from "@/widgets/GamePage/model";
import { Race } from "@/widgets/Race/Race";
import { HorseSelecteor } from "@/shared/ui/HorseSelecteor";
import * as RaceModel from "@/widgets/Race/model";

const WagerContent = () => {
  const [gameResult, setGameResult, setReset] = useUnit([
    RaceModel.$gameResult,
    RaceModel.setGameResult,
    RaceModel.setReset,
  ]);
  const [setIsEmtyWager] = useUnit([GameModel.setIsEmtyWager]);
  // const { isConnected } = useAccount();
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
      <ProfitBlock />
      <HorseSelecteor />
      {/* <button
        className={clsx(
          s.connect_wallet_btn,
          styles.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (gameResult.length === 0) {
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
          } else {
            setGameResult([]);
            setReset(true);
          }
        }}
      >
        {gameResult.length > 0 ? (
          "Reset"
        ) : isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button> */}{" "}
      <button className={clsx(s.connect_wallet_btn, s.mobile, s.button_active)}>
        Play
      </button>
    </>
  );
};

export default function RaceGame() {
  return (
    <>
      <Head>
        <title>Games - Race</title>
      </Head>
      <Layout activePageLink="/games/Race" gameName="Race">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Race"]} />
        <div className={styles.race_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="race"
            wagerContent={<WagerContent />}
            custom_height={styles.height}
            soundClassName={styles.sound_btn}
          >
            <Race gameText="" />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
