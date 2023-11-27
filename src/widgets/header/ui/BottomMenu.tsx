import { FC, useEffect } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";

import ChatIcon from "@/public/media/misc/chatIcon.svg";
import Burger from "@/public/media/misc/burger.svg";

import { SideBarModel } from "@/widgets/SideBar";

import { GamesIcon, SupportIcon } from "@/shared/SVGs";

import s from "./styles.module.scss";
import { SBopenFooterBtn } from "@/shared/SVGs/SBopenFooterBtn";
import { FooterGamesBtn } from "@/shared/SVGs/FooterGamesBtn";
import { ProfileBtn } from "@/shared/SVGs/ProfileBtn";
import { MessangerBtn } from "@/shared/SVGs/MessangerBtn";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export interface BottomMenuProps {}

export const BottomMenu: FC<BottomMenuProps> = (props) => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

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

  const handleAccountLink = () => {
    if (!isConnected) {
      router.push("/AccountFallback");
    } else {
      router.push(`/account/${address?.toLowerCase()}`);
    }
  };

  return (
    <div className={`${s.bottom_menu} ${isOpen && s.sb_opened}`}>
      <div className={s.element} onClick={openSB}>
        <SBopenFooterBtn />
      </div>
      <button className={s.join_btn}>Join Now</button>
      <div className={`${s.element} ${s.hidden_elem}`}>
        <FooterGamesBtn />
      </div>
      <div
        className={`${s.element} ${s.hidden_elem}`}
        onClick={handleAccountLink}
      >
        <ProfileBtn />
      </div>
      <div className={s.element}>
        <MessangerBtn />
      </div>
    </div>
  );
};
