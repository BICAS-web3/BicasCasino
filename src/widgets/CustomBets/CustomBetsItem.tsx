import s from "./styles.module.scss";

import diceIcon from "@/public/media/live_bets/dice.svg";
import coinFlipIcon from "@/public/media/live_bets/coinFlip.svg";
import pokerIcon from "@/public/media/live_bets/poker.svg";
import rpsIcon from "@/public/media/live_bets/rps.svg";
import bombIcon from "@/public/media/live_bets/bomb.svg";
import plincoIcon from "@/public/media/live_bets/plinco.svg";
import linkIco from "@/public/media/live_bets/linkIco.svg";
import wagerIco from "@/public/media/live_bets/wagerIco.svg";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import * as api from "@/shared/api";
import { BlockiesAva } from "../BlockiesAva/BlockiesAva";

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
  id: number;
}
export const CustomBetsItem: FC<CustomBetsItemProps> = (props) => {
  const [gameImg, setGameImg] = useState(pokerIcon);
  const [avaSize, setAvaSize] = useState("30");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (screenWidth < 650) {
      setAvaSize("20");
    } else {
      setAvaSize("30");
    }
  }, [screenWidth]);

  useEffect(() => {
    if (props.game_name === "CoinFlip") {
      setGameImg(coinFlipIcon);
    } else if (props.game_name === "Dice") {
      setGameImg(diceIcon);
    } else if (props.game_name === "Mines") {
      setGameImg(bombIcon);
    } else if (props.game_name === "RockPaperScissors") {
      setGameImg(rpsIcon);
    } else if (props.game_name === "Poker") {
      setGameImg(pokerIcon);
    } else if (props.game_name === "Plinko") {
      setGameImg(plincoIcon);
    }
  });

  return (
    <div
      className={s.customBets_list_item}
      data-bg={props.id % 2 === 0 && "true"}
    >
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
          <div className={s.customBets_list_item_player_ico}>
            <BlockiesAva address={props.player_address} size={avaSize} />
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
