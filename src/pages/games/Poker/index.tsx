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
import { useAccount, useConnect } from "wagmi";
import { useEffect } from "react";
import clsx from "clsx";
import { LoadingDots } from "@/shared/ui/LoadingDots";

import * as ConnectModel from "@/widgets/Layout/model";
const WagerContent = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();

  const [isPlaying] = useUnit([PokerModel.$isPlaying]);
  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);
  return (
    <>
      <WagerInputsBlock />
      <button
        className={clsx(s.poker_wager_drawing_cards_btn, s.mobile)}
        onClick={() => {
          if (!isConnected) {
            setStartConnect(true);
            connect({ connector: connectors[0] });
          } else {
            pressButton();
            (window as any).fbq("track", "Purchase", {
              value: 0.0,
              currency: "USD",
            });
          }
        }}
      >
        {isConnecting && startConnect ? (
          <LoadingDots className={s.dots_black} title="Connecting" />
        ) : isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          "Drawing cards"
        ) : (
          "Connect Wallet"
        )}
      </button>
      <WagerLowerBtnsBlock game="poker" />
    </>
  );
};

export default function PokerGame() {
  const [showFlipCards, flipShowFlipCards] = useUnit([
    PokerModel.$showFlipCards,
    PokerModel.flipShowFlipCards,
  ]);

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
            <Poker />
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
