import { FC, useState } from "react";
import s from "./ui.module.scss";
import clsx from "clsx";
import Image from "next/image";

import dice_arr from "@/public/media/dice_icons/dice_arr.svg";

interface AboutGameProps {
  about_game: string;
}
export const AboutGame: FC<AboutGameProps> = ({ about_game }) => {
  const [aboutGame, setAboutGame] = useState(false);

  return (
    <div className={s.about_game}>
      <button
        onClick={() => setAboutGame((prev) => !prev)}
        className={s.about_game_button}
      >
        About the Game <Image src={dice_arr} alt="arr" />
      </button>
      <p
        className={clsx(
          s.about_game_text,
          aboutGame ? s.dice_open : s.dice_close
        )}
      >
        {about_game}
      </p>
    </div>
  );
};
