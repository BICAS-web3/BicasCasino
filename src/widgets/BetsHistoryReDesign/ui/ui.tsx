"use client";
import { FC } from "react";
import { TitleTable } from "@/shared/ui/TitleTable/ui/ui";
import styles from "./ui.module.scss";
import { TableItem } from "@/shared/ui/TableItem";
import { CustomButton } from "@/shared/ui/CustomButton";

const bets = [
  {
    id: 1,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 13.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 2,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 1.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 3,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 137298.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 4,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 130000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 5,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 6666666666.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 6,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 1372980000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 7,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 1372980000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 8,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 1372980000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 9,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 13729.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 10,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 13980000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 11,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 372980000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 12,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 13729000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 13,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 137298000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 14,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 17000.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 15,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 1372.34,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
  {
    id: 16,
    time: { date: "25.08.23", time: "17:05" },
    game_name: "Dice",
    player: "UserName",
    wager: 11,
    multiplier: 3,
    profit: 1234567890123457.02,
    userBg: "#3DBCE5",
    player_url: "test",
    trx_url: "test",
    game_url: "test",
    network_icon: "test",
    numBets: 1,
    gameAddress: "0x563...4ba9",
  },
];

interface IBetsHistoryReDesign {
  title: string;
}

export const BetsHistoryReDesign: FC<IBetsHistoryReDesign> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <TitleTable />
          <tbody className={styles.tbody}>
            {bets &&
              bets.map((item) => (
                <tr key={item.id}>
                  <TableItem {...item} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={styles.button}>
        <CustomButton
          text="Load more"
          textColor="gray"
          color="dark"
          size="sm"
        />
      </div>
    </div>
  );
};

