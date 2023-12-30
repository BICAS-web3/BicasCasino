import s from "./styles.module.scss";
import { FC } from "react";

import livechatIco from "@/public/media/support/liveChatIco.png";
import tgIco from "@/public/media/support/tgIco.png";
import twitterIco from "@/public/media/support/twitterIco.png";
import mailIco from "@/public/media/support/mailIco.png";

import livechatBg from "@/public/media/support/first.png";
import tgBg from "@/public/media/support/second.png";
import twitterBg from "@/public/media/support/third.png";
import mailBg from "@/public/media/support/fourth.png";

const supportList = [
  {
    title: "Live Chat",
    ico: livechatIco,
    href: "/",
    bg: livechatBg,
  },
  {
    title: "Telegram",
    ico: tgIco,
    href: "https://t.me/greekkeepers",
    bg: tgBg,
  },
  {
    title: "Twitter",
    ico: twitterIco,
    href: "https://twitter.com/GreekKeepers",
    bg: twitterBg,
  },
  {
    title: "Email us",
    ico: mailIco,
    href: "/",
    bg: mailBg,
  },
];

interface SupportBlockProps {}

export const SupportBlock: FC<SupportBlockProps> = () => {
  return (
    <div className={s.support_block}>
      <h2 className={s.support_title}>Support</h2>
      <div className={s.support_list}>
        {supportList.map((item, ind) => (
          <div key={ind} className={s.support_list_item}>
            <img
              src={item.bg.src}
              alt="item-bg"
              className={s.support_list_item_bg}
            />
            <div className={s.support_list_item_body}>
              <div className={s.support_list_header}>
                <img
                  src={item.ico.src}
                  className={s.support_list_item_ico}
                  alt="item-ico"
                />
                <span className={s.support_list_item_title}>{item.title}</span>
              </div>
              <button
                className={s.submit_btn}
                onClick={() => window.open(item.href, "_blank")}
              >
                Send a message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
