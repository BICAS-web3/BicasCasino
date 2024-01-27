import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import clsx from "clsx";
import cityStartImg from "@/public/media/cars/bgStart.png";
import cityFinishImg from "@/public/media/cars/cityMain.png";
import cityMainImg from "@/public/media/cars/cityMain.png";
import moonImg from "@/public/media/cars/moonBg.png";
import staticBg from "@/public/media/cars/staticBg.png";
import { Car1 } from "@/shared/SVGs/Car1";
import mountainsBg from "@/public/media/cars/mountainsBg.png";
import { Car2 } from "@/shared/SVGs/Car2";
import stopLine from "@/public/media/cars/stopLine.png";

interface CarsRaceProps {
  gameText: string;
}

export const CarsRace: FC<CarsRaceProps> = ({ gameText }) => {
  const [testGame, setTestGame] = useState(false);
  const [wheelStart, setWheelStart] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  const startImgAnim = () => {};

  const [bgWidth, setBgWidth] = useState<any>();

  useEffect(() => {
    const el = document.getElementById("cars_bg_wrap");

    const handleResize = () => {
      const width = window.innerWidth;

      setBgWidth(el?.offsetWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section
        className={s.cars_table_wrap}
        onClick={() => {
          setTestGame(!testGame);
          setWheelStart(!wheelStart);
          setTimeout(() => {
            setShowFinish(true);
            setTimeout(() => {
              setWheelStart(false);
            }, 1500);
          }, 14000);
        }}
      >
        <WagerLowerBtnsBlock
          //   className={s.cars_btns}
          game="Cars"
          text={gameText}
        />
        <div className={s.cars_table_background} id="cars_bg_wrap">
          <img src={staticBg.src} alt="static-bg" className={s.static_bg_img} />
          <img
            src={moonImg.src}
            className={s.static_moon_img}
            alt="static-moon"
          />
          <div
            className={clsx(s.start_bg_img, testGame && s.start_bg_img_hide)}
          >
            <img
              src={cityStartImg.src}
              className={s.start_bg_city}
              alt="start-bg-img"
            />
            <img
              src={stopLine.src}
              className={s.start_stop_line}
              alt="stop-line"
            />
          </div>
          <img
            src={mountainsBg.src}
            className={clsx(
              s.main_mountains_bg,
              testGame && s.main_mountains_bg_hide
            )}
            alt="mountains-bg"
          />
          <img
            src={cityMainImg.src}
            className={clsx(
              s.main_city_bg_img,
              !showFinish && testGame && s.main_city_bg_img_start,
              showFinish && s.main_city_bg_img_finish
            )}
            alt="main-city-bg"
          />
          <img
            src={mountainsBg.src}
            className={clsx(
              s.mountains_second,
              !showFinish && testGame && s.mountains_second_start,
              showFinish && s.mountains_second_finish
            )}
            alt="mountains-bg"
          />
          {showFinish ? (
            <>
              <div
                className={clsx(
                  s.finish_city_bg_img,
                  testGame && s.finish_city_bg_img_finish
                )}
                style={{ "--leftOffset": `${bgWidth}px` } as any}
              >
                <img
                  src={cityFinishImg.src}
                  className={s.finish_city_bg}
                  alt="finish-bg-img"
                />
                <img
                  src={stopLine.src}
                  className={s.finish_stop_line}
                  alt="stop-line"
                />
              </div>
              <img
                src={mountainsBg.src}
                className={clsx(
                  s.finish_mountains_bg,
                  testGame && s.finish_mountains_bg_finish
                )}
                alt="mountains-finish"
              />
            </>
          ) : (
            <>
              <img
                src={cityMainImg.src}
                className={clsx(
                  s.main_city_bg_copy,
                  testGame && s.main_city_bg_copy_start
                )}
                alt="main-city-bg-2"
              />
              <img
                src={mountainsBg.src}
                className={clsx(
                  s.mountains_bg_copy,
                  testGame && s.mountains_bg_copy_start
                )}
                alt="mountains-copy"
              />
            </>
          )}
        </div>
        <div className={s.cars_body}>
          <div className={s.car1_wrap}>
            <Car1 gameStarted={wheelStart} />
          </div>
          <div className={s.car2_wrap}>
            <Car2 gameStarted={wheelStart} />
          </div>
        </div>
      </section>
    </>
  );
};
