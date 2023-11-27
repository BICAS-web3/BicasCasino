import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

interface PopularGamesItemProps {
  imgDesk: StaticImageData;
  imgLaptop: StaticImageData;
  imgMob: StaticImageData;
  title: string;
  href: string;
}

export const PopularGamesItem: FC<PopularGamesItemProps> = (props) => {
  const [isDesk, setIsDesk] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [currentImage, setCurrentImage] = useState(props.imgDesk);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIsDesk(false);
        setIsLaptop(true);
        setIsMobile(false);
      } else if (width < 700) {
        setIsDesk(false);
        setIsLaptop(true);
        setIsMobile(false);
      } else {
        setIsDesk(true);
        setIsLaptop(false);
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isDesk) {
      setCurrentImage(props.imgDesk);
    } else if (isLaptop) {
      setCurrentImage(props.imgLaptop);
    } else if (isMobile) {
      setCurrentImage(props.imgMob);
    }
  }, [isDesk, isLaptop, isMobile]);

  return (
    <div
      className={s.popular_games_list_item}
      onClick={() => {
        location.href = props.href;
      }}
    >
      <img
        alt="game-bg-static"
        className={s.popular_game_bg_image}
        src={currentImage.src}
      />
      <span className={s.popular_games_list_item_title}>{props.title}</span>
    </div>
  );
};
