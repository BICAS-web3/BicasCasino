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
import Link from "next/link";

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

  return (
    <div className={`${s.bottom_menu}`}>
      <div className={s.element} onClick={openSB}>
        <SBopenFooterBtn />
      </div>
      <Link className={`${s.element} `} href="/games/GamesPage">
        <FooterGamesBtn />
      </Link>
      <Link
        className={`${s.element}`}
        href={`${
          !isConnected
            ? "/AccountFallback"
            : `/account/${address?.toLowerCase()}`
        }`}
      >
        <ProfileBtn />
      </Link>
      <Link className={s.element} href="/MessangerFallback">
        <MessangerBtn />
      </Link>
    </div>
  );
};
