import { FC, Fragment, useEffect, useState } from "react";
import styles from "./ui.module.scss";
import { BettingStatisticMetric } from "@/shared/ui/BettingStatisticMetric";
import * as api from "@/shared/api";

export interface IBettingData {
  id: number;
  title: string;
  total: number;
  sign: boolean;
}

// const data: IBettingData[] = [
//   { id: 1, title: "Wagered", total: 0 },
//   { id: 2, title: "Highest Multipiler", total: 5 },
//   { id: 3, title: "Bets", total: 3 },
//   { id: 4, title: "Favorite Game", total: 5 },
//   { id: 5, title: "Bets Won", total: 5 },
//   { id: 6, title: "Cross Profit", total: 5 },
//   { id: 7, title: "Bets Loose", total: 5 },
//   { id: 8, title: "Net Profit", total: 5 },
//   { id: 9, title: "Highest Win", total: 5 },
// ];

export interface ProfileBettingStatisticsProps {
  address: string;
}
export const ProfileBettingStatistics: FC<ProfileBettingStatisticsProps> = (
  props
) => {
  const [totals, setTotals] = useState<IBettingData[]>([]);
  useEffect(() => {
    async function run() {
      const totals_response = (
        await api.GetPlayerTotalsFx((props.address as string).toLowerCase())
      ).body as api.T_PlayerTotals;

      setTotals([
        {
          id: 1,
          title: "Wagered",
          total: totals_response.total_wagered_sum
            ? totals_response.total_wagered_sum
            : 0,
          sign: true,
        },
        {
          id: 3,
          title: "Bets",
          total: totals_response.bets_amount,
          sign: false,
        },
        {
          id: 5,
          title: "Bets won",
          total: totals_response.won_bets ? totals_response.won_bets : 0,
          sign: false,
        },
        {
          id: 7,
          title: "Bets lose",
          total: totals_response.lost_bets ? totals_response.lost_bets : 0,
          sign: false,
        },
        {
          id: 9,
          title: "Highest Win",
          total: totals_response.highest_win ? totals_response.highest_win : 0,
          sign: true,
        },
        {
          id: 2,
          title: "Gross Profit",
          total: totals_response.gross_profit
            ? totals_response.gross_profit
            : 0,
          sign: true,
        },
        {
          id: 2,
          title: "Net Profite",
          total: totals_response.net_profit ? totals_response.net_profit : 0,
          sign: true,
        },
      ]);
    }
    run();
  }, []);

  const leftColumn = totals.filter((_, index) => index % 2 === 0);
  const rightColumn = totals.filter((_, index) => index % 2 !== 0);

  return (
    <table className={styles.betting_statistics}>
      <tbody className={styles.betting_column}>
        {leftColumn.map((item) => (
          <BettingStatisticMetric key={item.id} data={item} sign={item.sign} />
        ))}
      </tbody>
      <tbody className={styles.betting_column}>
        {rightColumn.map((item) => (
          <BettingStatisticMetric key={item.id} data={item} sign={item.sign} />
        ))}
      </tbody>
    </table>
  );
};
