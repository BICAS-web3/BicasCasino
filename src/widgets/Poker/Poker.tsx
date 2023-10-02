import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/poker_images/pokerBgImage.png";
// import testCard1 from "@/public/media/poker_images/testCard1.png";
// import testCard2 from "@/public/media/poker_images/testCard2.png";
// import testCard3 from "@/public/media/poker_images/testCard3.png";
// import testCard4 from "@/public/media/poker_images/testCard4.png";
// import testCard5 from "@/public/media/poker_images/testCard5.png";
import { PokerCard } from "./PokerCard";
import { useUnit } from "effector-react";
import { sessionModel } from "@/entities/session";
import { useAccount } from "wagmi";
import { T_Card } from "@/shared/api";
//import BackgroundMusic from '../../public/media/games_assets/music/background1.wav';
import useSound from 'use-sound';
import * as GameModel from "@/widgets/GamePage/model";
export * as PokerModel from "./model";
import * as PokerModel from "./model";

const initialArrayOfCards = [
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  },
];

// export type T_Card = {
//   coat: number,
//   card: number
// };

export interface PokerProps {
  cardsState: boolean[],
  setCardsState: any,
  //initialCards: T_Card[] | undefined,
  //gameState: any | undefined
}

export const Poker: FC<PokerProps> = (props) => {
  const [
    newBet,
    playSounds,
    gameState
  ] = useUnit([
    sessionModel.$newBet,
    GameModel.$playSounds,
    PokerModel.$gameState
  ]);
  const [activeCards, setActiveCards] = useState<T_Card[]>(initialArrayOfCards);
  //const [cardsState, setCardsState] = useState<boolean[]>([false, false, false, false, false]);
  const { address, isConnected } = useAccount();

  const [playBackground, { stop: stopBackground }] = useSound('/static/media/games_assets/music/background1.wav', { volume: 0.1, loop: true });
  const [playDrawnCards] = useSound('/static/media/games_assets/poker/sounds/cardsEveryone.mp3');
  const [playNewCards] = useSound('/static/media/games_assets/poker/sounds/2cards.mp3');
  const [transactionHash, setTransactionHash] = useState<string>('');

  useEffect(() => {
    console.log("Play sounds", playSounds);
    if (!playSounds) {
      // /stopSounds();
      //sounds.background.pause();
      stopBackground();
    } else {
      playBackground();
    }
  }, [playSounds])

  useEffect(() => {
    const run = async () => {
      //await delay(3000);
      playBackground();
    }

    if (playSounds) {
      run();
    }

  }, [playBackground]);

  // useEffect(() => {
  //   const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  //   const run = async () => {
  //     if (newBet && isConnected && newBet.player.toLowerCase() == address?.toLowerCase()) {
  //       setTransactionHash(newBet.transaction_hash)
  //       if (newBet.game_name == 'PokerStart') {
  //         playDrawnCards();
  //         setActiveCards(newBet.player_hand as any);
  //       } else if (newBet.game_name == "Poker") {
  //         playNewCards();
  //         setActiveCards(newBet.player_hand as any);
  //         await delay(5000);
  //         setActiveCards(initialArrayOfCards);
  //       }
  //       //setTransactionHash(newBet.transaction_hash)
  //     }
  //   }
  //   run();
  // }, [newBet, isConnected]);

  useEffect(() => {
    setActiveCards(gameState ? gameState : initialArrayOfCards);
  }, [gameState]);

  // useEffect(() => {
  //   console.log("Cards state", props.cardsState);
  // }, [props.cardsState]);

  return (
    <div className={s.poker_table_wrap}>
      <div className={s.poker_table_background}>
        <Image
          src={tableBg}
          className={s.poker_table_background_img}
          alt="table-bg"
        />
      </div>
      <div className={s.poker_table}>
        <div className={s.poker_table_cards_list}>
          {activeCards &&
            activeCards.map((item, ind) => {
              return (item.number == -1 ?
                <PokerCard
                  key={ind}
                  isEmptyCard={true}
                  coat={undefined}
                  card={undefined}
                  onClick={() => { }}
                /> :
                <PokerCard
                  key={`${item.suit}_${item.number}_${transactionHash}`}
                  isEmptyCard={false}
                  coat={item.suit}
                  card={item.number}
                  onClick={() => {
                    const cards = props.cardsState;
                    cards[ind] = !cards[ind];
                    props.setCardsState([...cards]);
                  }} />)
            }
            )}
        </div>
      </div>
    </div>
  );
};
