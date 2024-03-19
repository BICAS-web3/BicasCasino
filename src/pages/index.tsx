import Head from "next/head";
import { Header } from "@/widgets/header/index";
import s from "./styles.module.scss";
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

import BSCNetworkIcon from "@/public/media/networks/bsc.svg";
//import LinkIcon from '@/public/media/misc/link.svg';
import { LiveBetsModel, LiveBetsWS } from "@/widgets/LiveBets";
import mainBg from "@/public/media/misc/mainBg.webp";
import mainBg2 from "@/public/media/misc/mainImg2.webp";
import laptopBg from "@/public/media/misc/1280Bg.webp";
import tabletBg from "@/public/media/misc/tabletBg.webp";
import phoneBg from "@/public/media/misc/phoneBg.webp";
import { SideBar, SideBarModel } from "@/widgets/SideBar";

import DiceBackground from "@/public/media/games_assets/dice/Background.webp";
import rockPaperScissorsMobileBg from "@/public/media/games_assets/rock_paper_scissors/rockPaperScissorsMobileBg.webp";
import CoinflipBackground from "@/public/media/games_assets/coinflip/Background.webp";
import PokerBackground from "@/public/media/games/poker.webp";
import RPSBackground from "@/public/media/games_assets/rock_paper_scissors/Background.webp";
import { Layout } from "@/widgets/Layout";
import { LeaderBoard } from "@/widgets/LeaderBoard/LeaderBoard";
import { Total } from "@/widgets/Total";

import pokerMainBg from "@/public/media/games_assets/poker/pokerMainBg_2.webp";
import pokerMainBgClosed from "@/public/media/games_assets/poker/pokerMainBg2.webp";
import pokerLaptopBg from "@/public/media/games_assets/poker/1280Img.webp";
import pokerTabletBg from "@/public/media/games_assets/poker/poker.webp";
import pokerMobileBg from "@/public/media/games_assets/poker/mobileImg.webp";
import pokerClosedSidebarImg from "@/public/media/games_assets/poker/closedSidebarImg.webp";

import rouletteBanner from "@/public/media/roulette_images/banner.webp";

import coinflipMainBg from "@/public/media/games_assets/coinflip/coinflipMainBg.webp";
import coinflipMainBgClosed from "@/public/media/games_assets/coinflip/coinflipMainBg2.webp";
import coinflipLaptopBg from "@/public/media/games_assets/coinflip/1280Bg.webp";
import coinflipTabletBg from "@/public/media/games_assets/coinflip/plinko.webp";
import coinflipMobileBg from "@/public/media/games_assets/coinflip/mobileBg.webp";
import coinflipClosedSidebarImg from "@/public/media/games_assets/coinflip/closedSidebarImg.webp";

import diceMainBg from "@/public/media/games_assets/dice/diceMainBg_3.webp";
import diceMainBgClosed from "@/public/media/games_assets/dice/diceMainBg2.webp";
import diceLaptopBg from "@/public/media/games_assets/dice/laptopPcImg.webp";
import diceTabletBg from "@/public/media/games_assets/dice/dice.webp";
import diceMobileBg from "@/public/media/games_assets/dice/mobileImg.webp";
import diceClosedSidebarImg from "@/public/media/games_assets/dice/closedSideBarImg.webp";

import minesMainBg from "@/public/media/games_assets/mines/minesMainBg_2.webp";
import minesMainBgClosed from "@/public/media/games_assets/mines/minesMainBg2.webp";
import minesLaptopBg from "@/public/media/games_assets/mines/1280Bg.webp";
import minesTabletBg from "@/public/media/games_assets/mines/tabletBg.webp";
import minesMobileBg from "@/public/media/games_assets/mines/mobileBg.webp";
import minesClosedSidebarImg from "@/public/media/games_assets/mines/closedSidebarBg.webp";

import plinkoMainBg from "@/public/media/games_assets/plinko/PlinkoMainBg.webp";
import plinkoMainBgClosed from "@/public/media/games_assets/plinko/plinkoMainBg2.webp";
import plinkoLaptopBg from "@/public/media/games_assets/plinko/plinkoMainBanner.webp";
import plinkoTabletBg from "@/public/media/games_assets/plinko/plinko.webp";
import plinkoMobileBg from "@/public/media/games_assets/plinko/plinkoMainBanner.webp";
import plinkoClosedSidebarImg from "@/public/media/games_assets/plinko/plinkoMainBanner.webp";

import rpsMainBg from "@/public/media/games_assets/rock_paper_scissors/rpsMainBg_2.webp";
import rpsTabletBg from "@/public/media/games_assets/rock_paper_scissors/rps.webp";
import rpsMainBgClosed from "@/public/media/games_assets/rock_paper_scissors/rpsMainBg2.webp";
import advPoster from "@/public/media/testAdvertsImgs/poster.webp";

import appleBanner from "@/public/media/apples/banner.webp";

import HorseBanner from "@/public/media/race_images/banner.webp";

import carBanner from "@/public/media/cars/banner.webp";

import CrashBanner from "@/public/media/crash/banner.webp";

import slotsMain from "@/public/media/games_assets/slots/slotsMain.webp";
import slot_bg from "@/public/media/games_assets/slots/slot_bg.webp";
import thimblesBanner from "@/public/media/thimbles/banner.webp";

import rocketMainBg from "@/public/media/games_assets/rocket/rocket_opened.webp";
import rocket_bg from "@/public/media/games_assets/rocket/rocket_bg.webp";
import rocket_md from "@/public/media/games_assets/rocket/rocket_md.webp";
import rocket_tablet from "@/public/media/games_assets/rocket/rocket_tablet.webp";

import bjBanner from "@/public/media/blackjack/banner.webp";

import wheelFortuneBanner from "@/public/media/wheel_images/banner_2.webp";

import { Account } from "@/widgets/Account";
import { GameLayout } from "@/widgets/GameLayout/layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";
import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import { useUnit } from "effector-react";
import { createStore } from "effector";
import * as BlurModel from "@/widgets/Blur/model";
import * as SidebarModel from "@/widgets/SideBar/model";
import { Poker } from "@/widgets/Poker/Poker";
import PokerGame from "./games/Poker";
import CoinFlipGame from "./games/CoinFlip";
import { settingsModel } from "@/entities/settings";
// import { useAccount } from "wagmi";
import Link from "next/link";
import { Blur } from "@/widgets/Blur/Blur";
import { useDeviceType } from "@/shared/tools";
import { PopUpBonus } from "@/widgets/PopUpBonus";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as ConnectModel from "@/widgets/Layout/model";
import { FeedbackSection } from "@/widgets/FeedbackSection/FeedbackSection";
import { SwiperBanner } from "@/widgets/SwiperBanner/SwiperBanner";
import { useSocket } from "@/shared/context";

import * as LayoutModel from "@/widgets/Layout/model";

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
  pcImageClosed: StaticImageData;
  laptopImage: StaticImageData;
  tabletImage: StaticImageData;
  mobileImage: StaticImageData;
  closedSidebarImage: StaticImageData;
}

const Game: FC<GameProps> = (props) => {
  const [mobile, setMobile] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [laptop, setLaptop] = useState(false);
  const [is996, setIs996] = useState(false);
  const [miniLaptop, setMiniLaptop] = useState(false);
  const [pc, setPC] = useState(false);
  const [currentImage, setCurrentImage] = useState(props.pcImage.src);

  const [sidebarOpened] = useUnit([SidebarModel.$isOpen]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 650 && width < 700) {
        setTablet(true);
        setLaptop(false);
        setPC(false);
        setMiniLaptop(false);
        setIs996(false);
      } else if (width > 700 && width < 840) {
        setTablet(false);
        setLaptop(true);
        setPC(false);
        setMiniLaptop(true);
        setIs996(false);
      } else if (width > 996 && width < 1280) {
        setTablet(false);
        setLaptop(true);
        setPC(false);
        setIs996(false);
        setMiniLaptop(false);
      } else if (width > 1280 && width < 1980) {
        setTablet(false);
        setLaptop(false);
        setPC(true);
        setMiniLaptop(false);
        setIs996(false);
      } else if (width < 996) {
        setTablet(false);
        setLaptop(false);
        setPC(false);
        setMiniLaptop(false);
        setIs996(true);
      } else {
        setTablet(false);
        setLaptop(false);
        setPC(false);
        setIs996(false);
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
      if (!sidebarOpened) {
        if (miniLaptop || is996) {
          setCurrentImage(props.laptopImage.src);
        } else {
          setCurrentImage(props.closedSidebarImage.src);
        }
      } else {
        setCurrentImage(props.laptopImage.src);
      }
    } else if (pc) {
      if (!sidebarOpened) {
        setCurrentImage(props.pcImage.src);
      } else {
        setCurrentImage(props.pcImage.src);
      }
    }
  }, [mobile, tablet, pc, laptop, sidebarOpened, miniLaptop, is996]);

  return (
    <Link
      className={`${s.game_link} ${!sidebarOpened && s.sidebar_game_closed}`}
      href={props.link}
      data-id={props.name}
    >
      <img src={currentImage} className={s.game_link_img} alt="game-img" />
      <div className={s.game}>
        <div className={s.game_info}>
          <div className={s.game_name}>{props.name}</div>
          <div className={s.game_description}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
};

interface GamesProps {}

const Games: FC<GamesProps> = (props) => {
  const [sidebarOpened] = useUnit([SidebarModel.$isOpen]);

  return (
    <div className={s.games}>
      {/* <GamesTitle></GamesTitle> */}
      <div className={`${s.games_row} ${!sidebarOpened && s.sidebar_closed}`}>
        <Game
          name={"POKER"}
          description={""}
          link={"/games/Poker"}
          pcImage={pokerMainBg}
          tabletImage={pokerTabletBg}
          laptopImage={pokerLaptopBg}
          mobileImage={pokerMobileBg}
          closedSidebarImage={pokerClosedSidebarImg}
          pcImageClosed={pokerMainBgClosed}
        />
        <Game
          name={"DICE"}
          description={""}
          link={"/games/Dice"}
          tabletImage={diceTabletBg}
          laptopImage={diceLaptopBg}
          mobileImage={diceMobileBg}
          pcImage={diceMainBg}
          closedSidebarImage={diceClosedSidebarImg}
          pcImageClosed={diceMainBgClosed}
        />
        <Game
          name={"COINFLIP"}
          description={""}
          link={"/games/CoinFlip"}
          tabletImage={coinflipTabletBg}
          laptopImage={coinflipLaptopBg}
          mobileImage={coinflipMobileBg}
          pcImage={coinflipMainBg}
          closedSidebarImage={coinflipClosedSidebarImg}
          pcImageClosed={coinflipMainBgClosed}
        />
        <Game
          name={"MINES"}
          description={""}
          link={"/games/Mines"}
          tabletImage={minesTabletBg}
          laptopImage={minesLaptopBg}
          mobileImage={minesMobileBg}
          pcImage={minesMainBg}
          closedSidebarImage={minesClosedSidebarImg}
          pcImageClosed={minesMainBgClosed}
        />
        <Game
          name={"PLINKO"}
          description={""}
          link={"/games/Plinko"}
          tabletImage={plinkoTabletBg}
          laptopImage={plinkoLaptopBg}
          mobileImage={plinkoMobileBg}
          pcImage={plinkoMainBg}
          closedSidebarImage={plinkoClosedSidebarImg}
          pcImageClosed={plinkoMainBgClosed}
        />
        <Game
          name={"ROCK PAPER SCISSORS"}
          description={""}
          link={"/games/RockPaperScissors"}
          tabletImage={rpsTabletBg}
          laptopImage={rpsMainBg}
          mobileImage={rpsMainBg}
          pcImage={rpsMainBg}
          closedSidebarImage={rpsMainBg}
          pcImageClosed={rpsMainBgClosed}
        />
        <Game
          name={"Rocket"}
          description={""}
          link={"/games/Rocket"}
          tabletImage={rocket_bg}
          laptopImage={rocket_bg}
          mobileImage={rocket_bg}
          pcImage={rocketMainBg}
          closedSidebarImage={rocket_bg}
          pcImageClosed={rocket_bg}
        />
        <Game
          name={"Slots"}
          description={""}
          link={"/games/Slots"}
          tabletImage={slot_bg}
          laptopImage={slot_bg}
          mobileImage={slot_bg}
          pcImage={slotsMain}
          closedSidebarImage={slot_bg}
          pcImageClosed={slot_bg}
        />{" "}
        <Game
          name={"Wheel of Fortune"}
          description={""}
          link={"/games/WheelFortune"}
          tabletImage={wheelFortuneBanner}
          laptopImage={wheelFortuneBanner}
          mobileImage={wheelFortuneBanner}
          pcImage={wheelFortuneBanner}
          closedSidebarImage={wheelFortuneBanner}
          pcImageClosed={wheelFortuneBanner}
        />{" "}
        <Game
          name={"Apples"}
          description={""}
          link={"/games/Apples"}
          pcImage={appleBanner}
          tabletImage={appleBanner}
          laptopImage={appleBanner}
          mobileImage={appleBanner}
          closedSidebarImage={appleBanner}
          pcImageClosed={appleBanner}
        />
        <Game
          name={"Race"}
          description={""}
          link={"/games/Race"}
          pcImage={HorseBanner}
          tabletImage={HorseBanner}
          laptopImage={HorseBanner}
          mobileImage={HorseBanner}
          closedSidebarImage={HorseBanner}
          pcImageClosed={HorseBanner}
        />
        <Game
          name={"Cars"}
          description={""}
          link={"/games/Cars"}
          pcImage={carBanner}
          tabletImage={carBanner}
          laptopImage={carBanner}
          mobileImage={carBanner}
          closedSidebarImage={carBanner}
          pcImageClosed={carBanner}
        />
        <Game
          name={"BlackJack"}
          description={""}
          link={"/games/BlackJack"}
          pcImage={bjBanner}
          tabletImage={bjBanner}
          laptopImage={bjBanner}
          mobileImage={bjBanner}
          closedSidebarImage={bjBanner}
          pcImageClosed={bjBanner}
        />
        <Game
          name={"Thimbles"}
          description={""}
          link={"/games/Thimbles"}
          pcImage={thimblesBanner}
          tabletImage={thimblesBanner}
          laptopImage={thimblesBanner}
          mobileImage={thimblesBanner}
          closedSidebarImage={thimblesBanner}
          pcImageClosed={thimblesBanner}
        />
        <Game
          name={"Crash"}
          description={""}
          link={"/games/Crash"}
          pcImage={CrashBanner}
          tabletImage={CrashBanner}
          laptopImage={CrashBanner}
          mobileImage={CrashBanner}
          closedSidebarImage={CrashBanner}
          pcImageClosed={CrashBanner}
        />
        <Game
          name={"Roulette"}
          description={""}
          link={"/games/Roulette"}
          tabletImage={rouletteBanner}
          laptopImage={rouletteBanner}
          mobileImage={rouletteBanner}
          pcImage={rouletteBanner}
          closedSidebarImage={rouletteBanner}
          pcImageClosed={rouletteBanner}
        />
      </div>
    </div>
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
interface BannerInfoProps {}
const BannerInfo: FC<BannerInfoProps> = (props) => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const [isOpen, isMainWalletOpen, close, open, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    MainWallet.Close,
    MainWallet.Open,
    BlurModel.setBlur,
  ]);

  // const { isConnected } = useAccount();

  const hideAvaibleWallet = () => {
    close();
    setBlur(false);
    document.documentElement.style.overflow = "visible";
  };

  const handleConnectWalletBtn = () => {
    setStartConnect(true);
    if (!isMainWalletOpen) {
      open();
      setBlur(true);
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      close();
      setBlur(false);
      document.documentElement.style.overflow = "visible";
    }
  };
  // const { isConnecting } = useAccount();

  return (
    <div className={s.banner_info}>
      <div className={s.header}>Top 1 Casino on the WEB3</div>
      <div className={s.connect_wallet_container}>
        {/* {!isConnected && (
          <>
            <div className={s.text}>Login via Web3 wallets</div>
            <div className={s.button} onClick={handleConnectWalletBtn}>
              {isConnecting && startConnect ? (
                <LoadingDots className={s.join_dots} title="Connecting" />
              ) : (
                "Connect Wallet"
              )}
            </div>
          </>
        )} */}
        <div
          className={`${s.banner_info_avaibleWallet_container} ${
            !isOpen && s.sidebarClosed
          } ${isMainWalletOpen && s.walletVisible}`}
        >
          <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
        </div>
      </div>
    </div>
  );
};

const preloadModel = async () => {
  await import("@/widgets/Dice/DiceModel");
};

export default function Home() {
  const [Bets, AvailableBlocksExplorers, sidebarOpened, socketReset] = useUnit([
    LiveBetsModel.$Bets,
    settingsModel.$AvailableBlocksExplorers,
    SideBarModel.$isOpen,
    LayoutModel.$socketReset,
  ]);

  const [currentImage, setCurrentImage] = useState(mainBg);

  const device = useDeviceType();

  useEffect(() => {
    if (device === "laptop") {
      setCurrentImage(laptopBg);
    } else if (device === "tablet") {
      setCurrentImage(tabletBg);
    } else if (device === "phone") {
      setCurrentImage(phoneBg);
    } else if (device === "main") {
      setCurrentImage(mainBg2);
    }
  }, [device]);

  useEffect(() => {
    preloadModel();
  }, []);

  const socket = useSocket();

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket?.send(JSON.stringify({ type: "SubscribeAllBets" }));
    }
  }, [socket, socket?.readyState, socketReset]);

  return (
    <>
      <Head>
        <title>GreekKeepers: WEB 3.0 Crypto Games</title>
      </Head>

      <LiveBetsWS subscription_type={"SubscribeAllBets"} subscriptions={[]} />
      <Layout gameName={undefined}>
        {/* <div> */}
        <div className={`${s.main_container}`}>
          <Blur />
          {/* <MainReplacementComponent /> */}
          <SwiperBanner />
          <Games />
          <Total />
          <CustomBets
            title="Live bets"
            isMainPage={true}
            isGamePage={false}
            game={undefined}
          />
          <FeedbackSection />
          {/* <LeaderBoard /> */}
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
