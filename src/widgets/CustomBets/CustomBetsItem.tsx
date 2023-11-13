import s from "./styles.module.scss";

import pokerIco from "@/public/media/live_bets/pokerIco.png";
import diceIco from "@/public/media/live_bets/diceIco.png";
import rpsIco from "@/public/media/live_bets/rpsIco.png";
import plinkoIco from "@/public/media/live_bets/plinkoIco.png";
import coinFlipIco from "@/public/media/live_bets/coinflipIco.png";
import minesIco from "@/public/media/live_bets/minesIco.png";

import linkIco from "@/public/media/live_bets/linkIco.svg";
import wagerIco from "@/public/media/live_bets/wagerIco.svg";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import * as api from "@/shared/api";

export interface CustomBetsItemProps {
  trx_url: string;
  time: {
    date: string;
    time: string;
  };
  //game_url: string,
  game_name: string;
  player_address: string;
  player_name: string;
  wager: number;
  multiplier: number;
  profit: number;
  token: string;
}
export const CustomBetsItem: FC<CustomBetsItemProps> = (props) => {
  const [gameImg, setGameImg] = useState(pokerIco);

  useEffect(() => {
    if (props.game_name === "CoinFlip") {
      setGameImg(coinFlipIco);
    } else if (props.game_name === "Dice") {
      setGameImg(diceIco);
    } else if (props.game_name === "Mines") {
      setGameImg(minesIco);
    } else if (props.game_name === "RockPaperScissors") {
      setGameImg(rpsIco);
    } else if (props.game_name === "Poker") {
      setGameImg(pokerIco);
    } else if (props.game_name === "Plinko") {
      setGameImg(plinkoIco);
    }
  });

  return (
    <div className={s.customBets_list_item}>
      <div className={s.customBets_list_item_time_block}>
        <Link
          href={props.trx_url}
          target="_blank"
          className={s.customBets_list_item_time_link_block}
        >
          <span className={s.customBets_list_item_date}>{props.time.date}</span>
          <span className={s.customBets_list_item_time}>{props.time.time}</span>
        </Link>
      </div>
      <div className={s.customBets_list_item_game_block}>
        <Link
          href={`/games/${props.game_name}`}
          target="_blank"
          className={s.customBets_list_item_game_link_block}
        >
          <img
            src={gameImg.src}
            className={s.customBets_list_item_game_ico}
            alt="game-ico-preview"
          />
          <span className={s.customBets_list_item_game}>
            {props.game_name === "RockPaperScissors" ? "RPS" : props.game_name}
          </span>
        </Link>
      </div>
      <div className={s.customBets_list_item_player_block}>
        <Link
          href={`/account/${props.player_address}`}
          target="_blank"
          className={s.customBets_list_item_player_link_block}
        >
          <div
            className={s.customBets_list_item_player_ico}
            style={{ background: "#FAA61A" }}
          >
            <span className={s.customBets_list_item_player_ico_name}>B</span>
          </div>
          <span className={s.customBets_list_item_player}>
            {props.player_name}
          </span>
        </Link>
      </div>
      <div className={s.customBets_list_item_address_block}>
        <span
          className={s.customBets_list_item_address}
        >{`${props.player_address.slice(0, 5)}...${props.player_address.slice(
          38,
          42
        )}`}</span>
      </div>
      <div className={s.customBets_list_item_transaction_block}>
        <Image src={linkIco} width={22} height={22} alt="" />
      </div>
      <div className={s.customBets_list_item_wager_block}>
        <img
          src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
          alt="wager-ico"
        />
        <span className={s.customBets_list_item_wager}>
          {parseFloat(props.wager.toFixed(2))}
        </span>
      </div>
      <div className={s.customBets_list_item_multiplier_block}>
        <span className={s.customBets_list_item_multiplier}>
          {props.multiplier}x
        </span>
      </div>
      <div className={s.customBets_list_item_profit_block}>
        <span
          className={`${s.customBets_list_item_profit} ${
            props.profit <= 1 && s.lose_profit
          }`}
        >
          {props.profit}
        </span>
        <img
          src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
          alt="wager-ico"
        />
      </div>
    </div>
  );
};
