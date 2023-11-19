import { FC } from "react";

import Image from "next/image";

import { useUnit } from "effector-react";

import { SideBarModel } from "../SideBar";
import s from "./style.module.scss";
import clsx from "clsx";

export interface TotalItemProps {
  dunkin: string;
  description: string;
  image: any;
  dollar?: boolean;
  statistics: number | string;
  id: number;
  address: string;
}
export const TotalItem: FC<TotalItemProps> = (props) => {
  const [isSideBarOpen] = useUnit([SideBarModel.$isOpen]);

  return (
    <div className={`${s.total_item} ${isSideBarOpen && s.open_sidebar}`}>
      <div
        className={clsx(
          s.total_item_overflow_container,
          s[`total_item_overflow_container_${props.id}`]
        )}
      >
        <div
          className={s.description}
          onClick={() => {
            window.location.assign(`/account/${props.address.toLowerCase()}`);
          }}
        >
          {props.description}
        </div>
        <div className={s.total_item_shadow}></div>
        <div className={s.statistic}>${props.statistics}</div>
      </div>

      <Image src={props.image} alt="" className={s.image} />
    </div>
  );
};
