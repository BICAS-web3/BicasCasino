import { FC } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";

import ChatIcon from "@/public/media/misc/chatIcon.svg";
import Burger from "@/public/media/misc/burger.svg";

import { SideBarModel } from "@/widgets/SideBar";

import { GamesIcon, SupportIcon } from "@/shared/SVGs";

import s from "./styles.module.scss";

export interface BottomMenuProps {}

export const BottomMenu: FC<BottomMenuProps> = (props) => {
  const [openSidebar] = useUnit([SideBarModel.Open]);

  const openSB = () => {
    openSidebar();
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
  };

  return (
    <div className={s.bottom_menu}>
      <div className={s.element} onClick={openSB}>
        <Image src={Burger} alt="" />
      </div>
      <div className={s.element}>
        <GamesIcon />
      </div>
      <div className={s.element}>
        <SupportIcon />
      </div>
      <div className={s.element}>
        <Image src={ChatIcon} alt="" />
      </div>
    </div>
  );
};
