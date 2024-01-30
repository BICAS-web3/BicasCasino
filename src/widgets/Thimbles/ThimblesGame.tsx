import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import gameBg from "@/public/media/thimbles/thimblesBg.png";
import thimbleImg from "@/public/media/thimbles/thimble.png";
import thimbleShadow from "@/public/media/thimbles/thimbleShadow.png";
import ballIco from "@/public/media/thimbles/ball.svg";
import activeThimbleImg from "@/public/media/thimbles/activeThimble.png";
import clsx from "clsx";

interface ThimblesGameProps {
  gameText?: string;
}

export const ThimblesGame: FC<ThimblesGameProps> = () => {
  const [activeThimble] = useState(1); //0,1,2
  const [thimbles, setThimbles] = useState([0, 0, 0]);
  const [showBall, setShowBall] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBall(true);
    }, 5000);
  }, []);

  const showBallFx = () => {
    setShowBall(true);
  };

  const hideBallFx = () => {
    setShowBall(false);
  };

  return (
    <section
      className={s.thimbles_table_wrap}
      onClick={() => setShowBall(!showBall)}
    >
      <WagerLowerBtnsBlock className={s.race_btns} game="thimbles" />
      <div className={s.thimbles_table_bg_wrap}>
        <img
          src={gameBg.src}
          className={s.thimbles_table_bg}
          alt="thimbles-static-bg"
        />
      </div>
      <div className={s.thimbles_table_body}>
        <div className={s.thimbles_block}>
          {thimbles.map((thimble, ind) => (
            <div className={s.thimble_wrap}>
              <img
                src={thimbleImg.src}
                className={clsx(s.thimble, showBall && s.default_thimble_up)}
                alt="thimble"
              />
              {activeThimble === ind && (
                <img
                  src={activeThimbleImg.src}
                  className={clsx(
                    s.activeThimble_img,
                    showBall && s.active_shadow
                  )}
                  alt="thimble"
                />
              )}
              {activeThimble === ind && (
                <img
                  src={ballIco.src}
                  className={s.ball_img}
                  alt="static-ball"
                />
              )}
              <img
                src={thimbleShadow.src}
                className={s.thimble_shadow}
                alt="thimble-static-shadow"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
