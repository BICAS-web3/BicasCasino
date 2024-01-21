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

import * as HourseModel from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { Preload } from "@/shared/ui/Preload";

import hourseBg from "@/public/media/hourse_images/bg_.png";
import hourseBg_2 from "@/public/media/hourse_images/bg_2.png";
import hourse_logo from "@/public/media/hourse_icons/logo.svg";
interface IHourse {
  gameText: string;
}

export const Hourse: FC<IHourse> = ({ gameText }) => {
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
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    HourseModel.setPlayingStatus,
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
    address: pickedToken?.contract_address as `0x${string}`,
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
    gasPrice: data?.gasPrice as any,
    gas: BigInt(50000),
  });

  const {
    write: setAllowance,
    error: allowanceError,
    status: allowanceStatus,
    data: allowanceData,
  } = useContractWrite(allowanceConfig);

  const { config: refundConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
    functionName: "Rocket_Refund",
    enabled: isPlaying,
    args: [],
    gas: BigInt(100000),
  });
  const { write: callRefund } = useContractWrite(refundConfig);

  useEffect(() => {
    if (refund) {
      callRefund?.();
      setRefund(false);
    }
  }, [refund]);

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
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              "0x0000000000000000000000000000000000000000"
          ) {
            if (setAllowance) {
              setAllowance();
              setActivePicker(false);
              setInGame(true);
              setWaitingResponse(true);
            }
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

  const [testGame, setTestGame] = useState(false);

  const hourse_1_1 = useRef<HTMLVideoElement | null>(null);
  const hourse_1_2 = useRef<HTMLVideoElement | null>(null);
  const hourse_2_1 = useRef<HTMLVideoElement | null>(null);
  const hourse_2_2 = useRef<HTMLVideoElement | null>(null);
  const hourse_3_1 = useRef<HTMLVideoElement | null>(null);
  const hourse_3_2 = useRef<HTMLVideoElement | null>(null);
  const hourse_4_1 = useRef<HTMLVideoElement | null>(null);
  const hourse_4_2 = useRef<HTMLVideoElement | null>(null);
  const hourse_5_1 = useRef<HTMLVideoElement | null>(null);
  const hourse_5_2 = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const bg_1_1 = hourse_1_1.current;
    const bg_1_2 = hourse_1_2.current;
    bg_1_1!.currentTime = 0;
    bg_1_2!.currentTime = 0;
    const bg_2_1 = hourse_1_1.current;
    const bg_2_2 = hourse_1_2.current;
    bg_2_1!.currentTime = 0;
    bg_2_2!.currentTime = 0;
    const bg_3_1 = hourse_1_1.current;
    const bg_3_2 = hourse_1_2.current;
    bg_3_1!.currentTime = 0;
    bg_3_2!.currentTime = 0;
    const bg_4_1 = hourse_1_1.current;
    const bg_4_2 = hourse_1_2.current;
    bg_4_1!.currentTime = 0;
    bg_4_2!.currentTime = 0;
    const bg_5_1 = hourse_1_1.current;
    const bg_5_2 = hourse_1_2.current;
    bg_5_1!.currentTime = 0;
    bg_5_2!.currentTime = 0;
  }, [testGame]);

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

  const [hourseLoad_1, setHourseLoad_1] = useState(false);
  const [hourseLoad_2, setHourseLoad_2] = useState(false);
  const [hourseLoad_3, setHourseLoad_3] = useState(false);
  const [hourseLoad_4, setHourseLoad_4] = useState(false);
  const [hourseLoad_5, setHourseLoad_5] = useState(false);
  const [loadImage, setLoadImage] = useState(false);

  useEffect(() => {
    if (
      hourseLoad_1 &&
      hourseLoad_2 &&
      hourseLoad_3 &&
      hourseLoad_4 &&
      hourseLoad_5 &&
      loadImage
    ) {
      setIsLoading(false);
    }
  }, [
    hourseLoad_1,
    hourseLoad_2,
    hourseLoad_3,
    hourseLoad_4,
    hourseLoad_5,
    loadImage,
  ]);

  return (
    <>
      {isLoading && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <section
        onClick={() => setTestGame((prev) => !prev)}
        className={s.hourse_table_wrap}
      >
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock
          className={s.hourse_btns}
          game="hourse"
          text={gameText}
        />
        <div className={s.hourse_table_background}>
          <div
            className={clsx(
              s.hourse_table_background_img,
              s.hourse_table_background_img_1,
              testGame && allLoaded && s.hourse_table_background_img_1_start
            )}
          >
            <Image
              className={s.hourse_table_background_img_deep}
              onLoad={() => setLoadImage(true)}
              src={hourseBg}
              alt="table-bg"
            />
            <Image src={hourse_logo} alt="" className={s.hourse_logo} />
          </div>
          <Image
            src={hourseBg_2}
            className={clsx(
              s.hourse_table_background_img,
              s.hourse_table_background_img_2,
              testGame && allLoaded && s.hourse_table_background_img_2_start
            )}
            alt="table-bg"
          />
          <Image
            src={hourseBg_2}
            className={clsx(
              s.hourse_table_background_img,
              s.hourse_table_background_img_3,
              testGame && allLoaded && s.hourse_table_background_img_3_start
            )}
            alt="table-bg"
          />
        </div>
        <video
          ref={hourse_1_1}
          className={clsx(s.hourse, s.hourse_1, testGame && s.hidden)}
          autoPlay={false}
          loop={false}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_1(true)}
        >
          <source src={"/hourse/hourse_1.webm"} type="video/mp4" />
        </video>
        <video
          onPlay={() => setPlay_1(true)}
          ref={hourse_1_2}
          className={clsx(
            s.hourse,
            s.hourse_1,
            !testGame && s.hidden,
            testGame && allLoaded && s.hourse_1_run
          )}
          autoPlay={true}
          loop={true}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_1(true)}
        >
          <source src={"/hourse/hourse_1.webm"} type="video/mp4" />
        </video>
        <video
          ref={hourse_2_1}
          className={clsx(s.hourse, s.hourse_2, testGame && s.hidden)}
          autoPlay={false}
          loop={false}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_2(true)}
        >
          <source src={"/hourse/hourse_2.webm"} type="video/mp4" />
        </video>
        <video
          onPlay={() => setPlay_2(true)}
          ref={hourse_2_2}
          className={clsx(
            s.hourse,
            s.hourse_2,
            !testGame && s.hidden,
            testGame && allLoaded && s.hourse_2_run
          )}
          autoPlay={true}
          loop={true}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_2(true)}
        >
          <source src={"/hourse/hourse_2.webm"} type="video/mp4" />
        </video>
        <video
          ref={hourse_3_1}
          className={clsx(s.hourse, s.hourse_3, testGame && s.hidden)}
          autoPlay={false}
          loop={false}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_3(true)}
        >
          <source src={"/hourse/hourse_3.webm"} type="video/mp4" />
        </video>
        <video
          onPlay={() => setPlay_3(true)}
          ref={hourse_3_2}
          className={clsx(
            s.hourse,
            s.hourse_3,
            !testGame && s.hidden,
            testGame && allLoaded && s.hourse_3_run
          )}
          autoPlay={true}
          loop={true}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_3(true)}
        >
          <source src={"/hourse/hourse_3.webm"} type="video/mp4" />
        </video>
        <video
          ref={hourse_4_1}
          className={clsx(s.hourse, s.hourse_4, testGame && s.hidden)}
          autoPlay={false}
          loop={false}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_4(true)}
        >
          <source src={"/hourse/hourse_4.webm"} type="video/mp4" />
        </video>
        <video
          onPlay={() => setPlay_4(true)}
          ref={hourse_4_2}
          className={clsx(
            s.hourse,
            s.hourse_4,
            !testGame && s.hidden,
            testGame && allLoaded && s.hourse_4_run
          )}
          autoPlay={true}
          loop={true}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_4(true)}
        >
          <source src={"/hourse/hourse_4.webm"} type="video/mp4" />
        </video>
        <video
          ref={hourse_5_1}
          className={clsx(s.hourse, s.hourse_5, testGame && s.hidden)}
          autoPlay={false}
          loop={false}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_5(true)}
        >
          <source src={"/hourse/hourse_5.webm"} type="video/mp4" />
        </video>
        <video
          onPlay={() => setPlay_5(true)}
          ref={hourse_5_2}
          className={clsx(
            s.hourse,
            s.hourse_5,
            !testGame && s.hidden,
            testGame && allLoaded && s.hourse_5_run
          )}
          autoPlay={true}
          loop={true}
          muted
          playsInline
          onLoadedData={() => setHourseLoad_5(true)}
        >
          <source src={"/hourse/hourse_5.webm"} type="video/mp4" />
        </video>
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
