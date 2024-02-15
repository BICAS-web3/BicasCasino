import { FC, ReactElement } from "react";

import s from "./styles.module.scss";
import { ManualAutoWager } from "../ManualAutoWager/ManualAutoWager";
import * as GameModel from "@/widgets/GamePage/model";
import { useUnit } from "effector-react";
import clsx from "clsx";

interface WagerProps {
  wagerContent: any;
  ButtonElement?: ReactElement;
  ManualElement?: any;
  isFlex?: boolean;
}

export const Wager: FC<WagerProps> = ({
  wagerContent,
  ManualElement,
  ButtonElement,
  isFlex = true,
}) => {
  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  return (
    <div className={s.poker_wager_wrap}>
      <div className={s.poker_wager_block}>
        {/* <ManualAutoWager /> */}
        {ManualElement}
        <div className={clsx(isPlaying && isFlex && s.flex)}>
          {" "}
          {ButtonElement}
        </div>
        <h2 className={s.poker_wager_title}>Wager</h2>
        {wagerContent}
      </div>
    </div>
  );
};
