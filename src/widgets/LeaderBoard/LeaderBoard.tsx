import { FC, useEffect, useState } from "react";

import { LeaderBoardItem } from "@/widgets/LeaderBoard/LeaderBoardItem";

import s from "./styles.module.scss";

import clsx from "clsx";

import * as Api from "@/shared/api";
{
  /* <div className={s.leader_board_row_titles_block}>
<span className={s.leader_board_list_titles_item}>Rank</span>
<span className={s.leader_board_list_titles_item}>Player</span>
<span
  className={s.leader_board_list_titles_item}
  data-id="address_board_list_title"
>
  Address
</span>
<span className={s.leader_board_list_titles_item}>Volume</span>
</div> */
}

export interface LeaderBoardItem {
  nickname: string;
  player: string;
  total: number;
}

interface LeaderBoardProps {}

export const LeaderBoard: FC<LeaderBoardProps> = () => {
  const [apiResponse, setApiResponse] = useState<any | LeaderBoardItem[]>(null);
  const [list, setList] = useState<any | LeaderBoardItem[]>(null);
  const getData = async () => {
    const bets = await Api.getLeaderboard();
    setApiResponse(bets.body);
    setList(bets.body);
  };
  useEffect(() => {
    getData();
  }, []);

  const isMobile = window.innerWidth <= 650;

  useEffect(() => {
    window.innerWidth <= 650 && setList(apiResponse?.slice(0, 5));
  }, [apiResponse]);

  const fullList = list?.length > 5;

  const setListSize = () => {
    if (isMobile && !fullList) {
      setList(apiResponse);
      console.log("full");
    } else {
      setList(apiResponse.slice(0, 5));
      console.log("part");
    }
  };

  return (
    <div className={s.leader_board_wrap}>
      <h2 className={s.leader_board_title}>Leader Board</h2>
      <div className={s.leader_board_list_titles}>
        <div className={s.leader_board_row_titles_block}>
          <span className={s.leader_board_list_titles_item}>Rank</span>
          <span className={s.leader_board_list_titles_item}>Player</span>
          <span
            className={clsx(
              s.leader_board_list_titles_item,
              s.leader_board_list_titles_item_address
            )}
            // data-id="address_board_list_title"
          >
            Address
          </span>
          <span className={s.leader_board_list_titles_item}>Volume</span>
        </div>
        {/* <div className={s.leader_board_row_titles_block}>
          <span className={s.leader_board_list_titles_item}>Rank</span>
          <span className={s.leader_board_list_titles_item}>Player</span>
          <span
            className={s.leader_board_list_titles_item}
            data-id="address_board_list_title"
          >
            Address
          </span>
          <span className={s.leader_board_list_titles_item}>Volume</span>
        </div> */}
      </div>
      <div className={s.leader_board_list}>
        {list && list.length > 0 ? (
          list.map((item: LeaderBoardItem, ind: number) => (
            <LeaderBoardItem key={ind} {...item} ind={ind} />
          ))
        ) : (
          <span className={s.no_data}>No Data yet</span>
        )}
      </div>
      <div className={s.leaderBoard_loadMore_btn_block}>
        <button onClick={setListSize} className={s.leaderBoard_loadMore_btn}>
          Load {fullList ? "Less" : "More"}
        </button>
      </div>
    </div>
  );
};
