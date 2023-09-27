import s from "./styles.module.scss";
import { CustomBetsItem } from "@/widgets/CustomBets/CustomBetsItem";
import { FC } from "react";

interface CustomBetsProps {
  title: string;
  bets: any[];
  isMainPage: boolean;
  isGamePage: boolean;
}

export const CustomBets: FC<CustomBetsProps> = ({
  title,
  bets,
  isMainPage,
  isGamePage,
}) => {
  return (
    <div className={s.customBets_wrap}>
      <div
        className={s.customBets_header}
        style={{ justifyContent: `${isMainPage && "center"}` }}
      >
        <h2 className={s.customBets_title}>
          {(isMainPage || isGamePage) && (
            <div className={s.customBets_title_circle}></div>
          )}
          {title}
        </h2>
        {isGamePage && (
          <div className={s.customBets_switch_bets_btns}>
            <button className={s.customBets_allBets_btn} data-active="active">
              all bets
            </button>
            <button className={s.customBets_myBets_btn}>my bets</button>
          </div>
        )}
      </div>
      <div className={s.customBets_body}>
        <div className={s.customBets_titles_list}>
          <span className={s.customBets_titles_list_item}>Time</span>
          <span className={s.customBets_titles_list_item}>Game</span>
          <span className={s.customBets_titles_list_item}>Player</span>
          <span className={s.customBets_titles_list_item} data-id="address">
            Address
          </span>
          <span className={s.customBets_titles_list_item} data-id="wager">
            Wager
          </span>
          <span className={s.customBets_titles_list_item} data-id="multiplier">
            Multiplier
          </span>
          <span className={s.customBets_titles_list_item} data-id="profit">
            Profit
          </span>
          <span className={s.customBets_titles_list_item} data-id="explorer">
            Explorer
          </span>
        </div>
        <div className={s.customBets_list}>
          {bets &&
            bets.map((item, ind) => <CustomBetsItem {...item} key={ind} />)}
        </div>
      </div>
      {/*<button className={s.custombets_loadmore_btn}>Load more</button>*/}
    </div>
  );
};
