import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";

/// images

import pokerPopularDesk from "@/public/media/gamesPageImages/pokerPopularDesk.png";
import pokerPopularLaptop from "@/public/media/gamesPageImages/pokerPopularLaptop.png";
import pokerPopularMobile from "@/public/media/gamesPageImages/pokerPopularMobile.png";

import dicePopularDesk from "@/public/media/gamesPageImages/dicePopularDesk.png";
import dicePopularLaptop from "@/public/media/gamesPageImages/dicePopularLaptop.png";
import dicePopularMobile from "@/public/media/gamesPageImages/dicePopularMobile.png";

import plinkoPopularDesk from "@/public/media/gamesPageImages/plinkoPopularDesk.png";
import plinkoPopularLaptop from "@/public/media/gamesPageImages/plinkoPopularLaptop.png";
import plinkoPopularMobile from "@/public/media/gamesPageImages/plinkoPopularMobile.png";

import minesPopularDesk from "@/public/media/gamesPageImages/minesPopularDesk.png";
import minesPopularLaptop from "@/public/media/gamesPageImages/minesPopularLaptop.png";
import minesPopularMobile from "@/public/media/gamesPageImages/minesPopularMobile.png";
import { PopularGamesItem } from "./PopularGamesItem";

///

const popularGamesList = [
  {
    imgDesk: pokerPopularDesk,
    imgLaptop: pokerPopularLaptop,
    imgMob: pokerPopularMobile,
    title: "poker",
  },
  {
    imgDesk: dicePopularDesk,
    imgLaptop: dicePopularLaptop,
    imgMob: dicePopularMobile,
    title: "dice",
  },
  {
    imgDesk: plinkoPopularDesk,
    imgLaptop: plinkoPopularLaptop,
    imgMob: plinkoPopularMobile,
    title: "plinko",
  },
  {
    imgDesk: minesPopularDesk,
    imgLaptop: minesPopularLaptop,
    imgMob: minesPopularMobile,
    title: "mines",
  },
];

interface PopularGamesBlockProps {}

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
