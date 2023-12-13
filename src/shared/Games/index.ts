import coinflipImg from "@/public/media/games/conflip.png";
import pokerImg from "@/public/media/games/poker.png";
import plinkoImg from "@/public/media/games/plinko.png";
import { StaticImageData } from "next/image";
import minesLaptopBg from "@/public/media/games_assets/mines/1280Bg.png";
import coinflipLaptopBg from "@/public/media/games_assets/coinflip/1280Bg.png";
import diceLaptopBg from "@/public/media/games_assets/dice/laptopPcImg.png";
import rpsMainBg from "@/public/media/games_assets/rock_paper_scissors/rpsMainBanner.png";
import pokerLaptopBg from "@/public/media/games_assets/poker/1280Img.png";
import plinkoLaptopBg from "@/public/media/games_assets/plinko/plinkoMainBanner.png";

export type T_GameData = {
  title: string;
  text: string;
  imgBackground: StaticImageData;
};

export const Games: { [key: string]: T_GameData } = {
  coinflip: {
    title: "Coin Flip",
    text: "A game where you have to beat your opponent with a chip",
    imgBackground: coinflipLaptopBg,
  },
  dice: {
    title: "Dice",
    text: "A game where you have to beat your opponent with a chip",
    imgBackground: diceLaptopBg,
  },
  rockpaperscissors: {
    title: "Rock Paper Scissors",
    text: "A game where you have to beat your opponent with a chip",
    imgBackground: rpsMainBg,
  },
  poker: {
    title: "Poker",
    text: "Poker",
    imgBackground: pokerLaptopBg,
  },
  plinko: {
    title: "Plinko",
    text: "Plinko",
    imgBackground: plinkoLaptopBg,
  },
  mines: {
    title: "Mines",
    text: "Mines",
    imgBackground: minesLaptopBg,
  },
};
