import {FC} from "react";
import styles from  './ui.module.scss'
export const ProfileBettingStatistics: FC<{}> = () => {
  return (
    <div className={styles.wager_card}>
      {/*<RenderWagerCards wagerCardOptions={wagerCardOptions} />*/}
      <div className={styles.financial_metric1}>
        <p className={styles.wager_status_text}>Highest Win</p>
        <p className={styles.highest_win_text}>$0</p>
      </div>
    </div>
  )
}