import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import tableBg from "@/public/media/coinflip_images/coinflipTableBg.png";
import Image from "next/image";

interface CoinFlipProps {}

export const CoinFlip: FC<CoinFlipProps> = ({}) => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
