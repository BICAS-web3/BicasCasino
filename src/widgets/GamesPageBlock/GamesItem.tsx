import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { StaticImageData } from "next/image";

interface GamesItemProps {
  deskImg: StaticImageData;
  laptopImg: StaticImageData;
  title: string;
  href: string;
}

export const GamesItem: FC<GamesItemProps> = (props) => {
  const [isDesk, setIsDesk] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [currentImage, setCurrentImage] = useState(props.deskImg);

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
      setCurrentImage(props.deskImg);
    } else if (isLaptop) {
      setCurrentImage(props.laptopImg);
    }
  }, [isDesk, isLaptop, isMobile]);

  return (
    <div
      onClick={() => {
        location.href = props.href;
      }}
      className={s.games_item}
    >
      <img
        alt="games-item-bg-static"
        className={s.popular_game_bg_image}
        src={currentImage.src}
      />
      <span className={s.popular_games_list_item_title}>{props.title}</span>
    </div>
  );
};
