import {FC} from "react";
import styles from './ui.module.scss'

export const SwapTradeTokens: FC<{}> = () => {

  return (
    <div className={styles.trade}>
      <div className={styles.trade_title}>
        <h2 className={styles.title}>Swap</h2>
        <span className={styles.description}>Trade tokens in an instant</span>
      </div>
    </div>
  )
}
