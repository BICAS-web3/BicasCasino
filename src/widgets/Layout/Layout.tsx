import { useEffect, useState } from "react";
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
import * as RegistrM from "@/widgets/Registration/model";
import clsx from "clsx";
import { useMediaQuery } from "@/shared/tools";
import { useRouter } from "next/router";
import { Registration } from "../Registration/Registration";
import { Payment } from "../Payment/Payment";
import useWebSocket, { ReadyState } from "react-use-websocket";

import * as GameModal from "@/widgets/GamePage/model";

import * as LayoutModel from "./model";

import * as api from "@/shared/api";
import { SocketProvider, useSocket } from "@/shared/context";

interface LayoutProps {
  children?: any;
  gameName: string | undefined;
  activePageLink?: string;
  hideHeaderBtn?: boolean;
}
export const Layout = ({ children, ...props }: LayoutProps) => {
  // const [wagmiConfig] = useUnit([web3.$WagmiConfig]);
  const isMobile = useMediaQuery("(max-width: 650px)");
  const [isOpen, close, setUserInfo, socketAuth, setSocketAuth, setGamesList] =
    useUnit([
      SidebarM.$isOpen,
      SidebarM.Close,
      LayoutModel.setUserInfo,
      LayoutModel.$socketAuth,
      LayoutModel.setSocketAuth,
      GameModal.setGamesList,
    ]);
  const [swapOpen] = useUnit([SwapModel.$isSwapOpen]);
  const [popupBonusState, setPopupBonusState] = useState<string>(`"true"`);
  const { pathname } = useRouter();

  const [isAuth, access_token] = useUnit([
    RegistrM.$isAuth,
    RegistrM.$access_token,
  ]);

  useEffect(() => {
    if (window.innerWidth <= 650 || props.gameName !== undefined) close();
  }, []);

  useEffect(() => {
    const dontShowState = localStorage.getItem("bonusPopupState");
    setPopupBonusState(JSON.stringify(dontShowState));
  }, []);

  useEffect(() => {
    if (access_token) {
      (async () => {
        const response = await api.getUserInfo({ bareer: access_token });
        if (response.status === "OK") {
          setUserInfo((response as any).body);
          console.log("user info", response.body);
        } else {
          console.log("err", response.body);
        }
      })();
    }
  }, [access_token]);

  const [errorSeed, setErrorSeed] = useState(false);

  useEffect(() => {
    if (access_token) {
      (async () => {
        const response = await api.getServerSeed({ bareer: access_token });
        console.log("server seed", response);
        if (response.status === "OK") {
          setSeed((prev) => [...prev, response]);
        } else {
          setErrorSeed(true);
        }
      })();
      (async () => {
        const response = await api.getClientSeed({ bareer: access_token });
        console.log("client seed", response);
        if (response.status === "OK") {
          setSeed((prev) => [...prev, response]);
        } else {
          setErrorSeed(true);
        }
      })();
    }
  }, [access_token, errorSeed]);

  const server_seed = { type: "NewServerSeed" };
  const data = { type: "Auth", token: access_token };

  const seed_data = {
    type: "NewClientSeed",
    seed:
      Math.random() +
      Date.now() +
      "Insane 1wereesawesewrsjvhgvhhvvhewrreewrdefwrefdsewrwsswqerewreesdfedr0wereewrwr0%rawefewerretwrreewrewrtedsf ewedswin seed",
  };

  const [seeds, setSeed] = useState<any[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (
      (seeds.length > 1 || errorSeed) &&
      socket &&
      access_token &&
      socket.readyState === WebSocket.OPEN &&
      !socketAuth
    ) {
      socket.send(JSON.stringify(data));
      socket.send(JSON.stringify(server_seed));
      socket.send(JSON.stringify(seed_data));
      setSocketAuth(true);
      setErrorSeed(false);
    }
  }, [socket, access_token, socket?.readyState, seeds, errorSeed]);

  useEffect(() => {
    (async () => {
      if (access_token) {
        const data = await api.getGames({ bareer: access_token });
        if (data.status === "OK") {
          setGamesList((data.body as any).games);
          console.log(data.body);
        }
      }
    })();
  }, [access_token]);

  return (
    <>
      <SettingsInit />
      {true ? ( // wagmiConfig != null
        // <WagmiConfig config={wagmiConfig}>
        <>
          <SessionInit game={props.gameName} />
          {popupBonusState === `"true"` ||
          pathname === "/RegistrManual" ||
          pathname === "/ExchangeManual" ? null : (
            <PopUpBonus />
          )}
          <div
            className={clsx(
              s.page_container,
              !isOpen && s.side_bar_closed,
              props.gameName !== undefined && s.overlayed
            )}
          >
            {!isAuth && <Registration />}
            <Header
              isGame={props.gameName != undefined}
              hideHeaderBtn={props.hideHeaderBtn}
            />
            <div
              className={clsx(
                s.side_bar_wrapper,
                isOpen && s.sideBar_opened,
                swapOpen && s.swap_open
              )}
            >
              {props.gameName !== undefined && (
                <div
                  className={clsx(
                    s.sidebar_overlay,
                    isOpen && s.overlay_active
                  )}
                ></div>
              )}
              <SideBar activePage={props.activePageLink} />
            </div>

            {/* <Blur /> */}
            <main className={s.main_area}>{children}</main>
            <Footer />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

// </WagmiConfig>
