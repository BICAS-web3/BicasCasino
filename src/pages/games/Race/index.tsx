import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import styles from "./style.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { useUnit } from "effector-react";
// import { useAccount } from "wagmi";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";

import s from "@/pages/games/CoinFlip/styles.module.scss";

import Head from "next/head";
import clsx from "clsx";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import * as GameModel from "@/widgets/GamePage/model";
import { Race } from "@/widgets/Race/Race";
import { HorseSelecteor } from "@/shared/ui/HorseSelecteor";
import { useSocket } from "@/shared/context";
import { useEffect } from "react";
import * as RaceModel from "@/widgets/Race/model";

const WagerContent = () => {
  const [setIsPlaying, gameResult, setGameResult, setReset] = useUnit([
    GameModel.setIsPlaying,
    RaceModel.$gameResult,
    RaceModel.setGameResult,
    RaceModel.setReset,
  ]);
  const [cryptoValue, setError] = useUnit([
    WagerAmountModel.$cryptoValue,
    WagerAmountModel.setError,
  ]);
  return (
    <>
      <WagerInputsBlock />
      <ProfitBlock />
      <HorseSelecteor />

      <button
        className={clsx(s.connect_wallet_btn, s.mobile, s.button_active)}
        onClick={() => {
          if (gameResult?.length !== 0) {
            setGameResult([]);
            setReset(true);
          } else {
            if (!cryptoValue) {
              setError(true);
            } else {
              setIsPlaying(true);
            }
          }
        }}
      >
        {gameResult.length > 0 ? "Reset" : "Play"}
      </button>
    </>
  );
};

export default function RaceGame() {
  const [gamesList] = useUnit([GameModel.$gamesList]);
  const socket = useSocket();

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket?.send(JSON.stringify({ type: "UnsubscribeAllBets" }));
      socket?.send(
        JSON.stringify({
          type: "SubscribeBets",
          payload: [gamesList.find((item) => item.name === "Race")?.id],
        })
      );
    }
  }, [socket, socket?.readyState, gamesList.length]);
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
{
  /* <button
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
      </button> */
}
