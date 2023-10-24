import s from "./styles.module.scss";
import { LeaderBoardItem } from "@/widgets/LeaderBoard/LeaderBoardItem";
import { FC, useEffect, useState } from "react";

//demo
export let leadersList = [
  {
    rank: 1,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#E84D62;",
  },
  {
    rank: 2,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#FF73FA;",
  },
  {
    rank: 3,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#43B581;",
  },
  {
    rank: 4,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#3DBCE5;",
  },
  {
    rank: 5,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#FAA61A;",
  },
  {
    rank: 6,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#FAA61A;",
  },
  {
    rank: 7,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#F47B68;",
  },
  {
    rank: 8,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#3DBCE5;",
  },
  {
    rank: 9,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#FAA61A;",
  },
  {
    rank: 10,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#F57731;",
  },
  {
    rank: 11,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#FAA61A;",
  },
  {
    rank: 12,
    player: "UserName",
    address: "0x563...4ba9",
    volume: "37,298,200",
    playerBg: "#F57731;",
  },
];

const sortedL = leadersList.slice();
sortedL.sort((a, b) => a.rank - b.rank);

const col1 = sortedL.slice(0, 5);
const col2 = sortedL.slice(5);

interface LeaderBoardProps {}

export const LeaderBoard: FC<LeaderBoardProps> = () => {
  const isMobile = window.innerWidth;
  const [list, setList] = useState(leadersList);

  useEffect(() => {
    window.innerWidth <= 650 && setList(list.slice(0, 5));
  }, []);

  const showList = () => {
    if (isMobile && list.length > 5) {
      setList(list.slice(0, 5));
    } else {
      setList(leadersList);
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
            className={s.leader_board_list_titles_item}
            data-id="address_board_list_title"
          >
            Address
          </span>
          <span className={s.leader_board_list_titles_item}>Volume</span>
        </div>
        <div className={s.leader_board_row_titles_block}>
          <span className={s.leader_board_list_titles_item}>Rank</span>
          <span className={s.leader_board_list_titles_item}>Player</span>
          <span
            className={s.leader_board_list_titles_item}
            data-id="address_board_list_title"
          >
            Address
          </span>
          <span className={s.leader_board_list_titles_item}>Volume</span>
        </div>
      </div>
      <div className={s.leader_board_list}>
        {list && list.map((item, ind) => <LeaderBoardItem {...item} />)}
      </div>
      <div className={s.leaderBoard_loadMore_btn_block}>
        <button onClick={showList} className={s.leaderBoard_loadMore_btn}>
          Load {isMobile && list.length > 5 ? "Less" : "More"}
        </button>
      </div>
    </div>
  );
};
