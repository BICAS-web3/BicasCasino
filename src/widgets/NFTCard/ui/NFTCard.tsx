import { FC } from "react";

import Image from "next/image";

import card_image from "@/public/media/nftMarket_images/nftCard.png";

import s from "./styles.module.scss";

export interface NFTCardProps {
  img: string;
  name: string;
  number: number;
  price: number;
}

export const NFTCard: FC<NFTCardProps> = (props) => {
  const { name, number, price } = props;

  return (
    <article className={s.nft}>
      <div className={s.nft_image}>
        <Image src={card_image} alt="nft_img" />
      </div>
      <div className={s.nft_about}>
        <span className={s.nft_name}>{name}</span>
        <span className={s.nft_number}>#{number}</span>
      </div>
      <span className={s.nft_price}>{price} ETH</span>
    </article>
  );
};
