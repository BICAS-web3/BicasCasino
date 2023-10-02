import {FC} from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/poker_images/pokerBgImage.png";

interface IMinesGame {
}

export const MinesGame: FC<IMinesGame> = () => {

  return (

    <div className={styles.poker_table_background}>
      <Image
        src={tableBg}
        className={styles.poker_table_background_img}
        alt="table-bg"
      />
    </div>

  )
}