import { FC, useEffect, useState, useRef, ChangeEvent } from "react";

import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

import { useUnit } from "effector-react";
import dice_precentage from "@/public/media/dice_icons/dice_precentage.svg";
import dice_close from "@/public/media/dice_icons/dice_close.svg";
import dice_swap from "@/public/media/dice_icons/dice_swap.svg";

import Image from "next/image";

import useSound from "use-sound";

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

interface IRocket {
  gameText: string;
}

export const Rocket: FC<IRocket> = ({ gameText }) => {
  const { isConnected, address } = useAccount();

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
  const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
  const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;
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

  const [playBackground, { stop: stopBackground }] = useSound(
    "/static/media/games_assets/music/background2.wav",
    { volume: 0.1, loop: true }
  );

  useEffect(() => {
    if (!playSounds) {
      stopBackground();
    } else {
      playBackground();
    }
  }, [playSounds]);

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
        const handlePayouts = async () => {
          for (const item of (log[0] as any)?.args?.payouts || []) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setCoefficientData((prev) => [
              Number(item) / Number(wagered),
              ...prev,
            ]);
          }
        };
        handlePayouts();
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

  const rocketRef = useRef<HTMLVideoElement | null>(null);
  const fairRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    const video = fairRef.current;

    const handleTimeUpdate = () => {
      const duration = video?.duration || 0;
      const currentTime = video?.currentTime || 0;
      if (currentTime >= duration - 0.3) {
        video!.currentTime = 4.85;
      }
    };

    video?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [inGame]);

  useEffect(() => {
    const video = rocketRef.current;
    const handleTimeUpdate = () => {
      if (inGame) {
        video!.playbackRate = 2;
      } else {
        video!.playbackRate = 1;
      }
    };

    video?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [inGame]);

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

  useEffect(() => {
    console.log("data", coefficientData);
  }, [coefficientData]);
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
  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <section className={s.rocket_table_wrap}>
        {" "}
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
          <div className={s.balls_arr}>
            {coefficientData
              // .sort((a, b) => b - a)
              .map((item, i) => (
                <div
                  className={clsx(
                    s.multiplier_value,
                    item >= 1 && s.multiplier_positive,
                    item < 1 && s.multiplier_negative
                  )}
                  key={i}
                >
                  {item?.toFixed(2)}x
                </div>
              ))}
          </div>
          <video
            ref={rocketRef}
            className={s.background_video}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/rocket/bg.mp4" type="video/mp4" />
          </video>
          <div className={clsx(s.rocket_box, inGame && s.rocket_box_animation)}>
            <Image
              className={clsx(s.rocket, inGame && s.rocket_animation)}
              src={rocket}
              alt="rocket"
            />
          </div>
          {inGame && (
            <video
              ref={fairRef}
              className={clsx(s.fair)}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/rocket/fair.mp4" type="video/mp4" />
            </video>
          )}
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
