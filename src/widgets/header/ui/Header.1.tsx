import { FC, useEffect } from "react";
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
import * as ManualModel from "@/widgets/Layout/model";
import { HeaderProps } from "./Header";

export const Header: FC<HeaderProps> = (props) => {
  const [isOpen] = useUnit([SidebarM.$isOpen]);

  const [setIsPartner] = useUnit([ManualModel.setIsPartner]);
  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes("partner_address")) {
      setIsPartner(true);
    }
  }, []);
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
