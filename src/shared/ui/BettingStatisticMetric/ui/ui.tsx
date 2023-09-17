import {FC} from "react";
import styles from './ui.module.scss'

interface IBettingStatisticMetric {
  id: number
  title: string
  total: number
}

export const BettingStatisticMetric: FC<IBettingStatisticMetric> = ({id, title, total}) => {

  return (
    <div className={styles.financial_metric}>
      <h3 className={styles.metric_title}>{title}</h3>
      <p className={styles.metric_total}>{`$${total}`}</p>
    </div>
  )
}