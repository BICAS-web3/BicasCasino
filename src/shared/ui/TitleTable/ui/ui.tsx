import { FC } from "react";
import styles from "./ui.module.scss";

export const TitleTable: FC<{}> = () => {
  return (
    <section className={styles.table}>
      <h2 className={styles.title}>Bet History</h2>
      <div className={styles.titles_table}>
        <div className={styles.titles_block}>
          <span className={styles.titles_block_item}>Time</span>
          <span className={styles.titles_block_item}>Game</span>
          <span className={styles.titles_block_item}>Player</span>
          <span className={styles.titles_block_item}>Address</span>
          <span className={styles.titles_block_item}>Wager</span>
          <span className={styles.titles_block_item}>Multipiler</span>
          <span className={styles.titles_block_item}>Profit</span>
        </div>
      </div>
    </section>
  );
};
