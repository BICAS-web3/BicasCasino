import { FC, useEffect, useState, ChangeEvent, useRef } from "react";

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

import Image from "next/image";

import useSound from "use-sound";

import { Model as RollSettingModel } from "@/widgets/RollSetting";
import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";

import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as DiceAbi } from "@/shared/contracts/DiceAbi";
import { useDebounce } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";

import dice_cube from "@/public/media/dice_images/dice_cube.png";
import dice_desktop from "@/public/media/dice_images/dice_desctop.png";
import dice_medium from "@/public/media/dice_images/dice_medium.png";
import soundIco from "@/public/media/Wager_icons/soundIco.svg";
import soundOffIco from "@/public/media/Wager_icons/volumeOffIco.svg";
import dice_precentage from "@/public/media/dice_icons/dice_precentage.svg";
import dice_close from "@/public/media/dice_icons/dice_close.svg";
import dice_swap from "@/public/media/dice_icons/dice_swap.svg";

import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { WagerGainLossModel } from "../WagerGainLoss";
import { SidePickerModel } from "../CoinFlipSidePicker";
import { DiceCanvas } from "./DiceModel";
import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";

import s from "./styles.module.scss";
import clsx from "clsx";

enum CoinAction {
  Rotation = "Rotation",
  HeadsHeads = "HeadsHeads",
  HeadsTails = "HeadsTails",
  TailsHeads = "TailsHeads",
  TailsTails = "TailsTails",
  Stop = "",
}

export interface DiceProps {}

export const Dice: FC<DiceProps> = () => {
  const { isConnected, address } = useAccount();
  const [
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
  ] = useUnit([
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
  ]);

  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString());

    setRollValue(number_value);
  };
  const { data } = useFeeData();

  let bgImage = window.innerWidth > 650 ? dice_desktop : dice_medium;

  const win_chance = rollOver ? 100 - RollValue : RollValue;
  // const multiplier = 0.99 * (100 / win_chance);
  const multiplier =
    (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100));
  const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
  const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;

  const changeBetween = () => {
    flipRollOver(RollValue);
  };

  const { chain } = useNetwork();
  // const total = (win_chance / RollValue) * multiplier;
  //const total = Math.floor((win_chance / RollValue) * multiplier);
  //?-----------------------------------------------------------------

  const [inGame, setInGame] = useState<boolean>(false);
  const [fees, setFees] = useState<bigint>(BigInt(0));
  const bigNum = 100000000000;
  const { config: startPlayingConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: DiceAbi,
    functionName: "Dice_Play",
    args: [
      useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
      multiplier,
      pickedToken?.contract_address,
      rollOver,
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
    value: fees,
    enabled: true,
  });

  const [playBackground, { stop: stopBackground }] = useSound(
    "/static/media/games_assets/music/background2.wav",
    { volume: 0.1, loop: true }
  );
  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite(startPlayingConfig);

  useEffect(() => {
    console.log("Play sounds", playSounds);
    if (!playSounds) {
      stopBackground();
    } else {
      playBackground();
    }
  }, [playSounds]);

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: DiceAbi,
    functionName: "Dice_GetState",
    args: [address],
    enabled: true,
    watch: isConnected,
  });

  useEffect(() => {
    if (GameState && !inGame) {
      if ((GameState as any).ingame) {
        if (
          !(GameState as any).isFirstRequest &&
          (GameState as any).requestID == 0
        ) {
          setInGame(true);
          setActivePicker(false);
          pickSide((GameState as any).isHeads as number);
        }
      } else {
        setInGame(false);
      }
    }
  }, [GameState]);

  const { config: allowanceConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: pickedToken?.contract_address as `0x${string}`,
    abi: IERC20,
    functionName: "approve",
    enabled: true,
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

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: DiceAbi,
    functionName: "getVRFFee",
    args: [0],
    // onSuccess: (fees: bigint) => {
    //   console.log('fees', fees);
    // },
    watch: true,
  });

  useEffect(() => {
    console.log("gas price", data?.gasPrice);
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(1000000) * data.gasPrice
      );
    }
  }, [VRFFees, data]);

  //!---

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
    }
  }, [startedPlaying]);

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: DiceAbi,
    eventName: "Dice_Outcome_Event",
    listener(log) {
      //handleLog(log)
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("Found Log!");
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);
        if ((log[0] as any).args.payout > wagered) {
          console.log("won");
          const profit = (log[0] as any).args.payout;
          console.log("profit", profit);
          const multiplier = Number(profit / wagered);
          console.log("multiplier", multiplier);
          const wagered_token = (
            (log[0] as any).args.tokenAddress as string
          ).toLowerCase();
          const token = TOKENS.find((tk) => tk.address == wagered_token)?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];
          console.log("won token", token);
          const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
          setWonStatus({
            profit: profitFloat,
            multiplier,
            token: token as string,
          });
          setGameStatus(GameModel.GameStatus.Won);
        } else {
          console.log("lost");
          const wageredFloat =
            Number(wagered / BigInt(10000000000000000)) / 100;
          console.log("wagered", wageredFloat);
          setLostStatus(wageredFloat);
          setGameStatus(GameModel.GameStatus.Lost);
        }
      }
    },
  });

  useEffect(() => {
    if (wagered) {
      console.log("Pressed wager");
      if (inGame) {
        // setShowFlipCards(false);
        // if (finishPlaying) finishPlaying();
      } else {
        console.log(cryptoValue, currentBalance);
        const total_value = cryptoValue * betsAmount;
        if (
          cryptoValue != 0 &&
          currentBalance &&
          total_value <= currentBalance
        ) {
          console.log("Allowance", allowance);
          if (!allowance || (allowance && allowance <= cryptoValue)) {
            console.log("Setting allowance");
            if (setAllowance) setAllowance();
            //return;
          } else {
            //setActiveCards(initialArrayOfCards);
            console.log(
              "Starting playing",
              startPlaying,
              BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
              //BigInt(VRFFees ? (VRFFees as bigint) : 0) * BigInt(10),
              pickedToken?.contract_address,
              gameAddress,
              VRFFees
            );
            if (startPlaying) {
              startPlaying();
            }
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

  const rangeRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    console.log("Multiplier", multiplier);
  }, [multiplier]);

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

  return (
    <div className={s.dice}>
      <div className={s.model}>
        <DiceCanvas inGame={inGame} />
      </div>
      <div className={s.dice_container}>
        <Image className={s.cube} src={dice_cube} alt="cube" />
        <div className={s.dice_table_background}>
          <Image
            className={s.dice_table_background_img}
            src={bgImage}
            alt="test"
          />
        </div>
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
        {/* <div className={s.dice_about}>
          <span className={s.green_color}>32</span>
          <span className={s.red_color}>343</span>
          <span>
            Total: <span className={s.green_color}>{total.toFixed(2)}</span>
          </span>
        </div> */}
        <button onClick={() => switchSounds()} className={s.dice_sound_btn}>
          <Image
            src={playSounds ? soundIco : soundOffIco}
            alt={playSounds ? "sound-on" : "sound-off"}
          />
        </button>
      </div>
      <div className={s.dice_value_container}>
        {diceValue.map((dice) => (
          <div key={dice.id} className={s.dice_under_conteiner}>
            <h3 className={s.dice_under_title}>
              {dice.title}{" "}
              {dice.title === "Roll" ? rollOver ? "Over" : "Under" : <></>}
            </h3>
            <div className={s.dice_under_data}>
              <span className={s.dice_under_value}>{dice.value}</span>
              <Image
                onClick={() => {
                  dice.title === "Roll" && changeBetween();
                }}
                src={dice.img_src}
                alt={dice.img_src}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
