import { ReactElement, ReactNode, useEffect } from "react";
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

interface LayoutProps {
  children?: any;
  gameName: string | undefined;
}
export const Layout = ({ children, ...props }: LayoutProps) => {
  const [wagmiConfig] = useUnit([web3.$WagmiConfig]);

  const [isOpen, close] = useUnit([SidebarM.$isOpen, SidebarM.Close]);

  useEffect(() => {
    if (window.innerWidth <= 650) close();
  }, []);

  return (
    <>
      <SettingsInit />
      {wagmiConfig != null ? (
        <WagmiConfig config={wagmiConfig}>
          <SessionInit game={props.gameName} />
          <PopUpBonus />
          <div
            className={`${s.page_container} ${!isOpen && s.side_bar_closed}`}
          >
            <Header isGame={props.gameName != undefined} />
            <div
              className={`${s.side_bar_wrapper} ${isOpen && s.sideBar_opened}`}
            >
              <SideBar />
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
