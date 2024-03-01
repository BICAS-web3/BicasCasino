import Head from "next/head";
import { Header } from "@/widgets/header/index";
import s from "./style.module.scss";
import { FC, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import CoinFlipColoredIcon from "@/public/media/games_assets/coinflip/icon_colored.svg";
import CoinFlipBlendIcon from "@/public/media/games_assets/coinflip/icon_blend.svg";
import { createEffect, createEvent, sample } from "effector";

import RPSColoredIcon from "@/public/media/games_assets/rock_paper_scissors/icon_colored.svg";
import RPSBlendIcon from "@/public/media/games_assets/rock_paper_scissors/icon_blend.svg";

import DiceColoredIcon from "@/public/media/games_assets/dice/icon_colored.svg";
import DiceBlendIcon from "@/public/media/games_assets/dice/icon_blend.svg";
import * as MainWallet from "@/widgets/AvaibleWallet/model";
import * as Api from "@/shared/api";

import BSCNetworkIcon from "@/public/media/networks/bsc.svg";
//import LinkIcon from '@/public/media/misc/link.svg';
import { LiveBetsModel, LiveBetsWS } from "@/widgets/LiveBets";
import mainBg from "@/public/media/misc/mainBg.webp";
import laptopBg from "@/public/media/misc/1280Bg.webp";
import tabletBg from "@/public/media/misc/tabletBg.webp";
import phoneBg from "@/public/media/misc/phoneBg.webp";
import { SideBar, SideBarModel } from "@/widgets/SideBar";

import { Layout } from "@/widgets/Layout";
import { Total } from "@/widgets/UserBoard";

import { LeaderBoard } from "@/widgets/LeaderBoard/LeaderBoard";
import { useUnit } from "effector-react";
import * as SidebarModel from "@/widgets/SideBar/model";
import { settingsModel } from "@/entities/settings";
import { useSocket } from "@/shared/context";

const mobileQuery = "(max-width: 650px)";

const LinkIcon: FC<{}> = (p) => {
  return (
    <svg height="14px" width="14px" viewBox="0 0 18 18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"
      ></path>
      <path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path>
    </svg>
  );
};

interface GameProps {
  name: string;
  description: string;
  link: string;
  pcImage: StaticImageData;
  laptopImage: StaticImageData;
  tabletImage: StaticImageData;
  mobileImage: StaticImageData;
  closedSidebarImage: StaticImageData;
}

const Game: FC<GameProps> = (props) => {
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [laptop, setLaptop] = useState(false);
  const [miniLaptop, setMiniLaptop] = useState(false);
  const [pc, setPC] = useState(false);
  const [currentImage, setCurrentImage] = useState(props.pcImage.src);

  const [sidebarOpened] = useUnit([SidebarModel.$isOpen]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 650 && width < 700) {
        setTablet(true);
        setLaptop(false);
        setPC(false);
        setMiniLaptop(false);
      } else if (width >= 700 && width < 840) {
        setTablet(false);
        setLaptop(true);
        setPC(false);
        setMiniLaptop(true);
      } else if (width >= 700 && width < 1280) {
        setTablet(false);
        setLaptop(true);
        setPC(false);
        setMiniLaptop(false);
      } else if (width >= 1280 && width < 1980) {
        setTablet(false);
        setLaptop(false);
        setPC(true);
        setMiniLaptop(false);
      } else {
        setTablet(false);
        setLaptop(false);
        setPC(false);
        setMiniLaptop(false);
      }

      setMobile(width <= 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobile) setCurrentImage(props.tabletImage.src);
    else if (tablet) setCurrentImage(props.tabletImage.src);
    else if (laptop) {
      // sidebarOpened
      //   ? setCurrentImage(props.laptopImage.src)
      //   : setCurrentImage(props.closedSidebarImage.src);
      // setCurrentImage(props.laptopImage.src);
      if (!sidebarOpened) {
        if (miniLaptop) {
          setCurrentImage(props.laptopImage.src);
        } else {
          setCurrentImage(props.closedSidebarImage.src);
        }
      } else {
        setCurrentImage(props.laptopImage.src);
      }
    } else if (pc) setCurrentImage(props.pcImage.src);
  }, [mobile, tablet, pc, laptop, sidebarOpened, miniLaptop]);

  return (
    <a
      className={`${s.game_link} ${!sidebarOpened && s.sidebar_closed}`}
      href={props.link}
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      <div className={s.game}>
        <div className={s.game_info}>
          <div className={s.game_name}>{props.name}</div>
          <div className={s.game_description}>{props.description}</div>
        </div>
      </div>
    </a>
  );
};

interface GamesTitleProps {}
const GamesTitle: FC<GamesTitleProps> = (props) => {
  return (
    <div className={s.games_title}>
      <div>Games</div>
    </div>
  );
};

export default function Home() {
  const [currentImage, setCurrentImage] = useState(mainBg);
  const [laptop, setLaptop] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1280 && width > 700) {
        setLaptop(true);
        setTablet(false);
        setPhone(false);
      } else if (width <= 700) {
        setLaptop(false);
        setTablet(true);
        setPhone(false);
      } else if (width <= 320) {
        setLaptop(false);
        setTablet(false);
        setPhone(true);
      } else {
        setLaptop(false);
        setTablet(false);
        setPhone(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (laptop) {
      setCurrentImage(laptopBg);
    } else if (tablet) {
      setCurrentImage(tabletBg);
    } else if (phone) {
      setCurrentImage(phoneBg);
    } else {
      setCurrentImage(mainBg);
    }
  }, [tablet, laptop]);

  const socket = useSocket();

  socket?.send(JSON.stringify({ type: "SubscribeAll" }));

  return (
    <>
      {" "}
      <Head>
        <title>Leaderboard</title>
      </Head>
      <Layout activePageLink="/leaderboard" gameName={undefined}>
        <div className={`${s.main_container}`}>
          <Total />
          <LeaderBoard />
        </div>
        {/* </div> */}
      </Layout>
      {/* <Footer />
      <InvitesList />
      <GamesList />
      <ConnectWalletModal /> */}
    </>
  );
}
