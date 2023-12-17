import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import CloseIcon from "@/public/media/misc/close.svg";
import Image from "next/image";
import { useUnit } from "effector-react";
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import { useDropdown } from "@/shared/tools";

export interface WinMessageProps {
  tokenImage?: any;
  profit?: string;
  multiplier?: string;
}
export const WinMessage: FC<WinMessageProps> = (props) => {
  const [clearStatus, profit] = useUnit([
    GameModel.clearStatus,
    GameModel.$profit,
  ]);

  // const { dropdownRef, isOpen, toggle, close } = useDropdown();

  return (
    <div className={s.win_message} data-winlostid="win_message">
      <div className={s.close} onClick={clearStatus}>
        <Image src={CloseIcon} alt={""} />
      </div>
      <div className={s.win_container}>
        <div className={s.win_title}>YOU WIN!</div>
        <div className={s.profit_box}>
          <div className={s.profit}>
            <div className={s.token}>{props.tokenImage}</div>
            <div className={s.profit_text}>{props.profit}</div>
          </div>
          <div className={s.multiplier}>{props.multiplier}x</div>
        </div>
        {/* <div className={s.bet_again_button} onClick={ }>
                Bet on my winnings
            </div> */}
      </div>
    </div>
  );
};
