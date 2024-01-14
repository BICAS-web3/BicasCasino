import { FC, useEffect, useState } from "react";

import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

import * as LevelModel from "@/widgets/WheelFortuneLevelsBlock/model";

import { useUnit } from "effector-react";

import Image from "next/image";

import bg from "@/public/media/wheel_images/Frame 1707479789.png";

import { Model as RollSettingModel } from "@/widgets/RollSetting";
import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";

import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as RocketABI } from "@/shared/contracts/RocketABI";
import { useDebounce, useMediaQuery } from "@/shared/tools";
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
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { Preload } from "@/shared/ui/Preload";

interface IWheelFortune {
  gameText: string;
}
import * as CustomInputWagerModel from "@/widgets/CustomWagerRangeInput/model";
import { WheelPick, WheelShowIcon } from "@/shared/SVGs";

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
  const [level] = useUnit([LevelModel.$level]);
  const { isConnected, address } = useAccount();
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
  ]);

  const { data } = useFeeData({
    watch: isConnected,
    cacheTime: 5000,
  });
  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (data && data.gasPrice) {
      setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
    }
  }, [data]);

  const win_chance = rollOver ? 100 - RollValue : RollValue;
  const multiplier =
    (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100));
  useEffect(() => {
    setCoefficient(Number(multiplier) / 10000);
  }, [multiplier]);

  const { chain } = useNetwork();

  const [inGame, setInGame] = useState<boolean>(false);
  const [fees, setFees] = useState<bigint>(BigInt(0));
  const bigNum = 100000000000;
  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
    functionName: "Rocket_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    args: [
      useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
      multiplier,
      pickedToken?.contract_address,
      betsAmount,
      useDebounce(stopGain)
        ? BigInt(Math.floor((stopGain as number) * 10000000)) * BigInt(bigNum)
        : BigInt(Math.floor(cryptoValue * 10000000)) *
          BigInt(bigNum) *
          BigInt(200),
      useDebounce(stopLoss)
        ? BigInt(Math.floor((stopLoss as number) * 10000000)) * BigInt(bigNum)
        : BigInt(Math.floor(cryptoValue * 10000000)) *
          BigInt(bigNum) *
          BigInt(200),
    ],
    value:
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
          BigInt(100000000000)
        : BigInt(0)),
  });

  const { data: GameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
    functionName: "Rocket_GetState",
    args: [address],
    enabled: true,
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
    address: gameAddress as `0x${string}`,
    abi: IERC20,
    functionName: "approve",
    enabled:
      pickedToken?.contract_address !=
      "0x0000000000000000000000000000000000000000",
    args: [
      gameAddress as `0x${string}`,
      useDebounce(
        currentBalance
          ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
          : 0
      ),
    ],
  });

  const { write: setAllowance } = useContractWrite(allowanceConfig);

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
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

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
      setWaitingResponse(true);
    }
  }, [startedPlaying]);

  const [localNumber, setLocalNumber] = useState<number | null>(null);
  const [coefficientData, setCoefficientData] = useState<number[]>([]);
  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
    eventName: "Rocket_Outcome_Event",
    listener(log) {
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("------", (log[0] as any).args, "-------");

        setWaitingResponse(false);
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);

        const handleCall = () => {
          for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
            setTimeout(() => {
              const outCome =
                Number((log[0] as any)?.args?.payouts[i]) / Number(wagered);
              setCoefficientData((prev) => [outCome, ...prev]);
              setLocalNumber(outCome);
            }, 700 * (i + 1));
          }
        };
        handleCall();
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
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              "0x0000000000000000000000000000000000000000"
          ) {
            setAllowance?.();
          } else {
            startPlaying?.();
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
          { value: 2.0, color: BLUE_COLOR },
          { value: 3.0, color: GREEN_COLOR },
          { value: 4.0, color: "red" },
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
          { value: 2.0, color: GREEN_COLOR },
          { value: 3.0, color: YELLOW_COLOR },
          { value: 5.0, color: PURPLE_COLOR },
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
  useEffect(() => {
    console.log(1);
    if (easy10SegColors?.length < 11) {
      Array.from({ length: 10 }).map((_, el: number) => {
        if (el === 0) {
          setEasy10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (el === 1 || el === 6) {
          setEasy10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        } else {
          setEasy10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (easy20SegColors?.length < 21) {
      Array.from({ length: 20 }).map((_, el: number) => {
        if (el === 0 || el === 9) {
          setEasy20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (el === 1 || el === 10 || el === 15 || el === 20) {
          setEasy20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        } else {
          setEasy20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (easy30SegColors?.length < 31) {
      Array.from({ length: 30 }).map((_, el: number) => {
        if (el === 0 || el === 9 || el === 19) {
          setEasy30SegColors((prev) => {
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
          el === 6 ||
          el === 11 ||
          el === 16 ||
          el === 21 ||
          el === 26
        ) {
          setEasy30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        } else {
          setEasy30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (easy40SegColors?.length < 41) {
      Array.from({ length: 40 }).map((_, el: number) => {
        if (el === 0 || el === 9 || el === 19 || el === 29) {
          setEasy40SegColors((prev) => {
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
          el === 6 ||
          el === 11 ||
          el === 16 ||
          el === 21 ||
          el === 26 ||
          el === 31 ||
          el === 36
        ) {
          setEasy40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        } else {
          setEasy40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        }
      });
    }
    if (easy50SegColors?.length < 51) {
      Array.from({ length: 50 }).map((_, el: number) => {
        if (el === 0 || el === 9 || el === 19 || el === 29 || el === 39) {
          setEasy50SegColors((prev) => {
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
          el === 6 ||
          el === 11 ||
          el === 16 ||
          el === 21 ||
          el === 26 ||
          el === 31 ||
          el === 36 ||
          el === 41 ||
          el === 46
        ) {
          setEasy50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: WHITE_COLOR,
              },
            ];
          });
        } else {
          setEasy50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        }
      });
    }
  }, [easy10SegColors?.length]);
  // Medium level

  useEffect(() => {
    if (medium10SegColors?.length < 11) {
      Array.from({ length: 10 }).map((_, el: number) => {
        if (el === 1) {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 9) {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (el === 5) {
          setMedium10SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: "#FBC006",
              },
            ];
          });
        } else if (el === 3 || el === 7) {
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
        if (el === 0 || el === 12) {
          setMedium20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: BLUE_COLOR,
              },
            ];
          });
        } else if (el === 8) {
          setMedium20SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 10) {
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
          el === 2 ||
          el === 4 ||
          el === 6 ||
          el === 16 ||
          el === 14 ||
          el === 18
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
        if (el === 6) {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 8) {
          setMedium30SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (el === 16) {
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
          el === 2 ||
          el === 10 ||
          el === 12 ||
          el === 20 ||
          el === 22 ||
          el === 26
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
          el === 4 ||
          el === 14 ||
          el === 18 ||
          el === 24 ||
          el === 28 ||
          el === 30
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
        if (el === 8 || el === 22 || el === 32 || el === 38) {
          setMedium40SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (el === 14) {
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
          el === 4 ||
          el === 12 ||
          el === 16 ||
          el === 18 ||
          el === 26 ||
          el === 36
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
          el === 2 ||
          el === 6 ||
          el === 10 ||
          el === 20 ||
          el === 24 ||
          el === 28 ||
          el === 30 ||
          el === 34
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
        if (el === 8) {
          setMedium50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: PURPLE_COLOR,
              },
            ];
          });
        } else if (
          el === 14 ||
          el === 6 ||
          el === 24 ||
          el === 22 ||
          el === 28 ||
          el === 36 ||
          el === 50 ||
          el === 46
        ) {
          setMedium50SegColors((prev) => {
            return [
              ...prev,
              {
                segment: el % 2 === 1 ? "#1F1435" : "#100C1E",
                border: GREEN_COLOR,
              },
            ];
          });
        } else if (el === 18 || el === 32 || el === 42) {
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
          el === 2 ||
          el === 6 ||
          el === 10 ||
          el === 12 ||
          el === 16 ||
          el === 20 ||
          el === 26 ||
          el === 30 ||
          el === 34 ||
          el === 38 ||
          el === 44 ||
          el === 88 ||
          el === 40
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
        if (el === 1) {
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
        if (el === 1) {
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
        if (el === 1) {
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
        if (el === 1) {
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
        if (el === 1) {
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

  const coefData = [0.0, 1.5, 1.7, 2, 3];
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
    }, 500);

    return () => {
      clearInterval(intervalId); // вCleanup interval on component unmount
      setHighlightIndex([]); // Reset state when component is unmounted
    };
  }, []);

  const [inSpeen, setInSpeen] = useState(false);

  const [shwoPlaceholder, setSHowPlaceholder] = useState(false);

  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <section
        onClick={() => setCount((prev) => prev + 2)}
        className={s.wheel_table_wrap}
      >
        <span className={s.wheel_eclipse}></span>
        <span className={s.wheel_eclipse_2}></span>
        <span className={s.wheel_eclipse_3}></span>
        <span className={s.wheel_eclipse_4}></span>
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock game="wheel" text={gameText} />
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
          </div>{" "}
          <div className={s.wheel_underwrapp}>
            {" "}
            <WheelPick
              className={clsx(s.wheel_pick, inSpeen && s.wheel_pick_animation)}
            />{" "}
            <div className={s.wheel_coef_cricle}>
              {localNumber || (0.0).toFixed(2)}x
            </div>{" "}
            {Array.from({ length: 24 }).map((_, i) => (
              <BallIcon
                className={clsx(
                  s.wheel_ball,
                  s[`wheel_ball_${i + 1}`],
                  highlightIndex.find((el) => el === i + 1) && s.shadow
                )}
              />
            ))}
            <div className={s.wheel_wrapp}>
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
          <div
            className={clsx(
              s.wheel_coeffs,
              shwoPlaceholder && s.wheel_coeffs_show
            )}
          >
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
                    item > 0 ? s.multiplier_positive : s.multiplier_negative
                  )}
                  key={i}
                >
                  {item?.toFixed(2)}x
                </div>
              ))}
          </div>
        </div>
        <WheelShowIcon
          onclick={() => setSHowPlaceholder((prev) => !prev)}
          className={s.wheel_show}
        />
      </section>{" "}
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
  }, [segColors]);

  const initCanvas = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", `${width}`);
      canvas.setAttribute("height", `${height}`);
      canvas.setAttribute("id", "canvas");
      document!.getElementById("wheel")!.appendChild(canvas);
    }
    // canvas!.addEventListener("click", spin, false);
    canvasContext = canvas!.getContext("2d");
  };

  // useEffect(() => {
  //   let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  //   if (inSpeen) {
  //     canvas!.addEventListener("click", spin, false);
  //   } else {
  //     canvas!.removeEventListener("click", spin);
  //   }
  // }, [inSpeen]);

  // const spin = (colors:IWheelColors[]) => {
  //   setInSpeen(true);
  //   isStarted = true;
  //   // onRotate();
  //   if (timerHandle === 0) {
  //     spinStart = new Date().getTime();
  //     // maxSpeed = Math.PI / ((10*2) + Math.random())
  //     maxSpeed = Math.PI / 10;
  //     frames = 0;
  //     timerHandle = setInterval(onTimerTick?.bind(colors), timerDelay) as any;
  //   }
  // };
  // const onTimerTick = (colors: IWheelColors[]) => {
  //   frames++;
  //   draw(colors);
  //   const duration = new Date().getTime() - spinStart;
  //   let progress = 0;
  //   let finished = false;
  //   if (duration < upTime) {
  //     progress = duration / upTime;
  //     angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
  //   } else {
  //     if (winningSegment) {
  //       if (currentSegment === winningSegment && frames > 10) {
  //         progress = duration / upTime;
  //         angleDelta =
  //           maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
  //         progress = 1;
  //       } else {
  //         progress = duration / downTime;
  //         angleDelta =
  //           maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
  //       }
  //     } else {
  //       progress = duration / downTime;
  //       if (progress >= 0.8) {
  //         angleDelta =
  //           (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
  //       } else if (progress >= 0.98) {
  //         angleDelta =
  //           (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
  //       } else
  //         angleDelta =
  //           maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
  //     }
  //     if (progress >= 1) finished = true;
  //   }

  //   angleCurrent += angleDelta;
  //   while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
  //   if (finished) {
  //     setInSpeen(false);
  //     setFinished(true);
  //     onFinished(currentSegment);
  //     clearInterval(timerHandle);
  //     timerHandle = 0;
  //     angleDelta = 0;
  //   }
  // };

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

  // const drawSegment = (
  //   key: number,
  //   lastAngle: number,
  //   angle: number,
  //   colors: IWheelColors[]
  // ) => {
  //   const ctx = canvasContext;
  //   ctx.save();

  //   // Рисуем обводку сегмента
  //   const borderWidth = isMobile ? 10 : isDesktop ? 12 : 15;
  //   const borderOffset = 0; // Смещение для избежания мерцания
  //   const midX = centerX + size * Math.cos((lastAngle + angle) / 2);
  //   const midY = centerY + size * Math.sin((lastAngle + angle) / 2);
  //   const controlPointX1 = centerX + size * Math.cos(lastAngle);
  //   const controlPointY1 = centerY + size * Math.sin(lastAngle);
  //   const controlPointX2 = centerX + size * Math.cos(angle);
  //   const controlPointY2 = centerY + size * Math.sin(angle);

  //   ctx.beginPath();
  //   ctx.moveTo(controlPointX1 - borderOffset, controlPointY1);
  //   ctx.bezierCurveTo(midX, midY, midX, midY, controlPointX2, controlPointY2);
  //   ctx.lineWidth = borderWidth;
  //   ctx.strokeStyle = colors[key + 1]?.border || "red";

  //   // Заливаем цвет обводки сегмента
  //   ctx.stroke();

  //   // Рисуем сегмент
  //   // Рисуем сегмент
  //   ctx.beginPath();
  //   ctx.moveTo(centerX, centerY);
  //   ctx.arc(
  //     centerX,
  //     centerY,
  //     size - borderWidth / 2, // Уменьшаем радиус арки
  //     lastAngle,
  //     angle,
  //     false
  //   );
  //   ctx.lineTo(centerX, centerY);
  //   ctx.closePath();

  //   // Заливаем цвет сегмента
  //   ctx.fillStyle = colors[key]?.segment;
  //   ctx.fill();

  //   // Восстанавливаем состояние контекста
  //   ctx.restore();
  // };
  const drawSegment = (
    key: number,
    lastAngle: number,
    angle: number,
    colors: IWheelColors[]
  ) => {
    const ctx = canvasContext;
    ctx.save();
    const borderWidth = isMobile ? 10 : isDesktop ? 12 : 15;
    //   const borderOffset = 0; // Смещение для избежания мерцания
    //   const midX = centerX + size * Math.cos((lastAngle + angle) / 2);
    //   const midY = centerY + size * Math.sin((lastAngle + angle) / 2);
    //   const controlPointX1 = centerX + size * Math.cos(lastAngle);
    //   const controlPointY1 = centerY + size * Math.sin(lastAngle);
    //   const controlPointX2 = centerX + size * Math.cos(angle);
    //   const controlPointY2 = centerY + size * Math.sin(angle);
    // Радиусы для внутренней и внешней окружности сегмента
    const innerRadius = size; // или любой другой размер, который вам нравится
    const outerRadius = size;

    // Начинаем новый путь
    ctx.beginPath();

    // Перемещаемся к начальной точке дуги
    const startX = centerX + innerRadius * Math.cos(lastAngle);
    const startY = centerY + innerRadius * Math.sin(lastAngle);
    // ctx.moveTo(startX, startY);

    // Рисуем дугу до конечной точки

    if (segColors?.length < 29) {
      ctx.arc(centerX, centerY, innerRadius, lastAngle, angle, false);
    }

    // Рисуем линию до внешней окружности
    const endX = centerX + outerRadius * Math.cos(angle);
    const endY = centerY + outerRadius * Math.sin(angle);
    ctx.lineTo(endX, endY);

    // Рисуем дугу по внешней окружности в обратном направлении
    ctx.arc(centerX, centerY, outerRadius, angle, lastAngle, true);

    // Закрываем путь
    ctx.closePath();

    // Заливаем цвет сегмента
    ctx.fillStyle = colors[key]?.segment;
    ctx.fill();

    // Рисуем внутреннюю обводку
    ctx.lineWidth = isMobile ? 10 : isDesktop ? 12 : 15; // или любая другая толщина
    ctx.strokeStyle = colors[key + 1]?.border || "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      size - borderWidth / 2, // Уменьшаем радиус арки
      lastAngle,
      angle,
      false
    );
    ctx.lineTo(centerX, centerY);
    ctx.closePath();

    // Заливаем цвет сегмента
    ctx.fillStyle = colors[key]?.segment;
    ctx.fill();
    ctx.restore();
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
        width={isMobile ? 260 : isDesktop ? "310" : "424"}
        height={isMobile ? 260 : isDesktop ? "310" : "424"}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
        }}
      />
    </div>
  );
};
const BallIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="5.52148" cy="5.62695" r="5" fill="#D9D9D9" />
    </svg>
  );
};
