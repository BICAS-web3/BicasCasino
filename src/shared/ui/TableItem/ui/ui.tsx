import { FC } from "react";
import styles from "./ui.module.scss";
import gameIco from "@/public/media/live_bets/mainPageActsGameIco.svg";
import linkIco from "@/public/media/live_bets/linkIco.svg";
import wagerIco from "@/public/media/live_bets/wagerIco.svg";
import avatar from "@/public/media/player_icons/emptyAvatar.svg";

export const TableItem: FC<IBetData> = (props) => {
  return (
    <>
      <td className={styles.td}>
        <span>
          <a href={props.trx_url} target="_blank" className={styles.link_block}>
            <span className={styles.date}>{props.time.date}</span>
            <span className={styles.time}>{props.time.time}</span>
          </a>
        </span>
      </td>
      <td className={styles.td}>
        <a href={props.game_url} target="_blank" className={styles.link_block}>
          <img
            src={gameIco.src}
            className={styles.game_ico}
            alt="game-ico-preview"
          />
          <span className={styles.game}>{props.game_name}</span>
        </a>
      </td>
      <td className={styles.td}>
        <a
          href={props.player_url}
          target="_blank"
          className={styles.link_block}
        >
          <img
            src={avatar.src}
            className={styles.avatar}
            alt="game-ico-preview"
          />
          <span className={styles.player_name}>{props.player}</span>
        </a>
      </td>
      <td className={styles.td}>
        <a href={props.game_url} target="_blank" className={styles.link_block}>
          <span className={styles.address}>{props.gameAddress}</span>
        </a>
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <img src={wagerIco.src} alt="wager-ico" className={styles.wagerIco} />
          <span className={styles.item_wager}>{props.wager}</span>
        </span>
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <span className={styles.item_multiplier}>{props.multiplier}x</span>
        </span>
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <img
            src={linkIco.src}
            width={22}
            height={22}
            className={styles.linkIco}
          />
        </span>
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <span className={styles.profit}>+{props.profit}</span>
          <img src={wagerIco.src} alt="wager-ico" className={styles.wagerIco} />
        </span>
      </td>
    </>
  );
};
