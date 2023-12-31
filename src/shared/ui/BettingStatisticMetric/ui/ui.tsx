import { FC } from "react";
import styles from "./ui.module.scss";
import { IBettingData } from "@/widgets/ProfileBettingStatistics";

interface IBettingStatisticMetric {
  data: IBettingData;
  sign: boolean;
}

export const BettingStatisticMetric: FC<IBettingStatisticMetric> = ({
  data,
  sign,
}) => {
  return (
    <tr className={styles.financial_metric}>
      <td className={styles.td}>
        <span className={styles.metric_title}>{data.title}</span>
      </td>
      <td>
        <span className={styles.metric_total}>
          {sign && "$"}
          {data.total < 0 ? (data.total * -1).toFixed(0) : data.total.toFixed(0)}
        </span>
      </td>
    </tr>
  );
};
