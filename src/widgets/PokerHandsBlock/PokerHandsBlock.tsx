import { FC } from "react";
import s from "./styles.module.scss";
import Image from "next/image";

import oneC1 from "@/public/media/pokerHandsImages/1c1.svg";
import oneC2 from "@/public/media/pokerHandsImages/1c2.svg";
import oneC3 from "@/public/media/pokerHandsImages/1c3.svg";
import oneC4 from "@/public/media/pokerHandsImages/1c4.svg";
import oneC5 from "@/public/media/pokerHandsImages/1c5.svg";

const pokerHands = [
  {
    handName: "Jacks or Better",
    cardsList: [oneC1, oneC2, oneC3, oneC4, oneC5],
    multiplier: 1,
    description:
      "Вам необходимо чтобы на столе собралась пара карт которая будет выше десятки! ( Валет, Дама, Король, Туз)",
  },
];

interface PokerHandsBlockProps {}

export const PokerHandsBlock: FC<PokerHandsBlockProps> = ({}) => {
  return (
    <div className={s.poker_hands_list_block}>
      <div className={s.poker_hands_titles_list}>
        <span>Example</span>
        <span>Name</span>
        <span>Multiplier</span>
        <span>Description</span>
      </div>
      <div className={s.poker_hands_list}>
        {pokerHands &&
          pokerHands.map((item, ind) => (
            <div className={s.poker_hands_list_item} key={ind}>
              <div className={s.poker_hand_cards_example}>
                {item.cardsList.map((card, ind) => (
                  <Image src={card} key={ind} alt="poker-card-example" />
                ))}
              </div>
              <div className={s.poker_hand_name_block}>
                <span className={s.poker_hand_name}>{item.handName}</span>
              </div>
              <div className={s.poker_hand_multiplier_block}>
                <span className={s.poker_hand_multiplier}>
                  {item.multiplier}x
                </span>
              </div>
              <div className={s.poker_hand_description_block}>
                <p className={s.poker_hand_description}>{item.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
