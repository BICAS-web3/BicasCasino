import { FC, useEffect, useState, useRef, ChangeEvent } from "react";

// import {
//   useAccount,
//   useContractEvent,
//   useContractRead,
//   useContractWrite,
//   useFeeData,
//   useNetwork,
//   usePrepareContractWrite,
//   useWaitForTransaction,
// } from "wagmi";

import { useUnit } from "effector-react";
import dice_precentage from "@/public/media/dice_icons/dice_precentage.svg";
import dice_close from "@/public/media/dice_icons/dice_close.svg";
import dice_swap from "@/public/media/dice_icons/dice_swap.svg";
import rocketGif from "@/public/media/rocket/rocket.gif";

import Image from "next/image";

import { Model as RollSettingModel } from "@/widgets/RollSetting";
import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";

import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as RocketABI } from "@/shared/contracts/RocketABI";
import { useDebounce } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";

import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { WagerGainLossModel } from "../WagerGainLoss";
import { SidePickerModel } from "../CoinFlipSidePicker";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";

import s from "./styles.module.scss";
import clsx from "clsx";

import * as DiceM from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import rocket from "@/public/media/rocket/rocket.png";
import { ProfitLine } from "../ProfitLine";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { Preload } from "@/shared/ui/Preload";
import ReactHowler from "react-howler";
import useSound from "use-sound";

interface IRocket {
  gameText: string;
}

export const Rocket: FC<IRocket> = ({ gameText }) => {
  // const { isConnected, address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [
    lost,
    profit,
    setPlayingStatus,
    wagered,
    playSounds,
    switchSounds,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    gameAddress,
    gameStatus,
    betsAmount,
    rollOver,
    flipRollOver,
    RollValue,
    setRollValue,
    currentNetwork,
    pickedToken,
    cryptoValue,
    stopLoss,
    stopGain,
    pickedSide,
    setActivePicker,
    pickSide,
    currentBalance,
    setWagered,
    allowance,
    setCoefficient,
    setIsPlaying,
    waitingResponse,
    setWaitingResponse,
    refund,
    setRefund,
    isPlaying,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    DiceM.setPlayingStatus,
    WagerButtonModel.$Wagered,
    GameModel.$playSounds,
    GameModel.switchSounds,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    sessionModel.$gameAddress,
    GameModel.$gameStatus,
    CustomWagerRangeInputModel.$pickedValue,
    RollSettingModel.$RollOver,
    RollSettingModel.flipRollOver,
    RollSettingModel.$RollValue,
    RollSettingModel.setRollValue,
    sessionModel.$currentNetwork,
    WagerModel.$pickedToken,
    WagerModel.$cryptoValue,
    WagerGainLossModel.$stopLoss,
    WagerGainLossModel.$stopGain,
    SidePickerModel.$pickedSide,
    SidePickerModel.setActive,
    SidePickerModel.pickSide,
    sessionModel.$currentBalance,
    WagerButtonModel.setWagered,
    sessionModel.$currentAllowance,
    ProfitModel.setCoefficient,
    GameModel.setIsPlaying,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.$refund,
    GameModel.setRefund,
    GameModel.$isPlaying,
  ]);

  // const { data } = useFeeData({
  //   watch: isConnected,
  //   cacheTime: 5000,
  // });
  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  // useEffect(() => {
  //   if (data && data.gasPrice) {
  //     setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
  //   }
  // }, [data]);

  const win_chance = rollOver ? 100 - RollValue : RollValue;
  const multiplier =
    (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100));
  const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
  const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;
  useEffect(() => {
    setCoefficient(Number(multiplier) / 10000);
  }, [multiplier]);

  // const { chain } = useNetwork();

  const [inGame, setInGame] = useState<boolean>(false);
  const [fees, setFees] = useState<bigint>(BigInt(0));
  const bigNum = 100000000000;
  // const {
  //   write: startPlaying,
  //   isSuccess: startedPlaying,
  //   error,
  // } = useContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: RocketABI,
  //   functionName: "Rocket_Play",
  //   gasPrice: prevGasPrice,
  //   gas: BigInt(400000),
  //   args: [
  //     useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
  //     multiplier,
  //     pickedToken?.contract_address,
  //     betsAmount,
  //     useDebounce(stopGain)
  //       ? BigInt(Math.floor((stopGain as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //         BigInt(bigNum) *
  //         BigInt(200),
  //     useDebounce(stopLoss)
  //       ? BigInt(Math.floor((stopLoss as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //         BigInt(bigNum) *
  //         BigInt(200),
  //   ],
  //   value:
  //     fees +
  //     (pickedToken &&
  //     pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
  //         BigInt(100000000000)
  //       : BigInt(0)),
  // });

  // const { data: GameState } = useContractRead({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: RocketABI,
  //   functionName: "Rocket_GetState",
  //   args: [address],
  //   enabled: true,
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

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

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
  //   gasPrice: data?.gasPrice as any,
  //   gas: BigInt(50000),
  // });

  // const {
  //   write: setAllowance,
  //   error: allowanceError,
  //   status: allowanceStatus,
  //   data: allowanceData,
  // } = useContractWrite(allowanceConfig);

  // const { config: refundConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: RocketABI,
  //   functionName: "Rocket_Refund",
  //   enabled: isPlaying,
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

  const [watchAllowance, setWatchAllowance] = useState<boolean>(false);

  // useEffect(() => {
  //   if (allowanceData) {
  //     setWatchAllowance(true);
  //   }
  // }, [allowanceData]);

  // const { isSuccess: allowanceIsSet } = useWaitForTransaction({
  //   hash: allowanceData?.hash,
  //   staleTime: Infinity,
  //   enabled: watchAllowance,
  // });

  // useEffect(() => {
  //   if (inGame && allowanceIsSet && watchAllowance) {
  //     setWatchAllowance(false);
  //     startPlaying();
  //   } else if (allowanceError) {
  //     setWatchAllowance(false);
  //     setActivePicker(true);
  //     setInGame(false);
  //     setWaitingResponse(false);
  //   }
  // }, [inGame, allowanceIsSet, allowanceError]);

  // const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: RocketABI,
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

  // useEffect(() => {
  //   if (startedPlaying) {
  //     setActivePicker(false);
  //     setInGame(true);
  //     setWaitingResponse(true);
  //   }
  // }, [startedPlaying]);

  const [localNumber, setLocalNumber] = useState<number | null>(null);
  const [coefficientData, setCoefficientData] = useState<number[]>([]);
  // useContractEvent({
  //   address: gameAddress as `0x${string}`,
  //   abi: RocketABI,
  //   eventName: "Rocket_Outcome_Event",
  //   listener(log) {
  //     if (
  //       ((log[0] as any).args.playerAddress as string).toLowerCase() ==
  //       address?.toLowerCase()
  //     ) {
  //       console.log("------", (log[0] as any).args, "-------");

  //       setWaitingResponse(false);
  //       const wagered =
  //         BigInt((log[0] as any).args.wager) *
  //         BigInt((log[0] as any).args.numGames);

  //       const handleCall = () => {
  //         for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
  //           setTimeout(() => {
  //             const outCome =
  //               Number((log[0] as any)?.args?.payouts[i]) /
  //               Number(BigInt((log[0] as any).args.wager));
  //             setCoefficientData((prev) => [outCome, ...prev]);
  //             setLocalNumber(outCome);
  //           }, 700 * (i + 1));
  //         }
  //       };
  //       handleCall();
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
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              "0x0000000000000000000000000000000000000000"
          ) {
            // if (setAllowance) {
            //   setAllowance();
            //   setActivePicker(false);
            //   setInGame(true);
            //   setWaitingResponse(true);
            // }
          } else {
            // startPlaying?.();
          }
        }
      }
      setWagered(false);
    }
  }, [wagered]);

  useEffect(() => {
    setActivePicker(true);
    setInGame(false);
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide);
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1);
    }
  }, [gameStatus]);

  const rocketRef = useRef<HTMLVideoElement | null>(null);
  const bgRef = useRef<HTMLVideoElement | null>(null);
  // const fairRef = useRef<HTMLVideoElement | null>(null);
  // const fairStartRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = rocketRef.current;

    const handleTimeUpdate = () => {
      const duration = video?.duration || 0;
      const currentTime = video?.currentTime || 0;

      if (currentTime + 0.1 >= duration - 1) {
        video!.currentTime = 4;
      }
    };

    video?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const [bgImage, setBgImage] = useState(true);

  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon((prev) => prev + profit);
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost((prev) => prev + lost);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);

  const rangeRef = useRef<HTMLInputElement>(null);
  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString());

    setRollValue(number_value);
  };
  useEffect(() => {
    let num = rollOver ? 102 : 95;
    const rangeElement = rangeRef.current;
    const rangeWidth = (RollValue / num) * rangeElement!.offsetWidth;

    rangeElement?.style.setProperty(
      "--range-width",
      `${
        rollOver ? (RollValue < 50 ? rangeWidth - 7 : rangeWidth) : rangeWidth
      }px`
    );
  }, [RollValue, rollOver]);
  const diceValue = [
    {
      id: 1,
      title: "Multiplier",
      value: (Number(multiplier) / 10000).toFixed(4),
      img_src: dice_close,
      img_alt: "close",
    },
    {
      id: 2,
      title: "Roll",
      value: rollOver ? rollOverNumber.toFixed(2) : rollUnderNumber.toFixed(2),
      img_src: dice_swap,
      img_alt: "swap",
    },
    {
      id: 3,
      title: "Win Chance",
      value: win_chance.toFixed(2),
      img_src: dice_precentage,
      img_alt: "%",
    },
  ];
  const changeBetween = () => {
    flipRollOver(RollValue);
  };

  useEffect(() => {
    // const fair = fairRef.current;
    // const fair_1 = fairStartRef.current;
    const bg = bgRef.current;
    const bg_2 = rocketRef.current;
    // fair!.currentTime = 0;
    // fair_1!.currentTime = 0;
    bg!.currentTime = 0;
    bg_2!.currentTime = 0;
  }, [inGame]);

  const [flyStar, setFlyStar] = useState(false);
  const [rocketStar, setRocketStar] = useState(false);
  const [restartGif, setRestartGif] = useState(0);

  useEffect(() => {
    console.log("----------", coefficientData.length);
    if (coefficientData.length > 0) {
      setRestartGif(restartGif + 1);
      setRocketStar(true);
      setFlyStar(true);
      setTimeout(() => {
        setRocketStar(false);
        setFlyStar(false);
      }, 650);
    }
  }, [coefficientData?.length]);

  const [imageLoading_1, setImageLoading_1] = useState(true);
  const [imageLoading_2, setImageLoading_2] = useState(true);

  useEffect(() => {
    if (!imageLoading_1 && !imageLoading_2) {
      setIsLoading(imageLoading_1);
    }
  }, [imageLoading_1, imageLoading_2]);
  const [rocketCrash] = useSound("/music/rocket_crush.mp3", { volume: 1 });
  const [rocketWin] = useSound("/music/rocket_win.mp3", { volume: 1 });
  // const [rocketFly] = useSound("/music/rocket_fly_2.mp3", { volume: 1 });
  const [rocketStart] = useSound("/music/rocket_fly_start.mp3", { volume: 1 });

  useEffect(() => {
    if (rocketStar && localNumber !== null && localNumber <= 0) {
      rocketCrash();
    }
    if (rocketStar && localNumber !== null && localNumber > 0) {
      rocketWin();
    }
  }, [rocketStar, localNumber !== null, localNumber]);

  const [bgPlay, setBgPlay] = useState(false);
  useEffect(() => {
    if (inGame) {
      Promise.all([
        new Promise((resolve) =>
          setTimeout(() => resolve(rocketStart()), 1500)
        ),
        new Promise((resolve) =>
          setTimeout(() => resolve(setBgPlay(true)), 2000)
        ),
      ]);
    } else {
      setBgPlay(false);
    }
  }, [inGame]);

  return (
    <>
      {/* {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )} */}
      <ReactHowler
        src={"/music/rocket_fly_2.mp3"}
        playing={bgPlay && playSounds !== "off"}
        loop
        volume={2}
      />
      <section className={s.rocket_table_wrap}>
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock
          className={s.dice_btns}
          game="dice"
          text={gameText}
        />
        <div className={s.rocket_table_wrap_under}>
          {" "}
          <div className={s.total_container}>
            <span className={s.total_won}>{fullWon.toFixed(2)}</span>
            <span className={s.total_lost}>{fullLost.toFixed(2)}</span>
            <div>
              Total:&nbsp;
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
          {/* <div className={clsx(rocketStar && s.bomb)}></div> */}
          {rocketStar && localNumber !== null && localNumber <= 0 && (
            <>
              <img
                className={clsx(s.bomb)}
                src={`/rocket/bomb_2.gif?${restartGif}`}
                alt="wewsfdesd"
                width={200}
                height={200}
              />
            </>
          )}
          {localNumber !== null && (
            <div
              className={clsx(
                s.multiplier_value,
                s.bomb_2,
                localNumber > 0 ? s.coef_win : s.coef_lost
                // coefficientData[coefficientData.length - 1] >= 1 && s.coef_win,
                // coefficientData[coefficientData.length - 1] < 1 && s.coef_lost
              )}
            >
              {localNumber?.toFixed(2)}x
            </div>
          )}
          <div className={s.balls_arr}>
            {coefficientData
              // .sort((a, b) => b - a)
              .map((item, i) => (
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
          <video
            onPlay={() => {
              setImageLoading_1(false);
            }}
            onError={() => {
              setImageLoading_1(false);
            }}
            ref={rocketRef}
            className={clsx(s.background_video, !inGame && s.fair_hide)}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={"/rocket/bg.mp4"} type="video/mp4" />
          </video>
          <video
            onError={() => {
              setImageLoading_1(false);
            }}
            onPlay={() => {
              setImageLoading_1(false);
            }}
            ref={bgRef}
            className={clsx(s.background_video, inGame && s.fair_hide)}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={"/rocket/bg_1.mp4"} type="video/mp4" />
          </video>
          <div
            onClick={() => {
              setRestartGif((prev) => prev + 1);
              // setLocalC((prev) => [...prev, 1]);
            }}
            className={clsx(s.rocket_box, rocketStar && s.rocket_box_animation)}
          >
            <Image
              onLoad={() => setImageLoading_2(false)}
              className={clsx(s.rocket, inGame && s.rocket_animation)}
              src={rocket}
              alt="rocket"
            />{" "}
            <div
              className={clsx(s.rocket_fire, inGame && s.rocket_fire_2)}
            ></div>
          </div>
          <div className={s.range_wrapper}>
            <div className={s.range_container}>
              <span className={s.roll_range_value}>{RollValue}</span>
              <span className={s.roll_range_min}>{rollOver ? 5 : 0.1}</span>
              <div className={s.custom_range_input_body}></div>
              <input
                className={clsx(
                  s.dice_range,
                  rollOver ? s.dice_over : s.dice_under
                )}
                type="range"
                min={rollOver ? 5 : 0.1}
                max={rollOver ? 99.9 : 95}
                value={RollValue}
                onChange={onChange}
                ref={rangeRef}
                step={0.1}
              />
              <span className={s.roll_range_max}>{rollOver ? 99.9 : 95}</span>
            </div>
          </div>
        </div>
        <div className={s.dice_value_container}>
          {diceValue.map((dice) => (
            <div key={dice.id} className={s.dice_under_conteiner}>
              <h3 className={s.dice_under_title}>
                {dice.title === "Roll" ? "Height" : dice.title}
                {/* {dice.title === "Roll" ? rollOver ? "Over" : "Under" : <></>} */}
              </h3>
              <div className={clsx(s.dice_under_data)}>
                <span className={s.dice_under_value}>{dice.value}</span>
                <div className={clsx(s.dice_under_img)}>
                  {dice.title !== "Roll" && (
                    <Image
                      onClick={() => {
                        dice.title === "Roll" && changeBetween();
                      }}
                      src={dice.img_src}
                      alt={dice.img_src}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>{" "}
    </>
  );
};
{
  /* <video
            ref={fairRef}
            className={clsx(s.fair, !inGame && s.fair_hide)}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/rocket/fair.mp4" type="video/mp4" />
          </video>
          <video
            ref={fairStartRef}
            className={clsx(s.fair_2, !inGame && s.fair_hide)}
            autoPlay
            loop
            muted
            playsInline
          > */
}
{
  /* <source src="/rocket/fair_slow.mp4" type="video/mp4" />
          </video> */
} // useEffect(() => {
//   const video = fairRef.current;

//   const handleTimeUpdate = () => {
//     const duration = video?.duration || 0;
//     const currentTime = video?.currentTime || 0;
//     if (currentTime >= duration - 0.3) {
//       video!.currentTime = 4.85;
//     }
//   };

//   video?.addEventListener("timeupdate", handleTimeUpdate);
//   return () => {
//     video?.removeEventListener("timeupdate", handleTimeUpdate);
//   };
// }, [inGame]);

// useEffect(() => {
//   const video = rocketRef.current;
//   const handleTimeUpdate = () => {
//     if (inGame) {
//       video!.playbackRate = 2;
//     } else {
//       video!.playbackRate = 1;
//     }
//   };

//   video?.addEventListener("timeupdate", handleTimeUpdate);
//   return () => {
//     video?.removeEventListener("timeupdate", handleTimeUpdate);
//   };
// }, [inGame]); // bgImage
