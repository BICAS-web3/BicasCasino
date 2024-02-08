import s from "./styles.module.scss";
import { FC } from "react";
import bg from "@/public/media/blackjack/bg.png";

interface BlackJackGameProps {}

export const BlackJackGame: FC<BlackJackGameProps> = () => {
  return (
    <div className={s.bj_game_container}>
      <div className={s.bg_img_wrap}>
        <img src={bg.src} className={s.bg_img} alt="static-bg" />
      </div>
    </div>
  );
};
