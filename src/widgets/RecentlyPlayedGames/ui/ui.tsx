import React, { FC, useEffect, useState } from "react";
import styles from "./ui.module.scss";
import Image, { StaticImageData } from "next/image";
import * as api from "@/shared/api";
import { useRouter } from "next/router";
import { Games } from "@/shared/Games";

export interface IRecentlyGames {
  id: number | null;
  title: string;
  text: string | null;
  imgBackground: StaticImageData;
}

export const RecentlyPlayedGames: FC<{ RecentlyGames: IRecentlyGames[] }> = (
  props
) => {
  return (
    <div className={styles.container}>
      <p className={styles.recently_played_heading}>recently played</p>
      <div className={styles.recently_played_container}>
        {props.RecentlyGames.map((game: IRecentlyGames) => {
          return (
            <div key={game.id} className={styles.game_item}>
              <img
                src={game.imgBackground.src}
                alt={game.title}
                className={styles.game_image}
                height={231}
              />
              <div className={styles.content}>
                <h2 className={styles.game_title}>{game.title}</h2>
                <p className={styles.game_text}>{game.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
