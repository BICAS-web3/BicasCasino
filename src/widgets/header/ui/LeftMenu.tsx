import { FC } from "react";
import Image from "next/image";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";

import HeaderLogo from "@/public/media/brand_images/HeaderLogo.svg";
import HeaderBrandText from "@/public/media/brand_images/HeaderBrandText.svg";
import Burger from "@/public/media/misc/burger.svg";
import ChatIcon from "@/public/media/misc/chatIcon.svg";
import { SideBarModel } from "@/widgets/SideBar";
import { GamesIcon, SupportIcon } from "@/shared/SVGs";
import * as SidebarM from "@/widgets/SideBar/model";
import Link from "next/link";
import clsx from "clsx";
import { RightMenu } from "./RightMenu";

export interface LeftMenuProps {}
export const LeftMenu: FC<LeftMenuProps> = () => {
  const [flipOpen, isOpen] = useUnit([
    SideBarModel.flipOpen,
    SideBarModel.$isOpen,
  ]);
  return (
    <div className={s.left_menu}>
      <div
        className={s.burger}
        onClick={() => {
          flipOpen();
        }}
      >
        <Image src={Burger} alt={""} width={22.5} height={15} />
      </div>
      <Link className={s.emblem} href="/">
        <Image src={HeaderLogo} alt={""} width={36} height={46.07} />
        <Image src={HeaderBrandText} alt={""} width={54.71} height={23.71} />
      </Link>
    </div>
  );
};
