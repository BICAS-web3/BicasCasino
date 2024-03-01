import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import s from "./styles.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { PokerFlipCardsInfo } from "@/widgets/PokerFlipCardsInfo";
import { WinMessage } from "@/widgets/WinMessage";
import { LostMessage } from "@/widgets/LostMessage";
//import DraxToken from "@/public/media/tokens/drax.svg";
import Image from "next/image";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { PokerModel } from "@/widgets/Poker/Poker";
import { CustomWagerRangeInput } from "@/widgets/CustomWagerRangeInput";
import Head from "next/head";
// import { useAccount, useConnect } from "wagmi";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as GameModel from "@/widgets/GamePage/model";

import * as ConnectModel from "@/widgets/Layout/model";
import { useRouter } from "next/router";
import { Preload } from "@/shared/ui/Preload";
import { RefundButton } from "@/shared/ui/Refund";
import { useSocket } from "@/shared/context";
const WagerContent = () => {
  const [startConnect, setStartConnect, waitingResponse, isPlaying, setRefund] =
    useUnit([
      ConnectModel.$startConnect,
      ConnectModel.setConnect,
      GameModel.$waitingResponse,
      GameModel.$isPlaying,
      GameModel.setRefund,
    ]);
  const [pressButton, setIsEmtyWager] = useUnit([
    WagerModel.pressButton,
    GameModel.setIsEmtyWager,
  ]);
  // const { isConnected, isConnecting } = useAccount();

  const [cardsNew] = useUnit([
    //PokerModel.$isPlaying,
    PokerModel.$watchState,
  ]);
  // useEffect(() => {
  //   isConnecting && setStartConnect(false);
  // }, []);

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
      {/* <button
        className={clsx(
          s.poker_wager_drawing_cards_btn,
          s.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && isConnected && !isPlaying
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (
            (cryptoValue > 0.0 || (isPlaying && !waitingResponse)) &&
            isConnected
          ) {
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
        {isPlaying && waitingResponse ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isPlaying && !waitingResponse ? (
          "Retake"
        ) : isConnected ? (
          "Drawing cards"
        ) : (
          "Connect Wallet"
        )}
      </button>{" "} */}
      {/* {isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )} */}{" "}
      <button className={clsx(s.connect_wallet_btn, s.mobile, s.button_active)}>
        Play
      </button>
    </>
  );
};

export default function PokerGame() {
  const [showFlipCards, flipShowFlipCards] = useUnit([
    PokerModel.$showFlipCards,
    PokerModel.flipShowFlipCards,
  ]);

  const socket = useSocket();

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket?.send(
        JSON.stringify({ type: "Subscribe", payload: ["Poker", "PokerStart"] })
      );
    }
  }, [socket, socket?.readyState]);
  return (
    <>
      <Head>
        <title>Games - Poker</title>
      </Head>
      <Layout activePageLink="/games/Poker" gameName="Poker">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Poker", "PokerStart"]}
        />
        <div className={s.poker_container}>
          <GamePage
            isPoker={true}
            customTitle="Drawing cards"
            gameInfoText="Video Poker - At the start of each round of the game, you are dealt 5 cards with 9 different potential winning combinations. After the first hand, you have the unique opportunity to turn over the cards and try your luck to re-create the best winning combination. In this version of video poker  a royal flush can increase your bet by 100 times, which is guaranteed to give you unforgettable emotions and excitement!"
            gameTitle="poker"
            wagerContent={<WagerContent />}
          >
            <Poker gameText="Video Poker - At the start of each round of the game, you are dealt 5 cards with 9 different potential winning combinations. After the first hand, you have the unique opportunity to turn over the cards and try your luck to re-create the best winning combination. In this version of video poker  a royal flush can increase your bet by 100 times, which is guaranteed to give you unforgettable emotions and excitement!" />
            {/* show when need to redraw cards */}

            {showFlipCards && (
              <div className={s.poker_flip_cards_info_wrapper}>
                <PokerFlipCardsInfo
                  onCLick={() => {
                    flipShowFlipCards();
                  }}
                />
              </div>
            )}
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
