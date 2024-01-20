import { FC, useEffect } from "react";
import s from "./styles.module.scss";
import winDrops from "@/public/media/games/winDrops.svg";

interface WinBlockProps {
  winValue?: number;
}

export const WinBlock: FC<WinBlockProps> = ({ winValue }) => {
  useEffect(() => {
    const wblock = document.getElementById("win_block_id");

    setTimeout(() => {
      wblock?.classList.add(s.anim);

      if (wblock?.classList.contains(s.anim)) {
        setTimeout(() => {
          wblock?.classList.add(s.block_hidden);
        }, 3000);
      }
    }, 1000);
  }, []);

  return (
    <div className={s.win_block} id="win_block_id">
      <div className={s.win_block_body}>
        <img src={winDrops.src} className={s.dropsImg} alt="" />
        <span className={s.win_text}>
          You won! <br />
          $300
        </span>
      </div>
    </div>
  );
};
