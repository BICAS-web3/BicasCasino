import { FC } from "react";
import styles from "./ui.module.scss";
import { IBettingData } from "@/widgets/ProfileBettingStatistics";

interface IBettingStatisticMetric {
  data: IBettingData;
}

export const BettingStatisticMetric: FC<IBettingStatisticMetric> = ({
  data,
}) => {
  return (
    <tr className={styles.financial_metric}>
      <td className={styles.td}>
        <span className={styles.metric_title}>{data.title}</span>
      </td>
      <td>
        <span className={styles.metric_total}>${data.total}</span>
      </td>
    </tr>
  );
};
