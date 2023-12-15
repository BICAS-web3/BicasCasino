import React, { FC } from "react";
import Image from "next/image";
import bronzeLeague from "@/public/media/player_icons/bronzeLeague.webp";
import styles from "./ui.module.scss";

export const ImageLeague: FC<{}> = () => {
  return (
    <div className={styles.image}>
      <div className={styles.image_wrapper}>
        <Image
          src={bronzeLeague}
          alt={"ImageLeague"}
          width={147}
          height={147}
          className={styles.bronze}
        />
      </div>
      <div className={styles.blur_background}></div>
      <span className={styles.title}>bronze league</span>
    </div>
  );
};
