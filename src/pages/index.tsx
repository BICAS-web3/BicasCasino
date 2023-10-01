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
import { LiveBetsModel } from '@/widgets/LiveBets';
import MainPageBackground from '@/public/media/misc/MainPageBackground.png';
import { SideBar, SideBarModel } from '@/widgets/SideBar';

import DiceBackground from "@/public/media/games_assets/dice/Background.png";
import CoinflipBackground from "@/public/media/games_assets/coinflip/Background.png";
import PokerBackground from "@/public/media/games/poker.png";
import RPSBackground from "@/public/media/games_assets/rock_paper_scissors/Background.png";
import { Layout } from "@/widgets/Layout";
import { LeaderBoard } from "@/widgets/LeaderBoard/LeaderBoard";
import { Total } from "@/widgets/Total";

import { GameLayout } from "@/widgets/GameLayout/layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";
import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import { useUnit } from "effector-react";
import { createStore } from "effector";
import * as BlurModel from '@/widgets/Blur/model'
import { Account } from "@/widgets/Account";
import { Wager } from "@/widgets/Wager/Wager";
import { LiveBetsWS } from '@/widgets/LiveBets';
import { settingsModel } from '@/entities/settings';
import { useAccount } from "wagmi";

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
  return (
    <a
      className={s.game_link}
      href={props.link}
      style={{
        backgroundImage: `url(${props.image.src})`,
      }}
    >
      <div className={s.game}>
        <div className={s.game_info}>
          <div className={s.game_name}>
            {props.name}
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
}

const GameBlured: FC<GameProps> = (props) => {
  // const [isHovering, setIsHovered] = useState(false);

  // const onMouseEnter = () => setIsHovered(true);
  // const onMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={s.game_link}
      style={{
        backgroundImage: `url(${props.image.src})`,
      }}
    >
      <div className={s.game}>
        <div className={s.game_info}>
          <div className={s.game_name}>
            {props.name}
          </div>
          <div className={s.game_description}>{props.description}</div>
        </div>
      </div>
    </div>
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
            "COINFLIP GAME very long description that needs to be wrapped to the new line"
          }
          link={"/games/Poker"}
          image_colored={CoinFlipColoredIcon}
          image_blend={CoinFlipBlendIcon}
          image={PokerBackground}
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
  };

  const handleConnectWalletBtn = () => {
    if (!isMainWalletOpen) {
      open();
      setBlur(true);
    } else {
      close();
      setBlur(false);
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
      <Layout>

        <div className={s.background_container}>
          <Image
            src={MainPageBackground}
            alt={''}
            className={s.background}
          />
          <div className={s.background_gradient}>

          </div>

        </div>

        <div className={`${s.main_container}`}>
          <BannerInfo />
          <Games />
          <Total />
          <CustomBets title='Live bets' isMainPage={true} isGamePage={false} />
          {/* <LeaderBoard /> */}
        </div>
      </Layout>


      {/* <Footer />
      <InvitesList />
      <GamesList />
      <ConnectWalletModal /> */}
    </>
  );
}
