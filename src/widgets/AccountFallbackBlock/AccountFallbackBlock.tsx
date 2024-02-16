import s from "./styles.module.scss";
import { FC, useEffect } from "react";
import arrowTop from "@/public/media/misc/toRegisterArrow.webp";
// import { useAccount } from "wagmi";

interface AccountFallbackBlockProps {}

export const AccountFallbackBlock: FC<AccountFallbackBlockProps> = () => {
  const blinkAnimation = (elements: any) => {
    elements.forEach((el: any, _: any) => {
      if (el instanceof HTMLElement) {
        if (el.dataset.num === "1") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "2s";
        } else if (el.dataset.num === "2") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2s";
          }, 400);
        } else if (el.dataset.num === "3") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.2s";
          }, 400);
        } else if (el.dataset.num === "4") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "2.05s";
        } else if (el.dataset.num === "5") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "2.1s";
        } else if (el.dataset.num === "6") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "2.2s";
        } else if (el.dataset.num === "7") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "2.07s";
        } else if (el.dataset.num === "8") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "2.1s";
        } else if (el.dataset.num === "9") {
          el.classList.add(s.anim_blick);
          el.style.animationDuration = "3s";
        } else if (el.dataset.num === "10") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.7s";
          }, 300);
        } else if (el.dataset.num === "11") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.05s";
          }, 700);
        } else if (el.dataset.num === "12") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.1s";
          }, 700);
        } else if (el.dataset.num === "13") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.2s";
          }, 700);
        } else if (el.dataset.num === "14") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.07s";
          }, 700);
        } else if (el.dataset.num === "15") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.1s";
          }, 700);
        } else if (el.dataset.num === "16") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2.7s";
          }, 1050);
        } else if (el.dataset.num === "17") {
          setTimeout(() => {
            el.classList.add(s.anim_blick);
            el.style.animationDuration = "2s";
          }, 1050);
        }
      }
    });

    setTimeout(() => {
      elements.forEach((el: any) => {
        if (el instanceof HTMLElement) {
          el.classList.remove(s.anim_blick);
        }
      });
    }, 3000);
  };

  useEffect(() => {
    const els = document.querySelectorAll("#inner_blick");
    let intervalId: NodeJS.Timeout;

    const performAnimation = () => {
      blinkAnimation(els);
      intervalId = setTimeout(performAnimation, 5000);
    };

    intervalId = setTimeout(performAnimation, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={s.fallback_wrap}>
      <div className={`${s.fallback_body}`}>
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
              <div className={s.profile_temp_ico}>
                <div data-num={1} className={s.blick} id="inner_blick"></div>
              </div>
              <div className={s.profile_temp_address_name}>
                <div className={s.profile_temp_address}>
                  <div data-num={2} className={s.blick} id="inner_blick"></div>
                </div>
                <div className={s.profile_temp_name}>
                  <div data-num={3} className={s.blick} id="inner_blick"></div>
                </div>
              </div>
            </div>
            <div className={s.profile_temp_square}>
              <div data-num={17} className={s.blick} id="inner_blick"></div>
            </div>
          </div>
        </div>
        <div className={s.temp_block_table}>
          <div className={s.temp_blocks_list_item}>
            <div data-num={4} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={11} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={5} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={12} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={6} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={13} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={7} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={14} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={8} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.temp_blocks_list_item}>
            <div data-num={15} className={s.blick} id="inner_blick"></div>
          </div>
        </div>
        <div className={s.last_blocks}>
          <div className={s.last_blocks_firstItem}>
            <div data-num={9} className={s.blick} id="inner_blick"></div>
          </div>
          <div className={s.last_blocks_group}>
            <div className={s.last_blocks_group_item}>
              <div data-num={10} className={s.blick} id="inner_blick"></div>
            </div>
            <div className={s.last_blocks_group_item}>
              <div data-num={16} className={s.blick} id="inner_blick"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
