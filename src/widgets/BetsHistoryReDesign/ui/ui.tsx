import { FC } from "react";
import { TitleTable } from "@/shared/ui/TitleTable/ui/ui";
import styles from "./ui.module.scss";
import s from "@/widgets/CustomBets/styles.module.scss";
import { TableItem } from "@/shared/ui/TableItem";
import {CustomButton} from "@/shared/ui/CustomButton";

const bets = [
  {
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 5.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 5.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 5.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 5.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 5.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 5.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
];

export const BetsHistoryReDesign: FC<{}> = () => {
  return (
    <div className={styles.table}>
      <TitleTable />
      <div className={styles.customBets_list}>
        {bets && bets.map((item, ind) => <TableItem {...item} key={ind} />)}
      </div>
      <div className={styles.button}>
        <CustomButton text='Load more' textColor='gray' color='dark' size='sm' />
      </div>
    </div>
  );
};