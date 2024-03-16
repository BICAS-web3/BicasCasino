import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import styles from "./styles.module.scss";
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
import { ThimblesGame } from "@/widgets/Thimbles/ThimblesGame";
import { useSocket } from "@/shared/context";
import { useEffect, useState } from "react";

const WagerContent = () => {
  // const [gameResult, setGameResult, setReset] = useUnit([
  //   RaceModel.$gameResult,
  //   RaceModel.setGameResult,
  //   RaceModel.setReset,
  // ]);
  // const [setIsEmtyWager] = useUnit([GameModel.setIsEmtyWager]);
  // const { isConnected } = useAccount();
  // const [pressButton] = useUnit([WagerModel.pressButton]);

  // const [isPlaying] = useUnit([GameModel.$isPlaying]);
  // const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  // const router = useRouter();
  // const queryParams = new URLSearchParams(window.location.search);
  // const partner_address = queryParams.get("partner_address");
  // const site_id = queryParams.get("site_id");
  // const sub_id = queryParams.get("sub_id");
  // const [isPartner] = useUnit([ConnectModel.$isPartner]);
  return (
    <>
      <WagerInputsBlock />
      <ProfitBlock />
      {/* <button
        className={clsx(
          s.connect_wallet_btn,
          styles.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && true // isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (gameResult.length === 0) {
            if (cryptoValue > 0.0 && !isPlaying && true) {
              // isConnected
              pressButton();
            } else if (cryptoValue <= 0.0 && true) {
              // isConnected
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
        ) : true ? ( // isConnected
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button> */}
      <button className={clsx(s.connect_wallet_btn, s.mobile, s.button_active)}>
        Play
      </button>
    </>
  );
};

const Thimbles = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket?.send(
        JSON.stringify({ type: "Subscribe", payload: ["Thimbles"] })
      );
    }
  }, [socket, socket?.readyState]);

  return (
    <>
      <Head>
        <title>Games - Thimbles</title>
      </Head>
      <Layout activePageLink="/games/Thimbles" gameName="Thimbles">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Thimbles"]}
        />
        <div className={styles.thimbles_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="thimbles"
            custom_height={styles.height}
            wagerContent={<WagerContent />}
          >
            <ThimblesGame />
          </GamePage>
        </div>
      </Layout>
    </>
  );
};

export default Thimbles;
