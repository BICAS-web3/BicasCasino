import s from "./styles.module.scss";
import { FC, useEffect } from "react";
import explosionGif from "@/public/media/apples/explosion.gif";
import tokenIco from "@/public/media/apples/tokenIco.svg";

interface ApplesWinBlockProps {
  cf: number;
  profit: number;
}

export const ApplesWinBlock: FC<ApplesWinBlockProps> = ({ cf, profit }) => {
  useEffect(() => {
    const winBlock = document.getElementById("apples_win_block");

    setTimeout(() => {
      winBlock?.classList.add(s.block_appearing);

      setTimeout(() => {
        winBlock?.classList.remove(s.block_appearing);
        winBlock?.classList.add(s.block_invisible);
      }, 3000);
    }, 200);
  }, []);

  return (
    <div className={s.apples_win_block} id="apples_win_block">
      <img
        src={explosionGif.src}
        className={s.explosion_gif}
        alt="explosion-gif"
      />
      <div className={s.apples_win_body}>
        <h3 className={s.apples_win_title}>You win!</h3>
        <div className={s.apples_win_info}>
          {/* <span className={s.cf_title}>x{cf.toFixed(2)}</span> */}
          <span className={s.win_quantity_title}>
            {profit.toFixed(2)}{" "}
            <img
              src={tokenIco.src}
              className={s.token_ico}
              alt="token-static"
            />
          </span>
        </div>
      </div>
    </div>
  );
};
