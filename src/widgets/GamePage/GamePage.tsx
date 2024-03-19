import s from "./styles.module.scss";
import gameBg from "../../public/media/game_layout_images/game_background.webp";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";
import { GamePageModal } from "@/widgets/GamePage/GamePageModal";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import * as MainWallet from "@/widgets/AvaibleWallet/model";
import * as BlurModel from "@/widgets/Blur/model";
import { Wager } from "@/widgets/Wager/Wager";
import soundIco from "@/public/media/Wager_icons/active2.svg";
import soundOffIco from "@/public/media/Wager_icons/disabled2.svg";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
// import {
//   usePrepareContractWrite,
//   useContractWrite,
//   useContractRead,
//   useWaitForTransaction,
//   useAccount,
//   useConnect,
//   useBalance,
// } from "wagmi";
import * as api from "@/shared/api";
import { settingsModel } from "@/entities/settings";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { PokerFlipCardsInfo } from "../PokerFlipCardsInfo";

import * as AppleModel from "@/widgets/ApplesGame/model";
import appleStyles from "@/widgets/ApplesGame/styles.module.scss";
import * as GameModel from "./model";
import { Notification } from "../Notification";
import { WinMessage } from "@/widgets/WinMessage";
import { LostMessage } from "@/widgets/LostMessage";
import Image from "next/image";
import { GamePageBottomBlock } from "../GamePageBottomBlock/GamePageBottomBlock";
import clsx from "clsx";
import { WagerModel } from "@/widgets/Wager";
import { useMediaQuery } from "@/shared/tools";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as DGM from "@/widgets/Dice/model";
import * as CFM from "@/widgets/CoinFlip/model";
import * as PGM from "@/widgets/Plinko/model";
import { PokerModel } from "@/widgets/Poker/Poker";
import useSound from "use-sound";
import ReactHowler from "react-howler";
import { ManualSetting } from "../ManualSetting/ui/ManualSetting";
import * as MinesModel from "@/widgets/Mines/model";
import * as BetsModel from "@/widgets/LiveBets/model";
import { useRouter } from "next/router";
import soundEffectsIco from "@/public/media/Wager_icons/effects2.svg";
const musicsList = [
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/3.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/4.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/5.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/6.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/7.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/8.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/9.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/10.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/12.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/13.mp3`,
  `${api.BaseStaticUrl}/static/media/games_assets/music/default_bg_music/14.mp3`,
];

import activeGroup from "@/public/media/Wager_icons/activeGroup.svg";
import disabledGroup from "@/public/media/Wager_icons/disabledGroup.svg";
import { RefundButton } from "@/shared/ui/Refund";
import * as RaceModel from "@/widgets/Race/model";
import * as CarModel from "@/widgets/CarsRace/model";
import draxTokenIco from "@/public/media/payment/draxMiniIco.svg";
import bonusTokenIco from "@/public/media/payment/bonusCoin.svg";

import { CarSelector } from "@/shared/ui/CarSelector";
interface GamePageProps {
  children: ReactNode;
  gameTitle: string;
  gameInfoText: string;
  wagerContent: any;
  isPoker: boolean;
  customTitle?: string;
  custom_height?: string;
  soundClassName?: string;
  isMines?: boolean;
  customHeight?: boolean;
  roulette?: boolean;
  customCname?: any;
}

export const GamePage: FC<GamePageProps> = ({
  children,
  gameTitle,
  gameInfoText,
  roulette,
  wagerContent,
  isPoker,
  customTitle = false,
  custom_height,
  soundClassName,
  isMines,
  customHeight,
  customCname,
}) => {
  // const { address, isConnected, isConnecting } = useAccount();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [currentToken, setCurrentToken] = useState<{
    token: api.T_Token;
    price: number;
  }>();
  const [gameResult, setGameResult, setReset] = useUnit([
    RaceModel.$gameResult,
    RaceModel.setGameResult,
    RaceModel.setReset,
  ]);
  // const { connectors, connect } = useConnect();
  const [erc20balanceOfConf, seterc20balanceOfConf] = useState<any>();
  const [erc20balanceofCall, seterc20balanceofCall] = useState<any>();
  const isMobile = useMediaQuery("(max-width: 996px)");
  // const {
  //   data: balance,
  //   error,
  //   isError,
  //   refetch: fetchBalance,
  // } = useContractRead({
  //   address: currentToken?.token.contract_address as `0x${string}`,
  //   abi: IERC20,
  //   functionName: "balanceOf",
  //   args: [address],
  // });
  const [manualSetting, setManualSetting] = useUnit([
    MinesModel.$manualSetting,
    MinesModel.setManualSetting,
  ]);
  const [
    setRefund,
    availableTokens,
    gameStatus,
    setGameStatus,
    profit,
    multiplier,
    token,
    lost,
    clearStatus,
    playSounds,
    switchSounds,
    isPlaying,
    waitingResponse,
    carResult,
    raceResult,
    setCarReset,
    result,
    tokenId,
    setIsPlaying,
  ] = useUnit([
    GameModel.setRefund,
    settingsModel.$AvailableTokens,
    GameModel.$gameStatus,
    GameModel.setGameStatus,
    GameModel.$profit,
    GameModel.$multiplier,
    GameModel.$token,
    GameModel.$lost,
    GameModel.clearStatus,
    GameModel.$playSounds,
    GameModel.switchSounds,
    GameModel.$isPlaying,
    GameModel.$waitingResponse,
    CarModel.$gameResult,
    RaceModel.$gameResult,
    CarModel.setReset,
    BetsModel.$result,
    BetsModel.$tokenId,
    GameModel.setIsPlaying,
  ]);

  //const [isDicePlaying] = useUnit([DGM.$isPlaying]);
  //const [isCFPlaying] = useUnit([CFM.$isPlaying]);
  //const [isPlinkoPlaying] = useUnit([PGM.$isPlaying]);
  //const [isPokerlaying] = useUnit([PokerModel.$isPlaying]);
  const [setBlur] = useUnit([BlurModel.setBlur]);
  const { push } = useRouter();

  // const handleModalVisibilityChange = () => {
  //   !modalVisibility && setBlur(true);
  //   setModalVisibility(!modalVisibility);
  // };

  // const [playBackground, { stop: stopBackground, duration: firstDuration }] =
  //   useSound(sound, {
  //     volume: 0.4,
  //     loop: true,
  //   });

  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);

  const setNewMusic = () => {
    setCurrentSoundIndex((prevIndex) => (prevIndex + 1) % musicsList.length);
  };

  const closeModal = () => {
    setModalVisibility(false);
    setBlur(false);
  };

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await sleep(2000);
      clearStatus();
    };
    if (gameStatus == GameModel.GameStatus.Lost) {
      run();
    }
  }, [gameStatus]);

  // const won = false;
  // const lost = false;

  const [pressButton, setIsEmtyWager] = useUnit([
    WagerModel.pressButton,
    GameModel.setIsEmtyWager,
  ]);

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);

  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: any) => {
      const clickedElement = e.target;
      const attribute = clickedElement.dataset.winlostid;
      console.log(attribute, gameStatus);
      if (attribute === undefined) {
        clearStatus();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const soundChange = () => {
    if (playSounds === "off") {
      switchSounds("on");
    } else if (playSounds === "on") {
      switchSounds("effects");
    } else if (playSounds === "effects") {
      switchSounds("off");
    }
  };

  const [setStop, apples] = useUnit([AppleModel.setStop, AppleModel.$apples]);

  return (
    <div className={s.game_layout}>
      <ReactHowler
        src={musicsList[currentSoundIndex]}
        playing={playSounds === "on"}
        onEnd={() => setNewMusic()}
      />
      <div className={s.game_wrap}>
        <GamePageModal
          text={gameInfoText}
          closeModal={closeModal}
          modalVisible={modalVisibility}
        />
        <div className={s.game_body}>
          <div className={s.game}>
            <div
              className={clsx(
                s.game_block,
                custom_height,
                customHeight && s.minHeight,
                customCname && customCname,
                gameTitle === "carRace" && s.carRace_height,
                roulette && s.roulette_styles
              )}
            >
              <button
                className={clsx(
                  s.poker_wager_sound_btn,
                  soundClassName,
                  gameTitle === "crash" && s.height
                )}
                onClick={soundChange}
                data-id="2"
              >
                {playSounds === "off" ? (
                  <>
                    <Image
                      alt="sound-ico-off"
                      className={s.sound_ico}
                      src={soundOffIco}
                    />
                    <Image
                      alt="sound-ico-off"
                      // className={s.sound_ico}
                      src={disabledGroup}
                    />
                  </>
                ) : playSounds === "effects" ? (
                  <>
                    <Image
                      alt="sound-ico"
                      className={s.sound_ico}
                      src={soundEffectsIco}
                    />
                    <span>fx</span>
                  </>
                ) : (
                  <>
                    <Image
                      alt="sound-ico"
                      className={s.sound_ico}
                      src={soundIco}
                    />
                    <Image
                      alt="sound-ico"
                      // className={s.sound_ico}
                      src={activeGroup}
                    />
                  </>
                )}
              </button>
              {children}
              {gameStatus == GameModel.GameStatus.Won &&
                gameTitle !== "poker" &&
                gameTitle !== "race" &&
                gameTitle !== "carRace" &&
                gameTitle !== "apples" && (
                  <div className={s.win_wrapper} data-winlostid="win_message">
                    <WinMessage
                      tokenImage={
                        <Image
                          src={
                            tokenId !== null &&
                            (tokenId === 1
                              ? bonusTokenIco.src
                              : draxTokenIco.src)
                          }
                          alt={""}
                          width={30}
                          height={30}
                        />
                      }
                      profit={profit.toFixed(2)}
                      multiplier={Number(multiplier.toFixed(2)).toString()}
                    />
                  </div>
                )}

              {gameStatus == GameModel.GameStatus.Lost && (
                <div className={s.lost_wrapper} data-winlostid="win_message">
                  <LostMessage amount={lost.toFixed(2)} />
                </div>
              )}
            </div>
            <Wager
              isFlex={gameTitle === "carRace" ? false : true}
              // ManualElement={
              //   isMines ? (
              //     <ManualSetting
              //       className={s.manual_block}
              //       setValue={setManualSetting}
              //       value={manualSetting}
              //     />
              //   ) : (
              //     <></>
              //   )
              // }
              ButtonElement={
                isMobile ? (
                  <>
                    <button
                      className={clsx(
                        s.connect_wallet_btn,
                        s.mobile,
                        isPlaying && "animation-leftRight",
                        !isPlaying && cryptoValue == 0.0 // && isConnected
                          ? s.button_inactive
                          : s.button_active,
                        gameTitle === "apples" &&
                          apples.length === 0 &&
                          isPlaying &&
                          s.btn_step,
                        gameTitle === "apples" &&
                          apples.length !== 0 &&
                          isPlaying &&
                          s.btn_refund
                      )}
                      onClick={() => {
                        if (
                          gameTitle === "apples" &&
                          isPlaying &&
                          apples.length > 0
                        ) {
                          setStop(true);
                        } else if (
                          gameTitle === "race" &&
                          gameResult.length > 0
                        ) {
                          setGameResult([]);
                          setReset(true);
                        } else if (carResult.length > 0) {
                          setCarReset(true);
                        } else {
                          if (
                            cryptoValue > 0.0 ||
                            (isPlaying && !waitingResponse)
                            //&& isConnected
                          ) {
                            setIsPlaying(true);
                          } else if (cryptoValue <= 0.0) {
                            //  && isConnected
                            setIsEmtyWager(true);
                          } else {
                            router.push("/RegistrManual");
                          }
                        }
                      }}
                    >
                      {(gameTitle === "race" && raceResult.length > 0) ||
                      (gameTitle === "cars" && carResult.length > 0) ? (
                        "Reset"
                      ) : gameTitle === "apples" && isPlaying ? (
                        "Refund"
                      ) : waitingResponse ? (
                        <LoadingDots className={s.dots_black} title="Playing" />
                      ) : true ? ( // isConnected
                        "Play"
                      ) : (
                        "Connect Wallet"
                      )}
                    </button>
                    {gameTitle === "carRace" && (
                      <CarSelector className={s.car_selector} />
                    )}
                  </>
                ) : (
                  <></>
                )
              }
              wagerContent={wagerContent}
            />
            <GamePageBottomBlock isPoker={isPoker} gameText={gameInfoText} />
          </div>
          <div className={s.custombets_wrap}>
            <CustomBets
              title="Live bets"
              isGamePage={true}
              isMainPage={false}
              game={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
