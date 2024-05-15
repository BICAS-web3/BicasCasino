"use client"
import { FC, useEffect, useState } from "react";

import { useUnit } from "effector-react";

import clsx from "clsx";


// import * as Api from "@/api";

import s from "./styles.module.scss";
import { LeaderBoardItem } from "./LeaderBoardItem";
import { useMediaQuery } from "usehooks-ts";

interface LeaderBoardProps {}

export const LeaderBoard: FC<LeaderBoardProps> = () => {
//   const [apiResponse] = useUnit([settingsModel.$AvailableLeaderbord]);
  // const [list, setList] = useState<any | Api.T_LeaderBoardResponse[]>(
  //   apiResponse
  // );

  const [list, setList] = useState([])

//   useEffect(() => {
//     setList(apiResponse);
//   }, [apiResponse]);
  const isMobile = useMediaQuery("(max-width: 650px)");

//   useEffect(() => {
//     window.innerWidth <= 650 &&
//       setList(
//         apiResponse && Array.isArray(apiResponse) && apiResponse?.slice(0, 5)
//       );
//   }, [apiResponse]);

  const fullList = list?.length > 5;

  // const setListSize = () => {
  //   if (isMobile && !fullList) {
  //     setList(apiResponse);
  //   } else {
  //     setList(
  //       apiResponse && Array.isArray(apiResponse) && apiResponse?.slice(0, 5)
  //     );
  //   }
  // };

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
          >
            Address
          </span>
          <span className={s.leader_board_list_titles_item}>Volume</span>
        </div>
      </div>
      <div className={s.leader_board_list}>
        {/* {list && list.length > 0 ? (
          list.map((item: Api.T_LeaderBoardResponse, ind: number) => (
            <LeaderBoardItem key={ind + item.total} {...item} ind={ind} />
          ))
        ) : (
          <span className={s.no_data}>No Data yet</span>
        )} */}
        <LeaderBoardItem ind={1} player="anton" user_id="1" username="antonweb" nickname="asdasd" total={22} />
        <LeaderBoardItem ind={2} player="anton" user_id="2" username="antonweb" nickname="asdasd" total={22} />
      </div>
      {/* {apiResponse?.length > 5 && (
        <div className={s.leaderBoard_loadMore_btn_block}>
          <button onClick={setListSize} className={s.leaderBoard_loadMore_btn}>
            Load {fullList ? "Less" : "More"}
          </button>
        </div>
      )} */}
      <div className={s.leaderBoard_loadMore_btn_block}>
          <button onClick={() => {
            // setListSize()
            null
          }} className={s.leaderBoard_loadMore_btn}>
            Load {fullList ? "Less" : "More"}
          </button>
        </div>
    </div>
  );
};