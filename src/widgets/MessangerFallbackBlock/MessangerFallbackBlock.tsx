import s from "./styles.module.scss";
import { FC, useEffect } from "react";
import Image from "next/image";
import closeImg from "@/public/media/misc/msFallbackClose.png";
import { useRouter } from "next/router";
import Link from "next/link";

interface MessangerFallbackBlockProps {}

export const MessangerFallbackBlock: FC<MessangerFallbackBlockProps> = () => {
  const router = useRouter();

  const blinkAnimation = (elements: any) => {
    elements.forEach((el: any, _: any) => {
      if (el instanceof HTMLElement) {
        if (el.dataset.num === "1") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "1.4s";
        } else if (el.dataset.num === "2") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.1s";
          }, 300);
        } else if (el.dataset.num === "3") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "4s";
          }, 400);
        } else if (el.dataset.num === "4") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2s";
          }, 100);
        } else if (el.dataset.num === "5") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.4s";
          }, 400);
        } else if (el.dataset.num === "6") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "4s";
          }, 700);
        } else if (el.dataset.num === "7") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.3s";
          }, 2300);
        } else if (el.dataset.num === "8") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "3s";
          }, 1600);
        } else if (el.dataset.num === "9") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "1.4s";
          }, 3500);
        } else if (el.dataset.num === "10") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2s";
          }, 200);
        } else if (el.dataset.num === "11") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.2s";
          }, 650);
        } else if (el.dataset.num === "12") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "4s";
          }, 1300);
        } else if (el.dataset.num === "13") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.3s";
          }, 3000);
        } else if (el.dataset.num === "14") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "3s";
          }, 2300);
        } else if (el.dataset.num === "15") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2s";
          }, 4000);
        }
      }
    });

    setTimeout(() => {
      elements.forEach((el: any) => {
        if (el instanceof HTMLElement) {
          el.classList.remove(s.anim_blick);
        }
      });
    }, 5500);
  };

  useEffect(() => {
    const els = document.querySelectorAll("#inner_blick");
    let intervalId: NodeJS.Timeout;

    const performAnimation = () => {
      blinkAnimation(els);
      intervalId = setTimeout(performAnimation, 7000);
    };

    intervalId = setTimeout(performAnimation, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={s.messanger_fallback_wrap}>
      <div className={s.underdevelopment_block}>
        <span className={s.underdevelopment_block_title}>
          The chat room is under development
        </span>
        <Link className={s.underdevelopment_block_button} href="/">
          Go to Main page
        </Link>
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
            <Link href="/">
              <Image src={closeImg} alt="close-ico" />
            </Link>
          </div>
        </div>
        <div className={s.messanger_fallback_chat_block}>
          <div className={s.left_message_block}>
            <div className={s.message_ico}>
              <div data-num={1} className={s.blick} id="inner_blick"></div>
            </div>
            <div className={s.left_message_group}>
              <div className={s.left_message_group_item_short}>
                <div data-num={2} className={s.blick} id="inner_blick"></div>
              </div>
              <div className={s.left_message_group_item_long}>
                <div data-num={3} className={s.blick} id="inner_blick"></div>
              </div>
            </div>
          </div>
          <div className={s.left_message_block}>
            <div className={s.message_ico}>
              <div data-num={4} className={s.blick} id="inner_blick"></div>
            </div>
            <div className={s.left_message_group}>
              <div
                className={`${s.left_message_group_item_short} ${s.second_long}`}
              >
                <div data-num={5} className={s.blick} id="inner_blick"></div>
              </div>
              <div
                className={`${s.left_message_group_item_long} ${s.second_short}`}
              >
                <div data-num={6} className={s.blick} id="inner_blick"></div>
              </div>
            </div>
          </div>
          <div className={s.right_message_block}>
            <div className={s.right_message_group}>
              <div className={s.right_message_group_item_short}>
                <div data-num={7} className={s.blick} id="inner_blick"></div>
              </div>
              <div className={s.right_message_group_item_long}>
                <div data-num={8} className={s.blick} id="inner_blick"></div>
              </div>
            </div>
            <div className={s.message_ico}>
              <div data-num={9} className={s.blick} id="inner_blick"></div>
            </div>
          </div>
          <div className={s.left_message_block}>
            <div className={s.message_ico}>
              <div data-num={10} className={s.blick} id="inner_blick"></div>
            </div>
            <div className={s.left_message_group}>
              <div className={s.left_message_group_item_short}>
                <div data-num={11} className={s.blick} id="inner_blick"></div>
              </div>
              <div className={s.left_message_group_item_long}>
                <div data-num={12} className={s.blick} id="inner_blick"></div>
              </div>
            </div>
          </div>
          <div className={s.right_message_block}>
            <div className={s.right_message_group}>
              <div className={s.right_message_group_item_short}>
                <div data-num={13} className={s.blick} id="inner_blick"></div>
              </div>
              <div className={s.right_message_group_item_long}>
                <div data-num={14} className={s.blick} id="inner_blick"></div>
              </div>
            </div>
            <div className={s.message_ico}>
              <div data-num={15} className={s.blick} id="inner_blick"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
