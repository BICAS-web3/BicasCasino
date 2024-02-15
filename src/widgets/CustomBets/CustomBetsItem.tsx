import s from "./styles.module.scss";

import diceIcon from "@/public/media/live_bets/diceIco.webp";
import coinFlipIcon from "@/public/media/live_bets/coinflipIco.webp";
import pokerIcon from "@/public/media/live_bets/pokerIco.webp";
import rpsIcon from "@/public/media/live_bets/rpsIco.webp";
import rpsMobIco from "@/public/media/live_bets/rpsMobIco.webp";
import bombIcon from "@/public/media/live_bets/bombIco.webp";
import plincoIcon from "@/public/media/live_bets/plinkoIco.webp";
import rocketIcon from "@/public/media/games_assets/rocket/rocket_icon.png";
import slotsIcon from "@/public/media/games_assets/slots/slots_icon.png";
import linkIco from "@/public/media/live_bets/linkIco.svg";
import appleIcon from "@/public/media/apples_icon/apple_icon.jpg";
import wagerIco from "@/public/media/live_bets/wagerIco.svg";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import * as api from "@/shared/api";
import { BlockiesAva } from "../BlockiesAva/BlockiesAva";
// import { useAccount } from "wagmi";
import carIcon from "@/public/media/cars/icon.jpg";
import wheelIcon from "@/public/media/wheel_icons/wheel_icon.jpg";
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
  bets: number;
  multiplier: number;
  profit: number;
  token: string;
  id: number;
}
export const CustomBetsItem: FC<CustomBetsItemProps> = (props) => {
  const [gameImg, setGameImg] = useState(pokerIcon);
  const [avaSize, setAvaSize] = useState("30");
  const [screenWidth, setScreenWidth] = useState(0);
  // const { address } = useAccount();

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
    } else if (props.game_name === "Slots") {
      setGameImg(slotsIcon);
    } else if (props.game_name === "Rocket") {
      setGameImg(rocketIcon);
    } else if (props.game_name === "Wheel Fortune") {
      setGameImg(wheelIcon);
    } else if (props.game_name === "Apples") {
      setGameImg(appleIcon);
    } else if (props.game_name === "Cars") {
      setGameImg(carIcon);
    }
  });

  return (
    <div
      className={s.customBets_list_item}
      data-bg={props.id % 2 === 0 && "true"}
      // data-playerBet={address?.toLowerCase() === props.player_address && "true"}
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
        <Link href={props.trx_url} target="_blank">
          <Image src={linkIco} width={22} height={22} alt="" />
        </Link>
      </div>
      <div className={s.customBets_list_item_wager_block}>
        <img
          src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
          alt="wager-ico"
          className={s.icon}
        />
        <span className={s.customBets_list_item_wager}>
          {/* {props.bets}x{parseFloat(props.wager.toFixed(2))} */}
          {`${props.bets}x${parseFloat(props.wager.toFixed(2))}`}
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
            props.multiplier < 1 && s.lose_profit
          }`}
        >
          {props.profit}
        </span>
        <img
          src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
          alt="wager-ico"
          className={s.icon}
        />
      </div>
    </div>
  );
};
