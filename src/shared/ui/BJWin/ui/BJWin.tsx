import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import * as GameModel from "@/widgets/GamePage/model";

import tokenIco from "@/public/media/apples/tokenIco.svg";

import clsx from "clsx";
import s from "./styles.module.scss";

interface IBJWin {
  className?: string;
  coef?: number;
  show?: boolean;
}

export const BJWin: FC<IBJWin> = ({ className, coef, show }) => {
  const [profit] = useUnit([GameModel.$profit]);

  return (
    <article
      className={clsx(clsx(s.win_container, show && s.win_container_show))}
    >
      <span className={s.win_coeff}>{coef}X</span>
      <div className={s.win_profit_block}>
        <img src={tokenIco.src} className={s.win_icon} alt="token-static" />
        <span className={s.win_profit}>{profit.toFixed(4)}</span>
      </div>
    </article>
  );
};
