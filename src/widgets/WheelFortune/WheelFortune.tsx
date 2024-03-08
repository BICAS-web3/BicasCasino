import { FC, use, useEffect, useState } from "react";

// import {
//   useAccount,
//   useContractEvent,
//   useContractRead,
//   useContractWrite,
//   useFeeData,
//   useNetwork,
//   usePrepareContractWrite,
// } from "wagmi";

import * as LevelModel from "@/widgets/WheelFortuneLevelsBlock/model";
import * as BalanceModel from "@/widgets/BalanceSwitcher/model";
import * as LayoutModel from "@/widgets/Layout/model";

import { useUnit } from "effector-react";

import Image from "next/image";

import bg from "@/public/media/wheel_images/bg.png";

import { Model as RollSettingModel } from "@/widgets/RollSetting";
import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";

import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as FortuneWheelABI } from "@/shared/contracts/FortuneWheelABI";
import { useDebounce, useMediaQuery } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";

import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { WagerGainLossModel } from "../WagerGainLoss";
import { SidePickerModel } from "../CoinFlipSidePicker";

import * as RegistrM from "@/widgets/Registration/model";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";

import s from "./styles.module.scss";
import clsx from "clsx";

import * as DiceM from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { Preload } from "@/shared/ui/Preload";
import * as BetsModel from "@/widgets/LiveBets/model";
interface IWheelFortune {
  gameText: string;
}
import * as CustomInputWagerModel from "@/widgets/CustomWagerRangeInput/model";
import { BallIcon, WheelPick, WheelShowIcon } from "@/shared/SVGs";
import useSound from "use-sound";
import ReactHowler from "react-howler";
import { useSocket } from "@/shared/context";

interface IWheelColors {
  segment: "#100C1E" | "#1F1435";
  border: string;
}

interface IWheelCoef {
  color: string;
  value: number;
}

export const WheelFortune: FC<IWheelFortune> = ({ gameText }) => {
  const isDesktop = useMediaQuery("(max-width: 1280px)");
  const isMobile = useMediaQuery("(max-width: 650px)");
  const WHITE_COLOR = "#D7E8F1";
  const GREEN_COLOR = "#3ECF55";
  const BLUE_COLOR = "#2C589B";
  const PURPLE_COLOR = "#FB2E90";
  const YELLOW_COLOR = "#FBC02E";
  const [level, setLevel] = useUnit([LevelModel.$level, LevelModel.setLevel]);
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
    pickedValue,
    setPickedValue,
    result,
    setResult,
    isPlaying,
    isDrax,
    userInfo,
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
    CustomInputWagerModel.$pickedRows,
    CustomInputWagerModel.pickRows,
    BetsModel.$result,
    BetsModel.setResult,
    GameModel.$isPlaying,
    BalanceModel.$isDrax,
    LayoutModel.$userInfo,
  ]);

  const [playWheel] = useSound("/music/wheel.mp3", { volume: 1 });

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

  useEffect(() => {
    if (
      (result !== null && result?.type === "Bet") ||
      result?.type === "MakeBet"
    ) {
      const outcomesArray = JSON.parse((result as any).outcomes);
      setOutcomes(outcomesArray);
      // alert(outcomesArray[0]);
      if (
        Number(result.profit) > Number(result.amount) ||
        Number(result.profit) === Number(result.amount)
      ) {
        setTimeout(() => {
          setGameStatus(GameModel.GameStatus.Won);

          const multiplier = Number(
            Number(result.profit) / Number(result.amount)
          );
          pickSide(pickedSide);
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: "DRAX",
          });
          setIsPlaying(false);
          setInGame(false);
        }, 2000);
        // alert("win");
      } else if (Number(result.profit) < Number(result.amount)) {
        setTimeout(() => {
          setGameStatus(GameModel.GameStatus.Lost);
          pickSide(pickedSide ^ 1);
          setIsPlaying(false);
          setInGame(false);
          setLostStatus(Number(result.profit) - Number(result.amount));
        }, 2000);
        // alert("lost");
      } else {
        setGameStatus(GameModel.GameStatus.Draw);
        setIsPlaying(false);
        setInGame(false);
        // alert("draw");
      }
      setResult(null);
    }
  }, [result?.timestamp, result, gameStatus]);

  useEffect(() => {
    if (isPlaying) {
      setInGame(true);
    }
  }, [isPlaying]);

  const win_chance = rollOver ? 100 - RollValue : RollValue;
  const multiplier =
    (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100));
  useEffect(() => {
    setCoefficient(Number(multiplier) / 10000);
  }, [multiplier]);

  // const { chain } = useNetwork();

  const [inGame, setInGame] = useState<boolean>(false);
  const [fees, setFees] = useState<bigint>(BigInt(0));
  const bigNum = 100000000000;

  const [numSectors, setNumSectors] = useState(0);
  const [value, setValue] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const newValue =
      fees +
      (pickedToken &&
      pickedToken?.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
          BigInt(100000000000)
        : BigInt(0));
    setValue(
      fees +
        (pickedToken?.contract_address ==
        "0x0000000000000000000000000000000000000000"
          ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
            BigInt(100000000000)
          : BigInt(0))
    );

    // setBetValue(newValue + BigInt(400000) * prevGasPrice);
  }, [fees, pickedToken, cryptoValue, betsAmount, prevGasPrice]);

  useEffect(() => {
    setNumSectors(pickedValue / 10);
  }, [pickedValue]);

  // const {
  //   write: startPlaying,
  //   isSuccess: startedPlaying,
  //   error,
  // } = useContractWrite({
  //   chainId: chain?.id,
  //   address: "0x5EC013956a7E51153d6DC2ebCe99a73Ad48949D0",
  //   abi: FortuneWheelABI,
  //   functionName: "Wheel_Play",
  //   gasPrice: prevGasPrice,
  //   gas: BigInt(400000),
  //   args: [
  //     useDebounce(
  //       BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
  //     ),
  //     // multiplier,
  //     pickedToken?.contract_address,
  //     betsAmount,
  //     level === "Easy" ? 0 : level === "Medium" ? 1 : 2,
  //     numSectors - 1,
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
  //   value: value,
  // });

  // useEffect(() => console.log(error), [error]);

  // const { data: GameState } = useContractRead({
  //   chainId: chain?.id,
  //   address: "0x5EC013956a7E51153d6DC2ebCe99a73Ad48949D0",
  //   abi: FortuneWheelABI,
  //   functionName: "Wheel_GetState",
  //   args: [address],
  //   enabled: true,
  //   blockTag: "latest",
  //   watch: isConnected as any,
  // });

  // useEffect(() => {
  //   console.log(111, (GameState as any)?.wager);
  //   const wager = Number((GameState as any)?.wager);
  //   if (wager > 0) {
  //     setInGame(true);
  //     const locaLevel = (GameState as any)?.risk;
  //     const locaSegments = (GameState as any)?.numSectors + 1;
  //     if (locaLevel === 0) {
  //       setLevel("Easy");
  //     } else if (locaLevel === 1) {
  //       setLevel("Medium");
  //     } else if (locaLevel === 2) {
  //       setLevel("Hard");
  //     }
  //     const segments = locaSegments * 10;
  //     setTimeout(() => {
  //       setPickedValue(segments);
  //     }, 0);
  //   }
  // }, [(GameState as any)?.wager]);

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
  // });

  // const { write: setAllowance } = useContractWrite(allowanceConfig);

  // const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
  //   chainId: chain?.id,
  //   address: "0x5EC013956a7E51153d6DC2ebCe99a73Ad48949D0",
  //   abi: FortuneWheelABI,
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

  const [outcomes, setOutcomes] = useState<number[]>([]);

  // useContractEvent({
  //   address: "0x5EC013956a7E51153d6DC2ebCe99a73Ad48949D0",
  //   abi: FortuneWheelABI,
  //   eventName: "Wheel_Outcome_Event",
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
  //           }, 1500 * (i + 1));
  //         }
  //       };
  //       handleCall();

  //       const handleOutcome = () => {
  //         setOutcomes((log[0] as any)?.args?.outcomes);
  //       };
  //       handleOutcome();

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
            // setAllowance?.();
          } else {
            setOutcomes([]);
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

  const [imageLoading_1, setImageLoading_1] = useState(true);

  useEffect(() => {
    if (!imageLoading_1) {
      setIsLoading(imageLoading_1);
    }
  }, [imageLoading_1]);
  const [count, setCount] = useState(10);
  const [levelCoef, setLevelCoef] = useState<IWheelCoef[]>([
    { value: 0.0, color: WHITE_COLOR },
    { value: 1.2, color: BLUE_COLOR },
    { value: 1.5, color: GREEN_COLOR },
  ]);

  useEffect(() => {
    if (level === "Easy") {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 1.2, color: BLUE_COLOR },
        { value: 1.5, color: GREEN_COLOR },
      ]);
    } else if (level === "Medium") {
      if (pickedValue === 10) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.9, color: PURPLE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: GREEN_COLOR },
        ]);
      } else if (pickedValue === 20) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.8, color: PURPLE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: GREEN_COLOR },
        ]);
      } else if (pickedValue === 30) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.7, color: PURPLE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: GREEN_COLOR },
          { value: 4.0, color: "#FF0000" },
        ]);
      } else if (pickedValue === 40) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 1.6, color: GREEN_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: PURPLE_COLOR },
        ]);
      } else if (pickedValue === 50) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 1.5, color: BLUE_COLOR },
          { value: 2.0, color: YELLOW_COLOR },
          { value: 3.0, color: PURPLE_COLOR },
          { value: 5.0, color: GREEN_COLOR },
        ]);
      }
    } else {
      if (pickedValue === 10) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 9.9, color: BLUE_COLOR },
        ]);
      } else if (pickedValue === 20) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 19.8, color: PURPLE_COLOR },
        ]);
      } else if (pickedValue === 30) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 29.7, color: PURPLE_COLOR },
        ]);
      } else if (pickedValue === 40) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 39.6, color: PURPLE_COLOR },
        ]);
      } else if (pickedValue === 50) {
        setLevelCoef([
          { value: 0.0, color: WHITE_COLOR },
          { value: 49.5, color: PURPLE_COLOR },
        ]);
      }
    }
  }, [level, pickedValue]);
  const [segColors, setSegColors] = useState<IWheelColors[]>([]);
  const [easy10SegColors, setEasy10SegColors] = useState<IWheelColors[]>([]);
  const [easy20SegColors, setEasy20SegColors] = useState<IWheelColors[]>([]);
  const [easy30SegColors, setEasy30SegColors] = useState<IWheelColors[]>([]);
  const [easy40SegColors, setEasy40SegColors] = useState<IWheelColors[]>([]);
  const [easy50SegColors, setEasy50SegColors] = useState<IWheelColors[]>([]);

  const [medium10SegColors, setMedium10SegColors] = useState<IWheelColors[]>(
    []
  );
  const [medium20SegColors, setMedium20SegColors] = useState<IWheelColors[]>(
    []
  );
  const [medium30SegColors, setMedium30SegColors] = useState<IWheelColors[]>(
    []
  );
  const [medium40SegColors, setMedium40SegColors] = useState<IWheelColors[]>(
    []
  );
  const [medium50SegColors, setMedium50SegColors] = useState<IWheelColors[]>(
    []
  );

  const [hard10SegColors, setHard10SegColors] = useState<IWheelColors[]>([]);
  const [hard20SegColors, setHard20SegColors] = useState<IWheelColors[]>([]);
  const [hard30SegColors, setHard30SegColors] = useState<IWheelColors[]>([]);
  const [hard40SegColors, setHard40SegColors] = useState<IWheelColors[]>([]);
  const [hard50SegColors, setHard50SegColors] = useState<IWheelColors[]>([]);

  // Easy level
  const generateSegmentColors_easy = (
    count: number,
    greenIndex: number
  ): IWheelColors[] => {
    return Array.from({ length: count }).map((_, el: number) => {
      if ([1, 11, 21, 31, 41].includes(el)) {
        return {
          segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
          border: GREEN_COLOR,
        };
      } else if ([0, 5, 10, 15, 20, 25, 30, 35, 40, 45].includes(el)) {
        return {
          segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
          border: WHITE_COLOR,
        };
      } else {
        return {
          segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
          border: BLUE_COLOR,
        };
      }
    });
  };

  useEffect(() => {
    console.log(1);
    if (easy10SegColors?.length < 11) {
      setEasy10SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(10, 1),
      ]);
    }
    if (easy20SegColors?.length < 21) {
      setEasy20SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(20, 1),
      ]);
    }
    if (easy30SegColors?.length < 31) {
      setEasy30SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(30, 1),
      ]);
    }
    if (easy40SegColors?.length < 41) {
      setEasy40SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(40, 1),
      ]);
    }
    if (easy50SegColors?.length < 51) {
      setEasy50SegColors((prev: IWheelColors[]) => [
        ...prev,
        ...generateSegmentColors_easy(50, 1),
      ]);
    }
  }, [easy10SegColors?.length]);

  // Medium level

  useEffect(() => {
    if (medium10SegColors?.length < 11) {
      Array.from({ length: 10 }).map((_, el: number) => {
        if (el === 2) {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 0) {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (el === 6) {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: YELLOW_COLOR,
              },
            ];
          });
        } else if (el === 4 || el === 8) {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        } else {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (medium20SegColors?.length < 21) {
      Array.from({ length: 20 }).map((_, el: number) => {
        if (el === 1 || el === 9) {
          setMedium20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        } else if (el === 13) {
          setMedium20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 11) {
          setMedium20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (
          el === 3 ||
          el === 5 ||
          el === 7 ||
          el === 15 ||
          el === 17 ||
          el === 19
        ) {
          setMedium20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: YELLOW_COLOR,
              },
            ];
          });
        } else {
          setMedium20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (medium30SegColors?.length < 31) {
      Array.from({ length: 30 }).map((_, el: number) => {
        if (el === 23) {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 15) {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (el === 25) {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: "red",
              },
            ];
          });
        } else if (
          el === 5 ||
          el === 9 ||
          el === 11 ||
          el === 19 ||
          el === 21 ||
          el === 29
        ) {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: YELLOW_COLOR,
              },
            ];
          });
        } else if (
          el === 1 ||
          el === 3 ||
          el === 7 ||
          el === 13 ||
          el === 17 ||
          el === 27
        ) {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        } else {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (medium40SegColors?.length < 41) {
      Array.from({ length: 40 }).map((_, el: number) => {
        if (el === 3 || el === 9 || el === 19 || el === 33) {
          setMedium40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 27) {
          setMedium40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (
          el === 1 ||
          el === 5 ||
          el === 15 ||
          el === 23 ||
          el === 25 ||
          el === 29 ||
          el === 37
        ) {
          setMedium40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: YELLOW_COLOR,
              },
            ];
          });
        } else if (
          el === 7 ||
          el === 11 ||
          el === 13 ||
          el === 17 ||
          el === 21 ||
          el === 31 ||
          el === 35 ||
          el === 39
        ) {
          setMedium40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        } else {
          setMedium40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (medium50SegColors?.length < 51) {
      Array.from({ length: 50 }).map((_, el: number) => {
        if (el === 9 || el === 19 || el === 33) {
          setMedium50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 43) {
          setMedium50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (
          el === 1 ||
          el === 5 ||
          el === 15 ||
          el === 23 ||
          el === 27 ||
          el === 29 ||
          el === 37 ||
          el === 47
        ) {
          setMedium50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: YELLOW_COLOR,
              },
            ];
          });
        } else if (
          el === 3 ||
          el === 7 ||
          el === 11 ||
          el === 13 ||
          el === 17 ||
          el === 21 ||
          el === 25 ||
          el === 31 ||
          el === 35 ||
          el === 39 ||
          el === 41 ||
          el === 45 ||
          el === 49
        ) {
          setMedium50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        } else {
          setMedium50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
  }, [medium10SegColors?.length]);
  //hard lvl
  useEffect(() => {
    if (hard10SegColors?.length < 11) {
      Array.from({ length: 10 }).map((_, el: number) => {
        if (el === 0) {
          setHard10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        } else {
          setHard10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (hard20SegColors?.length < 21) {
      Array.from({ length: 20 }).map((_, el: number) => {
        if (el === 0) {
          setHard20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else {
          setHard20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (hard30SegColors?.length < 31) {
      Array.from({ length: 30 }).map((_, el: number) => {
        if (el === 0) {
          setHard30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else {
          setHard30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (hard40SegColors?.length < 41) {
      Array.from({ length: 40 }).map((_, el: number) => {
        if (el === 0) {
          setHard40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else {
          setHard40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (hard50SegColors?.length < 51) {
      Array.from({ length: 50 }).map((_, el: number) => {
        if (el === 0) {
          setHard50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else {
          setHard50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        }
      });
    }
  }, [hard10SegColors?.length]);

  useEffect(() => {
    if (level === "Easy") {
      if (pickedValue === 10) {
        setSegColors(easy10SegColors);
      } else if (pickedValue === 20) {
        setSegColors(easy20SegColors);
      } else if (pickedValue === 30) {
        setSegColors(easy30SegColors);
      } else if (pickedValue === 40) {
        setSegColors(easy40SegColors);
      } else if (pickedValue === 50) {
        setSegColors(easy50SegColors);
      }
    } else if (level === "Medium") {
      if (pickedValue === 10) {
        setSegColors(medium10SegColors);
      } else if (pickedValue === 20) {
        setSegColors(medium20SegColors);
      } else if (pickedValue === 30) {
        setSegColors(medium30SegColors);
      } else if (pickedValue === 40) {
        setSegColors(medium40SegColors);
      } else if (pickedValue === 50) {
        setSegColors(medium50SegColors);
      }
    } else if (level === "Hard") {
      if (pickedValue === 10) {
        setSegColors(hard10SegColors);
      } else if (pickedValue === 20) {
        setSegColors(hard20SegColors);
      } else if (pickedValue === 30) {
        setSegColors(hard30SegColors);
      } else if (pickedValue === 40) {
        setSegColors(hard40SegColors);
      } else if (pickedValue === 50) {
        setSegColors(hard50SegColors);
      }
    }
  }, [pickedValue, level, easy10SegColors]);

  const [highlightIndex, setHighlightIndex] = useState<number[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHighlightIndex((prev) => {
        if (prev.length === 25) {
          return []; // Reset to [1] after reaching length 6
        } else {
          return [...prev, prev.length + 1];
        }
      });
    }, 250);

    return () => {
      clearInterval(intervalId); // вCleanup interval on component unmount
      setHighlightIndex([]); // Reset state when component is unmounted
    };
  }, []);

  const [inSpeen, setInSpeen] = useState(false);

  // const [shwoPlaceholder, setSHowPlaceholder] = useState(false);

  const [testInGame, setTestInGame] = useState(false);

  const [testArr, setTestArr] = useState<number[]>([1, 2, 4, 5, 6, 7, 8, 9]);

  // const [lastNumber, setLastNumbar] = useState<number | null>(null);

  const [lastNum, setLastNum] = useState<null | number>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => setOutcomes([1, 2, 3, 0, 0, 0, 4, 5]), 2000);
  // }, []);

  const startAnimation = () => {
    if (currentIndex < outcomes.length) {
      setTimeout(() => {
        setLastNum(-1);
        setTimeout(() => setLastNum(outcomes[currentIndex]), 0);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1500);
    } else {
      // Animation for all elements in the array is complete
      setTimeout(() => {
        setCurrentIndex(0); // Reset the index for future animations
        setTestInGame(false);
        setOutcomes([]);
      }, 1500);
    }
  };

  useEffect(() => {
    if (outcomes?.length > 0) {
      startAnimation();
    }
  }, [outcomes?.length, currentIndex]);

  const [betData, setBetData] = useState({});

  const [gamesList] = useUnit([GameModel.$gamesList]);
  const [access_token] = useUnit([RegistrM.$access_token]);
  const subscribe = {
    type: "SubscribeBets",
    payload: [gamesList.find((item) => item.name === "Wheel")?.id],
  };

  useEffect(() => {
    setBetData({
      type: "MakeBet",
      game_id: gamesList.find((item) => item.name === "Wheel")?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"risk":${
        level === "Easy" ? 0 : level === "Medium" ? 1 : 2
      }, "num_sectors":${numSectors - 1}}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount,
    });
  }, [stopGain, stopLoss, pickedSide, cryptoValue, betsAmount, isDrax]);

  const socket = useSocket();

  const [subscribed, setCubscribed] = useState(false);

  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      if (!subscribed) {
        socket.send(JSON.stringify(subscribe));
        setCubscribed(true);
      }
      socket.send(JSON.stringify(betData));
    }
  }, [socket, isPlaying, access_token]);
  return (
    <>
      {/* {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )} */}
      <section
        onClick={() => {
          setCount((prev) => prev + 2);
          setTestInGame((prev) => !prev);
          // setDone(true);
        }}
        className={s.wheel_table_wrap}
      >
        <ReactHowler
          src={"/music/wheel.mp3"}
          playing={
            (inGame ||
              (outcomes.length > 0 && lastNum !== null && lastNum > -1)) &&
            playSounds !== "off"
          }
          rate={2}
        />
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock
          className={s.sound_mobile}
          showInfo={false}
          game="wheel"
          text={gameText}
        />
        <div className={s.wheel_table_background}>
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={bg}
            className={s.wheel_table_background_img}
            alt="table-bg"
            width={1418}
            height={680}
            quality={100}
          />
        </div>
        <div className={s.wheel_container}>
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
          <div className={clsx(s.wheel_underwrapp)}>
            <div className={clsx(s.wheel_pick)}>
              <svg
                className={s.circle}
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#EF8CFF" />
                <circle cx="13" cy="13" r="8" fill="#983DC2" />
              </svg>
              <svg
                className={clsx(
                  s.pick,
                  inGame && s.wheel_pick_animation,
                  outcomes.length > 0 &&
                    lastNum !== null &&
                    lastNum > -1 &&
                    s.wheel_pick_animation_2
                )}
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.64648 0H0L4.82324 13.9238L9.64648 0Z"
                  fill="#EF8CFF"
                />
              </svg>
            </div>
            <div className={s.wheel_coef_cricle}>
              {localNumber?.toFixed(2) || (0.0).toFixed(2)}x
            </div>
            {Array.from({ length: 24 }).map((_, i) => (
              <BallIcon
                className={clsx(
                  s.wheel_ball,
                  s[`wheel_ball_${i + 1}`],
                  highlightIndex.find((el) => el === i + 1) && s.shadow
                )}
              />
            ))}
            <div
              className={clsx(
                s.wheel_wrapp,
                s[`wheel_wrapp_${pickedValue}`],
                lastNum !== null &&
                  lastNum !== -1 &&
                  s[`wheel_wrapp_${pickedValue}_${lastNum}`],
                inGame && s.wheel_underwrapp_animation
              )}
            >
              <WheelComponent
                inSpeen={inSpeen}
                setInSpeen={setInSpeen}
                localNumber={localNumber || 0}
                count={pickedValue}
                // segments={segments}
                segColors={segColors}
                winningSegment=""
                onFinished={(winner: any) => console.log(winner)}
                primaryColor="black"
                primaryColoraround="#ffffffb4"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={false}
                size={isMobile ? 110 : isDesktop ? 145 : 200}
                upDuration={50}
                downDuration={2000}
              />
            </div>
          </div>
          <div className={clsx(s.wheel_coeffs, true && s.wheel_coeffs_show)}>
            {levelCoef.map((el, i) => (
              <div
                className={clsx(
                  s.wheel_coeff,
                  s[`wheel_coeff_${el.color.slice(1)}`]
                )}
                key={i}
              >
                <span> {el.value.toFixed(2)}x</span>
              </div>
            ))}
          </div>
          <div className={s.balls_arr}>
            {coefficientData
              // .sort((a, b) => b - a)
              .map((item, i) => (
                <div
                  className={clsx(
                    s.multiplier_value,

                    level === "Hard" &&
                      item > 0 &&
                      item < 10 &&
                      s.multiplier_value_blue,
                    level === "Hard" && item > 11 && s.multiplier_value_purple,
                    level === "Easy" && item > 1.3 && s.multiplier_value_green,
                    level === "Easy" &&
                      item > 0 &&
                      item < 1.3 &&
                      s.multiplier_value_blue,
                    level === "Medium" &&
                      item > 0 &&
                      item < 1.6 &&
                      s.multiplier_value_blue,
                    level === "Medium" &&
                      item == 2 &&
                      s.multiplier_value_yellow,
                    (pickedValue === 10 ||
                      pickedValue === 20 ||
                      pickedValue === 30) &&
                      level === "Medium" &&
                      item < 1.6 &&
                      item > 0 &&
                      s.multiplier_value_blue,
                    (pickedValue === 10 ||
                      pickedValue === 20 ||
                      pickedValue === 30) &&
                      level === "Medium" &&
                      item < 2 &&
                      item > 1.6 &&
                      s.multiplier_value_purple,
                    (pickedValue === 40 || pickedValue === 50) &&
                      level === "Medium" &&
                      item == 3 &&
                      s.multiplier_value_purple,
                    (pickedValue === 10 ||
                      pickedValue === 20 ||
                      pickedValue === 30) &&
                      level === "Medium" &&
                      item == 3 &&
                      s.multiplier_value_green,
                    level === "Medium" &&
                      pickedValue === 30 &&
                      item == 4 &&
                      s.multiplier_value_red,
                    level === "Medium" &&
                      pickedValue === 40 &&
                      item == 1.6 &&
                      s.multiplier_value_green,
                    level === "Medium" &&
                      pickedValue === 50 &&
                      item == 5 &&
                      s.multiplier_value_green,
                    level === "Medium" &&
                      item < 0.1 &&
                      s.multiplier_value_white,
                    level === "Hard" && item < 0.1 && s.multiplier_value_white,
                    level === "Easy" && item < 0.1 && s.multiplier_value_white
                  )}
                  key={i}
                >
                  {item?.toFixed(2)}x
                </div>
              ))}
          </div>
        </div>
        {/* <div
          // onClick={() => setSHowPlaceholder((prev) => !prev)}
          className={s.wheel_show}
        >
          <WheelShowIcon />
        </div> */}
      </section>
    </>
  );
};

const WheelComponent = ({
  count,
  segColors,
  winningSegment,
  onFinished,
  isOnlyOnce = true,
  size = 500,
  upDuration = 1000,
  downDuration = 100,
  fontFamily = "proxima-nova",
  width = 100,
  height = 100,
  setInSpeen,
}: {
  localNumber?: number;
  count: number;
  segColors: IWheelColors[];
  winningSegment: any;
  onFinished?: any;
  onRotate?: boolean;
  onRotatefinish?: boolean;
  primaryColor: string;
  primaryColoraround: any;
  contrastColor: string;
  buttonText: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  width?: number;
  height?: number;
  inSpeen: boolean;
  setInSpeen: (el: boolean) => void;
}) => {
  useEffect(() => console.log(JSON.stringify(segColors)), [segColors]);
  const isMobile = useMediaQuery("(max-width: 650px)");
  const isDesktop = useMediaQuery("(max-width: 1280px)");
  const [level, pickedValue] = useUnit([
    LevelModel.$level,
    CustomInputWagerModel.$pickedRows,
  ]);
  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = 10;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: any = null;
  let maxSpeed = Math.PI / 10;
  const upTime = 10 * upDuration;
  const downTime = 10 * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = isMobile ? 130 : isDesktop ? 155 : 212;
  const centerY = isMobile ? 130 : isDesktop ? 155 : 212;
  useEffect(() => {
    if (segColors?.length > 1) {
      initCanvas();
      wheelDraw(segColors);
    }
    console.log(1);
  }, [segColors, isDesktop, isMobile]);
  function setupCanvas(canvas: HTMLCanvasElement) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas?.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas!.width = rect?.width * dpr;
    canvas!.height = rect?.height * dpr;
    var ctx = canvas?.getContext("2d");
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx!.scale(dpr, dpr);
    return ctx;
  }

  const initCanvas = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", `${width}`);
      canvas.setAttribute("height", `${height}`);
      canvas.setAttribute("id", "canvas");
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas?.getBoundingClientRect();
      canvas!.width = rect?.width * dpr;
      canvas!.height = rect?.height * dpr;
      var ctx = canvas?.getContext("2d");
      ctx!.scale(dpr, dpr);
      document!.getElementById("wheel")!.appendChild(canvas);
    }
    // canvas!.addEventListener("click", spin, false);
    canvasContext = canvas!.getContext("2d");
  };

  const wheelDraw = (colors: IWheelColors[]) => {
    clear();
    drawWheel(colors);
    // drawNeedle();
  };

  const draw = (colors: IWheelColors[]) => {
    clear();
    drawWheel(colors);
    drawNeedle();
  };

  const drawSegment = (
    key: number,
    lastAngle: number,
    angle: number,
    colors: IWheelColors[]
  ) => {
    const ctx = canvasContext;
    // ctx.save();
    // const borderWidth = isMobile ? 10 : isDesktop ? 12 : 15;
    // const innerRadius = size;
    // const outerRadius = size;
    // ctx.beginPath();
    // const startX = centerX + innerRadius * Math.cos(lastAngle);
    // const startY = centerY + innerRadius * Math.sin(lastAngle);
    // ctx.moveTo(startX, startY);
    // ctx.arc(centerX, centerY, innerRadius, lastAngle, angle, false);
    // if (isMobile || count < 50) {
    //   const endX = centerX + outerRadius * Math.cos(angle);
    //   const endY = centerY + outerRadius * Math.sin(angle);
    //   ctx.lineTo(endX, endY);
    // }
    // ctx.arc(centerX, centerY, outerRadius, angle, lastAngle, true);
    // ctx.closePath();
    // ctx.lineJoin = "bevel";
    // ctx.fillStyle = colors[key]?.segment;
    // ctx.fill();
    // ctx.lineWidth = isMobile ? 10 : isDesktop ? 12 : 15;
    // ctx.strokeStyle = colors[key + 1]?.border || "red";
    // ctx.stroke();
    // ctx.restore();

    // ctx.save();
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, size - borderWidth / 2, lastAngle, angle, false);
    // ctx.lineTo(centerX, centerY);
    // ctx.closePath();
    // ctx.fillStyle = colors[key]?.segment;
    // ctx.fill();
    // ctx.restore();
    // const borderWidth = isMobile ? 10 : isDesktop ? 12 : 15;

    function toRad(deg: number): number {
      return deg * (Math.PI / 180.0);
    }
    const width = (document.getElementById("canvas") as HTMLCanvasElement)
      .width;
    const height = (document.getElementById("canvas") as HTMLCanvasElement)
      .height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - (isMobile ? 14 : 5);
    ctx!.beginPath();
    ctx!.arc(centerX, centerY, radius, toRad(0), toRad(360));
    ctx!.lineTo(centerX, centerY);
    ctx!.fill();
    let currentDeg = 0;
    let step = 360 / count;
    let startDeg = currentDeg;
    for (let i = 0; i < count; i++, startDeg += step) {
      let endDeg = startDeg + step;

      let color = colors[i].segment;
      let colorStyle = color;

      ctx!.beginPath();
      // Рисуем сегмент без обводки
      ctx!.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
      ctx!.lineTo(centerX, centerY);
      let colorStyle2 = colors[i].border;
      ctx!.fillStyle = colorStyle2;
      ctx!.fill();
      ctx!.beginPath();
      // Рисуем сегмент с обводкой
      ctx!.arc(
        centerX,
        centerY,
        radius - (isMobile ? 12 : isDesktop ? 16 : 18),
        toRad(startDeg - (isMobile ? 0.4 : 0.25)),
        toRad(endDeg)
      );
      ctx!.fillStyle = colorStyle;
      ctx!.lineTo(centerX, centerY);
      ctx!.fill();
    }
    // ctx.restore();
  };

  const drawWheel = (colors: IWheelColors[]) => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = count;
    const PI2 = Math.PI * 2;
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = primaryColor || "black";

    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle, colors);
      lastAngle = angle;
    }

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    // ctx.lineWidth = 25;
    // ctx.strokeStyle = primaryColoraround || "white";
    // ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    // ctx.strokeStyle = contrastColor || "white";
    // ctx.fileStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + count, centerY - 40);
    ctx.lineTo(centerX - count, centerY - 40);
    ctx.lineTo(centerX, centerY - 60);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i = count - Math.floor((change / (Math.PI * 2)) * count) - 1;
    if (i < 0) i = i + count;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "transparent";
    ctx.font = "bold 1.5em " + fontFamily;
    // currentSegment = segments[i];
    isStarted && ctx.fillText(" ", centerX + count, centerY + size + 50);
  };
  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };

  return (
    <div
      // style={
      //   {
      //     transform: "rotate(-90deg)",
      //   }
      // }
      id="wheel"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        id="canvas"
        width={isMobile ? 260 : isDesktop ? 310 : 424}
        height={isMobile ? 260 : isDesktop ? 310 : 424}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
        }}
      />
    </div>
  );
};
