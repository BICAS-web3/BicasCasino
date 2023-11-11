import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";

import oneC1 from "@/public/media/pokerHandsImages/1c1.svg";
import oneC2 from "@/public/media/pokerHandsImages/1c2.svg";
import oneC3 from "@/public/media/pokerHandsImages/1c3.svg";
import oneC4 from "@/public/media/pokerHandsImages/1c4.svg";
import oneC5 from "@/public/media/pokerHandsImages/1c5.svg";

import twoC3 from "@/public/media/pokerHandsImages/2c3.svg";
import twoC4 from "@/public/media/pokerHandsImages/2c4.svg";

import threeC1 from "@/public/media/pokerHandsImages/thrc1.svg";
import threeC2 from "@/public/media/pokerHandsImages/thrc2.svg";
import threeC3 from "@/public/media/pokerHandsImages/thrc3.svg";

import fourC1 from "@/public/media/pokerHandsImages/4c1.svg";
import fourC2 from "@/public/media/pokerHandsImages/4c2.svg";
import fourC3 from "@/public/media/pokerHandsImages/4c3.svg";
import fourC4 from "@/public/media/pokerHandsImages/4c4.svg";
import fourC5 from "@/public/media/pokerHandsImages/4c5.svg";

import fiveC1 from "@/public/media/pokerHandsImages/5c1.svg";
import fiveC2 from "@/public/media/pokerHandsImages/5c2.svg";
import fiveC3 from "@/public/media/pokerHandsImages/5c3.svg";
import fiveC4 from "@/public/media/pokerHandsImages/5c4.svg";
import fiveC5 from "@/public/media/pokerHandsImages/5c5.svg";

import sixC1 from "@/public/media/pokerHandsImages/6c1.svg";
import sixC2 from "@/public/media/pokerHandsImages/6c2.svg";
import sixC3 from "@/public/media/pokerHandsImages/6c3.svg";
import sixC4 from "@/public/media/pokerHandsImages/6c4.svg";
import sixC5 from "@/public/media/pokerHandsImages/6c5.svg";

import sevenC1 from "@/public/media/pokerHandsImages/7c1.svg";
import sevenC2 from "@/public/media/pokerHandsImages/7c2.svg";
import sevenC3 from "@/public/media/pokerHandsImages/7c3.svg";
import sevenC4 from "@/public/media/pokerHandsImages/7c4.svg";
import sevenC5 from "@/public/media/pokerHandsImages/7c5.svg";

import eightC1 from "@/public/media/pokerHandsImages/8c1.svg";
import eightC2 from "@/public/media/pokerHandsImages/8c2.svg";
import eightC3 from "@/public/media/pokerHandsImages/8c3.svg";
import eightC4 from "@/public/media/pokerHandsImages/8c4.svg";
import eightC5 from "@/public/media/pokerHandsImages/8c5.svg";

import niceC1 from "@/public/media/pokerHandsImages/9c1.svg";
import niceC2 from "@/public/media/pokerHandsImages/9c2.svg";
import niceC3 from "@/public/media/pokerHandsImages/9c3.svg";
import niceC4 from "@/public/media/pokerHandsImages/9c4.svg";
import niceC5 from "@/public/media/pokerHandsImages/9c5.svg";

import mob1c1 from "@/public/media/pokerHandsImages/mobile/1c1.svg";
import mob1c2 from "@/public/media/pokerHandsImages/mobile/1c2.svg";
import mob1c3 from "@/public/media/pokerHandsImages/mobile/1c3.svg";
import mob1c4 from "@/public/media/pokerHandsImages/mobile/1c4.svg";
import mob1c5 from "@/public/media/pokerHandsImages/mobile/1c5.svg";

import mob2c1 from "@/public/media/pokerHandsImages/mobile/2c1.svg";
import mob2c2 from "@/public/media/pokerHandsImages/mobile/2c2.svg";
import mob2c3 from "@/public/media/pokerHandsImages/mobile/2c3.svg";
import mob2c4 from "@/public/media/pokerHandsImages/mobile/2c4.svg";
import mob2c5 from "@/public/media/pokerHandsImages/mobile/2c5.svg";

import mob3c1 from "@/public/media/pokerHandsImages/mobile/3c1.svg";
import mob3c2 from "@/public/media/pokerHandsImages/mobile/3c2.svg";
import mob3c3 from "@/public/media/pokerHandsImages/mobile/3c3.svg";
import mob3c4 from "@/public/media/pokerHandsImages/mobile/3c4.svg";
import mob3c5 from "@/public/media/pokerHandsImages/mobile/3c5.svg";

import mob4c1 from "@/public/media/pokerHandsImages/mobile/4c1.svg";
import mob4c2 from "@/public/media/pokerHandsImages/mobile/4c2.svg";
import mob4c3 from "@/public/media/pokerHandsImages/mobile/4c3.svg";
import mob4c4 from "@/public/media/pokerHandsImages/mobile/4c4.svg";
import mob4c5 from "@/public/media/pokerHandsImages/mobile/4c5.svg";

import mob5c1 from "@/public/media/pokerHandsImages/mobile/5c1.svg";
import mob5c2 from "@/public/media/pokerHandsImages/mobile/5c2.svg";
import mob5c3 from "@/public/media/pokerHandsImages/mobile/5c3.svg";
import mob5c4 from "@/public/media/pokerHandsImages/mobile/5c4.svg";
import mob5c5 from "@/public/media/pokerHandsImages/mobile/5c5.svg";

import mob6c1 from "@/public/media/pokerHandsImages/mobile/6c1.svg";
import mob6c2 from "@/public/media/pokerHandsImages/mobile/6c2.svg";
import mob6c3 from "@/public/media/pokerHandsImages/mobile/6c3.svg";
import mob6c4 from "@/public/media/pokerHandsImages/mobile/6c4.svg";
import mob6c5 from "@/public/media/pokerHandsImages/mobile/6c5.svg";

import mob7c1 from "@/public/media/pokerHandsImages/mobile/7c1.svg";
import mob7c2 from "@/public/media/pokerHandsImages/mobile/7c2.svg";
import mob7c3 from "@/public/media/pokerHandsImages/mobile/7c3.svg";
import mob7c4 from "@/public/media/pokerHandsImages/mobile/7c4.svg";
import mob7c5 from "@/public/media/pokerHandsImages/mobile/7c5.svg";

import mob8c1 from "@/public/media/pokerHandsImages/mobile/8c1.svg";
import mob8c2 from "@/public/media/pokerHandsImages/mobile/8c2.svg";
import mob8c3 from "@/public/media/pokerHandsImages/mobile/8c3.svg";
import mob8c4 from "@/public/media/pokerHandsImages/mobile/8c4.svg";
import mob8c5 from "@/public/media/pokerHandsImages/mobile/8c5.svg";

import mob9c1 from "@/public/media/pokerHandsImages/mobile/9c1.svg";
import mob9c2 from "@/public/media/pokerHandsImages/mobile/9c2.svg";
import mob9c3 from "@/public/media/pokerHandsImages/mobile/9c3.svg";
import mob9c4 from "@/public/media/pokerHandsImages/mobile/9c4.svg";
import mob9c5 from "@/public/media/pokerHandsImages/mobile/9c5.svg";

import closeIco from "@/public/media/pokerHandsImages/closeIco.svg";
import { useUnit } from "effector-react";
import * as PokerHandM from "./model";
import { CustomEllipseBlur } from "../CustomEllipseBlur.tsx/CustomEllipseBlur";

const pokerHands = [
  {
    handName: "Jacks or Better",
    cardsList: [oneC1, oneC2, oneC3, oneC4, oneC5],
    cardsListMobile: [mob1c1, mob1c2, mob1c3, mob1c4, mob1c5],
    multiplier: 1,
    description:
      "Вам необходимо чтобы на столе собралась пара карт которая будет выше десятки! ( Валет, Дама, Король, Туз)",
  },
  {
    handName: "Two Pairs",
    cardsList: [oneC1, oneC2, twoC3, twoC4, oneC5],
    cardsListMobile: [mob2c1, mob2c2, mob2c3, mob2c4, mob2c5],
    multiplier: 2,
    description:
      "Вам необходимо собрать на столе две пары, это должны быть любые карты вне зависимости от их масти и- достоинства",
  },
  {
    handName: "Three of a kind",
    cardsList: [threeC1, threeC2, threeC3, oneC4, oneC5],
    cardsListMobile: [mob3c1, mob3c2, mob3c3, mob3c4, mob3c5],
    multiplier: 3,
    description:
      "Вам необходимо собрать на столе три одинаковых карты по достоинству",
  },
  {
    handName: "Straight",
    cardsList: [fourC1, fourC2, fourC3, fourC4, fourC5],
    cardsListMobile: [mob4c1, mob4c2, mob4c3, mob4c4, mob4c5],
    multiplier: 5,
    description:
      "Вам необходимо собрать на столе пять карт по достоинству подряд",
  },
  {
    handName: "Flush",
    cardsList: [fiveC1, fiveC2, fiveC3, fiveC4, fiveC5],
    cardsListMobile: [mob5c1, mob5c2, mob5c3, mob5c4, mob5c5],
    multiplier: 6,
    description: "Вам необходимо собрать на столе пять карт одинаковой масти",
  },
  {
    handName: "Full House",
    cardsList: [sixC1, sixC2, sixC3, sixC4, sixC5],
    cardsListMobile: [mob6c1, mob6c2, mob6c3, mob6c4, mob6c5],
    multiplier: 8,
    description:
      "Вам необходимо собрать на столе тройку любого достоинства и масти и к ним любую пару пару",
  },
  {
    handName: "Four of a kind",
    cardsList: [sevenC1, sevenC2, sevenC3, sevenC4, sevenC5],
    cardsListMobile: [mob7c1, mob7c2, mob7c3, mob7c4, mob7c5],
    multiplier: 30,
    description:
      "Вам необходимо собрать на столе 4 одинаковых карты любой масти и достоинства",
  },
  {
    handName: "Straight Flush",
    cardsList: [eightC1, eightC2, eightC3, eightC4, eightC5],
    cardsListMobile: [mob8c1, mob8c2, mob8c3, mob8c4, mob8c5],
    multiplier: 50,
    description:
      "Вам необходимо собрать на столе пять карт по достоинству подряд одной масти",
  },
  {
    handName: "Royal Flush",
    cardsList: [niceC1, niceC2, niceC3, niceC4, niceC5],
    cardsListMobile: [mob9c1, mob9c2, mob9c3, mob9c4, mob9c5],
    multiplier: 100,
    description:
      "Вам необходимо собрать на столе следующие карты одной масти: Десятка, Валет, Дама, Король, Туз",
  },
];

interface PokerHandsBlockProps {}

export const PokerHandsBlock: FC<PokerHandsBlockProps> = ({}) => {
  const [tabet, setTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 996) {
        setTablet(true);
      } else {
        setTablet(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [setHandVisibility] = useUnit([PokerHandM.setVisibility]);

  // test

  return (
    <div className={s.poker_hands_list_block}>
      <div className={s.ellipse_blur_wrap}>
        <CustomEllipseBlur />
      </div>
      <button
        className={s.poker_hands_desktopHidden_btn}
        onClick={() => setHandVisibility(false)}
      >
        <Image src={closeIco} alt="close-icon" />
      </button>
      <div className={s.poker_hands_titles_list}>
        <span className={s.poker_hands_titles_list_item}>Example</span>
        <span className={s.poker_hands_titles_list_item}>Name</span>
        <span className={s.poker_hands_titles_list_item} data-id="multp">
          Multiplier
        </span>
        <span className={s.poker_hands_titles_list_item}>Description</span>
      </div>
      <div className={s.poker_hands_list}>
        {pokerHands &&
          pokerHands.map((item, ind) => {
            let cardsList = tabet ? item.cardsListMobile : item.cardsList;

            return (
              <div
                className={s.poker_hands_list_item}
                key={ind}
                data-bg={`${(ind + 1) % 2 !== 0 && "true"}`}
              >
                <div className={s.poker_hand_cards_example}>
                  {cardsList.map((card, ind) => (
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
            );
          })}
      </div>
    </div>
  );
};
