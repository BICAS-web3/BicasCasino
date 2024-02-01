import { FC, createRef, useEffect, useRef, useState } from "react";
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
  const [activeThimble, setActiveThimble] = useState(1); //0,1,2
  const [thimbles, setThimbles] = useState([0, 0, 0]);
  const [showBall, setShowBall] = useState(true);

  const [startGame, setStartGame] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [selected, setSelected] = useState<null | number>(null);

  useEffect(() => {
    if (startGame) {
      setTimeout(() => setShowAnimation(true), 500);
      setShowBall(false);
    } else {
      // setShowAnimation(false);
    }
  }, [startGame]);
  const handleSectionClick = (e: any) => {
    setTimeout(() => setActiveThimble(0), 1000);
    const target = e.target as HTMLElement;

    if (target.tagName.toLowerCase() === "section") {
      e.stopPropagation();
      setSelected(null);
      alert(1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const thimbleBlock = document.querySelector(`.${s.thimbles_block}`);
      if (thimbleBlock && !thimbleBlock.contains(event.target)) {
        setSelected(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const animatedRefs = useRef([
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
  ]);
  const handleThimbleClick = (ind: number) => {
    console.log("fuck", animatedRefs);
    animatedRefs.current.forEach((ref, index) => {
      const element = ref.current;

      if (element) {
        const animationEndHandler = () => {
          // alert(1);
          element.style.animationPlayState = "paused";
        };

        element.addEventListener("animationiteration", animationEndHandler);
      }
    });
  };

  return (
    <section onClick={handleSectionClick} className={s.thimbles_table_wrap}>
      <button
        onClick={() => {
          if (startGame) {
            // setStopAnimation(true);
            handleThimbleClick(0);
            handleThimbleClick(1);
            handleThimbleClick(2);
          } else {
            setStartGame(true);
          }
        }}
        className={s.btn}
      >
        start
      </button>
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
            <div
              key={ind}
              className={clsx(
                s.thimble_wrap,
                showAnimation && s[`thimble_wrap_${ind + 1}`]
              )}
              onClick={() => setSelected(ind)}
              ref={animatedRefs.current[ind]}
            >
              <img
                src={thimbleImg.src}
                className={clsx(
                  s.thimble,
                  (showBall || selected === ind) && s.default_thimble_up
                )}
                alt="thimble"
              />
              {activeThimble === ind && (
                <img
                  src={activeThimbleImg.src}
                  className={clsx(
                    s.activeThimble_img,
                    (showBall || selected === ind) && s.active_shadow
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
                className={clsx(s.thimble_shadow)}
                alt="thimble-static-shadow"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
