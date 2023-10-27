import { FC } from "react";

import Image from "next/image";

import { useUnit } from "effector-react";

// import dunkin from "@/public/media/user_board/dunkin.svg";

import { SideBarModel } from "../SideBar";
import s from "./style.module.scss";

export interface TotalItemProps {
  dunkin: string;
  description: string;
  image: any;
  dollar?: boolean;
  statistics: number | string;
}
export const TotalItem: FC<TotalItemProps> = (props) => {
  const [isSideBarOpen] = useUnit([SideBarModel.$isOpen]);

  return (
    <div className={`${s.total_item} ${isSideBarOpen && s.open_sidebar}`}>
      <div className={s.total_item_overflow_container}>
        <div className={s.description}>{props.description}</div>
        {/* <div className={s.dunkin}>
          <Image src={dunkin} alt="" className={s.dunkin_image} />
          {props.dunkin}
        </div> */}
        <div className={s.statistic}>
          {/* {props.dollar ? `$ ${props.statistics}` : `${props.statistics}`} */}
          {props.statistics}
        </div>
      </div>

      <Image src={props.image} alt="" className={s.image} />
    </div>
  );
};
