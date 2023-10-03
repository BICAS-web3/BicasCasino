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
import { LiveBets } from "@/widgets/LiveBets";
import MainPageBackground from "@/public/media/misc/MainPageBackground.png";
import { SideBar, SideBarModel } from "@/widgets/SideBar";

import DiceBackground from "@/public/media/games_assets/dice/Background.png";
import pokerMobileBg from "@/public/media/games_assets/poker/PokerMobileBg.png";
import rockPaperScissorsMobileBg from "@/public/media/games_assets/rock_paper_scissors/rockPaperScissorsMobileBg.png";
import CoinflipBackground from "@/public/media/games_assets/coinflip/Background.png";
import RPSBackground from "@/public/media/games_assets/rock_paper_scissors/Background.png";
import { Layout } from "@/widgets/Layout";
import { LeaderBoard } from "@/widgets/LeaderBoard/LeaderBoard";
import { Total } from "@/widgets/Total";

import { Account } from "@/widgets/Account";
import { GameLayout } from "@/widgets/GameLayout/layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";
import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import { useUnit } from "effector-react";
import { createStore } from "effector";
import * as BlurModel from "@/widgets/Blur/model";
import { Poker } from "@/widgets/Poker/Poker";
import PokerGame from "./games/Poker";

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
  image: StaticImageData;
}

const Game: FC<GameProps> = (props) => {
  const [mobile, setMobile] = useState<any>(
    //window.innerWidth <= 650 ? true : false,
    false
  );

  useEffect(() => {
    setMobile(window.innerWidth <= 650 ? true : false);
    let mediaQuery = window.matchMedia(mobileQuery);
    mediaQuery.onchange = (e) => {
      if (e.matches) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    return () => {
      mediaQuery.onchange = null;
    };
  }, []);
  //const [mobile] = useMatchMedia(mobileQuery);

  return (
    <a
      className={s.game_link}
      href={props.link}
      style={{
        backgroundImage: `url(${
          mobile ? props.imageMobile.src : props.image.src
        })`,
      }}
    >
      {/* <Image
            src={DiceBackground}
            alt={''}
            className={s.game_image}
        /> */}
      <div className={s.game}>
        <div className={s.game_info}>
          <div className={s.game_name}>
            {props.name}
            {/* <div className={s.game_arrow}>
                        {'>'}
                    </div> */}
          </div>
          <div className={s.game_description}>{props.description}</div>
        </div>
      </div>
    </a>
  );
};

interface GameProps {
  name: string;
  description: string;
  link: string;
  image_colored: any;
  image_blend: any;
  imageMobile: any;
}

const GameBlured: FC<GameProps> = (props) => {
  // const [isHovering, setIsHovered] = useState(false);

  // const onMouseEnter = () => setIsHovered(true);
  // const onMouseLeave = () => setIsHovered(false);

  return (
    <div className={s.game_link}>
      <div className={s.game_blured}>
        <div className={s.comming_soon}>
          <div>Comming Soon</div>
        </div>
        <div className={`${s.game_info} ${s.blured}`}>
          <div className={s.game_name}>
            {props.name}
            <div className={s.game_arrow}>{">"}</div>
          </div>
          <div className={s.game_description}>{props.description}</div>
        </div>

        <Image
          className={`${s.game_icon} ${s.blured}`}
          src={props.image_colored}
          alt=""
          width={undefined}
          height={undefined}
        />
      </div>
    </div>
  );
};

interface GamesProps {}

const Games: FC<GamesProps> = (props) => {
  return (
    <div className={s.games}>
      {/* <GamesTitle></GamesTitle> */}
      <div className={s.games_row}>
        <Game
          name={"COINFLIP"}
          description={
            "COINFLIP GAME very long description that needs to be wrapped to the new line"
          }
          link={"/games/CoinFlip"}
          image_colored={CoinFlipColoredIcon}
          image_blend={CoinFlipBlendIcon}
          image={CoinflipBackground}
          imageMobile={pokerMobileBg}
        />
        <Game
          name={"ROCK PAPER SCISSORS"}
          description={
            "COINFLIP GAME very long description that needs to be wrapped to the new line"
          }
          link={"/games/RockPaperScissors"}
          image_colored={RPSColoredIcon}
          image_blend={RPSBlendIcon}
          image={DiceBackground}
          imageMobile={rockPaperScissorsMobileBg}
        />
        {/* <Game
                name={'ROCK PAPER SCISSORS'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/rock-paper-scissors'}
                image_colored={RPSColoredIcon}
                image_blend={RPSBlendIcon}
            /> */}
      </div>

      <div className={s.games_row}>
        {/* <GameBlured
                name={'DICE'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/dice'}
                image_colored={DiceColoredIcon}
                image_blend={DiceBlendIcon}
            /> */}
        <Game
          name={"DICE"}
          description={
            "DICE GAME very long description that needs to be wrapped to the new line"
          }
          link={"/games/Dice"}
          image_colored={DiceColoredIcon}
          image_blend={DiceBlendIcon}
          image={RPSBackground}
          imageMobile={pokerMobileBg}
        />

        {/* <Game
                name={'COINFLIP'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/CoinFlip'}
                image_colored={CoinFlipColoredIcon}
                image_blend={CoinFlipBlendIcon}
            />  */}
      </div>
    </div>
  );
};

interface GamesTitleProps {}
const GamesTitle: FC<GamesTitleProps> = (props) => {
  return (
    <div className={s.games_title}>
      <div>Games</div>
      {/* <div className={s.games_more}>
            <div>
                Show More
            </div>
            <div>
                {'>'}
            </div>
        </div> */}
    </div>
  );
};

// interface TotalProps { name: string, value: string };
// const Total: FC<TotalProps> = props => {
//     return (<div className={s.total}>
//         <div className={s.total_name}>
//             {props.name}
//         </div>
//         <div className={s.total_value}>
//             {props.value}
//         </div>
//     </div>)
// }

// interface TotalInfoProps { };
// const TotalInfo: FC<TotalInfoProps> = props => {
//     return (<div className={s.total_info}>
//         <Total
//             name="Total wagered"
//             value="10000000" />

//         <Total
//             name="Total bets"
//             value="10000000" />

//         <Total
//             name="Total users"
//             value="10000000" />
//     </div>)
// }

interface BannerInfoProps {}
const BannerInfo: FC<BannerInfoProps> = (props) => {
  const [isOpen, isMainWalletOpen, close, open, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    MainWallet.Close,
    MainWallet.Open,
    BlurModel.setBlur,
  ]);

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
        <div className={s.text}>Login via Web3 wallets</div>
        <div className={s.button} onClick={handleConnectWalletBtn}>
          Connect Wallet
        </div>
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

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Play | Home page</title>
      </Head>

      <Layout>
        <div className={s.background_container}>
          <Image src={MainPageBackground} alt={""} className={s.background} />
          <div className={s.background_gradient}></div>
        </div>

        <div className={`${s.main_container}`}>
          <BannerInfo />
          <Games />
          <Total />
          <CustomBets
            title="Live bets"
            isMainPage={true}
            isGamePage={false}
            bets={[
              {
                time: { date: "25.08.23", time: "17:05" },
                game_name: "Dice",
                player: "UserName",
                wager: 11,
                multiplier: 3,
                profit: 5.34,
                userBg: "#3DBCE5",
                player_url: "test",
                trx_url: "test",
                game_url: "test",
                network_icon: "test",
                numBets: 1,
                gameAddress: "0x563...4ba9",
              },
            ]}
          />
          <LeaderBoard />
        </div>
      </Layout>

      {/* <Footer />
      <InvitesList />
      <GamesList />
      <ConnectWalletModal /> */}
    </>
  );
}
