import { FC } from "react";
import styles from "./ui.module.scss";


export const TitleTable: FC<{}> = () => {
  return (
    <thead className={styles.table}>
      <tr>
        <th className={styles.th}>
          <span className={styles.titles_item}>Time</span>
        </th>
        <th className={styles.th}>
          <span className={styles.titles_item}>Game</span>
        </th>
        <th className={styles.th}>
          <span className={styles.titles_item}>Player</span>
        </th>
        <th className={styles.th}>
          <span className={styles.titles_item}>Address</span>
        </th>
        <th className={styles.th}>
          <span className={styles.titles_item}>Wager</span>
        </th>
        <th className={styles.th}>
          <span className={styles.titles_item}>Multipiler</span>
        </th>
        <th className={styles.th}>
          <span className={styles.titles_item}>Profit</span>
        </th>
        <th className={styles.th}>
          <span className={styles.titles_item}>Explorer</span>
        </th>
      </tr>
    </thead>
  );
};
