import s from "./styles.module.scss";
import { FC } from "react";

////images

import pokerDeskImg from "@/public/media/gamesPageImages/pokerDeskImg.png";
import pokerLaptopImg from "@/public/media/gamesPageImages/pokerLaptopImg.png";

import diceDeskImg from "@/public/media/gamesPageImages/diceDeskImg.png";
import diceLaptopImg from "@/public/media/gamesPageImages/diceLaptopImg.png";

import coinflipDeskImg from "@/public/media/gamesPageImages/coinflipDeskImg.png";
import coinflipLaptopImg from "@/public/media/gamesPageImages/coinflipLaptopImg.png";

import minesDeskImg from "@/public/media/gamesPageImages/minesDeskImg.png";
import minesLaptopImg from "@/public/media/gamesPageImages/minesLaptopImg.png";

import plinkoDeskImg from "@/public/media/gamesPageImages/plinkoDeskImg.png";
import plinkoLaptopImg from "@/public/media/gamesPageImages/plinkoLaptopImg.png";

import rpsDeskImg from "@/public/media/gamesPageImages/rpsDeskImg.png";
import rpsLaptopImg from "@/public/media/gamesPageImages/rpsLaptopImg.png";

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

interface GamesPageBlockProps {}

export const GamesPageBlock: FC<GamesPageBlockProps> = () => {
  return (
    <div className={s.games_block}>
      <span className={s.games_block_title}>games</span>
      <div className={s.games_list}></div>
    </div>
  );
};
