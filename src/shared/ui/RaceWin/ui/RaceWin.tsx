import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import * as GameModel from "@/widgets/GamePage/model";

import { BlueDrop } from "./BlueDrop";
import { GreenDrop } from "./GreenDrop";
import { Stars } from "./Stars";

import tokenIco from "@/public/media/apples/tokenIco.svg";

import clsx from "clsx";
import s from "./styles.module.scss";

export interface RaceWinProps {
  className?: string;
}

export const RaceWin: FC<RaceWinProps> = ({ className }) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    Promise.all([
      new Promise((resolve) =>
        setTimeout(() => resolve(setVisibility(true)), 500)
      ),
      new Promise((resolve) =>
        setTimeout(() => resolve(setVisibility(false)), 3000)
      ),
    ]);
  }, []);

  const [profit, multiplier] = useUnit([
    GameModel.$profit,
    GameModel.$multiplier,
  ]);

  return (
    <article
      className={clsx(s.win, className, visibility && s.block_appearing)}
    >
      <div className={s.win_message} data-winlostid="win_message">
        <div className={s.win_title}>YOU WIN!</div>
        <div className={s.profit_box}>
          <div className={s.profit}>
            <img
              src={tokenIco.src}
              className={s.token_ico}
              alt="token-static"
            />
            <div className={s.profit_text}>{profit}</div>
          </div>
          <div className={s.multiplier}>{multiplier}x</div>
        </div>
      </div>
      <BlueDrop className={clsx(s.win_icon, s.win_icon_stars)} />
      <GreenDrop className={clsx(s.win_icon, s.win_icon_greendrop)} />
      <Stars className={clsx(s.win_icon, s.win_icon_bluedrop)} />
    </article>
  );
};
