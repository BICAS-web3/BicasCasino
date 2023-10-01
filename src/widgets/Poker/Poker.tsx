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

export interface PokerProps { }

export const Poker: FC<PokerProps> = ({ }) => {
  const [
    newBet
  ] = useUnit([
    sessionModel.$newBet
  ]);
  const [activeCards, setActiveCards] = useState<T_Card[]>(initialArrayOfCards);
  const [cardsState, setCardsState] = useState<boolean[]>([false, false, false, false, false]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (newBet && isConnected
      && newBet.game_name == 'PokerStart'
      && newBet.player.toLowerCase() == address?.toLowerCase()) {
      setActiveCards(newBet.player_hand as any);
    }
  }, [newBet, isConnected]);

  useEffect(() => {
    console.log("Cards state", cardsState);
  }, [cardsState]);

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
            activeCards.map((item, ind) => (
              item.number == -1 ?
                <PokerCard key={ind} isEmptyCard={true} coat={undefined} card={undefined} onClick={() => { }} /> :
                <PokerCard
                  key={ind}
                  isEmptyCard={false}
                  coat={item.suit}
                  card={item.number}
                  onClick={() => {
                    const cards = cardsState;
                    cards[ind] = !cards[ind];
                    setCardsState([...cards]);
                  }} />
            ))}
        </div>
      </div>
    </div>
  );
};
