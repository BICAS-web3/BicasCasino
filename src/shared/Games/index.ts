import coinflipImg from "@/public/media/recently_games/conflip.png";
import { StaticImageData } from "next/image";

export type T_GameData = {
    title: string,
    text: string,
    imgBackground: StaticImageData
}

export const Games: { [key: string]: T_GameData } = {
    coinflip: {
        title: "Coin Flip",
        text: "A game where you have to beat your opponent with a chip",
        imgBackground: coinflipImg
    },
    dice: {
        title: "Dice",
        text: "A game where you have to beat your opponent with a chip",
        imgBackground: coinflipImg
    },
    rockpaperscissors: {
        title: "Rock Paper Scissors",
        text: "A game where you have to beat your opponent with a chip",
        imgBackground: coinflipImg
    },
}