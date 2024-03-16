import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/router";
// import { useAccount } from "wagmi";
import Head from "next/head";

import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { CarsRace } from "@/widgets/CarsRace/CarsRace";
import * as ConnectModel from "@/widgets/Layout/model";
import * as GameModel from "@/widgets/GamePage/model";
import { WagerModel } from "@/widgets/Wager";
import * as CarModel from "@/widgets/CarsRace/model";
import {
  WagerModel as WagerAmountModel,
  WagerInputsBlock,
} from "@/widgets/WagerInputsBlock";

import { LoadingDots } from "@/shared/ui/LoadingDots";
import { CarSelector } from "@/shared/ui/CarSelector";
import { useMediaQuery } from "@/shared/tools";

import s from "./styles.module.scss";
import clsx from "clsx";
import { useSocket } from "@/shared/context";

const WagerContent = () => {
  const isMobile = useMediaQuery("(max-width: 996px)");
  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  // const { isConnected, isConnecting } = useAccount();

  const [pressButton] = useUnit([WagerModel.pressButton]);

  const router = useRouter();

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const [setStartConnect, setIsEmtyWager, gameResult, setReset] = useUnit([
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    CarModel.$gameResult,
    CarModel.setReset,
  ]);
  // useEffect(() => {
  //   isConnecting && setStartConnect(false);
  // }, []);
  // const queryParams = new URLSearchParams(window.location.search);
  // const partner_address = queryParams.get("partner_address");
  // const site_id = queryParams.get("site_id");
  // const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
  const [title, setTitle] = useState(false);

  useEffect(() => {
    if (title) {
      setTimeout(() => {
        setTitle(false);
      }, 2000);
    }
  }, [title]);

  return (
    <>
      <WagerInputsBlock />
      <ProfitBlock />
      {!isMobile && <CarSelector className={s.selector} />}
      {/* <button
        className={clsx(
          s.connect_wallet_btn,
          s.mobile,
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

interface ApplesProps {}

const Apples: FC<ApplesProps> = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket?.send(JSON.stringify({ type: "Subscribe", payload: ["Cars"] }));
    }
  }, [socket, socket?.readyState]);
  return (
    <>
      <Head>
        <title>Games - Car Racing</title>
      </Head>
      <Layout activePageLink="/games/Cars" gameName="Cars">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Cars"]} />
        <div className={s.cars_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="cars"
            wagerContent={<WagerContent />}
            soundClassName={s.car_sound}
          >
            <CarsRace gameText="" />
          </GamePage>
        </div>
      </Layout>
    </>
  );
};

export default Apples;
