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
import slotsImg4 from "@/public/media/slots_images/slots_items/img4.png";
import slotsImg5 from "@/public/media/slots_images/slots_items/img5.png";
import slotsImg6 from "@/public/media/slots_images/slots_items/img6.png";
import slotsImg7 from "@/public/media/slots_images/slots_items/img7.png";

const coefId = [
  5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 12, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 100,
];

const rowItems = [
  slotsImg1,
  slotsImg2,
  slotsImg4,
  slotsImg5,
  slotsImg6,
  slotsImg7,
];
const rowItems_2 = [
  slotsImg1,
  slotsImg2,
  slotsImg4,
  slotsImg5,
  slotsImg6,
  slotsImg7,
];
const rowItems_3 = [
  slotsImg1,
  slotsImg2,
  slotsImg4,
  slotsImg5,
  slotsImg6,
  slotsImg7,
];

import clsx from "clsx";
import { useFeeData } from "wagmi";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitLine } from "../ProfitLine";
import { Preload } from "@/shared/ui/Preload";

interface SlotsGameProps {}

export const SlotsGame: FC<SlotsGameProps> = () => {
  const [is1280, setIs1280] = useState(false);
  const [is996, setIs996] = useState(false);
  const [getId, setGetId] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

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

  const [coefficientData, setCoefficientData] = useState<number[]>([]);
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
    setCoefficient(100);
  }, []);

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
    address: "0x35d710a268b3385283e607b5b0C78a73772A7715",
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

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: "0x35d710a268b3385283e607b5b0C78a73772A7715",
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
      "0x35d710a268b3385283e607b5b0C78a73772A7715",
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
    address: "0x35d710a268b3385283e607b5b0C78a73772A7715",
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
    address: "0x35d710a268b3385283e607b5b0C78a73772A7715",
    abi: SlotsABI,
    eventName: "Slots_Outcome_Event",
    listener(log) {
      //handleLog(log)
      if (
        ((log[0] as any).args?.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("11111,-", (log[0] as any)?.args);
        setGetId(coefId[(log[0] as any).args?.slotIDs[0]]);
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

  const { config: refundConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: SlotsABI,
    functionName: "Slots_Refund",
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

  const [startFirst, setStartFirst] = useState(false);
  const [startSecond, setStartSecond] = useState(false);
  const [startThird, setStartThird] = useState(false);
  const [startFirstSquese, setStartFirstSquese] = useState(false);
  const [startSecondSquese, setStartSecondSquese] = useState(false);
  const [startThirdSquese, setStartThirdSquese] = useState(false);

  const [test, setTest] = useState(false);

  useEffect(() => {
    if (inGame) {
      setStartFirst(true);
      setStartSecond(true);
      setStartThird(true);
      setStartFirstSquese(false);
      setStartSecondSquese(false);
      setStartThirdSquese(false);
      setGameStart(true);
    } else {
      setStartFirst(false);
      setStartFirstSquese(true);
      setTimeout(() => {
        setStartSecond(false);
        setStartSecondSquese(true);
      }, 600);
      setTimeout(() => {
        setStartThird(false);
        setStartThirdSquese(true);
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
  const [imageArr1, setImageArr1] = useState(rowItems);
  const [imageArr2, setImageArr2] = useState(rowItems_2);
  const [imageArr3, setImageArr3] = useState(rowItems_3);

  const updateImageColumn = (
    column: any,
    indexToUpdate: any,
    image: any
  ): any => {
    return column.map((el: any, i: any) => (i === indexToUpdate ? image : el));
  };

  useEffect(() => {
    if (getId === 0) {
      const randomInteger_1 = Math.floor(Math.random() * 4);
      randomInteger_1 >= 1
        ? setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg1))
        : setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg2));
      const randomInteger_2 = Math.floor(Math.random() * 3) + 4;
      randomInteger_2 >= 5
        ? setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg5))
        : setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg6));
    } else if (getId === 2) {
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg1));
      setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg2));
      setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg4));
    } else if (getId === 3) {
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg1));
      setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg1));
    } else if (getId === 5) {
      setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg1));
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg1));
      setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg1));
    } else if (getId === 10) {
      setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg2));
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg2));
      if (localStatus === GameModel.GameStatus.Won) {
        setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg2));
      } else {
        setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg7));
      }
    } else if (getId === 12) {
      setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg5));
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg5));
      if (localStatus === GameModel.GameStatus.Won) {
        setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg5));
      } else {
        setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg7));
      }
    } else if (getId === 20) {
      setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg4));
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg4));
      if (localStatus === GameModel.GameStatus.Won) {
        setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg4));
      } else {
        setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg7));
      }
    } else if (getId === 45) {
      setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg7));
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg7));
      setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg7));
    } else if (getId === 100) {
      setImageArr1((prev: any) => updateImageColumn(prev, 2, slotsImg6));
      setImageArr2((prev: any) => updateImageColumn(prev, 2, slotsImg6));
      setImageArr3((prev: any) => updateImageColumn(prev, 2, slotsImg6));
    }
  }, [getId, localStatus]);

  useEffect(() => {
    console.log(99, imageArr1, imageArr2, imageArr3);
  }, [imageArr1, imageArr2, imageArr3]);
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
  const [imageLoading_2, setImageLoading_2] = useState(true);
  const [imageLoading_3, setImageLoading_3] = useState(true);
  const [imageLoading_4, setImageLoading_4] = useState(true);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    if (
      !imageLoading_1 &&
      !imageLoading_2 &&
      !imageLoading_3 &&
      !imageLoading_4
    ) {
      setIsLoading(imageLoading_1);
    }
  }, [imageLoading_1, imageLoading_2, imageLoading_3, imageLoading_4]);
  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div
        // onClick={() => setTest((prev) => !prev)}
        className={s.slots_table_wrap}
      >
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock game="slots" text={"Slots"} />
        <div className={s.slots_table_background}>
          <img
            onLoad={() => setImageLoading_1(false)}
            src={is1280 ? slots1280Bg.src : slotsBg.src}
            className={s.slots_table_background}
            alt="slots-static-bg"
          />
        </div>
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
        <div className={s.slots_table}>
          <div
            className={clsx(
              s.row_wrap,
              startFirst && s.start_game,
              startFirstSquese && gameStart && s.squese
            )}
          >
            {imageArr1.map((img, ind) => (
              <img
                onLoad={() => setImageLoading_2(false)}
                src={img.src}
                key={ind}
                className={s.row_img}
              />
            ))}
          </div>
          <div
            className={clsx(
              s.row_wrap,
              startSecond && s.start_game_2,
              startSecondSquese && gameStart && s.squese
            )}
          >
            {imageArr2.map((img, ind) => (
              <img
                onLoad={() => setImageLoading_3(false)}
                src={img.src}
                key={ind}
                className={s.row_img}
              />
            ))}
          </div>
          <div
            className={clsx(
              s.row_wrap,
              startThird && s.start_game,
              startThirdSquese && gameStart && s.squese
            )}
          >
            {imageArr3.map((img, ind) => (
              <img
                onLoad={() => setImageLoading_4(false)}
                src={img.src}
                key={ind}
                className={s.row_img}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
