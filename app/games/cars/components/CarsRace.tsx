"use client"
import { FC, useEffect, useState } from "react";
import cityStartImg from "@/public/images/cars/bgStart.webp";
import cityMainImg from "@/public/images/cars/cityMain.webp";
import moonImg from "@/public/images/cars/moonBg.webp";
import staticBg from "@/public/images/cars/staticBg.webp";
import { Car1 } from "@/public/SVGs/Car1";
import mountainsBg from "@/public/images/cars/mountainsBg.webp";
import { Car2 } from "@/public/SVGs/Car2";
import stopLine from "@/public/images/cars/stopLine.webp";
import { UserModel } from "@/states";

//?-------------------------------------
// import { SidePickerModel } from "../CoinFlipSidePicker";
import { useUnit } from "effector-react";
// import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "@/states";
// import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import { GameModel } from "@/states";
import useSound from "use-sound";
// import {
//   useAccount,
//   useContractEvent,
//   useContractRead,
//   useContractWrite,
//   useNetwork,
//   usePrepareContractWrite,
//   useWaitForTransaction,
// } from "wagmi";
import { SessionModel } from "@/states";
import { useMediaQuery } from "usehooks-ts";
// import { WagerGainLossModel } from "../WagerGainLoss";
// import { useFeeData } from "wagmi";
// import { ProfitModel } from "../ProfitBlock";
import * as CarModel from "./model";
// import { RaceWin } from "@/shared/ui/RaceWin";
import ReactHowler from "react-howler";
// import * as BalanceModel from "@/widgets/BalanceSwitcher/model";
// import * as LayoutModel from "@/widgets/Layout/model";
// import * as BetsModel from "@/widgets/LiveBets/model";
import { useSocket } from "@/components/providers/socket.provider";
import { RegistrModel } from "@/states"; 

interface CarsRaceProps {
  gameText: string;
}

export const CarsRace: FC<CarsRaceProps> = ({ gameText }) => {
  const [startGame, setStartGame] = useState(false);
  const [wheelStart, setWheelStart] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  const [bgWidth, setBgWidth] = useState<any>();

  useEffect(() => {
    const el = document.getElementById("cars_bg_wrap");

    const handleResize = () => {
      setBgWidth(el?.offsetWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [imageLoading, setIMageLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [
    lost,
    profit,
    playSounds,
    // pickedSide,
    // setActivePicker,
    // pickSide,
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
    // setCoefficient,
    waitingResponse,
    setWaitingResponse,
    setIsPlaying,
    setBetValue,
    betValue,
    refund,
    setRefund,
    carNumber,
    gameResult,
    setGameResult,
    reset,
    setReset,
    // result,
    // setResult,
    // isDrax,
    // userInfo,
    isDrax,
    userInfo
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$playSounds,
    // SidePickerModel.$pickedSide,
    // SidePickerModel.setActive,
    // SidePickerModel.pickSide,
    WagerModel.$Wagered,
    WagerModel.setWagered,
    WagerModel.$pickedValue,
    SessionModel.$gameAddress,
    WagerModel.$pickedToken,
    SessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    SessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    // ProfitModel.setCoefficient,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.setBetValue,
    GameModel.$betValue,
    GameModel.$refund,
    GameModel.setRefund,
    CarModel.$carNumber,
    CarModel.$gameResult,
    CarModel.setGameResult,
    CarModel.$reset,
    CarModel.setReset,
    // BetsModel.$result,
    // BetsModel.setResult,
    // BalanceModel.$isDrax,
    // LayoutModel.$userInfo,
    UserModel.$isDrax,
    UserModel.$userInfo
  ]);

  // useEffect(() => {
  //   if (result !== null && result?.type === "Bet") {
  //     const fullAmount = Number(result.amount) * result.num_games!;
  //     const numArr = JSON.parse(result.profits);
  //     const handlePayouts = () => {
  //       for (let i = 0; i < numArr?.length; i++) {
  //         setTimeout(() => {
  //           const outCome = Number(numArr[i]) / Number(result.amount);
  //           setCoefficientData((prev) => [outCome, ...prev]);
  //         }, 700 * (i + 1));
  //       }
  //     };
  //     Promise.all([
  //       new Promise((resolve) =>
  //         setTimeout(() => resolve(handlePayouts()), 6000)
  //       ),
  //     ]);
  //     if (
  //       Number(result.profit) > Number(result.amount) ||
  //       Number(result.profit) === Number(result.amount)
  //     ) {
  //       const multiplier = Number(
  //         Number(result.profit) / Number(result.amount)
  //       );
  //       Promise.all([
  //         new Promise((resolve) =>
  //           setTimeout(
  //             () => resolve(setGameStatus(GameModel.GameStatus.Won)),
  //             6000
  //           )
  //         ),
  //         new Promise((resolve) =>
  //           setTimeout(
  //             () =>
  //               resolve(
  //                 setWonStatus({
  //                   profit: Number(result.profit),
  //                   multiplier,
  //                   token: "DRAX",
  //                 })
  //               ),
  //             6000
  //           )
  //         ),
  //         new Promise((resolve) =>
  //           setTimeout(() => resolve(setIsPlaying(false)), 6000)
  //         ),
  //         // new Promise((resolve) =>
  //         //   setTimeout(() => resolve(setInGame(false)), 6000)
  //         // ),
  //       ]);
  //     } else if (Number(result.profit) < Number(result.amount)) {
  //       Promise.all([
  //         new Promise((resolve) =>
  //           setTimeout(
  //             () => resolve(setGameStatus(GameModel.GameStatus.Lost)),
  //             6000
  //           )
  //         ),
  //         new Promise((resolve) =>
  //           setTimeout(() => resolve(setIsPlaying(false)), 6000)
  //         ),
  //         // new Promise((resolve) =>
  //         //   setTimeout(() => resolve(setInGame(false)), 6000)
  //         // ),
  //         new Promise((resolve) =>
  //           setTimeout(
  //             () =>
  //               resolve(
  //                 setLostStatus(Number(result.profit) - Number(result.amount))
  //               ),
  //             6000
  //           )
  //         ),
  //       ]);
  //     } else {
  //       setGameStatus(GameModel.GameStatus.Draw);
  //       setIsPlaying(false);
  //       setInGame(false);
  //     }
  //     setResult(null);
  //   }
  // }, [result?.timestamp, result, gameStatus]);

  const [raceWin] = useSound("/music/race_win.mp3", { volume: 1 });
  const [raceLose] = useSound("/music/race_lose.mp3", { volume: 1 });

  const [isPlaying] = useUnit([GameModel.$isPlaying]);

  const [coefficientData, setCoefficientData] = useState<number[]>([]);

  // useEffect(() => {
  //   setCoefficient(1.98);
  // }, []);

  const [inGame, setInGame] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  const [watchAllowance, setWatchAllowance] = useState<boolean>(false);


  const [fees, setFees] = useState<bigint>(BigInt(0));

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
            // if (setAllowance) {
            //   setAllowance();
            //   setActivePicker(false);
            //   setInGame(true);
            //   setWaitingResponse(true);
            // }
          } else {
            // if (startPlaying) {
            //   startPlaying();
            // }
          }
        }
      }
      setWagered(false);
    }
  }, [wagered]);

  // useEffect(() => {
  //   setActivePicker(true);
  //   setInGame(false);
  //   if (gameStatus == GameModel.GameStatus.Won) {
  //     pickSide(pickedSide);
  //   } else if (gameStatus == GameModel.GameStatus.Lost) {
  //     pickSide(pickedSide ^ 1);
  //   }
  // }, [gameStatus]);

  const [taken, setTaken] = useState(false);
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true);
    }
  }, [betsAmount, cryptoValue, isPlaying]);

  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0.1);
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon((prev) => prev + profit);

      setGameResult([carNumber, carNumber === 1 ? 2 : 1]);
      raceWin();
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      raceLose();
      setFullLost((prev) => prev + lost);
      setGameResult([carNumber === 1 ? 2 : 1, carNumber]);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);

  // useEffect(() => {
  //   if (startGame) {
  //     Promise.all([
  //       setTimeout(() => {
  //         setGameResult([1, 2]);
  //         setInGame(false);
  //       }, 5000),
  //     ]);
  //   }
  // }, [startGame]);

  const [raceSound, setRaceSound] = useState(false);

  const [carStart] = useSound("/music/car_start.mp3", { volume: 1 });

  const [carInProgress, setCarInProgress] = useState(false);
  useEffect(() => {
    if (isPlaying) {
      if (playSounds !== "off") {
        carStart();
      }

      Promise.all([
        new Promise((resolve) =>
          setTimeout(() => resolve(setRaceSound(true)), 300)
        ),
        new Promise((resolve) =>
          setTimeout(() => resolve(setCarInProgress(true)), 3000)
        ),
        new Promise((resolve) =>
          setTimeout(() => resolve(setWheelStart(true)), 1500)
        ),
        new Promise((resolve) =>
          setTimeout(() => resolve(setStartGame(true)), 1500)
        ),
      ]);
    } else {
      setTimeout(() => setRaceSound(false), 4500);
    }
  }, [isPlaying]);

  const [randomeMove, setRandomMove] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const generateRandomNumber = () => {
      if (gameResult.length === 0 && startGame) {
        const randomValue = Math.random() * 4 - 2;
        const roundedRandomValue = Math.round(randomValue);

        setRandomMove(roundedRandomValue);
      } else {
        setRandomMove(null);
      }
    };

    if (gameResult.length === 0 && startGame) {
      setTimeout(() => {
        generateRandomNumber();
        intervalId = setInterval(generateRandomNumber, 3000);
      }, 7000);
    } else {
      setRandomMove(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameResult, startGame]);

  useEffect(() => {
    if (reset) {
      setGameResult([]);
      setStartGame(false);
      setWheelStart(false);
      setShowFinish(false);
      setCarInProgress(false);
      setReset(false);
      setStopAnimation(false);
    }
  }, [reset]);

  useEffect(() => {
    if (gameResult.length > 0) {
      setShowFinish(true);
      setTimeout(() => setStopAnimation(true), 2500);
    }
  }, [gameResult.length]);

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isSmall = useMediaQuery("(max-width: 420px)");
  const [stepValue, setStepValue] = useState(90);

  useEffect(() => {
    if (isDesktop) {
      setStepValue(150);
    } else {
      setStepValue(50);
    }
  }, [isDesktop]);

  const [stopAnimation, setStopAnimation] = useState(false);

  const [gamesList] = useUnit([GameModel.$gamesList]);
  const [betData, setBetData] = useState({});

  const [access_token] = useUnit([RegistrModel.$access_token]);
  const subscribe = {
    type: "SubscribeBets",
    payload: [gamesList.find((item) => item.name === "Race")?.id],
  };
  useEffect(() => {
    setBetData({
      type: "MakeBet",
      game_id: gamesList.find((item) => item.name === "Race")?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"car":${carNumber}}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount,
    });
  }, [stopGain, stopLoss, cryptoValue, betsAmount, isDrax]);

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

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: "UnsubscribeBets",
          payload: [gamesList.find((item) => item.name === "CarRace")?.id],
        })
      );
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setStartGame(true);
      setWheelStart(true);
    }
  }, [isPlaying]);

  // useEffect(() => alert(startGame), [startGame]);

  return (
    <section
      className="w-full h-full relative overflow-hidden"
    // onClick={() => {
    //   setInGame(true);
    // }}
    >
      {/* <WagerLowerBtnsBlock
        game="Cars"
        text={gameText}
        className={s.car_lower_btn}
      /> */}
      {/* {gameStatus === GameModel.GameStatus.Won && (
        <RaceWin className={s.win_index} />
      )} */}
      <ReactHowler
        src={"/music/car_process.mp3"}
        playing={raceSound && playSounds !== "off"}
        loop
      />
      <div 
        className="
          rounded-[0] sm:rounded-[20px_0_0_0] w-full h-full absolute right-0 top-0 left-0 bottom-0
          overflow-hidden 
        "
        id="cars_bg_wrap">
        <img src={staticBg.src} alt="static-bg" className="
          absolute w-full min-h-[max-content] left-0 bottom-0 top-0 right-0 
        " />
        <img
          src={moonImg.src}
          className="
            absolute w-[1078px] sm:w-[1438px] h-full top-0 left-0 right-0 bottom-0
          "
          alt="static-moon"
        />
        <div 
          // className={clsx(s.start_bg_img, startGame && s.start_bg_img_hide)}
          className={`
            min-w-[1078px] sm:min-w-[1438px] 3xl:w-full 3xl:min-w-[100%] 4xl:w-full
            left-0 top-0 absolute h-full z-10
            ${startGame && 'start_bg_img_hide'}
          `}
        >
          <img
            onLoad={() => setIsLoading(false)}
            src={cityStartImg.src}
            className="
              w-full h-full absolute top-0 6xl:object-cover
            "
            alt="start-bg-img"
          />
          <img
            src={stopLine.src}
            className="
              absolute left-[250px] xs:left-[300px] sm:left-[350px] bottom-[-35px] sm:bottom-[-15px] h-[100px] sm:h-[auto]
            "
            alt="stop-line"
          />
        </div>
        <img
          src={mountainsBg.src}
          // className={clsx(
          //   s.main_mountains_bg,
          //   startGame && s.main_mountains_bg_hide
          // )}
          className={`
            min-w-[1078px] sm:min-w-[1478px] 3xl:min-w-[100%] left-0 top-0 h-full w-full absoluite z-[8]
            ${startGame && 'main_mountains_bg_hide'}
          `}
          alt="mountains-bg"
        />
        <img
          src={cityMainImg.src}
          // className={clsx(
          //   s.main_city_bg_img,
          //   startGame && s.main_city_bg_img_start,
          //   stopAnimation && s.stop_animation
          // )}
          className={`
            left-[1078px] min-w-[1078px] sm:left-[1438px] sm:min-w-[1478px] 3xl:left-[100%] 3xl:min-w-[100%]
            h-full w-full top-0 absolute z-10 5xl:w-full
            ${startGame && 'main_city_bg_img_start'}
            ${stopAnimation && 'stop_animation'}
          `}
          alt="main-city-bg"
        />
        <img
          src={mountainsBg.src}
          // className={clsx(
          //   s.mountains_second,
          //   startGame && s.mountains_second_start,
          //   stopAnimation && s.stop_animation
          // )}
          className={`
            z-[8] absolute left-[2146px] min-w-[1078px] sm:left-[2876px] sm:min-w-[1478px]
            3xl:left-[200%] 3xl:min-w-[100%] h-full w-full top-0
            ${stopAnimation && 'stop_animation'}
            ${startGame && 'mountains_second_start'}
          `}
          alt="mountains-bg"
        />
        <div
          // className={clsx(
          //   s.finish_city_bg_img,
          //   showFinish && s.finish_city_bg_img_finish
          // )}
          className={`
            z-[14] absolute w-full h-full right-[-200%] top-0 min-w-[1078px] sm:min-w-[1478px] 3xl:min-w-[100%]
            ${showFinish && 'finish_city_bg_img_finish'}
          `}
        >
          <img
            src={stopLine.src}
            className="
              right-[50px] xs:right-[100px] emd:right-[180px] mmd:right-[250px]
              bottom-[-35px] sm:bottom-[-15px] absolute
            "
            alt="stop-line"
          />
        </div>
        <img
          // className={clsx(
          //   s.main_city_bg_copy,
          //   startGame && s.main_city_bg_copy_start,
          //   stopAnimation && s.stop_animation
          // )}
          className={`
            z-10 absolute w-full h-full top-0 left-[2146px] sm:left-[2876px] 3xl:left-[200%]
            min-w-[1078px] sm:min-w-[1478px] 3xl:min-w-[100%]
            ${stopAnimation && 'stop_animation'}
            ${startGame && 'main_city_bg_copy_start'}
          `}
          src={cityMainImg.src}
          alt="main-city-bg-2"
        />
        <img
          src={mountainsBg.src}
          // className={clsx(
          //   s.mountains_bg_copy,
          //   startGame && s.mountains_bg_copy_start,
          //   stopAnimation && s.stop_animation
          // )}
          className={`
            top-0 absolute z-[8] left-[2146px] min-w-[1078px] sm:left-[2876px] sm:min-w-[1478px] 3xl:left-[200%] h-full w-full 3xl:min-w-[100%]
            ${stopAnimation && 'stop_animation'}
            ${startGame && 'mountains_bg_copy_start'}
          `}
          alt="mountains-copy"
        />
      </div>
      <div className="
        w-full h-full relative
      ">
        <div
          style={{
            left:
              startGame &&
                gameResult.length === 0 &&
                randomeMove !== 0 &&
                (randomeMove === 1 || randomeMove === -1)
                ? `${randomeMove > 0 ? stepValue : -stepValue}px`
                : isSmall
                  ? "15px"
                  : "50px",
          }}
          // className={clsx(
          //   s.car1_wrap,
          //   carInProgress && s.car_progress,
          //   startGame && s.car_inGame,
          //   s[`car_wrap_animation_${gameResult[0]}`]
          // )}
          className={`
            car_wrap car1_wrap
            absolute transition-all duration-300 left-[15px] sx:left-[50px] h-[66px] w-[215px] bottom-[10px] sm:bottom-[auto] sm:w-[auto] sm:h-[auto] z-[17]
            ${carInProgress && 'translate-x-[20px] sm:translate-x-[80px] mmd:translate-x-[120px] 3xl:translate-x-[200px]'}
            ${`car_wrap_animation_${gameResult[0]}`}
            ${startGame && 'car_inGame'}
          `}
        >
          <Car1 gameStarted={wheelStart} />
        </div>
        <div
          style={{
            left:
              startGame &&
                gameResult.length === 0 &&
                randomeMove !== 0 &&
                (randomeMove === 2 || randomeMove === -2)
                ? `${randomeMove > 0 ? stepValue : -stepValue}px`
                : isSmall
                  ? "30px"
                  : "70px",
          }}
          className={`
          absolute transition-all duration-300 w-[200px] h-[62px] bottom-[45px] 
          ${carInProgress && 'translate-x-[20px] sm:translate-x-[80px] mmd:translate-x-[120px] 3xl:translate-x-[200px]'}
          ${`car_wrap_animation_${gameResult[1]}`}
          ${startGame && 'car_inGame'}
        `}
        >
          <Car2 gameStarted={wheelStart} />
        </div>
      </div>
      <div className="balls_arr">
        {coefficientData.map((item, i) => (
          <div
            className={`
              multiplier_value ${item > 0 ? 'multiplier_positive' : 'multiplier_negative'}
            `}
            key={i}
          >
            {item?.toFixed(2)}x
          </div>
        ))}
      </div>
      <div className='total_container'>
        <span className={'total_won'}>{fullWon.toFixed(2)}</span>
        <span className={'total_lost'}>{fullLost.toFixed(2)}</span>
        <div>
          Total:{" "}
          <span
            // className={clsx(
            //   totalValue > 0 && s.total_won,
            //   totalValue < 0 && s.total_lost
            // )}
            className={`
              ${ totalValue > 0 && 'total_won'}
              ${ totalValue < 0 && 'total_lost'}
            `}
          >
            {Math.abs(totalValue).toFixed(2)}
          </span>
        </div>
      </div>

      {/* {isLoading && <Preload index={s.load_index} className={s.load_index} />} */}
    </section>
  );
};