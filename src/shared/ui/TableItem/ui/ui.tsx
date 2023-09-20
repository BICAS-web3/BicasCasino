import {FC} from "react";
import styles from "./ui.module.scss";
import gameIco from "@/public/media/live_bets/mainPageActsGameIco.svg";
import linkIco from "@/public/media/live_bets/linkIco.svg";
import wagerIco from "@/public/media/live_bets/wagerIco.svg";

export const TableItem: FC<IBetData> = (props) => {
  
  return (
    <div className={styles.customBets_list_item}>
      <div className={styles.customBets_list_item_time_block}>
        <a href={props.trx_url} target='_blank' className={styles.customBets_list_item_time_link_block}>
          <span className={styles.customBets_list_item_date}>{props.time.date}</span>
          <span className={styles.customBets_list_item_time}>{props.time.time}</span>
        </a>
      </div>
      <div className={styles.customBets_list_item_game_block}>
        <a href={props.game_url} target='_blank' className={styles.customBets_list_item_game_link_block}>
          <img src={gameIco.src} className={styles.customBets_list_item_game_ico} alt="game-ico-preview" />
          <span className={styles.customBets_list_item_game}>{props.game_name}</span>
        </a>
      </div>
      <div className={styles.customBets_list_item_player_block}>
        <a href={props.player_url} target='_blank' className={styles.customBets_list_item_player_link_block}>
          <div className={styles.customBets_list_item_player_ico} style={{ background: props.userBg }}>
            <span className={styles.customBets_list_item_player_ico_name}>B</span>
          </div>
          <span className={styles.customBets_list_item_player}>{props.player}</span>
        </a>
      </div>
      <div className={styles.customBets_list_item_address_block}>
        <span className={styles.customBets_list_item_address}>{props.gameAddress}</span>
      </div>
      <div className={styles.customBets_list_item_transaction_block}>
        <img src={linkIco.src} width={22} height={22} />
      </div>
      <div className={styles.customBets_list_item_wager_block}>
        <img src={wagerIco.src} alt="wager-ico" />
        <span className={styles.customBets_list_item_wager}>{props.wager}</span>
      </div>
      <div className={styles.customBets_list_item_multiplier_block}>
        <span className={styles.customBets_list_item_multiplier}>{props.multiplier}x</span>
      </div>
      <div className={styles.customBets_list_item_profit_block}>
        <span className={styles.customBets_list_item_profit}>+{props.profit}</span>
        <img src={wagerIco.src} alt="wager-ico" />
      </div>
    </div>
  )
}