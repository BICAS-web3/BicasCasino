import s from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/games_assets/rock_paper_scissors/rps_main_bg.png";

export const RockPaperScissors = () => {
  return (
    <div className={s.rps_table_container}>
      <div className={s.rps_table_background}>
        <Image
          src={tableBg}
          className={s.rps_table_background_img}
          alt="table-bg"
        />
      </div>
    </div>
  );
};
