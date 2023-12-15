import s from "./styles.module.scss";
import { FC } from "react";

////images

import pokerDeskImg from "@/public/media/gamesPageImages/pokerDeskImg.webp";
import pokerLaptopImg from "@/public/media/gamesPageImages/pokerLaptopImg.webp";

import diceDeskImg from "@/public/media/gamesPageImages/diceDeskImg.webp";
import diceLaptopImg from "@/public/media/gamesPageImages/diceLaptopImg.webp";

import coinflipDeskImg from "@/public/media/gamesPageImages/coinflipDeskImg.webp";
import coinflipLaptopImg from "@/public/media/gamesPageImages/coinflipLaptopImg.webp";

import minesDeskImg from "@/public/media/gamesPageImages/minesDeskImg.webp";
import minesLaptopImg from "@/public/media/gamesPageImages/minesLaptopImg.webp";

import plinkoDeskImg from "@/public/media/gamesPageImages/plinkoDeskImg.webp";
import plinkoLaptopImg from "@/public/media/gamesPageImages/plinkoLaptopImg.webp";

import rpsDeskImg from "@/public/media/gamesPageImages/rpsDeskImg.webp";
import rpsLaptopImg from "@/public/media/gamesPageImages/rpsLaptopImg.webp";
import { GamesItem } from "./GamesItem";

////

const gamesList = [
  {
    deskImg: pokerDeskImg,
    laptopImg: pokerLaptopImg,
    title: "poker",
    href: "/games/Poker",
  },
  {
    deskImg: diceDeskImg,
    laptopImg: diceLaptopImg,
    title: "dice",
    href: "/games/Dice",
  },
  {
    deskImg: coinflipDeskImg,
    laptopImg: coinflipLaptopImg,
    title: "coinflip",
    href: "/games/Coinflip",
  },
  {
    deskImg: minesDeskImg,
    laptopImg: minesLaptopImg,
    title: "mines",
    href: "/games/Mines",
  },
  {
    deskImg: plinkoDeskImg,
    laptopImg: plinkoLaptopImg,
    title: "plinko",
    href: "/games/Plinko",
  },
  {
    deskImg: rpsDeskImg,
    laptopImg: rpsLaptopImg,
    title: "rock paper scissors",
    href: "/games/RockPaperScissors",
  },
];

interface GamesPageBlockProps { }

export const GamesPageBlock: FC<GamesPageBlockProps> = () => {
  return (
    <div className={s.games_block}>
      <span className={s.games_block_title}>games</span>
      <div className={s.games_list}>
        {gamesList.map((item, ind) => (
          <GamesItem {...item} key={ind} />
        ))}
      </div>
    </div>
  );
};
