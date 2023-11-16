import { FC, useEffect } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";

import ChatIcon from "@/public/media/misc/chatIcon.svg";
import Burger from "@/public/media/misc/burger.svg";

import { SideBarModel } from "@/widgets/SideBar";

import { GamesIcon, SupportIcon } from "@/shared/SVGs";

import s from "./styles.module.scss";

export interface BottomMenuProps {}

export const BottomMenu: FC<BottomMenuProps> = (props) => {
  const [openSidebar, closeSb, isOpen] = useUnit([
    SideBarModel.Open,
    SideBarModel.Close,
    SideBarModel.$isOpen,
  ]);

  const openSB = () => {
    if (!isOpen) {
      openSidebar();
      document.documentElement.classList.add("scroll-disable");
    } else {
      closeSb();
      document.documentElement.classList.remove("scroll-disable");
    }
  };

  useEffect(() => {
    !isOpen && document.documentElement.classList.remove("scroll-disable");
  }, [isOpen]);

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
