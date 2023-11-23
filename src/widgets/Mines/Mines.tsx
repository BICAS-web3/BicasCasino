import Image from "next/image";
import styles from "./styles.module.scss";
import background from "@/public/media/mines_images/mines_bg.png";
import { MineIcon } from "@/shared/SVGs/MineIcon";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import { MineGreenIcon } from "@/shared/SVGs/MineGreenIcon";
import "swiper/scss";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import "swiper/css/navigation";

type Props = {};

export const Mines = (props: Props) => {
  const minesCount = 25;
  const mineArr = Array.from({ length: minesCount }, (_, index) => index);
  const [selectedMine, setSelectedMine] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleMineSelection = (index: number) => {
    setSelectedMine((prev) =>
      prev.includes(index)
        ? prev.filter((el) => el !== index)
        : [...prev, index]
    );
  };

  const handleMouseMove = (index: number) => {
    if (isMouseDown) {
      toggleMineSelection(index);
    }
  };
  const swiperRef = useRef<SwiperRef>(null);
  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);
  return (
    <div className={styles.wrapp}>
      <div className={styles.mines_table_wrap}>
        <div className={styles.mines_table_background}>
          <Image
            src={background}
            className={styles.mines_table_background_img}
            alt="table-bg"
            width={1418}
            height={680}
            quality={100}
          />
        </div>
        <div
          className={styles.mines_table}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
        >
          {mineArr.map((index) => {
            const isSelected = selectedMine.includes(index);
            return (
              <div
                key={index}
                onClick={() => toggleMineSelection(index)}
                onMouseEnter={() => handleMouseMove(index)}
                className={clsx(
                  styles.mine,
                  isSelected && styles.mine_selected,
                  isSelected && styles.mine_animation
                )}
              >
                <MineIcon
                  className={clsx(
                    styles.mine_main,
                    isSelected && styles.mine_selected
                  )}
                />
                <MineGreenIcon
                  className={clsx(
                    styles.mine_green,
                    isSelected && styles.mine_selected
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.bottom_wrapper}>
        <div className={styles.bottom}>
          <Swiper
            // navigation
            ref={swiperRef}
            slidesPerView="auto"
            direction="horizontal"
            scrollbar={{
              el: ".scroll-bar",
              draggable: true,
            }}
            centeredSlides={false}
            className={styles.swiper}
          >
            {Array.from({ length: 40 }).map((_, index) => (
              <SwiperSlide key={index} className={styles.swiper_slide}>
                <span>4</span>Х 1.1
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={clsx(styles.arr, styles.arr_prev)} onClick={handlePrev}>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.4 0L8 1.75L3.2 7L8 12.25L6.4 14L-1.47871e-09 7L6.4 0Z"
              fill="#7E7E7E"
            />
          </svg>
        </div>
        <div className={clsx(styles.arr, styles.arr_next)} onClick={handleNext}>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.6 14L-1.52805e-07 12.25L4.8 7L-1.06964e-06 1.75L1.6 5.60182e-07L8 7L1.6 14Z"
              fill="#7E7E7E"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
