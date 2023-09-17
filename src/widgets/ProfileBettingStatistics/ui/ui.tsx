import {FC, Fragment} from "react";
import styles from './ui.module.scss'
import {BettingStatisticMetric} from "@/shared/ui/BettingStatisticMetric";

const data = [
  {id: 1, title: 'Wagered', total: 0},
  {id: 2, title: 'Highest Multipiler', total: 5},
  {id: 3, title: 'Bets', total: 3},
  {id: 4, title: 'Favorite Game', total: 5},
  {id: 5, title: 'Bets Won', total: 5},
  {id: 6, title: 'Cross Profit', total: 5},
  {id: 7, title: 'Bets Loose', total: 5},
  {id: 8, title: 'Net Profit', total: 5},
  {id: 9, title: 'Highest Win', total: 5},
];
export const ProfileBettingStatistics: FC<{}> = () => {
  const elements = data.map((item) => {
    return (
      <BettingStatisticMetric key={item.id} id={item.id} title={item.title} total={item.total}/>
    );
  });
  return (
    <Fragment>
      <div className={styles.wager_card}>
        {elements}
      </div>
    </Fragment>
  );
}