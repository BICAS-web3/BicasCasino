import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import applesBg from "@/public/media/apples/applesBg.png";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import appleBg from "@/public/media/apples/appleItemBg.svg";
import appleBgTrue from "@/public/media/apples/appleItemBgTrue.svg";
import appleBgFalse from "@/public/media/apples/appleItemBgFalse.svg";
import appleCoefTrue from "@/public/media/apples/appleCoefBgTrue.svg";
import appleCoefFalse from "@/public/media/apples/appleCoefBgFalse.svg";
import cfBg from "@/public/media/apples/cfBg.svg";
import cfBgActive from "@/public/media/apples/cfBgActive.svg";
import { AppleIco } from "@/shared/SVGs/AppleIco";
import backIco from "@/public/media/apples/backIco.svg";
import clsx from "clsx";
import * as BalanceModel from "@/widgets/BalanceSwitcher/model";
import * as LayoutModel from "@/widgets/Layout/model";
//?------------
import Image from "next/image";
import mobLine from "@/public/media/apples/mobLine.svg";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import { SidePickerModel } from "../CoinFlipSidePicker";
import { useUnit } from "effector-react";
import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import * as BetsModel from "@/widgets/LiveBets/model";
import * as RegistrM from "@/widgets/Registration/model";
// import {
//   useAccount,
//   useContractEvent,
//   useContractRead,
//   useContractWrite,
//   useNetwork,
//   usePrepareContractWrite,
// } from "wagmi";
import { sessionModel } from "@/entities/session";
import { ABI as IAppleAbi } from "@/shared/contracts/AppleABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { useDebounce } from "@/shared/tools";
import { WagerGainLossModel } from "../WagerGainLoss";
import { TOKENS } from "@/shared/tokens";
// import { useFeeData } from "wagmi";
import * as ApplesModel from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import { AppleFalseIco } from "@/shared/SVGs/AppleFalse";
import { ApplesWinBlock } from "../ApplesWin/ApplesWinBlock";
import { Preload } from "@/shared/ui/Preload";
import { useSocket } from "@/shared/context";
import * as MinesModel from "@/widgets/Mines/model";
interface ApplesGameProps {}

export const ApplesGame: FC<ApplesGameProps> = () => {
  const [appleData, setAppleData] = useState<IAppleData[]>([]);
  // const [resultApples, setResultApples] = useState<number[]>([]);

  const [setEmpty] = useUnit([ApplesModel.setEmptyField]);

  useEffect(() => {
    if (appleData.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [appleData.length]);

  const [apples, setApples] = useState<number[]>([]);

  // useEffect(() => alert(apples[apples.length - 1]), [apples]);

  useEffect(() => {
    const data = appleData.map((el) => el.value);
    setApples(data);
  }, [appleData]);
  const [applesArr, setApplesArr] = useState(Array(27).fill({}));
  const [chunkedApplesArr, setChunkedApplesArr] = useState<any>([]);

  useEffect(() => console.log(chunkedApplesArr), [chunkedApplesArr]);

  useEffect(() => {
    const updateChunkedArray = () => {
      const arr = [];
      const chunkSize = 3;

      for (let i = 0; i < applesArr.length; i += chunkSize) {
        const chunk = applesArr.slice(i, i + chunkSize);
        let cf = 0;
        switch (i) {
          case 0:
            cf = 64;
            break;
          case 3:
            cf = 32;
            break;
          case 6:
            cf = 16;
            break;
          case 9:
            cf = 8;
            break;
          case 12:
            cf = 4;
            break;
          case 15:
            cf = 2;
            break;
          case 18:
            cf = 1.7;
            break;
          case 21:
            cf = 1.5;
            break;
          case 24:
            cf = 1.3;
            break;
          default:
            cf = 0;
            break;
        }

        arr.push({ apples: chunk, cf: cf });
      }

      setChunkedApplesArr(arr);
    };

    updateChunkedArray();
  }, [applesArr]);

  interface IAppleData {
    number: number;
    value: number;
  }
  const [isLoading, setIsLoading] = useState(false);
  const [
    lost,
    profit,
    playSounds,
    setActivePicker,
    pickSide,
    wagered,
    setWagered,
    betsAmount,
    gameAddress,
    pickedToken,
    currentBalance,
    cryptoValue,
    stopGain,
    stopLoss,
    allowance,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    setCoefficient,
    waitingResponse,
    setWaitingResponse,
    setIsPlaying,
    setBetValue,
    betValue,
    pickedSide,
    appleGameResult,
    setAppleGameResult,
    reset,
    refund,
    setRefund,
    gamesList,
    result,
    setResult,
    socketLogged,
    isDrax,
    userInfo,
    isPlaying,
    stopWinning,
    setStopWinning,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$playSounds,
    SidePickerModel.setActive,
    SidePickerModel.pickSide,
    WagerButtonModel.$Wagered,
    WagerButtonModel.setWagered,
    CustomWagerRangeInputModel.$pickedValue,
    sessionModel.$gameAddress,
    WagerModel.$pickedToken,
    sessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerGainLossModel.$stopGain,
    WagerGainLossModel.$stopLoss,
    sessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    ProfitModel.setCoefficient,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.setBetValue,
    GameModel.$betValue,
    SidePickerModel.$pickedSide,
    ApplesModel.$gameResult,
    ApplesModel.setGameResult,
    ApplesModel.$reset,
    GameModel.$refund,
    GameModel.setRefund,
    GameModel.$gamesList,
    BetsModel.$result,
    BetsModel.setResult,
    LayoutModel.$socketLogged,
    BalanceModel.$isDrax,
    LayoutModel.$userInfo,
    GameModel.$isPlaying,
    MinesModel.$stopWinning,
    MinesModel.setStopWinning,
  ]);

  const [mines, setMines] = useState<boolean[][]>([]);

  // useEffect(() => alert(`${mines}`), [mines.length]);
  const [start, setStart] = useState(true);
  const [open, setoPen] = useState(true);

  useEffect(() => {
    if (result) {
      if (result.type === "State" && result.state) {
        //{"state":[[false,true,false],[true,false,false]],"picked_tiles":[2,2],"current_multiplier":"2.22"}

        const dataState = JSON.parse(result.state).state;
        // alert(2);
        if (result?.amount && start) {
          // alert(1);
          setIsPlaying(true);
          setApples(JSON.parse(result.state).picked_tiles);
          setMines(dataState);
          setStart(false);
        }
        console.log("first level: ", dataState);

        // const stateArray = JSON.parse(dataState.state);
        setMines(() => dataState);
        // alert();
        setKeep(true);
      } else if (result.type === "Bet" && result.state) {
        // setTimeout(() => {
        //   setInGame(false);
        // }, 2000);
        const data = JSON.parse(result!.state);

        setWaitingResponse(false);
        if (
          Number(result.profit) > Number(result.amount) ||
          Number(result.profit) === Number(result.amount)
        ) {
          setGameStatus(GameModel.GameStatus.Won);
          const multiplier = Number(
            Number(result.profit) / Number(result.amount)
          );
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: "DRAX",
          });
          setTimeout(() => {
            setAppleGameResult([]);
            setAppleData([]);
            setApples([]);
            setMines([]);
            setInGame(false);
            setIsPlaying(false);
            setKeep(false);
            setFirstBet(true);
            handleReset();
            setStopWinning("NO");
          }, 200);
        } else if (Number(result.profit) < Number(result.amount)) {
          setGameStatus(GameModel.GameStatus.Lost);
          setLostStatus(Number(result.profit) - Number(result.amount));
          setTimeout(() => {
            setAppleGameResult([]);
            setAppleData([]);
            setApples([]);
            setMines([]);
            setInGame(false);
            setIsPlaying(false);
            setKeep(false);
            setFirstBet(true);
            handleReset();
          }, 200);
        } else {
          setGameStatus(GameModel.GameStatus.Draw);
          setTimeout(() => {
            setAppleGameResult([]);
            setAppleData([]);
            setApples([]);
            setMines([]);
            setInGame(false);
            setIsPlaying(false);
            setKeep(false);
            setFirstBet(true);
            handleReset();
          }, 200);
        }
        // setKeep(false);
      }
    }
    setResult(null);
  }, [result, result?.type]);

  const [keep, setKeep] = useState(false);
  useEffect(() => {
    if (stopWinning === "NO") {
      setIsCashout(false);
    } else {
      setIsCashout(true);
    }
  }, [stopWinning]);

  const [isCashout, setIsCashout] = useState(true);
  const [playApple] = useSound("/music/apple_click.mp3", { volume: 1 });

  const [coefficientData, setCoefficientData] = useState<number[]>([]);

  useEffect(() => {
    setCoefficient(1.98);
  }, []);

  const [inGame, setInGame] = useState<boolean>(false);

  useEffect(() => {
    setActivePicker(true);
    setInGame(false);
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide);
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1);
    }
  }, [gameStatus]);
  //!--------------------------------------------------
  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0.1);
  const [localAmount, setLocalAmount] = useState<any>(0);
  const [localCryptoValue, setLocalCryptoValue] = useState(0);
  const [gameResult, setGameResult] = useState<
    { value: number; status: "won" | "lost" }[]
  >([]);
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon((prev) => prev + profit);
      setGameResult((prev) => [
        ...prev,
        { value: localCryptoValue * localAmount, status: "won" },
      ]);
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost((prev) => prev + lost);
      setGameResult((prev) => [...prev, { value: 0.0, status: "lost" }]);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);

  // useEffect(() => {
  //   setTimeout(() => setAppleGameResult([0, 0, 1, 2]), 3000);
  // }, []);

  useEffect(() => setInGame(isPlaying), [isPlaying]);
  const [access_token] = useUnit([RegistrM.$access_token]);
  const [taken, setTaken] = useState(false);
  const handleReset = () => {
    setAppleGameResult([]);
    setAppleData([]);
    setApples([]);
  };

  useEffect(() => {
    handleReset();
  }, [reset]);

  const socket = useSocket();
  const subscribe = {
    type: "SubscribeBets",
    payload: [gamesList.find((item) => item.name === "Apples")?.id],
  };

  const [betData, setBetData] = useState({});

  const [firstBet, setFirstBet] = useState(true);

  // useEffect(
  //   () => alert(`keep:${keep}, firstBet: ${firstBet}`),
  //   [keep, firstBet]
  // );

  const [coninue, setContinue] = useState(0);
  useEffect(() => {
    if (firstBet) {
      setBetData({
        type: "MakeBet",
        game_id: gamesList.find((item) => item.name === "Apples")?.id,
        coin_id: isDrax ? 2 : 1,
        user_id: userInfo?.id || 0,
        data: '{"difficulty":1}',
        amount: `${cryptoValue || 0}`,
        stop_loss: Number(stopLoss) || 0,
        stop_win: Number(stopGain) || 0,
        num_games: betsAmount,
      });
      if (isPlaying) {
        setFirstBet(false);
        setKeep(true);
      }
    } else {
      if (keep) {
        setBetData({
          type: "ContinueGame",
          game_id: gamesList.find((item) => item.name === "Apples")?.id,
          coin_id: isDrax ? 2 : 1,
          user_id: userInfo?.id || 0,
          data: isCashout
            ? `{"cashout":${isCashout}}`
            : `{"tile":${apples[apples.length - 1]}, "cashout":${isCashout}}`,
        });
        setContinue((prev) => prev + 1);
      } else {
        setBetData({
          type: "MakeBet",
          game_id: gamesList.find((item) => item.name === "Apples")?.id,
          coin_id: isDrax ? 2 : 1,
          user_id: userInfo?.id || 0,
          data: '{"difficulty":1}',
          amount: `${cryptoValue || 0}`,
          stop_loss: Number(stopLoss) || 0,
          stop_win: Number(stopGain) || 0,
          num_games: betsAmount,

          // data: `{"num_mines":${pickedValue}, "cashout":${isCashout}, "tiles": [${pickedTiles}]}`,
        });
      }
    }
  }, [
    stopGain,
    stopLoss,
    cryptoValue,
    isDrax,
    betsAmount,
    isCashout,
    firstBet,
    keep,
    isPlaying,
    apples,
  ]);

  // useEffect(() => setFirstBet(true), []);

  const [subscribed, setCubscribed] = useState(false);
  useEffect(() => {
    // alert(isPlaying);
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(betData));
      // setIsPlaying(false);
    }
    if (
      socket &&
      access_token &&
      socket.readyState === WebSocket.OPEN &&
      !subscribed &&
      gamesList?.length > 0
    ) {
      socket.send(
        JSON.stringify({
          type: "SubscribeBets",
          payload: [gamesList.find((item) => item.name === "Apples")?.id],
        })
      );
      setCubscribed(true);
    }
  }, [socket, isPlaying, access_token, gamesList, subscribed, coninue]);

  useEffect(() => {
    if (
      access_token &&
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList?.length > 0 &&
      socketLogged
    ) {
      socket.send(
        JSON.stringify({
          type: "GetState",
          game_id: gamesList.find((item) => item.name === "Apples")?.id,
          coin_id: isDrax ? 2 : 1,
        })
      );
    }
  }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged]);

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: "UnsubscribeBets",
          payload: [gamesList.find((item) => item.name === "Apples")?.id],
        })
      );
    };
  }, []);

  return (
    <>
      <div className={s.apples_game_wrap}>
        <WagerLowerBtnsBlock game="apples" text={"apples"} />
        <div className={s.apples_table_background}>
          <img
            onLoad={() => setIsLoading(false)}
            src={applesBg.src}
            className={s.apples_table_background_img}
            alt="apples-static-bg"
          />
        </div>{" "}
        {isLoading && <Preload />}
        <div className={clsx(s.total_container)}>
          {" "}
          <span className={s.total_won}>{fullWon.toFixed(2)}</span>
          <span className={s.total_lost}>{fullLost.toFixed(2)}</span>
          <div>
            Total:{" "}
            <span
              className={clsx(
                totalValue > 0 && s.total_won,
                totalValue < 0 && s.total_lost
              )}
            >
              {Math.abs(totalValue).toFixed(2)}
            </span>
          </div>
        </div>
        <div className={clsx(s.balls_arr)}>
          {coefficientData.map((item, i) => (
            <div
              className={clsx(
                s.multiplier_value,
                item > 0 ? s.multiplier_positive : s.multiplier_negative
              )}
              key={i}
            >
              {item > 0 ? (
                <img alt="" src={appleCoefTrue.src} />
              ) : (
                <img alt="" src={appleCoefFalse.src} />
              )}
              <span>{(item / 100)?.toFixed(2)}x</span>
            </div>
          ))}
        </div>
        <div className={s.apples_table_block}>
          <div className={s.apples_table_wrap}>
            {gameStatus === GameModel.GameStatus.Won && (
              <ApplesWinBlock cf={100} profit={100} />
            )}
            <div className={s.apples_table}>
              {chunkedApplesArr &&
                chunkedApplesArr.map((item: any, ind: any) => {
                  const currentIndex = Math.abs(ind - 8);
                  return (
                    <div className={s.apples_row} key={ind}>
                      {ind === chunkedApplesArr.length - 1 && (
                        <>
                          <span
                            className={clsx(
                              s.apples_shadow,
                              s.apples_shadow_left
                            )}
                          ></span>
                          <span
                            className={clsx(
                              s.apples_shadow,
                              s.apples_shadow_right
                            )}
                          ></span>
                          <span
                            className={clsx(
                              s.apples_shadow,
                              s.apples_shadow_left
                            )}
                          ></span>
                          <span
                            className={clsx(
                              s.apples_shadow,
                              s.apples_shadow_right
                            )}
                          ></span>
                        </>
                      )}
                      {((inGame || appleGameResult?.length > 0
                        ? currentIndex === appleData.length - 1
                        : currentIndex === appleData.length) ||
                        (9 === appleData.length && ind === 0)) && (
                        <img
                          src={cfBgActive.src}
                          className={s.cf_bg_active}
                          alt="cf-static-bg"
                        />
                      )}

                      <div className={s.row_cf}>
                        {(currentIndex >= appleData.length ||
                          currentIndex === 8) && (
                          <span className={s.cf_title}>
                            {item.cf.toFixed(2)}
                          </span>
                        )}
                        {(inGame || appleGameResult?.length > 0
                          ? currentIndex > appleData.length - 1
                          : currentIndex > appleData.length) && (
                          <img
                            src={cfBg.src}
                            className={s.cf_bg}
                            alt="cf-static-bg"
                          />
                        )}
                      </div>
                      {item.apples.map((_: any, ind2: any) => {
                        const picked = appleData[currentIndex]?.value === ind2;
                        const resultExist =
                          mines &&
                          mines[currentIndex] &&
                          mines[currentIndex][ind2] === false;
                        const falseResult =
                          mines &&
                          mines[currentIndex] &&
                          mines[currentIndex][ind2];
                        // falseResult && alert(falseResult);
                        // appleGameResult[currentIndex] ===
                        // appleData[currentIndex]?.value;
                        return (
                          <div
                            onContextMenu={(e) => {
                              e.preventDefault();

                              if (e.button === 2) {
                                if (
                                  appleData.length !== 0 &&
                                  appleData[appleData.length - 1].number ===
                                    currentIndex
                                ) {
                                  const poppedArr = appleData.slice(
                                    0,
                                    currentIndex
                                  );
                                  setAppleData(poppedArr);
                                }
                              }
                            }}
                            onClick={(e) => {
                              if (isPlaying) {
                                currentIndex <= appleData.length &&
                                  playSounds !== "off" &&
                                  isPlaying &&
                                  appleGameResult?.length === 0 &&
                                  playApple();
                                const indexToUpdate = currentIndex;
                                if (
                                  currentIndex <= appleData.length &&
                                  appleGameResult?.length === 0 &&
                                  isPlaying
                                ) {
                                  if (appleData[indexToUpdate] !== undefined) {
                                    setAppleData((prev: IAppleData[]) => {
                                      const updatedArray = [...prev];
                                      updatedArray[indexToUpdate] = {
                                        number: indexToUpdate,
                                        value: ind2,
                                      };
                                      return updatedArray;
                                    });
                                  } else {
                                    setAppleData((prev: IAppleData[]) => [
                                      ...prev,
                                      { number: indexToUpdate, value: ind2 },
                                    ]);
                                  }
                                }
                              }
                            }}
                            className={clsx(
                              s.apples_row_item,
                              currentIndex <= appleData.length &&
                                appleGameResult?.length === 0 &&
                                isPlaying &&
                                s.clicked,
                              picked && s.apple_picked,
                              falseResult && s.apple_picked_false,
                              // picked &&
                              !falseResult &&
                                resultExist &&
                                s.apple_picked_true,
                              currentIndex === appleData.length &&
                                isPlaying &&
                                appleGameResult?.length === 0 &&
                                s.apple_pick
                            )}
                          >
                            {resultExist && picked ? (
                              falseResult ? (
                                <img
                                  src={appleBgFalse.src}
                                  className={s.apple_item_bg}
                                  alt="apple-static-bg"
                                />
                              ) : (
                                <img
                                  src={appleBgTrue.src}
                                  className={s.apple_item_bg}
                                  alt="apple-static-bg"
                                />
                              )
                            ) : (
                              <img
                                src={appleBg.src}
                                className={s.apple_item_bg}
                                alt="apple-static-bg"
                              />
                            )}
                            <div className={s.apples_row_item_body}>
                              <div
                                className={clsx(
                                  s.apple_ico_wrap,
                                  picked && s.apple_picked_svg,
                                  resultExist && picked && falseResult && s.red
                                )}
                              >
                                {resultExist && picked ? (
                                  falseResult ? (
                                    <AppleFalseIco />
                                  ) : (
                                    <AppleIco />
                                  )
                                ) : (
                                  <AppleIco />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
            <div className={s.game_info_wrap}>
              <div className={s.game_info_block}>
                <span className={s.multiplier_title}>
                  Current Multiplier:{" "}
                  {inGame || appleGameResult?.length > 0
                    ? chunkedApplesArr[
                        Math.abs(appleData.length - chunkedApplesArr?.length)
                      ]?.cf?.toFixed(2)
                    : appleData.length < 9
                    ? chunkedApplesArr[
                        Math.abs(
                          appleData.length -
                            chunkedApplesArr?.length +
                            1 +
                            (appleData.length === 9 ? 0 : 0)
                        )
                      ]?.cf?.toFixed(2)
                    : chunkedApplesArr[0]?.cf?.toFixed(2)}
                  x
                </span>
                <span className={s.multiplier_title}>
                  Max Payout:{" "}
                  {appleData.length !== 0
                    ? (
                        chunkedApplesArr[
                          Math.abs(
                            appleData.length -
                              chunkedApplesArr?.length +
                              (appleData.length === 9 ? 0 : 0)
                          )
                        ]?.cf?.toFixed(2) * cryptoValue
                      ).toFixed(3)
                    : 0}
                </span>
              </div>
              <div className={s.btns_block}>
                <button
                  onClick={() => {
                    if (!inGame) {
                      handleReset();
                    }
                  }}
                  className={clsx(
                    s.clear_btn,
                    appleGameResult?.length > 0 && s.clear_btn_active,
                    appleData?.length <= 0 && s.clear_btn_disactive,
                    inGame && s.clear_btn_disactive
                  )}
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    if (
                      appleData.length > 0 &&
                      appleGameResult?.length === 0 &&
                      !inGame
                    ) {
                      if (appleData?.length === 1) {
                        setAppleData([]);
                      } else {
                        setAppleData((prev: IAppleData[]) => {
                          const newData = prev.slice(0, -1);
                          return newData;
                        });
                      }
                    }
                  }}
                  className={clsx(
                    s.back_btn,
                    appleGameResult?.length > 0 && s.back_btn_disable,
                    appleData?.length <= 0 && s.back_btn_disactive,
                    inGame && s.back_btn_disactive
                  )}
                >
                  <BackIcon
                    className={clsx(
                      s.back_icon,
                      appleData?.length <= 0 && s.back_btn_disactive
                    )}
                  />
                  {/* <img src={backIco.src} alt="back-static-ico" /> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const BackIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 4.04102V6.5L0 3.24935L4 0V2.45768H9C12.7762 2.45768 16.7 4.64801 16.7 8.79102C16.7 12.934 12.7762 15.1243 9 15.1243H2V13.541H9C10.5913 13.541 12.1174 13.0406 13.2426 12.1498C14.3679 11.259 15 10.0508 15 8.79102C15 7.53124 14.3679 6.32306 13.2426 5.43226C12.1174 4.54146 10.5913 4.04102 9 4.04102H4Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};

// const { chain } = useNetwork();
// const { address, isConnected } = useAccount();
// const { data, isError } = useFeeData({ watch: true });

// const { data: GameState, refetch: fetchGameState } = useContractRead({
//   chainId: chain?.id,
//   address: "0xEb04f371301462F8A28faA772ac36783a75F2E82",
//   abi: IAppleAbi,
//   functionName: "Apples_GetState",
//   args: [address],
//   enabled: true,
//   //watch: isConnected && !inGame,
//   blockTag: "latest",
// });

// useEffect(() => {
//   if (GameState && !inGame) {
//     if (
//       (GameState as any).requestID != BigInt(0) &&
//       (GameState as any).blockNumber != BigInt(0)
//     ) {
//       setWaitingResponse(true);
//       setInGame(true);
//       setActivePicker(false);
//       pickSide((GameState as any).isHeads as number);
//     } else {
//       setInGame(false);
//     }
//   }
// }, [GameState]);

// useEffect(() => {
//   setIsPlaying(inGame);
// }, [inGame]);

// const { config: allowanceConfig } = usePrepareContractWrite({
//   chainId: chain?.id,
//   address: pickedToken?.contract_address as `0x${string}`,
//   abi: IERC20,
//   functionName: "approve",
//   enabled:
//     pickedToken?.contract_address !=
//     "0x0000000000000000000000000000000000000000",
//   args: [
//     gameAddress,
//     useDebounce(
//       currentBalance
//         ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
//         : 0
//     ),
//   ],
// });

// const { write: setAllowance, isSuccess: allowanceIsSet } =
//   useContractWrite(allowanceConfig);
// useEffect(() => alert(allowanceIsSet), [allowanceIsSet]);
// const [fees, setFees] = useState<bigint>(BigInt(0));
// const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

// useEffect(() => {
//   if (data && data.gasPrice) {
//     setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
//   }
// }, [data]);

// const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
//   chainId: chain?.id,
//   address: "0xEb04f371301462F8A28faA772ac36783a75F2E82",
//   abi: IAppleAbi,
//   functionName: "getVRFFee",
//   args: [0],
//   watch: isConnected && !inGame,
// });

// useEffect(() => {
//   if (VRFFees && data?.gasPrice) {
//     setFees(
//       BigInt(VRFFees ? (VRFFees as bigint) : 0) +
//         BigInt(1000000) * (data.gasPrice + data.gasPrice / BigInt(4))
//     );
//   }
// }, [VRFFees, data]);

// const [value, setValue] = useState<bigint>(BigInt(0));

// useEffect(() => {
//   const newValue =
//     fees +
//     (pickedToken &&
//     pickedToken?.contract_address ==
//       "0x0000000000000000000000000000000000000000"
//       ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
//         BigInt(100000000000)
//       : BigInt(0));
//   setValue(
//     fees +
//       (pickedToken &&
//       pickedToken?.contract_address ==
//         "0x0000000000000000000000000000000000000000"
//         ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
//           BigInt(100000000000)
//         : BigInt(0))
//   );

//   setBetValue(newValue + BigInt(400000) * prevGasPrice);
// }, [fees, pickedToken, cryptoValue, betsAmount, prevGasPrice]);

// const {
//   write: startPlaying,
//   isSuccess: startedPlaying,
//   error,
// } = useContractWrite({
//   chainId: chain?.id,
//   address: "0xEb04f371301462F8A28faA772ac36783a75F2E82",
//   abi: IAppleAbi,
//   functionName: "Apples_Play",
//   gasPrice: prevGasPrice,
//   gas: BigInt(400000),
//   args: [
//     useDebounce(
//       BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
//     ),
//     pickedToken?.contract_address,
//     apples,
//   ],
//   value: value,
// });

// useEffect(() => {
//   if (startedPlaying) {
//     setActivePicker(false);
//     setInGame(true);
//     setWaitingResponse(true);
//   }
// }, [startedPlaying]);

// const { config: refundConfig } = usePrepareContractWrite({
//   chainId: chain?.id,
//   address: "0xEb04f371301462F8A28faA772ac36783a75F2E82",
//   abi: IAppleAbi,
//   functionName: "Apples_Refund",
//   enabled: false,
//   args: [],
//   gas: BigInt(100000),
// });

// const { write: callRefund } = useContractWrite(refundConfig);

// useEffect(() => {
//   if (refund) {
//     callRefund?.();
//     setRefund(false);
//   }
// }, [refund]);

// useContractEvent({
//   address: "0xEb04f371301462F8A28faA772ac36783a75F2E82",
//   abi: IAppleAbi,
//   eventName: "Apples_Outcome_Event",
//   listener(log) {
//     if (
//       ((log[0] as any).args.playerAddress as string).toLowerCase() ==
//       address?.toLowerCase()
//     ) {
//       console.log("-------", (log[0] as any).args, "----");
//       const handlePayouts = async () => {
//         setCoefficientData((prev) => [
//           Number((log[0] as any)?.args?.payout) / Number(wagered),
//           ...prev,
//         ]);
//       };
//       handlePayouts();

//       const getResult = () => {
//         setAppleGameResult((log[0] as any).args.mines);
//       };
//       getResult();
//       setWaitingResponse(false);
//       const wagered = BigInt((log[0] as any).args.wager);

//       if ((log[0] as any).args.payout > wagered) {
//         const profit = (log[0] as any).args.payout;
//         const multiplier = Number(profit / wagered);
//         const wagered_token = (
//           (log[0] as any).args.tokenAddress as string
//         ).toLowerCase();
//         const token = TOKENS.find((tk) => tk.address == wagered_token)?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];

//         const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
//         setWonStatus({
//           profit: profitFloat,
//           multiplier,
//           token: token as string,
//         });
//         setGameStatus(GameModel.GameStatus.Won);
//       } else {
//         const wageredFloat =
//           Number(wagered / BigInt(10000000000000000)) / 100;

//         setLostStatus(wageredFloat);
//         setGameStatus(GameModel.GameStatus.Lost);
//       }
//     }
//   },
// });

// useEffect(() => {
//   if (wagered) {
//     if (inGame) {
//     } else {
//       const total_value = cryptoValue * betsAmount;
//       if (
//         cryptoValue != 0 &&
//         currentBalance &&
//         total_value <= currentBalance
//       ) {
//         if (
//           (!allowance || (allowance && allowance <= cryptoValue)) &&
//           pickedToken?.contract_address !=
//             "0x0000000000000000000000000000000000000000"
//         ) {
//           setAllowance?.();
//         } else {
//           startPlaying?.();
//         }
//       }
//     }
//     setWagered(false);
//   }
// }, [wagered]);
