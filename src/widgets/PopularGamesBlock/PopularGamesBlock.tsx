import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";

/// images

import pokerPopularDesk from "@/public/media/gamesPageImages/pokerPopularDesk.webp";
import pokerPopularLaptop from "@/public/media/gamesPageImages/pokerPopularLaptop.webp";
import pokerPopularMobile from "@/public/media/gamesPageImages/pokerPopularMobile.webp";

import dicePopularDesk from "@/public/media/gamesPageImages/dicePopularDesk.webp";
import dicePopularLaptop from "@/public/media/gamesPageImages/dicePopularLaptop.webp";
import dicePopularMobile from "@/public/media/gamesPageImages/dicePopularMobile.webp";

import plinkoPopularDesk from "@/public/media/gamesPageImages/plinkoPopularDesk.webp";
import plinkoPopularLaptop from "@/public/media/gamesPageImages/plinkoPopularLaptop.webp";
import plinkoPopularMobile from "@/public/media/gamesPageImages/plinkoPopularMobile.webp";

import minesPopularDesk from "@/public/media/gamesPageImages/minesPopularDesk.webp";
import minesPopularLaptop from "@/public/media/gamesPageImages/minesPopularLaptop.webp";
import minesPopularMobile from "@/public/media/gamesPageImages/minesPopularMobile.webp";
import { PopularGamesItem } from "./PopularGamesItem";

///

const popularGamesList = [
  {
    imgDesk: pokerPopularDesk,
    imgLaptop: pokerPopularLaptop,
    imgMob: pokerPopularMobile,
    title: "poker",
    href: "/games/Poker",
  },
  {
    imgDesk: dicePopularDesk,
    imgLaptop: dicePopularLaptop,
    imgMob: dicePopularMobile,
    title: "dice",
    href: "/games/Dice",
  },
  {
    imgDesk: plinkoPopularDesk,
    imgLaptop: plinkoPopularLaptop,
    imgMob: plinkoPopularMobile,
    title: "plinko",
    href: "/games/Plinko",
  },
  {
    imgDesk: minesPopularDesk,
    imgLaptop: minesPopularLaptop,
    imgMob: minesPopularMobile,
    title: "mines",
    href: "/games/Mines",
  },
];

interface PopularGamesBlockProps { }

export const PopularGamesBlock: FC<PopularGamesBlockProps> = () => {
  return (
    <div className={s.popular_games_block}>
      <span className={s.popular_games_title}>popular games</span>
      <div className={s.popular_games_list}>
        {popularGamesList.map((item, ind) => (
          <PopularGamesItem {...item} key={ind} />
        ))}
      </div>
    </div>
  );
};
