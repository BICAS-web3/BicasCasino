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
import mainBg from "@/public/media/misc/mainBg.png";
import laptopBg from "@/public/media/misc/1280Bg.png";
import tabletBg from "@/public/media/misc/tabletBg.png";
import phoneBg from "@/public/media/misc/phoneBg.png";
import { SideBar, SideBarModel } from "@/widgets/SideBar";

import DiceBackground from "@/public/media/games_assets/dice/Background.png";
import rockPaperScissorsMobileBg from "@/public/media/games_assets/rock_paper_scissors/rockPaperScissorsMobileBg.png";
import CoinflipBackground from "@/public/media/games_assets/coinflip/Background.png";
import PokerBackground from "@/public/media/games/poker.png";
import RPSBackground from "@/public/media/games_assets/rock_paper_scissors/Background.png";
import { Layout } from "@/widgets/Layout";
import { LeaderBoard } from "@/widgets/LeaderBoard/LeaderBoard";
import { Total } from "@/widgets/Total";

import pokerMainBg from "@/public/media/games_assets/poker/pokerMainImg.png";
import pokerLaptopBg from "@/public/media/games_assets/poker/1280Img.png";
import pokerTabletBg from "@/public/media/games_assets/poker/tabletImg.png";
import pokerMobileBg from "@/public/media/games_assets/poker/mobileImg.png";
import pokerClosedSidebarImg from "@/public/media/games_assets/poker/pokerClosedSideBarImg.png";

import coinflipMainBg from "@/public/media/games_assets/coinflip/mainBg.png";
import coinflipLaptopBg from "@/public/media/games_assets/coinflip/1280Bg.png";
import coinflipTabletBg from "@/public/media/games_assets/coinflip/tabletBg.png";
import coinflipMobileBg from "@/public/media/games_assets/coinflip/mobileBg.png";
import coinflipClosedSidebarImg from "@/public/media/games_assets/coinflip/closedSidebarImg.png";

import diceMainBg from "@/public/media/games_assets/dice/dicePcImg.png";
import diceLaptopBg from "@/public/media/games_assets/dice/laptopPcImg.png";
import diceTabletBg from "@/public/media/games_assets/dice/tabletPcImg.png";
import diceMobileBg from "@/public/media/games_assets/dice/mobileImg.png";
import diceClosedSidebarImg from "@/public/media/games_assets/dice/closedSideBarImg.png";

import minesMainBg from "@/public/media/games_assets/mines/mainBg.png";
import minesLaptopBg from "@/public/media/games_assets/mines/1280Bg.png";
import minesTabletBg from "@/public/media/games_assets/mines/tabletBg.png";
import minesMobileBg from "@/public/media/games_assets/mines/mobileBg.png";
import minesClosedSidebarImg from "@/public/media/games_assets/mines/closedSidebarBg.png";

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
import { useAccount } from 'wagmi';
import Link from "next/link";

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

interface GamesProps { }

const Games: FC<GamesProps> = (props) => {
  return (
    <div className={s.games}>
      {/* <GamesTitle></GamesTitle> */}
      <div className={s.games_row}>
        <Game
          name={"POKER"}
          description={
            "Poker"
          }
          link={"/games/Poker"}
          pcImage={pokerMainBg}
          tabletImage={pokerTabletBg}
          laptopImage={pokerLaptopBg}
          mobileImage={pokerMobileBg}
          closedSidebarImage={pokerClosedSidebarImg}
        />
        <Game
          name={"DICE"}
          description={
            ""
          }
          link={"/games/Dice"}
          tabletImage={diceTabletBg}
          laptopImage={diceLaptopBg}
          mobileImage={diceMobileBg}
          pcImage={diceMainBg}
          closedSidebarImage={diceClosedSidebarImg}
        />
      </div>

      <div className={s.games_row}>
        <Game
          name={"COINFLIP"}
          description={""}
          link={"/games/CoinFlip"}
          tabletImage={coinflipTabletBg}
          laptopImage={coinflipLaptopBg}
          mobileImage={coinflipMobileBg}
          pcImage={coinflipMainBg}
          closedSidebarImage={coinflipClosedSidebarImg}
        />
        <Game
          name={"MINES"}
          description={
            ""
          }
          link={"/games/Mines"}
          tabletImage={minesTabletBg}
          laptopImage={minesLaptopBg}
          mobileImage={minesMobileBg}
          pcImage={minesMainBg}
          closedSidebarImage={minesClosedSidebarImg}
        />

        {/* <Game
                name={'COINFLIP'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/CoinFlip'}
                image_colored={CoinFlipColoredIcon}
                image_blend={CoinFlipBlendIcon}
            />  */}
        <Game
          name={"PLINKO"}
          description={
            "PLINKO GAME"
          }
          link={"/games/Plinko"}
          tabletImage={minesTabletBg}
          laptopImage={minesLaptopBg}
          mobileImage={minesMobileBg}
          pcImage={minesMainBg}
          closedSidebarImage={minesClosedSidebarImg}
        />
      </div>
    </div>
  );
};

interface GamesTitleProps { }
const GamesTitle: FC<GamesTitleProps> = (props) => {
  return (
    <div className={s.games_title}>
      <div>Games</div>
    </div>
  );
};


interface BannerInfoProps { }
const BannerInfo: FC<BannerInfoProps> = (props) => {
  const [isOpen, isMainWalletOpen, close, open, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    MainWallet.Close,
    MainWallet.Open,
    BlurModel.setBlur,
  ]);

  const { isConnected } = useAccount();

  const hideAvaibleWallet = () => {
    close();
    setBlur(false);
    document.documentElement.style.overflow = "visible";
  };

  const handleConnectWalletBtn = () => {
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

  return (
    <div className={s.banner_info}>
      <div className={s.header}>Top 1 Casino on the WEB3</div>
      <div className={s.connect_wallet_container}>
        {!isConnected && <><div className={s.text}>Login via Web3 wallets</div>
          <div className={s.button} onClick={handleConnectWalletBtn}>
            Connect Wallet
          </div></>}
        <div
          className={`${s.banner_info_avaibleWallet_container} ${!isOpen && s.sidebarClosed
            } ${isMainWalletOpen && s.walletVisible}`}
        >
          <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [
    Bets,
    AvailableBlocksExplorers
  ] = useUnit([
    LiveBetsModel.$Bets,
    settingsModel.$AvailableBlocksExplorers
  ]);

  useEffect(() => {
    console.log("New bets");
  }, [Bets]);


  return (
    <>
      <Head>
        <title>NFT Play | Home page</title>
      </Head>

      <LiveBetsWS subscription_type={'SubscribeAll'} subscriptions={[]} />
      <Layout gameName={undefined}>
        {/* <div> */}

        <div className={`${s.main_container}`}>
          <div className={s.background_container}>
            <Image src={mainBg} alt={""} className={s.background} />
            <div className={s.background_gradient}></div>
          </div>
          <BannerInfo />
          <Games />
          <Total />
          <CustomBets title='Live bets' isMainPage={true} isGamePage={false} game={undefined} />
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
