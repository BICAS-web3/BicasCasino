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

const WagerContent = () => {
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  return (
    <>
      <WagerInputsBlock />
      <button
        className={s.poker_wager_drawing_cards_btn}
        onClick={() => {
          if (!isConnected) {
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
        Drawing cards
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
            gameInfoText="test"
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
