import { ReactNode, useEffect } from "react";
import s from "./styles.module.scss";

import { SideBar } from "@/widgets/SideBar";
import { Header } from "../header";
import { Blur } from "@/widgets/Blur/Blur";
import { useUnit } from "effector-react";
import { Account } from "@/widgets/Account";
import { Footer } from "@/widgets/Footer";
import * as SidebarM from "@/widgets/SideBar/model";

interface LayoutProps {
  children?: ReactNode[];
}
export const Layout = ({ children, ...props }: LayoutProps) => {
  const [isOpen, close] = useUnit([SidebarM.$isOpen, SidebarM.Close]);

  useEffect(() => {
    if (window.innerWidth <= 650) close();
  }, []);

  return (
    <div className={s.page_container}>
      <Header />
      <div className={`${s.side_bar_wrapper} ${isOpen && s.sideBar_opened}`}>
        <SideBar />git
      </div>

      <Blur />
      <main className={s.main_area}>{children}</main>
      <Footer />
    </div>
  );
};
