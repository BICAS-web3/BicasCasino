import s from "./styles.module.scss";
import gameIco from "@/public/media/live_bets/mainPageActsGameIco.svg";
import linkIco from "@/public/media/live_bets/linkIco.svg";
import wagerIco from "@/public/media/live_bets/wagerIco.svg";
import Image from "next/image";
import { FC } from "react";

interface timeProps {
  time: string;
  date: string;
}

interface CustomBetsItemProps {
  trx_url: string;
  time: timeProps;
  game_url: string;
  game_name: string;
  player_url: string;
  userBg: string;
  player: string;
  gameAddress: string;
  wager: number;
  multiplier: number;
  profit: number;
}

export const CustomBetsItem: FC<CustomBetsItemProps> = ({
  trx_url,
  time,
  game_url,
  game_name,
  player_url,
  userBg,
  player,
  gameAddress,
  wager,
  multiplier,
  profit,
}) => {
  return (
    <div className={s.customBets_list_item}>
      <div className={s.customBets_list_item_time_block}>
        <a
          href={trx_url}
          target="_blank"
          className={s.customBets_list_item_time_link_block}
        >
          <span className={s.customBets_list_item_date}>{time.date}</span>
          <span className={s.customBets_list_item_time}>{time.time}</span>
        </a>
      </div>
      <div className={s.customBets_list_item_game_block}>
        <a
          href={game_url}
          target="_blank"
          className={s.customBets_list_item_game_link_block}
        >
          <img
            src={gameIco.src}
            className={s.customBets_list_item_game_ico}
            alt="game-ico-preview"
          />
          <span className={s.customBets_list_item_game}>{game_name}</span>
        </a>
      </div>
      <div className={s.customBets_list_item_player_block}>
        <a
          href={player_url}
          target="_blank"
          className={s.customBets_list_item_player_link_block}
        >
          <div
            className={s.customBets_list_item_player_ico}
            style={{ background: userBg }}
          >
            <span className={s.customBets_list_item_player_ico_name}>B</span>
          </div>
          <span className={s.customBets_list_item_player}>{player}</span>
        </a>
      </div>
      <div className={s.customBets_list_item_address_block}>
        <span className={s.customBets_list_item_address}>{gameAddress}</span>
      </div>
      <div className={s.customBets_list_item_transaction_block}>
        <Image alt="transaction-ico" src={linkIco} width={22} height={22} />
      </div>
      <div className={s.customBets_list_item_wager_block}>
        <img src={wagerIco.src} alt="wager-ico" />
        <span className={s.customBets_list_item_wager}>{wager}</span>
      </div>
      <div className={s.customBets_list_item_multiplier_block}>
        <span className={s.customBets_list_item_multiplier}>{multiplier}x</span>
      </div>
      <div className={s.customBets_list_item_profit_block}>
        <span className={s.customBets_list_item_profit}>+{profit}</span>
        <img src={wagerIco.src} alt="wager-ico" />
      </div>
    </div>
  );
};
