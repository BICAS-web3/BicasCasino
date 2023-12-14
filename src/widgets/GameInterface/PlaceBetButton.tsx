import Image from "next/image";
import { FC, ReactNode, SetStateAction, useEffect } from "react";
import s from "./styles.module.scss";

export interface PlaceBetButtonProps {
  active: boolean;
  multiple_bets: boolean;
  onClick: React.MouseEventHandler;
  bet_placed: boolean;
}

export const PlaceBetButton: FC<PlaceBetButtonProps> = (props) => {
  return (
    <div
      className={`${s.place_bet_button} ${
        props.active && !props.bet_placed
          ? s.place_bet_button_active
          : s.place_bet_button_inactive
      }`}
      onClick={props.bet_placed ? (e) => {} : props.onClick}
    >
      {props.active
        ? props.bet_placed
          ? "Bet placed"
          : `Place Bet${props.multiple_bets ? "s" : ""}`
        : "Connect First"}
    </div>
  );
};
