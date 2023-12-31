import { FC, ReactElement } from "react";

import s from "./styles.module.scss";
import { ManualAutoWager } from "../ManualAutoWager/ManualAutoWager";

interface WagerProps {
  wagerContent: any;
  ButtonElement?: ReactElement;
  ManualElement?: any;
}

export const Wager: FC<WagerProps> = ({
  wagerContent,
  ManualElement,
  ButtonElement,
}) => {
  return (
    <div className={s.poker_wager_wrap}>
      <div className={s.poker_wager_block}>
        {/* <ManualAutoWager /> */}
        {ManualElement}
        {ButtonElement}
        <h2 className={s.poker_wager_title}>Wager</h2>
        {wagerContent}
      </div>
    </div>
  );
};
