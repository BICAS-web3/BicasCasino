import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import clsx from "clsx";
import cityStartImg from "@/public/media/cars/bgStart.png";
import cityFinishImg from "@/public/media/cars/cityMain.png";
import cityMainImg from "@/public/media/cars/cityMain.png";
import moonImg from "@/public/media/cars/moonBg.png";
import staticBg from "@/public/media/cars/staticBg.png";
import { Car1 } from "@/shared/SVGs/Car1";
import mountainsBg from "@/public/media/cars/mountainsBg.png";
import { Car2 } from "@/shared/SVGs/Car2";
import stopLine from "@/public/media/cars/stopLine.png";

//?-------------------------------------
import { SidePickerModel } from "../CoinFlipSidePicker";
import { useUnit } from "effector-react";
import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { sessionModel } from "@/entities/session";
import { ABI as ICoinFlip } from "@/shared/contracts/CoinFlipABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { useDebounce } from "@/shared/tools";
import { WagerGainLossModel } from "../WagerGainLoss";
import { TOKENS } from "@/shared/tokens";
import { useFeeData } from "wagmi";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import * as CarModel from "./model";

interface CarsRaceProps {
  gameText: string;
}

export const CarsRace: FC<CarsRaceProps> = ({ gameText }) => {
  const [testGame, setTestGame] = useState(false);
  const [wheelStart, setWheelStart] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  const startImgAnim = () => {};

  const [bgWidth, setBgWidth] = useState<any>();

  useEffect(() => {
    const el = document.getElementById("cars_bg_wrap");

    const handleResize = () => {
      const width = window.innerWidth;

      setBgWidth(el?.offsetWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [imageLoading, setIMageLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [
    lost,
    profit,
    playSounds,
    pickedSide,
    setActivePicker,
    pickSide,
    wagered,
    setWagered,
    betsAmount,
    gameAddress,
    pickedToken,
    currentBalance,
    cryptoValue,
    stopGain,
    stopLoss,
    allowance,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    setCoefficient,
    waitingResponse,
    setWaitingResponse,
    setIsPlaying,
    setBetValue,
    betValue,
    refund,
    setRefund,
    carNumber,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$playSounds,
    SidePickerModel.$pickedSide,
    SidePickerModel.setActive,
    SidePickerModel.pickSide,
    WagerButtonModel.$Wagered,
    WagerButtonModel.setWagered,
    CustomWagerRangeInputModel.$pickedValue,
    sessionModel.$gameAddress,
    WagerModel.$pickedToken,
    sessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerGainLossModel.$stopGain,
    WagerGainLossModel.$stopLoss,
    sessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    ProfitModel.setCoefficient,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.setBetValue,
    GameModel.$betValue,
    GameModel.$refund,
    GameModel.setRefund,
    CarModel.$carNumber,
  ]);
  const [isPlaying] = useUnit([GameModel.$isPlaying]);

  const [coefficientData, setCoefficientData] = useState<number[]>([]);

  useEffect(() => {
    setCoefficient(1.98);
  }, []);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data, isError } = useFeeData({ watch: true });

  const [inGame, setInGame] = useState<boolean>(false);

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: "0xA7867C5891D9518bfB21BC55cF8EC641011e8799",
    abi: ICoinFlip,
    functionName: "CoinFlip_GetState",
    args: [address],
    enabled: true,
    //watch: isConnected && !inGame,
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

  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (data && data.gasPrice) {
      setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
    }
  }, [data]);

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
  //   address: '0xA7867C5891D9518bfB21BC55cF8EC641011e8799',
  //   abi: ICoinFlip,
  //   functionName: "CoinFlip_Refund",
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

  const [fees, setFees] = useState<bigint>(BigInt(0));

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: "0xA7867C5891D9518bfB21BC55cF8EC641011e8799",
    abi: ICoinFlip,
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

  const [value, setValue] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const newValue =
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
          BigInt(100000000000)
        : BigInt(0));
    setValue(
      fees +
        (pickedToken &&
        pickedToken.contract_address ==
          "0x0000000000000000000000000000000000000000"
          ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
            BigInt(100000000000)
          : BigInt(0))
    );

    setBetValue(newValue + BigInt(400000) * prevGasPrice);
  }, [fees, pickedToken, cryptoValue, betsAmount, prevGasPrice]);

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite({
    chainId: chain?.id,
    address: "0xA7867C5891D9518bfB21BC55cF8EC641011e8799",
    abi: ICoinFlip,
    functionName: "CoinFlip_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      pickedToken?.contract_address,
      carNumber === 2 ? true : false,
      betsAmount,
      useDebounce(stopGain)
        ? BigInt(Math.floor((stopGain as number) * 10000000)) *
          BigInt(100000000000)
        : BigInt(Math.floor(cryptoValue * 10000000)) *
          BigInt(100000000000) *
          BigInt(200),
      useDebounce(stopLoss)
        ? BigInt(Math.floor((stopLoss as number) * 10000000)) *
          BigInt(100000000000)
        : BigInt(Math.floor(cryptoValue * 10000000)) *
          BigInt(100000000000) *
          BigInt(200),
    ],
    value: value,
  });

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
      setWaitingResponse(true);
    }
  }, [startedPlaying]);

  useContractEvent({
    address: "0xA7867C5891D9518bfB21BC55cF8EC641011e8799",
    abi: ICoinFlip,
    eventName: "CoinFlip_Outcome_Event",
    listener(log) {
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("args----------", (log[0] as any).args);
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

  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0.1);
  const [gameResult, setGameResult] = useState<
    { value: number; status: "won" | "lost" }[]
  >([]);
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
      <section
        className={s.cars_table_wrap}
        onClick={() => {
          setTestGame(!testGame);
          setWheelStart(!wheelStart);
          setTimeout(() => {
            setShowFinish(true);
            setTimeout(() => {
              setWheelStart(false);
            }, 1500);
          }, 14000);
        }}
      >
        <WagerLowerBtnsBlock
          //   className={s.cars_btns}
          game="Cars"
          text={gameText}
        />
        <div className={s.cars_table_background} id="cars_bg_wrap">
          <img src={staticBg.src} alt="static-bg" className={s.static_bg_img} />
          <img
            src={moonImg.src}
            className={s.static_moon_img}
            alt="static-moon"
          />
          <div
            className={clsx(s.start_bg_img, testGame && s.start_bg_img_hide)}
          >
            <img
              src={cityStartImg.src}
              className={s.start_bg_city}
              alt="start-bg-img"
            />
            <img
              src={stopLine.src}
              className={s.start_stop_line}
              alt="stop-line"
            />
          </div>
          <img
            src={mountainsBg.src}
            className={clsx(
              s.main_mountains_bg,
              testGame && s.main_mountains_bg_hide
            )}
            alt="mountains-bg"
          />
          <img
            src={cityMainImg.src}
            className={clsx(
              s.main_city_bg_img,
              !showFinish && testGame && s.main_city_bg_img_start,
              showFinish && s.main_city_bg_img_finish
            )}
            alt="main-city-bg"
          />
          <img
            src={mountainsBg.src}
            className={clsx(
              s.mountains_second,
              !showFinish && testGame && s.mountains_second_start,
              showFinish && s.mountains_second_finish
            )}
            alt="mountains-bg"
          />
          {showFinish ? (
            <>
              <div
                className={clsx(
                  s.finish_city_bg_img,
                  testGame && s.finish_city_bg_img_finish
                )}
                style={{ "--leftOffset": `${bgWidth}px` } as any}
              >
                <img
                  src={cityFinishImg.src}
                  className={s.finish_city_bg}
                  alt="finish-bg-img"
                />
                <img
                  src={stopLine.src}
                  className={s.finish_stop_line}
                  alt="stop-line"
                />
              </div>
              <img
                src={mountainsBg.src}
                className={clsx(
                  s.finish_mountains_bg,
                  testGame && s.finish_mountains_bg_finish
                )}
                alt="mountains-finish"
              />
            </>
          ) : (
            <>
              <img
                src={cityMainImg.src}
                className={clsx(
                  s.main_city_bg_copy,
                  testGame && s.main_city_bg_copy_start
                )}
                alt="main-city-bg-2"
              />
              <img
                src={mountainsBg.src}
                className={clsx(
                  s.mountains_bg_copy,
                  testGame && s.mountains_bg_copy_start
                )}
                alt="mountains-copy"
              />
            </>
          )}
        </div>
        <div className={s.cars_body}>
          <div className={s.car1_wrap}>
            <Car1 gameStarted={wheelStart} />
          </div>
          <div className={s.car2_wrap}>
            <Car2 gameStarted={wheelStart} />
          </div>
        </div>
      </section>
    </>
  );
};
