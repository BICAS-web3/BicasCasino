import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import slotsBg from "@/public/media/slots_images/slotsMainBg.png";
import slots1280Bg from "@/public/media/slots_images/slots1280Bg.png";

// import row1 from "@/public/media/slots_images/row1.png";
// import row2 from "@/public/media/slots_images/row2.png";
// import row3 from "@/public/media/slots_images/row3.png";

import slotsImg1 from "@/public/media/slots_images/slots_items/img1.png";
import slotsImg2 from "@/public/media/slots_images/slots_items/img2.png";
import slotsImg3 from "@/public/media/slots_images/slots_items/img3.png";
import slotsImg4 from "@/public/media/slots_images/slots_items/img4.png";
import slotsImg5 from "@/public/media/slots_images/slots_items/img5.png";
import slotsImg6 from "@/public/media/slots_images/slots_items/img6.png";
import slotsImg7 from "@/public/media/slots_images/slots_items/img7.png";

const rowItems = [
  slotsImg1,
  slotsImg2,
  slotsImg3,
  slotsImg4,
  slotsImg5,
  slotsImg6,
  slotsImg7,
];

import clsx from "clsx";

interface SlotsGameProps {}

export const SlotsGame: FC<SlotsGameProps> = () => {
  const [is1280, setIs1280] = useState(false);
  const [is996, setIs996] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 1280 && width > 996) {
        setIs1280(true);
        setIs996(false);
      } else if (width < 996) {
        setIs1280(false);
        setIs996(true);
      } else {
        setIs1280(false);
        setIs996(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={s.slots_table_wrap}>
      <WagerLowerBtnsBlock game="slots" text={"Slots"} />
      <div className={s.slots_table_background}>
        <img
          src={is1280 ? slots1280Bg.src : slotsBg.src}
          className={s.slots_table_background}
          alt="slots-static-bg"
        />
      </div>
      <div className={s.slots_table}>
        <div className={clsx(s.row_wrap)}>
          {rowItems.map((img, ind) => (
            <img src={img.src} key={ind} className={s.row_img} />
          ))}
        </div>
        <div className={clsx(s.row_wrap)}>
          {rowItems.map((img, ind) => (
            <img src={img.src} key={ind} className={s.row_img} />
          ))}
        </div>
        <div className={clsx(s.row_wrap)}>
          {rowItems.map((img, ind) => (
            <img src={img.src} key={ind} className={s.row_img} />
          ))}
        </div>
      </div>
    </div>
  );
};
