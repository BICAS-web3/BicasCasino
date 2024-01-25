import { FC, useEffect, useRef, useState } from "react";

import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useUnit } from "effector-react";

import Image from "next/image";

import { Model as RollSettingModel } from "@/widgets/RollSetting";
import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";
import * as SidebarModel from "@/widgets/SideBar/model";

import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as RaceABI } from "@/shared/contracts/RaceABI";
import { useDebounce, useMediaQuery } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";

import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { WagerGainLossModel } from "../WagerGainLoss";
import { SidePickerModel } from "../CoinFlipSidePicker";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";

import s from "./styles.module.scss";
import clsx from "clsx";

import * as HorseModel from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { Preload } from "@/shared/ui/Preload";

import HorseBg from "@/public/media/Horse_images/bg_.png";
import HorseBg_2 from "@/public/media/Horse_images/bg_2.png";
import Horse_logo from "@/public/media/Horse_icons/logo.svg";

import fence_1 from "@/public/media/Horse_images/fence_1.png";
import fence_2 from "@/public/media/Horse_images/fence_2.png";
import fence_3 from "@/public/media/Horse_images/fence_3.png";
import fence_4 from "@/public/media/Horse_images/fence_4.png";
import fence_5 from "@/public/media/Horse_images/fence_5.png";

import fence_mobile_1 from "@/public/media/Horse_images/fence_mobile_1.png";
import fence_mobile_2 from "@/public/media/Horse_images/fence_mobile_2.png";
import fence_mobile_3 from "@/public/media/Horse_images/fence_mobile_3.png";
import fence_mobile_4 from "@/public/media/Horse_images/fence_mobile_4.png";
import fence_mobile_5 from "@/public/media/Horse_images/fence_mobile_5.png";

import finish_line from "@/public/media/Horse_images/finishLine.png";

import shadow_5 from "@/public/media/Horse_icons/shadow_5.svg";
import shadow_4 from "@/public/media/Horse_icons/shadow_4.svg";
import shadow_3 from "@/public/media/Horse_icons/shadow_3.svg";
import shadow_2 from "@/public/media/Horse_icons/shadow_2.svg";
import shadow_1 from "@/public/media/Horse_icons/shadow_1.svg";
interface IHorse {
  gameText: string;
}

export const Horse: FC<IHorse> = ({ gameText }) => {
  const isMobile = useMediaQuery("(max-width: 650px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");
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
    refund,
    setRefund,
    isPlaying,
    HorseNumber,
    gameResult,
    setGameResult,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    HorseModel.setPlayingStatus,
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
    HorseModel.$HorseNumber,
    HorseModel.$gameResult,
    HorseModel.setGameResult,
  ]);
  const [sidebarOpened] = useUnit([SidebarModel.$isOpen]);

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
    address: "0xF519dB2AeB4a26B5080Cd975B6aD6A86d0492739",
    abi: RaceABI,
    functionName: "Race_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    args: [
      useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
      "0x0000000000000000000000000000000000000000",
      HorseNumber, // number of horse
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
      "0x0000000000000000000000000000000000000000" ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
          BigInt(100000000000)
        : BigInt(0)),
  });

  const { data: GameState } = useContractRead({
    chainId: chain?.id,
    address: "0xF519dB2AeB4a26B5080Cd975B6aD6A86d0492739",
    abi: RaceABI,
    functionName: "Race_GetState",
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
    address: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    abi: IERC20,
    functionName: "approve",
    enabled:
      "0x0000000000000000000000000000000000000000" !=
      "0x0000000000000000000000000000000000000000",
    args: [
      "0xF519dB2AeB4a26B5080Cd975B6aD6A86d0492739",
      useDebounce(
        currentBalance
          ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
          : 0
      ),
    ],
    gasPrice: data?.gasPrice as any,
    gas: BigInt(50000),
  });

  const {
    write: setAllowance,
    error: allowanceError,
    status: allowanceStatus,
    data: allowanceData,
  } = useContractWrite(allowanceConfig);

  // const { config: refundConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: "0xF519dB2AeB4a26B5080Cd975B6aD6A86d0492739",
  //   abi: RaceABI,
  //   functionName: "Race_Refund",
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

  useEffect(() => {
    if (allowanceData) {
      setWatchAllowance(true);
    }
  }, [allowanceData]);

  const { isSuccess: allowanceIsSet } = useWaitForTransaction({
    hash: allowanceData?.hash,
    staleTime: Infinity,
    enabled: watchAllowance,
  });

  useEffect(() => {
    if (inGame && allowanceIsSet && watchAllowance) {
      setWatchAllowance(false);
      startPlaying();
    } else if (allowanceError) {
      setWatchAllowance(false);
      setActivePicker(true);
      setInGame(false);
      setWaitingResponse(false);
    }
  }, [inGame, allowanceIsSet, allowanceError]);

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: "0xF519dB2AeB4a26B5080Cd975B6aD6A86d0492739",
    abi: RaceABI,
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
    address: "0xF519dB2AeB4a26B5080Cd975B6aD6A86d0492739",
    abi: RaceABI,
    eventName: "Race_Outcome_Event",
    listener(log) {
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("------", (log[0] as any).args, "-------");

        const handleResult = () => {
          const resultNumber = (log[0] as any).args.raceOutcomes[0];
          function shuffleArray(array: number[]) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }
          let existingArray = [0, 1, 2, 3, 4];

          if (existingArray.includes(resultNumber)) {
            existingArray = existingArray.filter(
              (digit) => digit !== resultNumber
            );
            existingArray = shuffleArray(existingArray);
            existingArray.unshift(resultNumber);

            console.log(existingArray, HorseNumber);
            setGameResult(existingArray);
          }
        };

        handleResult();

        setWaitingResponse(false);
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);

        const handleCall = () => {
          for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
            setTimeout(() => {
              const outCome =
                Number((log[0] as any)?.args?.payouts[i]) /
                Number(BigInt((log[0] as any).args.wager));
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
          // if (
          //   (!allowance || (allowance && allowance <= cryptoValue)) &&
          //    "0x0000000000000000000000000000000000000000" !=
          //     "0x0000000000000000000000000000000000000000"
          // ) {
          //   if (setAllowance) {
          //     setAllowance();
          //     setInGame(true);
          //     setWaitingResponse(true);
          //   }
          // } else {
          //   startPlaying?.();
          // }

          startPlaying?.();
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

  const [testGame, setTestGame] = useState(false);

  useEffect(() => {
    if (inGame) {
      setTestGame(true);
    }
  }, [inGame]);

  const [HorsePlay, setHorsePlay] = useState(false);

  useEffect(() => {
    if (testGame) {
      setHorsePlay(true);
    }
  }, [testGame]);

  const horse_1 = useRef<HTMLVideoElement | null>(null);
  const horse_2 = useRef<HTMLVideoElement | null>(null);
  const horse_3 = useRef<HTMLVideoElement | null>(null);
  const horse_4 = useRef<HTMLVideoElement | null>(null);
  const horse_5 = useRef<HTMLVideoElement | null>(null);

  const [play_1, setPlay_1] = useState(false);
  const [play_2, setPlay_2] = useState(false);
  const [play_3, setPlay_3] = useState(false);
  const [play_4, setPlay_4] = useState(false);
  const [play_5, setPlay_5] = useState(false);

  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (play_1 && play_2 && play_3 && play_4 && play_5) {
      setAllLoaded(true);
    }
  }, [play_1, play_2, play_3, play_4, play_5]);

  const [HorseLoad_1, setHorseLoad_1] = useState(false);
  const [HorseLoad_2, setHorseLoad_2] = useState(false);
  const [HorseLoad_3, setHorseLoad_3] = useState(false);
  const [HorseLoad_4, setHorseLoad_4] = useState(false);
  const [HorseLoad_5, setHorseLoad_5] = useState(false);
  const [loadImage, setLoadImage] = useState(false);

  useEffect(() => {
    if (
      HorseLoad_1 &&
      HorseLoad_2 &&
      HorseLoad_3 &&
      HorseLoad_4 &&
      HorseLoad_5 &&
      loadImage
    ) {
      setIsLoading(false);
    }
  }, [
    HorseLoad_1,
    HorseLoad_2,
    HorseLoad_3,
    HorseLoad_4,
    HorseLoad_5,
    loadImage,
  ]);

  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const generateRandomNumber = () => {
      if (gameResult.length === 0 && testGame) {
        const randomValue = Math.floor(Math.random() * 11) - 5;
        setRandomNumber(randomValue);
      } else {
        setRandomNumber(null);
      }
    };

    if (gameResult.length === 0 && testGame) {
      setTimeout(() => {
        generateRandomNumber();
        intervalId = setInterval(generateRandomNumber, 3000);
      }, 3000);
    } else {
      setRandomNumber(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameResult, testGame]);
  const [Horse_speed_1, setHorse_speed_1] = useState<number | null>(null);
  const [Horse_speed_2, setHorse_speed_2] = useState<number | null>(null);
  const [Horse_speed_3, setHorse_speed_3] = useState<number | null>(null);
  const [Horse_speed_4, setHorse_speed_4] = useState<number | null>(null);
  const [Horse_speed_5, setHorse_speed_5] = useState<number | null>(null);

  const [HorseStay_1, setHorseStay_1] = useState(false);
  const [HorseStay_2, setHorseStay_2] = useState(false);
  const [HorseStay_3, setHorseStay_3] = useState(false);
  const [HorseStay_4, setHorseStay_4] = useState(false);
  const [HorseStay_5, setHorseStay_5] = useState(false);

  useEffect(() => {
    if (!HorseStay_1 && testGame) {
      horse_1.current!.play();
    } else {
      horse_1.current!.pause();
    }
  }, [HorsePlay, testGame, HorseStay_1]);
  useEffect(() => {
    if (!HorseStay_2 && testGame) {
      horse_2.current!.play();
    } else {
      horse_2.current!.pause();
    }
  }, [HorsePlay, testGame, HorseStay_2]);
  useEffect(() => {
    if (!HorseStay_3 && testGame) {
      horse_3.current!.play();
    } else {
      horse_3.current!.pause();
    }
  }, [HorsePlay, testGame, HorseStay_3]);
  useEffect(() => {
    if (!HorseStay_4 && testGame) {
      horse_4.current!.play();
    } else {
      horse_4.current!.pause();
    }
  }, [HorsePlay, testGame, HorseStay_4]);
  useEffect(() => {
    if (!HorseStay_5 && testGame) {
      horse_5.current!.play();
    } else {
      horse_5.current!.pause();
    }
  }, [HorsePlay, testGame, HorseStay_5]);

  const [stepValue, setStepValue] = useState(90);

  useEffect(() => {
    if (isDesktop) {
      setStepValue(150);
    } else {
      setStepValue(90);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (testGame) {
      setTimeout(() => {
        setGameResult([0, 3, 2, 1, 4]);
      }, 9000);
    }
  }, [testGame]);

  const callResult = (
    delay: number,
    callBackStay: (el: boolean) => void,
    callBackTime: (el: number) => void
  ) => {
    let localDelay;
    if (delay === 4) {
      localDelay = 3.5;
    } else if (delay === 1) {
      localDelay = 1.5;
    } else if (delay === 2) {
      localDelay = 2.5;
    } else {
      localDelay = delay;
    }

    callBackTime(delay);
    setTimeout(() => {
      callBackStay(true);
    }, localDelay * 1000);
  };
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    const processHorse = async (value: number, index: number) => {
      if (index === 0) {
        if (value === 0) {
          callResult(1, setHorseStay_1, setHorse_speed_1);
        } else if (value === 1) {
          callResult(1, setHorseStay_2, setHorse_speed_2);
        } else if (value === 2) {
          callResult(1, setHorseStay_3, setHorse_speed_3);
        } else if (value === 3) {
          callResult(1, setHorseStay_4, setHorse_speed_4);
        } else if (value === 4) {
          callResult(1, setHorseStay_5, setHorse_speed_5);
        }
      }
      if (index === 1) {
        if (value === 0) {
          setHorse_speed_1(2);
          callResult(2, setHorseStay_1, setHorse_speed_1);
        } else if (value === 1) {
          callResult(2, setHorseStay_2, setHorse_speed_2);
        } else if (value === 2) {
          callResult(2, setHorseStay_3, setHorse_speed_3);
        } else if (value === 3) {
          callResult(2, setHorseStay_4, setHorse_speed_4);
        } else if (value === 4) {
          callResult(2, setHorseStay_5, setHorse_speed_5);
        }
      }
      if (index === 2) {
        if (value === 0) {
          callResult(3, setHorseStay_1, setHorse_speed_1);
        } else if (value === 1) {
          callResult(3, setHorseStay_2, setHorse_speed_2);
        } else if (value === 2) {
          callResult(3, setHorseStay_3, setHorse_speed_3);
        } else if (value === 3) {
          callResult(3, setHorseStay_4, setHorse_speed_4);
        } else if (value === 4) {
          callResult(3, setHorseStay_5, setHorse_speed_5);
        }
      }
      if (index === 3) {
        if (value === 0) {
          callResult(4, setHorseStay_1, setHorse_speed_1);
        } else if (value === 1) {
          callResult(4, setHorseStay_2, setHorse_speed_2);
        } else if (value === 2) {
          callResult(4, setHorseStay_3, setHorse_speed_3);
        } else if (value === 3) {
          callResult(4, setHorseStay_4, setHorse_speed_4);
        } else if (value === 4) {
          callResult(4, setHorseStay_5, setHorse_speed_5);
        }
      }
      if (index === 4) {
        if (value === 0) {
          callResult(4, setHorseStay_1, setHorse_speed_1);
        } else if (value === 1) {
          callResult(4, setHorseStay_2, setHorse_speed_2);
        } else if (value === 2) {
          callResult(4, setHorseStay_3, setHorse_speed_3);
        } else if (value === 3) {
          callResult(4, setHorseStay_4, setHorse_speed_4);
        } else if (value === 4) {
          callResult(4, setHorseStay_5, setHorse_speed_5);
        }
      }
    };
    const processResult = async () => {
      if (gameResult && gameResult.length === 5) {
        for (const [index, value] of (gameResult as any).entries()) {
          await processHorse(value, index);
          await processHorse(value, index);
          await processHorse(value, index);
          await processHorse(value, index);
          await processHorse(value, index);
        }
      }
    };

    if (gameResult?.length === 5) {
      processResult();
    } else if (gameResult.length === 0) {
      setTestGame(false);
      setHorseStay_1(false);
      setHorseStay_2(false);
      setHorseStay_3(false);
      setHorseStay_4(false);
      setHorseStay_5(false);
      setHorse_speed_1(null);
      setHorse_speed_2(null);
      setHorse_speed_3(null);
      setHorse_speed_4(null);
      setHorse_speed_5(null);
      setShowFinish(false);
    }
  }, [gameResult?.length]);

  useEffect(() => {
    if (gameResult.length > 0) {
      setShowFinish(true);
    }
  }, [gameResult.length]);
  useEffect(() => {
    if (!testGame) {
      setTimeout(() => {
        horse_1.current!.currentTime = 0;
        horse_2.current!.currentTime = 0;
        horse_3.current!.currentTime = 0;
        horse_4.current!.currentTime = 0;
        horse_5.current!.currentTime = 0;
      }, 10);
    }
  }, [testGame]);

  const [makeCenter, setMakeCenter] = useState(false);

  useEffect(() => {
    if (testGame) {
      setTimeout(() => setMakeCenter(true), 8000);
    } else {
      setMakeCenter(false);
    }
  }, [testGame]);

  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <section
        onClick={() => setTestGame((prev) => !prev)}
        className={s.horse_table_wrap}
      >
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock
          className={s.horse_btns}
          game="Horse"
          text={gameText}
        />
        <div className={s.horse_table_background}>
          <div
            className={clsx(
              s.horse_table_background_img,
              s.horse_table_background_img_1,
              testGame && allLoaded && s.horse_table_background_img_1_start
            )}
          >
            <Image
              className={s.horse_table_background_img_deep}
              onLoad={() => setLoadImage(true)}
              src={HorseBg}
              alt="table-bg"
            />
            <Image src={Horse_logo} alt="" className={s.horse_logo} />
          </div>
          <Image
            src={HorseBg_2}
            className={clsx(
              s.horse_table_background_img,
              s.horse_table_background_img_2,
              !showFinish &&
                testGame &&
                allLoaded &&
                s.horse_table_background_img_2_start,
              showFinish && s.horse_table_background_img_2_finish
            )}
            alt="table-bg"
          />
          {showFinish ? (
            <Image
              src={finish_line}
              className={clsx(
                s.horse_table_background_img,
                s.horse_table_background_img_3,
                testGame && allLoaded && s.horse_table_background_img_3_finish
              )}
              alt="table-bg"
            />
          ) : (
            <Image
              src={HorseBg_2}
              className={clsx(
                s.horse_table_background_img,
                s.horse_table_background_img_3,
                testGame && allLoaded && s.horse_table_background_img_3_start
              )}
              alt="table-bg"
            />
          )}
        </div>
        <div
          className={clsx(
            s.horse,
            !sidebarOpened && s.horse_expand,
            s.horse_1,
            testGame && allLoaded && s.horse_1_run,
            s[`horse_animation_${Horse_speed_1}`],
            gameResult?.length > 0 && s.horse_finish_1,
            makeCenter && s.horse_1_run_center
          )}
          style={{
            transform:
              testGame &&
              randomNumber &&
              (randomNumber === 1 || randomNumber === -1)
                ? `translateX(${randomNumber > 0 ? stepValue : -stepValue}px)`
                : "",
          }}
        >
          {(testGame || gameResult.length > 0) && (
            <Image
              src={shadow_1}
              alt=""
              className={clsx(s.horse_shadow, s.horse_shadow_1)}
            />
          )}
          <video
            className={clsx(s.horse_size, s.horse_size_1)}
            onPlay={() => setPlay_1(true)}
            ref={horse_1}
            autoPlay={true}
            loop={true}
            muted
            playsInline
            onLoadedData={() => setHorseLoad_1(true)}
          >
            <source src={"/horse/horse_1.webm"} type="video/mp4" />
          </video>
        </div>
        <div
          style={{
            transform:
              testGame &&
              randomNumber &&
              (randomNumber === 2 || randomNumber === -2)
                ? `translateX(${randomNumber > 0 ? stepValue : -stepValue}px)`
                : "",
          }}
          className={clsx(
            s.horse,

            !sidebarOpened && s.horse_expand,
            s.horse_2,
            testGame && allLoaded && s.horse_2_run,
            s[`horse_animation_${Horse_speed_2}`],
            gameResult?.length > 0 && s.horse_finish_2,
            makeCenter && s.horse_2_run_center
          )}
        >
          {(testGame || gameResult.length > 0) && (
            <Image
              src={shadow_2}
              alt=""
              className={clsx(s.horse_shadow, s.horse_shadow_2)}
            />
          )}
          <video
            className={clsx(s.horse_size, s.horse_size_2)}
            onPlay={() => setPlay_2(true)}
            ref={horse_2}
            autoPlay={true}
            loop={true}
            muted
            playsInline
            onLoadedData={() => setHorseLoad_2(true)}
          >
            <source src={"/horse/horse_2.webm"} type="video/mp4" />
          </video>
        </div>
        <div
          // style={{
          //   transform:
          //     testGame &&
          //     randomNumber &&
          //     (randomNumber === 3 || randomNumber === -3)
          //       ? `translateX(${randomNumber > 0 ? stepValue : -stepValue}px)`
          //       : "",
          // }}
          className={clsx(
            s.horse,

            !sidebarOpened && s.horse_expand,
            s.horse_3,
            testGame && allLoaded && s.horse_3_run,
            gameResult?.length > 0 && s.horse_finish_3,
            s[`horse_animation_${Horse_speed_3}`],
            makeCenter && s.horse_3_run_center
          )}
        >
          {(testGame || gameResult.length > 0) && (
            <Image
              src={shadow_3}
              alt=""
              className={clsx(s.horse_shadow, s.horse_shadow_3)}
            />
          )}
          <video
            onPlay={() => setPlay_3(true)}
            ref={horse_3}
            className={clsx(s.horse_size, s.horse_size_3)}
            autoPlay={true}
            loop={true}
            muted
            playsInline
            onLoadedData={() => setHorseLoad_3(true)}
          >
            <source src={"/horse/horse_3.webm"} type="video/mp4" />
          </video>
        </div>
        <div
          // style={{
          //   transform:
          //     testGame &&
          //     randomNumber &&
          //     (randomNumber === 4 || randomNumber === -4)
          //       ? `translateX(${randomNumber > 0 ? stepValue : -stepValue}px)`
          //       : "",
          // }}
          className={clsx(
            s.horse,
            !sidebarOpened && s.horse_expand,
            s.horse_4,
            testGame && allLoaded && s.horse_4_run,
            s[`horse_animation_${Horse_speed_4}`],
            gameResult?.length > 0 && s.horse_finish_4,
            makeCenter && s.horse_4_run_center
          )}
        >
          {(testGame || gameResult.length > 0) && (
            <Image
              src={shadow_4}
              alt=""
              className={clsx(s.horse_shadow, s.horse_shadow_4)}
            />
          )}
          <video
            className={clsx(s.horse_size, s.horse_size_4)}
            onPlay={() => setPlay_4(true)}
            ref={horse_4}
            autoPlay={true}
            loop={true}
            muted
            playsInline
            onLoadedData={() => setHorseLoad_4(true)}
          >
            <source src={"/horse/horse_4.webm"} type="video/mp4" />
          </video>
        </div>
        <div
          // style={{
          //   transform:
          //     testGame &&
          //     randomNumber &&
          //     (randomNumber === 5 || randomNumber === -5)
          //       ? `translateX(${randomNumber > 0 ? stepValue : -stepValue}px)`
          //       : "",
          // }}
          className={clsx(
            s.horse,
            !sidebarOpened && s.horse_expand,
            s.horse_5,
            testGame && allLoaded && s.horse_5_run,
            gameResult?.length > 0 && s.horse_finish_5,
            s[`horse_animation_${Horse_speed_5}`],
            makeCenter && s.horse_5_run_center
          )}
        >
          {(testGame || gameResult.length > 0) && (
            <Image
              src={shadow_5}
              alt=""
              className={clsx(s.horse_shadow, s.horse_shadow_5)}
            />
          )}
          <video
            className={clsx(s.horse_size, s.horse_size_5)}
            onPlay={() => setPlay_5(true)}
            ref={horse_5}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline
            onLoadedData={() => setHorseLoad_5(true)}
          >
            <source src={"/horse/horse_5.webm"} type="video/mp4" />
          </video>
        </div>

        <Image
          src={isMobile ? fence_mobile_1 : fence_1}
          className={clsx(
            s.fence,
            s.fence_1,
            testGame && allLoaded && s.horse_table_background_img_1_start
          )}
          alt=""
        />
        <Image
          src={isMobile ? fence_mobile_2 : fence_2}
          className={clsx(
            s.fence,
            s.fence_2,
            testGame && allLoaded && s.horse_table_background_img_1_start
          )}
          alt=""
        />
        <Image
          src={isMobile ? fence_mobile_3 : fence_3}
          className={clsx(
            s.fence,
            s.fence_3,
            testGame && allLoaded && s.horse_table_background_img_1_start
          )}
          alt=""
        />
        <Image
          src={isMobile ? fence_mobile_4 : fence_4}
          className={clsx(
            s.fence,
            s.fence_4,
            testGame && allLoaded && s.horse_table_background_img_1_start
          )}
          alt=""
        />
        <Image
          src={isMobile ? fence_mobile_5 : fence_5}
          className={clsx(
            s.fence,
            s.fence_5,
            testGame && allLoaded && s.horse_table_background_img_1_start
          )}
          alt=""
        />
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
      </section>
    </>
  );
};
