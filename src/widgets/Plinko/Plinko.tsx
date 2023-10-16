import { FC, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/games_assets/plinko/plinkoBgImage2.png";
import { PlinkoPyramid } from "@/shared/ui/PlinkoPiramyd";
import { useStore, useUnit } from "effector-react";

interface IPlinko { }

export const Plinko: FC<IPlinko> = () => {
  return (
    <div className={styles.plinko_table_wrap}>
      <div className={styles.plinko_table_background}>
        <Image
          src={tableBg}
          className={styles.plinko_table_background_img}
          alt="table-bg"
          width={1418}
          height={680}
          quality={100}
        />
      </div>
      <div className={styles.plinko_table}>
        <div className={styles.pyramid}>
          <PlinkoPyramid />
        </div>
      </div>
    </div>
  );
};
