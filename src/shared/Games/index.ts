import coinflipImg from "@/public/media/games/conflip.webp";
import pokerImg from "@/public/media/games/poker.webp";
import plinkoImg from "@/public/media/games/plinko.webp";
import { StaticImageData } from "next/image";
import minesLaptopBg from "@/public/media/games_assets/mines/1280Bg.webp";
import coinflipLaptopBg from "@/public/media/games_assets/coinflip/1280Bg.webp";
import diceLaptopBg from "@/public/media/games_assets/dice/laptopPcImg.webp";
import rpsMainBg from "@/public/media/games_assets/rock_paper_scissors/rpsMainBanner.webp";
import pokerLaptopBg from "@/public/media/games_assets/poker/1280Img.webp";
import plinkoLaptopBg from "@/public/media/games_assets/plinko/plinkoMainBanner.webp";
import rocketbg from "@/public/media/games_assets/rocket/rocket_bg.png";
import slotsbg from "@/public/media/games_assets/slots/slot_bg.png";

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
  rocket: {
    title: "Rocket",
    text: "Rocket",
    imgBackground: rocketbg,
  },
  slots: {
    title: "Slots",
    text: "Slots",
    imgBackground: slotsbg,
  },
};
