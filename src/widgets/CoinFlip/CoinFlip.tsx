import { FC } from "react";
import s from "./styles.module.scss";
import tableBg from "@/public/media/coinflip_images/coinflipTableBg.png";
import Image from "next/image";

interface CoinFlipProps {}

export const CoinFlip: FC<CoinFlipProps> = ({}) => {
  return (
    <div className={s.coinflip_table_wrap}>
      <div className={s.coinflip_table_background}>
        <Image
          src={tableBg}
          className={s.coinflip_table_background_img}
          alt="table-bg"
        />
      </div>
      <div className={s.coinflip_table}>
        {/* <div className={s.coinflip_wrap}>
          <h2 className={s.coinflip_wins_losses_list}>0 winning / 0 loss</h2>
          <div className={s.coinflip_block}></div>
        </div> */}
      </div>
    </div>
  );
};
