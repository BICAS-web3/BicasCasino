import { FC } from "react";

import Image from "next/image";

import linkIco from "@/public/media/leaderBoard_images/linkIco.svg";

import { shortenAddress, useMediaQuery } from "@/shared/tools";
import { T_LeaderBoardResponse } from "@/shared/api";

import s from "./styles.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { BlockiesAva } from "../BlockiesAva/BlockiesAva";

interface LeaderBoardItemProps extends T_LeaderBoardResponse {
  ind: number;
}

export const LeaderBoardItem: FC<LeaderBoardItemProps> = ({
  username,
  user_id,
  total,
  ind,
}) => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <Link href={`/account/${user_id}`} className={s.leader_board_list_item}>
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
            <BlockiesAva address={username} size={"30"} />
          </div>

          <span className={s.leader_board_list_item_player_title}>
            {username}
          </span>
        </div>
        <div className={s.leader_board_list_item_link}>
          <Image alt="link-ico" src={linkIco} width="22" height="22" />
        </div>
      </div>

      <div className={s.leader_board_list_item_address_block}>
        <span className={s.leader_board_list_item_address}>
          {isMobile ? shortenAddress(username) : username}
        </span>
      </div>
      <div className={s.leader_board_list_item_volume_block}>
        <span className={s.leader_board_list_item_volume}>
          {Number(total).toFixed(4)}
        </span>
      </div>
    </Link>
  );
};
