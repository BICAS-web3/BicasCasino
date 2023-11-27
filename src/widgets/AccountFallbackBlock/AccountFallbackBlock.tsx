import s from "./styles.module.scss";
import { FC, useEffect } from "react";
import arrowTop from "@/public/media/misc/toRegisterArrow.png";
import { useAccount } from "wagmi";

interface AccountFallbackBlockProps {}

export const AccountFallbackBlock: FC<AccountFallbackBlockProps> = () => {
  return (
    <div className={s.fallback_wrap}>
      <div className={`${s.fallback_body} ${s.blick}`}>
        <div className={s.top_block}>
          <div className={s.toRegister_nav_block}>
            <p className={s.toRegister_nav_block_text}>
              The profile will be available after connecting the wallet
            </p>
            <img
              src={arrowTop.src}
              className={s.toRegister_arrow}
              alt="arrow"
            />
          </div>
          <div className={s.profile_temp_block}>
            <div className={s.profile_temp_leftSide}>
              <div className={s.profile_temp_ico}></div>
              <div className={s.profile_temp_address_name}>
                <div className={s.profile_temp_address}></div>
                <div className={s.profile_temp_name}></div>
              </div>
            </div>
            <div className={s.profile_temp_square}></div>
          </div>
        </div>
        <div className={s.temp_block_table}>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
          <div className={s.temp_blocks_list_item}></div>
        </div>
        <div className={s.last_blocks}>
          <div className={s.last_blocks_firstItem}></div>
          <div className={s.last_blocks_group}>
            <div className={s.last_blocks_group_item}></div>
            <div className={s.last_blocks_group_item}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
