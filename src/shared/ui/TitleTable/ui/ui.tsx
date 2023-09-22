import { FC } from "react";
import styles from "./ui.module.scss";

export const TitleTable: FC<{}> = () => {
  return (
    <thead className={styles.table}>
      <tr>
        <th>
          <span className={styles.titles_item}>Time</span>
        </th>
        <th>
          <span className={styles.titles_item}>Game</span>
        </th>
        <th>
          <span className={styles.titles_item}>Player</span>
        </th>
        <th>
          <span className={styles.titles_item}>Address</span>
        </th>
        <th>
          <span className={styles.titles_item}>Wager</span>
        </th>
        <th>
          <span className={styles.titles_item}>Multipiler</span>
        </th>
        <th>
          <span className={styles.titles_item}>Profit</span>
        </th>
      </tr>
      {/*<div className={styles.titles_table}>*/}
      {/*  <div className={styles.titles_block}>*/}
      {/*    <span className={styles.titles_block_item}>Time</span>*/}
      {/*    <span className={styles.titles_block_item}>Game</span>*/}
      {/*    <span className={styles.titles_block_item}>Player</span>*/}
      {/*    <span className={styles.titles_block_item}>Address</span>*/}
      {/*    <span className={styles.titles_block_item}>Wager</span>*/}
      {/*    <span className={styles.titles_block_item}>Multipiler</span>*/}
      {/*    <span className={styles.titles_block_item}>Profit</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </thead>
  );
};
