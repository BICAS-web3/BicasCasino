import { FC, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/poker_images/pokerBgImage.png";
import testCard1 from "@/public/media/poker_images/testCard1.png";
import testCard2 from "@/public/media/poker_images/testCard2.png";
import testCard3 from "@/public/media/poker_images/testCard3.png";
import testCard4 from "@/public/media/poker_images/testCard4.png";
import testCard5 from "@/public/media/poker_images/testCard5.png";
import { PokerCard } from "./PokerCard";

const testArrayOfCards = [
  {
    img: testCard1,
  },
  {
    img: testCard2,
  },
  {
    img: testCard3,
  },
  {
    img: testCard4,
  },
  {
    img: testCard5,
  },
];

interface PokerProps {}

export const Poker: FC<PokerProps> = ({}) => {
  const [activeCards, setActiveCards] = useState(5);

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
          {testArrayOfCards &&
            testArrayOfCards.map((item, ind) => (
              <PokerCard key={ind} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};
