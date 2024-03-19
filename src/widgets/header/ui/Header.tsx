import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import HeaderBrandText from "@/public/media/brand_images/HeaderBrandText.svg";
import HeaderLogo from "@/public/media/brand_images/HeaderLogo.webp";

import * as SidebarM from "@/widgets/SideBar/model";

import { RightMenu } from "./RightMenu";

import s from "./styles.module.scss";
import { BottomMenu } from "./BottomMenu";
import * as ManualModel from "@/widgets/Layout/model";

import * as RegistrM from "@/widgets/Registration/model";
import * as api from "@/shared/api";
import { useSocket } from "@/shared/context";
import { usePathname } from "next/navigation";
export interface HeaderProps {
  isGame: boolean;
  hideHeaderBtn?: boolean;
}

export const Header: FC<HeaderProps> = (props) => {
  const [isOpen] = useUnit([SidebarM.$isOpen]);
  const location = usePathname();
  const [setIsPartner] = useUnit([ManualModel.setIsPartner]);

  useEffect(() => {
    const currentURL = location;

    if (currentURL.includes("partner_address")) {
      setIsPartner(true);
    }
  }, []);
  const [seeds, setSeed] = useState<any[]>([]);

  const [isAuth, access_token] = useUnit([
    RegistrM.$isAuth,
    RegistrM.$access_token,
  ]);

  return (
    <>
      <div className={clsx(s.header, !isOpen && s.header_close)}>
        <Link className={s.emblem} href="/">
          <img
            className={s.logo}
            src={HeaderLogo.src}
            alt={""}
            width={36}
            height={46.07}
          />
          <Image src={HeaderBrandText} alt={""} width={54.71} height={23.71} />
        </Link>
        <RightMenu isGame={props.isGame} hideHeaderBtn={props.hideHeaderBtn} />
      </div>
      <BottomMenu />
    </>
  );
};
