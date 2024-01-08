import { FC, RefObject, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";
import backCard from "@/public/media/poker_images/backCard.svg";
import useSound from "use-sound";
import * as api from "@/shared/api";

interface itemProps {
  img: StaticImageData;
}

interface PokerCardProps {
  coat: number | undefined;
  card: number | undefined;
  isEmptyCard: boolean;
  onClick: () => void;
  setImageLoading: (el: boolean) => void;
}

export const PokerCard: FC<PokerCardProps> = (props) => {
  const [cardFlipped, setCardFlipped] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const aspectRatio = 1.5;

  const [playRedrawSound] = useSound(
    `/static/media/games_assets/poker/sounds/redrawCard.mp3`,
    { volume: 1 }
  );

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [cardRef]);

  const height = cardWidth * aspectRatio;

  return (
    <div
      ref={cardRef as RefObject<HTMLDivElement>}
      className={`${s.poker_table_cards_list_item} ${
        cardFlipped && s.flipped
      } ${props.isEmptyCard && s.empty_card}`}
      onClick={
        !props.isEmptyCard
          ? () => {
              playRedrawSound();
              setCardFlipped(!cardFlipped);
              props.onClick();
            }
          : () => {}
      }
      //style={{ height: height }}
    >
      {!props.isEmptyCard ? (
        <>
          <div className={s.poker_table_card_front}>
            <Image
              onLoad={() => props.setImageLoading(false)}
              src={`${api.BaseStaticUrl}/media/games_assets/poker/${props.coat}/${props.card}.svg`}
              alt="card-image"
              width={200}
              height={278}
              className={s.card_img}
              onDragStart={() => false}
            />
          </div>
          <div className={s.poker_table_card_back}>
            <Image
              onLoad={() => props.setImageLoading(false)}
              src={backCard}
              alt="card-image"
              className={s.card_img}
              onDragStart={() => false}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
