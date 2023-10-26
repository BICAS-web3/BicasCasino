import { FC } from "react";

import Image from "next/image";

import linkIco from "@/public/media/leaderBoard_images/linkIco.svg";
import { shortenAddress, useMediaQuery } from "@/shared/tools";

import s from "./styles.module.scss";

interface LeaderBoardItemProps {
  nickname: string;
  player: string;
  total: number;
  ind: number;
}

export const LeaderBoardItem: FC<LeaderBoardItemProps> = ({
  nickname,
  player,
  total,
  ind,
}) => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <div className={s.leader_board_list_item}>
      <div className={s.leader_board_list_item_rank_block}>
        <span
          className={s.leader_board_list_item_rank}
          // data-top={rank <= 3 && true}
        >
          {ind + 1}
        </span>
      </div>
      <div className={s.leader_board_list_item_player_block}>
        <div
          className={s.leader_board_list_item_player_icon}
          // style={{ background: playerBg }}
        >
          <span className={s.leader_board_list_item_player_icon_title}>B</span>
        </div>
        <span className={s.leader_board_list_item_player_title}>
          {nickname || "No Name"}
        </span>
        <div className={s.leader_board_list_item_link}>
          <Image alt="link-ico" src={linkIco} width="22" height="22" />
        </div>
      </div>

      <div className={s.leader_board_list_item_address_block}>
        <span className={s.leader_board_list_item_address}>
          {isMobile ? shortenAddress(player) : player}
        </span>
      </div>
      <div className={s.leader_board_list_item_volume_block}>
        <span className={s.leader_board_list_item_volume}>
          {total?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
