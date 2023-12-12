import { ReactElement, ReactNode, useEffect, useState } from "react";
import s from "./styles.module.scss";

import { SideBar } from "@/widgets/SideBar";
import { Header } from "../header";
//import { LayoutModel } from '.';
import { Blur } from "@/widgets/Blur/Blur";
import { useUnit } from "effector-react";
import { Footer } from "@/widgets/Footer";
import { SettingsInit } from "../SettingsInit";
import { WagmiConfig } from "wagmi";
import { web3 } from "@/entities/web3";
import * as SidebarM from "@/widgets/SideBar/model";
import { SessionInit } from "../SessionSettings";
import { PopUpBonus } from "../PopUpBonus";
import * as SwapModel from "@/widgets/Swap/model/index";
import * as BonusPopupM from "@/widgets/PopUpBonus/model";
import clsx from "clsx";
import { useMediaQuery } from "@/shared/tools";
import { useRouter } from 'next/router'

interface LayoutProps {
  children?: any;
  gameName: string | undefined;
  activePageLink?: string;
}
export const Layout = ({ children, ...props }: LayoutProps) => {
  const [wagmiConfig] = useUnit([web3.$WagmiConfig]);
  const isMobile = useMediaQuery("(max-width: 650px)");
  const [isOpen, close] = useUnit([SidebarM.$isOpen, SidebarM.Close]);
  const [swapOpen] = useUnit([SwapModel.$isSwapOpen]);
  const [popupBonusState, setPopupBonusState] = useState<string>(`"true"`);
  const { pathname } = useRouter();

  // useEffect(() => {
  //   if(asPath === "/RegistrManual"){

  //   }
  // }, [asPath])

  useEffect(() => {
    if (window.innerWidth <= 650) close();
  }, []);

  useEffect(() => {
    const dontShowState = localStorage.getItem("bonusPopupState");
    setPopupBonusState(JSON.stringify(dontShowState));
  }, []);

  return (
    <>
      <SettingsInit />
      {wagmiConfig != null ? (
        <WagmiConfig config={wagmiConfig}>
          <SessionInit game={props.gameName} />
          {popupBonusState === `"true"`
            || pathname === "/RegistrManual"
            || pathname === "/ExchangeManual" ? null : <PopUpBonus />}
          <div
            className={`${s.page_container} ${!isOpen && s.side_bar_closed}`}
          >
            <Header isGame={props.gameName != undefined} />
            <div
              className={clsx(
                s.side_bar_wrapper,
                isOpen && s.sideBar_opened,
                swapOpen && s.swap_open
              )}
            >
              <SideBar activePage={props.activePageLink} />
            </div>

            {/* <Blur /> */}
            <main className={s.main_area}>{children}</main>
            <Footer />
          </div>
        </WagmiConfig>
      ) : (
        <></>
      )}
    </>
  );
};
