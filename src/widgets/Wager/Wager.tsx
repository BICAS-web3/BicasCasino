import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";

interface WagerProps {
  wagerContent: any;
}

export const Wager: FC<WagerProps> = ({ wagerContent }) => {
  return (
    <div className={s.poker_wager_wrap}>
      <div className={s.poker_wager_block}>
        <h2 className={s.poker_wager_title}>Wager</h2>
        {wagerContent}
      </div>
    </div>
  );
};
