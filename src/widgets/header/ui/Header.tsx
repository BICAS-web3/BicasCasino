import { FC } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import HeaderBrandText from "@/public/media/brand_images/HeaderBrandText.svg";
import HeaderLogo from "@/public/media/brand_images/HeaderLogo.svg";

import * as SidebarM from "@/widgets/SideBar/model";

import { RightMenu } from "./RightMenu";

import s from "./styles.module.scss";
import { BottomMenu } from "./BottomMenu";

export interface HeaderProps {
  isGame: boolean;
}

export const Header: FC<HeaderProps> = (props) => {
  const [isOpen] = useUnit([SidebarM.$isOpen]);

  return (
    <>
      <div className={clsx(s.header, !isOpen && s.header_close)}>
        <Link className={s.emblem} href="/">
          <Image src={HeaderLogo} alt={""} width={36} height={46.07} />
          <Image src={HeaderBrandText} alt={""} width={54.71} height={23.71} />
        </Link>
        <RightMenu isGame={props.isGame} />
      </div>
      <BottomMenu />
    </>
  );
};