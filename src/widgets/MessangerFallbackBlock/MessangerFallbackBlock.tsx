import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import closeImg from "@/public/media/misc/msFallbackClose.png";
import { useRouter } from "next/router";

interface MessangerFallbackBlockProps {}

export const MessangerFallbackBlock: FC<MessangerFallbackBlockProps> = () => {
  const router = useRouter();

  return (
    <div className={s.messanger_fallback_wrap}>
      <div className={s.underdevelopment_block}>
        <span className={s.underdevelopment_block_title}>
          The chat room is under development
        </span>
        <button
          className={s.underdevelopment_block_button}
          onClick={() => router.push("/")}
        >
          Go to Main page
        </button>
      </div>
      <div className={s.messanger_fallback_body}>
        <div className={s.messanger_fallback_header}>
          <span className={s.messanger_title}>chat room</span>
          <div className={s.header_rightBlock}>
            <div className={s.header_square}></div>
            <div className={s.header_group}>
              <div className={s.header_group_item}></div>
              <div className={s.header_group_item}></div>
              <div className={s.header_group_item}></div>
            </div>
            <Image
              src={closeImg}
              alt="close-ico"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
        <div className={s.messanger_fallback_chat_block}>
          <div className={s.left_message_block}>
            <div className={s.message_ico}></div>
            <div className={s.left_message_group}>
              <div className={s.left_message_group_item_short}></div>
              <div className={s.left_message_group_item_long}></div>
            </div>
          </div>
          <div className={s.left_message_block}>
            <div className={s.message_ico}></div>
            <div className={s.left_message_group}>
              <div
                className={`${s.left_message_group_item_short} ${s.second_long}`}
              ></div>
              <div
                className={`${s.left_message_group_item_long} ${s.second_short}`}
              ></div>
            </div>
          </div>
          <div className={s.right_message_block}>
            <div className={s.right_message_group}>
              <div className={s.right_message_group_item_short}></div>
              <div className={s.right_message_group_item_long}></div>
            </div>
            <div className={s.message_ico}></div>
          </div>
          <div className={s.left_message_block}>
            <div className={s.message_ico}></div>
            <div className={s.left_message_group}>
              <div className={s.left_message_group_item_short}></div>
              <div className={s.left_message_group_item_long}></div>
            </div>
          </div>
          <div className={s.right_message_block}>
            <div className={s.right_message_group}>
              <div className={s.right_message_group_item_short}></div>
              <div className={s.right_message_group_item_long}></div>
            </div>
            <div className={s.message_ico}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
