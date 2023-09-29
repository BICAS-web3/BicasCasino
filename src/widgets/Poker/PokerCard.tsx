import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";
import backCard from "@/public/media/poker_images/backCard.png";

interface itemProps {
  img: StaticImageData;
}

interface PokerCardProps {
  item: itemProps;
  isEmptyCard: boolean;
}

export const PokerCard: FC<PokerCardProps> = ({ item, isEmptyCard }) => {
  const [cardFlipped, setCardFlipped] = useState(false);
  const card = useRef();
  const [cardWidth, setCardWidth] = useState(0);
  const aspectRatio = 1.5;

  useEffect(() => {
    setCardWidth(card.current.offsetWidth);
  }, [card]);

  const height = cardWidth * aspectRatio;

  console.log(height);

  return (
    <div
      ref={card}
      className={`${s.poker_table_cards_list_item} ${
        cardFlipped && s.flipped
      } ${isEmptyCard && s.empty_card}`}
      onClick={() => setCardFlipped(!cardFlipped)}
      style={{ height: height }}
    >
      {!isEmptyCard ? (
        <>
          <div className={s.poker_table_card_front}>
            <Image src={item.img} alt="card-image" />
          </div>
          <div className={s.poker_table_card_back}>
            <Image src={backCard} alt="card-image" />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
