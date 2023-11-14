import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import clsx from "clsx";

import s from "./styles.module.scss";

import { useDropdown, useMediaQuery } from "@/shared/tools";
import { SwaptIcon } from "@/shared/SVGs/SwapIcon";
import { ArrowSwapIcon } from "@/shared/SVGs/ArrowSwapIcon";
import { CloseSwapIcon } from "@/shared/SVGs/CloseSwapIcon";

import { $isOpen, Close } from "@/widgets/SideBar/model";
import * as SwapModel from "@/widgets/Swap/model/index";

import { SwapToken } from "./SwapToken";
import { Blur } from "./Blur";

export interface SwapProps {
  closeClassName?: string;
}

export const Swap: FC<SwapProps> = ({ closeClassName }) => {
  const isMobile = useMediaQuery("(max-width: 650px)");
  const { toggle, close, dropdownRef, isOpen, open: setOpen } = useDropdown();
  const [swapToggle, swapClose] = useUnit([
    SwapModel.flipSwapOpen,
    SwapModel.Close,
  ]);
  const [tokenFrom, setTokenFrom] = useState<any>();
  const [tokenTo, setTokenTo] = useState<any>();

  const [isSidebarOpen, setClose] = useUnit([$isOpen, Close]);

  useEffect(() => {
    !isOpen && swapClose();
  }, [isOpen]);

  return (
    <>
      <Blur isOpen={isOpen} />
      <div ref={dropdownRef} className={s.swap}>
        {isSidebarOpen ? (
          <div
            className={s.swap_button_open}
            onClick={() => {
              toggle();
              swapToggle();
            }}
          >
            <div className={s.icon_wrapper}>
              <SwaptIcon className={s.swap_icon} />
            </div>
            <span className={s.large_header_text}>SWAP</span>
          </div>
        ) : (
          <div
            className={clsx(closeClassName, s.swap_button_closed)}
            onClick={() => {
              toggle();
              swapToggle();
            }}
          >
            <SwaptIcon className={s.swap_icon} />
            <div className={s.games_button_tooltip}>Swap</div>
          </div>
        )}
        <article
          className={clsx(
            s.swap_block,
            isOpen && s.swap_block_open,
            (isSidebarOpen || isMobile) && s.swap_sidebar_open
          )}
        >
          <div className={s.swap_head}>
            <span></span> <h3>Swap</h3>
            <CloseSwapIcon
              className={s.swap_close_icon}
              onClick={() => {
                close();
                swapClose();
                isMobile && setClose();
              }}
            />
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
