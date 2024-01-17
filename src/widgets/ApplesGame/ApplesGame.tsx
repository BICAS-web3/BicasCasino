import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import applesBg from "@/public/media/apples/applesMainBg.png";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import appleBg from "@/public/media/apples/appleItemBg.svg";
import appleBgTrue from "@/public/media/apples/appleItemBgTrue.svg";
import appleBgFalse from "@/public/media/apples/appleItemBgFalse.svg";
import cfBg from "@/public/media/apples/cfBg.svg";
import { AppleIco } from "@/shared/SVGs/AppleIco";
import backIco from "@/public/media/apples/backIco.svg";
import clsx from "clsx";
//?------------
import Image from "next/image";

// import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import { SidePickerModel } from "../CoinFlipSidePicker";
import { useUnit } from "effector-react";
import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { sessionModel } from "@/entities/session";
import { ABI as IAppleAbi } from "@/shared/contracts/AppleABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { useDebounce } from "@/shared/tools";
import { WagerGainLossModel } from "../WagerGainLoss";
import { TOKENS } from "@/shared/tokens";
import { useFeeData } from "wagmi";
import * as CoinflipM from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import { AppleFalseIco } from "@/shared/SVGs/AppleFalse";

interface ApplesGameProps {}

export const ApplesGame: FC<ApplesGameProps> = () => {
  const [appleData, setAppleData] = useState<IAppleData[]>([]);
  const [resultApples, setResultApples] = useState<number[]>([]);

  const [apples, setApples] = useState<number[]>([]);

  useEffect(() => {
    const data = appleData.map((el) => el.value);
    setApples(data);
  }, [appleData]);
  const [applesArr, setApplesArr] = useState(Array(27).fill({}));
  const [chunkedApplesArr, setChunkedApplesArr] = useState<any>([]);

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
  const [isLoading, setIsLoading] = useState(true);
  const [
    lost,
    profit,
    playSounds,
    pickedSide,
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
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$playSounds,
    SidePickerModel.$pickedSide,
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
  ]);
  const [coefficientData, setCoefficientData] = useState<number[]>([]);

  useEffect(() => {
    setCoefficient(1.98);
  }, []);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data, isError } = useFeeData({ watch: true });

  const [inGame, setInGame] = useState<boolean>(false);

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: "0x7ad7948F38Ee1456587976FAebD5f94646c20072",
    abi: IAppleAbi,
    functionName: "Apples_GetState",
    args: [address],
    enabled: true,
    //watch: isConnected && !inGame,
    blockTag: "latest",
  });

  useEffect(() => {
    if (GameState && !inGame) {
      if (
        (GameState as any).requestID != BigInt(0) &&
        (GameState as any).blockNumber != BigInt(0)
      ) {
        setWaitingResponse(true);
        setInGame(true);
        setActivePicker(false);
        pickSide((GameState as any).isHeads as number);
      } else {
        setInGame(false);
      }
    }
  }, [GameState]);

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

  const { config: allowanceConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0x0000000000000000000000000000000000000000",
    abi: IERC20,
    functionName: "approve",
    enabled:
      pickedToken?.contract_address !=
      "0x0000000000000000000000000000000000000000",
    args: [
      gameAddress,
      useDebounce(
        currentBalance
          ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
          : 0
      ),
    ],
  });

  const { write: setAllowance, isSuccess: allowanceIsSet } =
    useContractWrite(allowanceConfig);

  const [fees, setFees] = useState<bigint>(BigInt(0));
  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (data && data.gasPrice) {
      setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
    }
  }, [data]);

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: "0x7ad7948F38Ee1456587976FAebD5f94646c20072",
    abi: IAppleAbi,
    functionName: "getVRFFee",
    args: [0],
    watch: isConnected && !inGame,
  });

  useEffect(() => {
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(1000000) * (data.gasPrice + data.gasPrice / BigInt(4))
      );
    }
  }, [VRFFees, data]);

  const [value, setValue] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const newValue =
      fees +
      (pickedToken &&
      "0x0000000000000000000000000000000000000000" ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
          BigInt(100000000000)
        : BigInt(0));
    setValue(
      fees +
        (pickedToken &&
        "0x0000000000000000000000000000000000000000" ==
          "0x0000000000000000000000000000000000000000"
          ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
            BigInt(100000000000)
          : BigInt(0))
    );

    setBetValue(newValue + BigInt(400000) * prevGasPrice);
  }, [fees, pickedToken, cryptoValue, betsAmount, prevGasPrice]);

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite({
    chainId: chain?.id,
    address: "0x7ad7948F38Ee1456587976FAebD5f94646c20072",
    abi: IAppleAbi,
    functionName: "Apples_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      "0x0000000000000000000000000000000000000000",
      apples,
    ],
    value: value,
  });

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
      setWaitingResponse(true);
    }
  }, [startedPlaying]);

  useContractEvent({
    address: "0x7ad7948F38Ee1456587976FAebD5f94646c20072",
    abi: IAppleAbi,
    eventName: "Apples_Outcome_Event",
    listener(log) {
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("-------", (log[0] as any).args, "----");
        setWaitingResponse(false);
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);
        const handlePayouts = () => {
          for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
            setTimeout(() => {
              const outCome =
                Number((log[0] as any)?.args?.payouts[i]) / Number(wagered);
              setCoefficientData((prev) => [outCome, ...prev]);
            }, 700 * (i + 1));
          }
        };
        handlePayouts();

        const getResult = () => {
          setResultApples((log[0] as any).args.mines);
        };
        if ((log[0] as any).args.payout > wagered) {
          const profit = (log[0] as any).args.payout;
          const multiplier = Number(profit / wagered);
          const wagered_token = (
            (log[0] as any).args.tokenAddress as string
          ).toLowerCase();
          const token = TOKENS.find((tk) => tk.address == wagered_token)?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];

          const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
          setWonStatus({
            profit: profitFloat,
            multiplier,
            token: token as string,
          });
          setGameStatus(GameModel.GameStatus.Won);
        } else {
          const wageredFloat =
            Number(wagered / BigInt(10000000000000000)) / 100;

          setLostStatus(wageredFloat);
          setGameStatus(GameModel.GameStatus.Lost);
        }
      }
    },
  });

  useEffect(() => {
    if (wagered) {
      if (inGame) {
      } else {
        const total_value = cryptoValue * betsAmount;
        if (
          cryptoValue != 0 &&
          currentBalance &&
          total_value <= currentBalance
        ) {
          startPlaying?.();
          // if (
          //   (!allowance || (allowance && allowance <= cryptoValue)) &&
          //   pickedToken?.contract_address !=
          //     "0x0000000000000000000000000000000000000000"
          // ) {
          //   alert(1);
          //   setAllowance?.();
          // } else {
          //   alert(2);
          //   startPlaying?.();
          // }
        }
      }
      setWagered(false);
    }
  }, [wagered]);
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
  //   setTimeout(() => setResultApples([0, 0, 1, 2]), 8000);
  // }, []);

  return (
    <>
      {" "}
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={s.apples_game_wrap}>
        <WagerLowerBtnsBlock game="apples" text={"apples"} />
        <div className={s.apples_table_background}>
          <img
            src={applesBg.src}
            className={s.apples_table_background}
            alt="apples-static-bg"
          />
        </div>{" "}
        <div className={clsx(s.total_container)}>
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
              {item?.toFixed(2)}x
            </div>
          ))}
        </div>
        <div className={s.apples_table_block}>
          <div className={s.apples_table_wrap}>
            <div className={s.apples_table}>
              {chunkedApplesArr &&
                chunkedApplesArr.map((item: any, ind: any) => {
                  const currentIndex = Math.abs(ind - 8);
                  return (
                    <div className={s.apples_row} key={ind}>
                      <div className={s.row_cf}>
                        <span className={s.cf_title}>{item.cf.toFixed(2)}</span>
                        <img
                          src={cfBg.src}
                          className={s.cf_bg}
                          alt="cf-static-bg"
                        />
                      </div>
                      {item.apples.map((_: any, ind2: any) => {
                        const picked = appleData[currentIndex]?.value === ind2;
                        const resultExist = resultApples?.length > 0;
                        const falseResult =
                          resultApples[currentIndex] ===
                          appleData[currentIndex]?.value;
                        return (
                          <div
                            onClick={() => {
                              const indexToUpdate = currentIndex;
                              if (
                                currentIndex <= appleData.length &&
                                resultApples?.length === 0
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
                            }}
                            className={clsx(
                              s.apples_row_item,
                              currentIndex <= appleData.length &&
                                resultApples?.length === 0 &&
                                s.clicked,
                              picked && s.apple_picked,
                              picked && falseResult && s.apple_picked_false,
                              picked &&
                                !falseResult &&
                                resultExist &&
                                s.apple_picked_true
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

                            {/* <img
                              src={appleBg.src}
                              className={clsx(
                                resultExist && picked
                                  ? falseResult
                                    ? s.apple_item_bg_false
                                    : s.apple_item_bg_true
                                  : s.apple_item_bg,
                                s.apple_item_bg
                              )}
                              alt="apple-static-bg"
                            /> */}
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
                  Current Multiplier: 1.30x
                </span>
                <span className={s.multiplier_title}>Max Payout: 136.483</span>
              </div>
              <div className={s.btns_block}>
                <button
                  onClick={() => {
                    setResultApples([]);
                    setAppleData([]);
                    setApples([]);
                  }}
                  className={clsx(
                    s.clear_btn,
                    resultApples?.length > 0 && s.clear_btn_active
                  )}
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    if (appleData.length > 0 && resultApples?.length === 0) {
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
                    resultApples?.length > 0 && s.back_btn_disable
                  )}
                >
                  <img src={backIco.src} alt="back-static-ico" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};