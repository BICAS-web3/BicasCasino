import { FC } from "react";

import s from "./styles.module.scss";
import { SwaptIcon } from "@/shared/SVGs/SwapIcon";

export interface SwapProps {}

export const Swap: FC<SwapProps> = (props) => {
  // const {} =
  return (
    <div className={s.swap}>
      <div className={s.swap} onClick={() => console.log("open swap")}>
        <div className={s.icon_wrapper}>
          <SwaptIcon className={s.swap_icon} />
        </div>
        <div className={s.large_header_text}>SWAP</div>
      </div>
    </div>
  );
};
