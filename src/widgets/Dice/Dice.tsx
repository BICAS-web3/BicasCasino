import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  lazy,
  Suspense,
} from "react";

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
import { ABI as DiceAbi } from "@/shared/contracts/DiceAbi";
import { useDebounce } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";

import dice_cube from "@/public/media/dice_images/dice_cube.webp";
import dice_desktop from "@/public/media/dice_images/dice_desctop.webp";
import dice_medium from "@/public/media/dice_images/dice_medium.webp";
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

import * as DiceM from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { ProfitModel } from "../ProfitBlock";
import { ProfitLine } from "../ProfitLine";
import { Preload } from "@/shared/ui/Preload";

enum CoinAction {
  Rotation = "Rotation",
  HeadsHeads = "HeadsHeads",
  HeadsTails = "HeadsTails",
  TailsHeads = "TailsHeads",
  TailsTails = "TailsTails",
  Stop = "",
}

export interface DiceProps {
  gameText: string;
}

const Dice: FC<DiceProps> = ({ gameText }) => {
  const [preloading, setPreloading] = useState(true);
  const { isConnected, address } = useAccount();
  const [modelLoading, setModelLoading] = useState(true);
  const [imageLoading, setIMageLoading] = useState(true);
  useEffect(() => {
    if (!modelLoading && !imageLoading) {
      setPreloading(modelLoading);
    }
  }, [modelLoading, imageLoading]);
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
  ]);
  const [isPlaying] = useUnit([GameModel.$isPlaying]);

  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString());

    setRollValue(number_value);
  };
  const { data, isError, isLoading } = useFeeData({
    watch: isConnected,
    cacheTime: 5000,
  });
  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (data && data.gasPrice) {
      setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
    }
  }, [data]);

  let bgImage = window.innerWidth > 650 ? dice_desktop : dice_medium;

  const win_chance = rollOver ? 100 - RollValue : RollValue;
  // const multiplier = 0.99 * (100 / win_chance);
  const multiplier =
    (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100));
  const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
  const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;

  useEffect(() => {
    setCoefficient(Number(multiplier) / 10000);
  }, [multiplier]);

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
  // const { config: startPlayingConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   functionName: "Dice_Play",
  //   args: [
  //     useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
  //     multiplier,
  //     pickedToken?.contract_address,
  //     rollOver,
  //     betsAmount,
  //     useDebounce(stopGain)
  //       ? BigInt(Math.floor((stopGain as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //       BigInt(bigNum) *
  //       BigInt(200),
  //     useDebounce(stopLoss)
  //       ? BigInt(Math.floor((stopLoss as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //       BigInt(bigNum) *
  //       BigInt(200),
  //   ],
  //   value:
  //     fees +
  //     (pickedToken &&
  //       pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
  //       BigInt(100000000000)
  //       : BigInt(0)),
  //   enabled: true,
  // });

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: DiceAbi,
    functionName: "Dice_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
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
    value:
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
          BigInt(100000000000)
        : BigInt(0)),
  });

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: DiceAbi,
    functionName: "Dice_GetState",
    args: [address],
    enabled: true,
    //watch: isConnected,
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

  // const { config: refundConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   functionName: "Dice_Refund",
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
    abi: DiceAbi,
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

  //!---

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
    abi: DiceAbi,
    eventName: "Dice_Outcome_Event",
    listener(log) {
      //handleLog(log)
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        setWaitingResponse(false);
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);
        const handlePayouts = () => {
          for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
            setTimeout(() => {
              const outCome =
                Number((log[0] as any)?.args?.payouts[i]) /
                Number(BigInt((log[0] as any).args.wager));
              setCoefficientData((prev) => [outCome, ...prev]);
            }, 700 * (i + 1));
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
          console.log("win");
        } else {
          const wageredFloat =
            Number(wagered / BigInt(10000000000000000)) / 100;

          setLostStatus(wageredFloat);
          setGameStatus(GameModel.GameStatus.Lost);
          console.log("lost");
        }
      }
    },
  });

  useEffect(() => {
    if (wagered) {
      if (inGame) {
        // setShowFlipCards(false);
        // if (finishPlaying) finishPlaying();
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
            //return;
          } else {
            //setActiveCards(initialArrayOfCards);

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
  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0.1);
  const [gameResult, setGameResult] = useState<
    { value: number; status: "won" | "lost" }[]
  >([]);

  const [taken, setTaken] = useState(false);
  const [localAmount, setLocalAmount] = useState<any>(0);
  const [localCryptoValue, setLocalCryptoValue] = useState(0);
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true);
      setLocalAmount(betsAmount);
      setLocalCryptoValue(cryptoValue);
    }
  }, [betsAmount, cryptoValue, isPlaying]);
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
  return (
    <>
      {" "}
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={s.dice}>
        {" "}
        <WagerLowerBtnsBlock
          className={s.dice_btns}
          game="dice"
          text={gameText}
        />
        <div className={s.model}>
          <Suspense fallback={<div>...</div>}>
            <DiceCanvas setIsLoading={setModelLoading} inGame={inGame} />
          </Suspense>
        </div>
        <div className={s.dice_container}>
          {" "}
          {preloading && <Preload />}
          <Image
            onLoad={() => setIMageLoading(false)}
            className={s.cube}
            src={dice_cube}
            alt="cube"
          />
          <div className={s.dice_table_background}>
            <Image
              onLoad={() => setIMageLoading(false)}
              className={s.dice_table_background_img}
              src={bgImage}
              alt="test"
            />
          </div>
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
          <div className={s.range_wrapper}>
            {" "}
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
          {/* <button onClick={() => switchSounds()} className={s.dice_sound_btn}>
            <Image
              src={playSounds ? soundIco : soundOffIco}
              alt={playSounds ? "sound-on" : "sound-off"}
            />
          </button> */}
        </div>
        <div className={s.dice_value_container}>
          {diceValue.map((dice) => (
            <div key={dice.id} className={s.dice_under_conteiner}>
              <h3 className={s.dice_under_title}>
                {dice.title}{" "}
                {dice.title === "Roll" ? rollOver ? "Over" : "Under" : <></>}
              </h3>
              <div className={clsx(s.dice_under_data)}>
                <span className={s.dice_under_value}>{dice.value}</span>
                <div
                  className={clsx(
                    s.dice_under_img,
                    dice.title === "Roll" && s.dice_under_data_medium
                  )}
                >
                  <Image
                    onClick={() => {
                      dice.title === "Roll" && changeBetween();
                    }}
                    src={dice.img_src}
                    alt={dice.img_src}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dice;
