import { FC, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import backCard from "@/public/media/poker_images/backCard.png";

interface itemProps {
  img: string;
}

interface PokerCardProps {
  item: itemProps;
}

export const PokerCard: FC<PokerCardProps> = ({ item }) => {
  const [cardFlipped, setCardFlipped] = useState(false);

  return (
    <div
      className={`${s.poker_table_cards_list_item} ${cardFlipped && s.flipped}`}
      onClick={() => setCardFlipped(!cardFlipped)}
    >
      <div className={s.poker_table_card_front}>
        <Image src={item.img} alt="card-image" />
      </div>
      <div className={s.poker_table_card_back}>
        <Image src={backCard} alt="card-image" />
      </div>
    </div>
  );
};
