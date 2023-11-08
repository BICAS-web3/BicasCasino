import { FC, useState } from "react";
import { useUnit } from "effector-react";
import clsx from "clsx";

import s from "./styles.module.scss";

import { useDropdown } from "@/shared/tools";
import { SwaptIcon } from "@/shared/SVGs/SwapIcon";
import { ArrowSwapIcon } from "@/shared/SVGs/ArrowSwapIcon";
import { CloseSwapIcon } from "@/shared/SVGs/CloseSwapIcon";

import { $isOpen } from "@/widgets/SideBar/model";

import { SwapToken } from "./SwapToken";
import { Blur } from "./Blur";

export interface SwapProps {
  closeClassName?: string;
}

export const Swap: FC<SwapProps> = ({ closeClassName }) => {
  const { toggle, close, dropdownRef, isOpen } = useDropdown();

  const [tokenFrom, setTokenFrom] = useState<any>();
  const [tokenTo, setTokenTo] = useState<any>();

  const [isSidebarOpen] = useUnit([$isOpen]);

  return (
    <>
      <Blur isOpen={isOpen} />
      <div ref={dropdownRef} className={s.swap}>
        {isSidebarOpen ? (
          <div className={s.swap_button_open} onClick={toggle}>
            <div className={s.icon_wrapper}>
              <SwaptIcon className={s.swap_icon} />
            </div>
            <span className={s.large_header_text}>SWAP</span>
          </div>
        ) : (
          <div
            className={clsx(closeClassName, s.swap_button_closed)}
            onClick={toggle}
          >
            <div className={s.button}>
              <SwaptIcon className={s.swap_icon} />
              <div className={s.games_button_tooltip}>Swap</div>
            </div>
          </div>
        )}
        <article
          className={clsx(
            s.swap_block,
            isOpen && s.swap_block_open,
            isSidebarOpen && s.swap_sidebar_open
          )}
        >
          <div className={s.swap_head}>
            <span></span> <h3>Swap</h3>
            <CloseSwapIcon className={s.swap_close_icon} onClick={close} />
          </div>
          <div className={s.swap_body}>
            <p className={s.swap_under_title}>Trade tokens in an instant</p>
            <div className={s.swap_main}>
              <SwapToken token={tokenFrom} setToken={setTokenFrom} />
              <span className={s.swap_arr}>
                <ArrowSwapIcon className={s.swap_arr_icon} />
              </span>
              <SwapToken token={tokenTo} setToken={setTokenTo} />
            </div>
            <button className={s.swap_button}>Exchange</button>
          </div>
        </article>
      </div>
    </>
  );
};
