import { FC } from "react";

import Image from "next/image";

import LinkIco from "@/public/images/leaderBoard_images/linkIco.svg";

// import { shortenAddress, useMediaQuery } from "@/shared/tools";
import { T_LeaderBoardResponse } from "@/api";
import s from "./styles.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { BlockiesAva } from "../BlockiesAva/BlockiesAva";
import { useMediaQuery } from "usehooks-ts";

interface LeaderBoardItemProps extends T_LeaderBoardResponse {
  ind: number;
  nickname: string,
  player: string
}

export const LeaderBoardItem: FC<LeaderBoardItemProps> = ({
  nickname,
  player,
  total,
  ind,
}) => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <Link href={`/account/${player}`} className={s.leader_board_list_item}>
      <div className={s.leader_board_list_item_rank_block}>
        <span
          className={clsx(
            s.leader_board_list_item_rank,
            ind === 0 && s.leader_board_list_item_rank_gold,
            ind === 1 && s.leader_board_list_item_rank_gold,
            ind === 2 && s.leader_board_list_item_rank_gold
          )}
        >
          {ind + 1}
        </span>
      </div>
      <div className={s.leader_board_list_item_player_block}>
        <div className={s.player_block_group}>
          <div className={s.leader_board_list_item_player_icon}>
            <BlockiesAva address={player} size={"30"} />
          </div>

          <span className={s.leader_board_list_item_player_title}>
            {nickname || player}
          </span>
        </div>
        <div className={s.leader_board_list_item_link}>
          <LinkIco className="w-[22px] h-[22px]" />
        </div>
      </div>

      <div className={s.leader_board_list_item_address_block}>
        <span className={s.leader_board_list_item_address}>
          {isMobile ? player : player}
        </span>
      </div>
      <div className={s.leader_board_list_item_volume_block}>
        <span className={s.leader_board_list_item_volume}>
          {total.toFixed(2)}
        </span>
      </div>
    </Link>
  );
};