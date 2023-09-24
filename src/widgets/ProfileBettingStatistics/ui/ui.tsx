import { FC, Fragment } from "react";
import styles from "./ui.module.scss";
import { BettingStatisticMetric } from "@/shared/ui/BettingStatisticMetric";

export interface IBettingData {
  id: number;
  title: string;
  total: number;
}

const data: IBettingData[] = [
  { id: 1, title: "Wagered", total: 0 },
  { id: 2, title: "Highest Multipiler", total: 5 },
  { id: 3, title: "Bets", total: 3 },
  { id: 4, title: "Favorite Game", total: 5 },
  { id: 5, title: "Bets Won", total: 5 },
  { id: 6, title: "Cross Profit", total: 5 },
  { id: 7, title: "Bets Loose", total: 5 },
  { id: 8, title: "Net Profit", total: 5 },
  { id: 9, title: "Highest Win", total: 5 },
];
export const ProfileBettingStatistics: FC<{}> = () => {
  const leftColumn = data.filter((_, index) => index % 2 === 0);
  const rightColumn = data.filter((_, index) => index % 2 !== 0);

  return (
    <table className={styles.betting_statistics}>
      <tbody className={styles.betting_column}>
        {leftColumn.map((item) => (
          <BettingStatisticMetric key={item.id} data={item} />
        ))}
      </tbody>
      <tbody className={styles.betting_column}>
        {rightColumn.map((item) => (
          <BettingStatisticMetric key={item.id} data={item} />
        ))}
      </tbody>
    </table>
  );
};
