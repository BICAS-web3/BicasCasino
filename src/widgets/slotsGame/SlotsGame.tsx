import { FC, useEffect, useState } from "react";

import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

import { useUnit } from "effector-react";

import useSound from "use-sound";

import { Model as RollSettingModel } from "@/widgets/RollSetting";
import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";

import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as SlotsABI } from "@/shared/contracts/SlotsABI";
import { useDebounce } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";
import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { WagerGainLossModel } from "../WagerGainLoss";
import { SidePickerModel } from "../CoinFlipSidePicker";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";

import * as DiceM from "./model";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { ProfitModel } from "../ProfitBlock";
import s from "./styles.module.scss";
import slotsBg from "@/public/media/slots_images/slotsMainBg.png";
import slots1280Bg from "@/public/media/slots_images/slots1280Bg.png";

import slotsImg1 from "@/public/media/slots_images/slots_items/img1.png";
import slotsImg2 from "@/public/media/slots_images/slots_items/img2.png";
import slotsImg3 from "@/public/media/slots_images/slots_items/img3.png";
import slotsImg4 from "@/public/media/slots_images/slots_items/img4.png";
import slotsImg5 from "@/public/media/slots_images/slots_items/img5.png";
import slotsImg6 from "@/public/media/slots_images/slots_items/img6.png";
import slotsImg7 from "@/public/media/slots_images/slots_items/img7.png";

const rowItems = [
  slotsImg1,
  slotsImg2,
  slotsImg3,
  slotsImg4,
  slotsImg5,
  slotsImg6,
  slotsImg7,
];
const rowItems_2 = [
  slotsImg2,
  slotsImg1,
  slotsImg4,
  slotsImg3,
  slotsImg7,
  slotsImg5,
  slotsImg6,
];
const rowItems_3 = [
  slotsImg1,
  slotsImg5,
  slotsImg6,
  slotsImg7,
  slotsImg2,
  slotsImg3,
  slotsImg4,
];

import clsx from "clsx";
import { useFeeData } from "wagmi";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitLine } from "../ProfitLine";

interface SlotsGameProps {}

export const SlotsGame: FC<SlotsGameProps> = () => {
  const [is1280, setIs1280] = useState(false);
  const [is996, setIs996] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 1280 && width > 996) {
        setIs1280(true);
        setIs996(false);
      } else if (width < 996) {
        setIs1280(false);
        setIs996(true);
      } else {
        setIs1280(false);
        setIs996(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
    address: "0x157252ca0672b9569d82870ce98836e310a3a837",
    abi: SlotsABI,
    functionName: "Slots_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    args: [
      useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
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
      pickedToken?.contract_address ==
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

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: "0x157252ca0672b9569d82870ce98836e310a3a837",
    abi: SlotsABI,
    functionName: "Slots_GetState",
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
      "0x157252ca0672b9569d82870ce98836e310a3a837",
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
    address: "0x157252ca0672b9569d82870ce98836e310a3a837",
    abi: SlotsABI,
    functionName: "getVRFFee",
    args: [0],
    watch: isConnected && !inGame,
  });

  useEffect(() => {
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(1100000) * (data.gasPrice + data.gasPrice / BigInt(4))
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
  useEffect(() => {
    setActivePicker(true);
    setInGame(false);
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide);
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1);
    }
  }, [gameStatus]);

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

  useContractEvent({
    address: "0x157252ca0672b9569d82870ce98836e310a3a837",
    abi: SlotsABI,
    eventName: "Slots_Outcome_Event",
    listener(log) {
      //handleLog(log)
      if (
        ((log[0] as any).args?.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("11111,-", (log[0] as any)?.args);
        setWaitingResponse(false);
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);
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
            if (setAllowance) setAllowance();
            //return;
          } else {
            //setActiveCards(initialArrayOfCards);
            // alert(1);
            if (startPlaying) {
              startPlaying();
            }
          }
        }
      }
      setWagered(false);
    }
  }, [wagered]);

  const [startFirst, setStartFirst] = useState(false);
  const [startSecond, setStartSecond] = useState(false);
  const [startThird, setStartThird] = useState(false);

  useEffect(() => {
    if (inGame) {
      setStartFirst(true);
      setStartSecond(true);
      setStartThird(true);
    } else {
      setStartFirst(false);
      setTimeout(() => {
        setStartSecond(false);
      }, 600);
      setTimeout(() => {
        setStartThird(false);
      }, 1200);
    }
  }, [inGame]);

  const [localStatus, setLocalStatus] = useState<any>();

  useEffect(() => {
    if (gameStatus !== null) {
      setLocalStatus(gameStatus);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (inGame) {
      setLocalStatus(null);
    }
  }, [inGame]);

  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={s.slots_table_wrap}>
        <WagerLowerBtnsBlock game="slots" text={"Slots"} />
        <div className={s.slots_table_background}>
          <img
            src={is1280 ? slots1280Bg.src : slotsBg.src}
            className={s.slots_table_background}
            alt="slots-static-bg"
          />
        </div>
        <ProfitLine containerClassName={s.total_container} />
        <div className={s.slots_table}>
          <div className={clsx(s.row_wrap, startFirst && s.start_game)}>
            {rowItems.map((img, ind) => (
              <img src={img.src} key={ind} className={s.row_img} />
            ))}
          </div>
          <div className={clsx(s.row_wrap, startSecond && s.start_game_2)}>
            {(localStatus === GameModel.GameStatus.Lost
              ? rowItems_2
              : rowItems
            ).map((img, ind) => (
              <img src={img.src} key={ind} className={s.row_img} />
            ))}
          </div>
          <div className={clsx(s.row_wrap, startThird && s.start_game)}>
            {(localStatus === GameModel.GameStatus.Lost
              ? rowItems_3
              : rowItems
            ).map((img, ind) => (
              <img src={img.src} key={ind} className={s.row_img} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
