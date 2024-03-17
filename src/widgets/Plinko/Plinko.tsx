import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/games_assets/plinko/plinkoBgImage3.webp";
import mobilebg from "@/public/media/plinko_images/plinko_mobile_bg.webp";
import { PlinkoPyramid } from "@/shared/ui/PlinkoPiramyd";
import { useStore, useUnit } from "effector-react";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { sessionModel } from "@/entities/session";
import { WagerGainLossModel } from "../WagerGainLoss";
import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import { TOKENS } from "@/shared/tokens";
import { useDebounce, useMediaQuery } from "@/shared/tools";
import * as RegistrM from "@/widgets/Registration/model";
import * as BetsModel from "@/widgets/LiveBets/model";
import { useSocket } from "@/shared/context";
import * as BalanceModel from "@/widgets/BalanceSwitcher/model";
import * as LayoutModel from "@/widgets/Layout/model";

import { pickSide } from "../CoinFlipSidePicker/model";
import { ABI as IPlinko } from "@/shared/contracts/PlinkoABI";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";

import helmet from "@/public/media/plinko_images/helmet.webp";
import statue from "@/public/media/plinko_images/statue.webp";

import * as PlinkoM from "./model";
import clsx from "clsx";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { clearInterval } from "timers";
import { Preload } from "@/shared/ui/Preload";

const testBallPath = [
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
  ],
  //[true, true, false, false, false, true, false, true],
  // [false, true, true, false, false, false, true, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, false, true, true, false, false, false],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, true, false, false, true, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, false, false, false, true, false, true],
  // [false, true, true, false, false, false, false, false],
  // [false, true, true, false, false, false, true, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, false, true, true, false, false, false],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, false, false, false, true, false, true],
  // [false, true, true, false, false, false, false, false],
  // [false, true, true, false, false, false, true, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, false, true, true, false, false, false],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, false, false, false, true, false, true],
  // [true, true, false, false, false, true, false, true],
  // [false, true, true, false, false, false, false, false],
  // [false, true, true, false, false, false, true, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, false, true, true, false, false, false],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, false, false, false, true, false, true],
  // [false, true, true, false, false, false, false, false],
  // [false, true, true, false, false, false, true, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, false, true, true, false, false, false],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, false, false, false, true, false, true],
  // [false, true, true, false, false, false, false, false],
  // [false, true, true, false, false, false, true, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, false, true, true, false, false, false],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, true, true, true, true, true, true],
  // [false, true, true, false, false, false, false, false],
  // [true, true, false, false, false, true, false, true],
  // [true, true, true, true, true, true, true, true],
  // [false, false, false, false, false, false, false, false],
  // [false, true, true, true, true, true, true, true],
  // [false, true, true, true, true, true, true, true],
  // [false, true, true, true, true, true, true, true],
  // [false, true, true, true, true, true, true, true],
  // [false, true, true, true, true, true, true, true],
  // [false, true, true, true, true, true, true, true],
  // [false, true, true, true, true, true, true, true],
  // [false, false, false, false, false, false, false, false],
  // [false, false, false, false, false, false, false, false],
  // [false, false, false, false, false, false, false, false],
  // [false, false, false, false, false, false, false, false],
  // [false, false, false, false, false, false, false, false],
];

interface IPlinko {
  gameText: string;
}

export const Plinko: FC<IPlinko> = ({ gameText }) => {
  const isMobile = useMediaQuery("(max-width: 1280px)");

  const [
    lost,
    profit,
    setPlayingStatus,
    playSounds,
    wagered,
    setWagered,
    rowsAmount,
    pickedValue,
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
    pickedLevel,
    setWaitingResponse,
    setIsPlaying,
    refund,
    setRefund,
    isPlaying,
    result,
    setResult,
    isDrax,
    userInfo,
    gamesList,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    PlinkoM.setPlayingStatus,
    GameModel.$playSounds,
    WagerButtonModel.$Wagered,
    WagerButtonModel.setWagered,
    CustomWagerRangeInputModel.$pickedRows,
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
    levelModel.$level,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.$refund,
    GameModel.setRefund,
    GameModel.$isPlaying,
    BetsModel.$result,
    BetsModel.setResult,
    BalanceModel.$isDrax,
    LayoutModel.$userInfo,
    GameModel.$gamesList,
  ]);
  useEffect(() => {
    if (result !== null && result?.type === "Bet") {
      const fullAmount = Number(result.amount) * result.num_games!;
      const bet_info = JSON.parse(result.bet_info);
      setPath(bet_info.paths);
      if (
        Number(result.profit) > fullAmount ||
        Number(result.profit) === fullAmount
      ) {
        setTimeout(() => {
          setGameStatus(GameModel.GameStatus.Won);
          playSounds !== "off" && playWon();

          const multiplier = Number(Number(result.profit) / fullAmount);
          setWaitingResponse(false);
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: "DRAX",
          });
          setIsPlaying(false);
          setInGame(false);
          setCoefficientData((prev) => [
            Number(result.profit) / fullAmount,
            ...prev,
          ]);
        }, 3000 + pickedValue * 350 + rowsAmount * (rowsAmount > 12 ? 175 : 8 ? 100 : 0));
        // alert("win");
      } else if (Number(result.profit) < fullAmount) {
        setTimeout(() => {
          setWaitingResponse(false);
          setGameStatus(GameModel.GameStatus.Lost);
          setIsPlaying(false);
          setInGame(false);
          playSounds !== "off" && playLost();
          setLostStatus(Number(result.profit) - fullAmount);
          setCoefficientData((prev) => [
            Number(result.profit) / fullAmount,
            ...prev,
          ]);
        }, 3000 + pickedValue * 350 + rowsAmount * (rowsAmount > 12 ? 175 : 8 ? 100 : 0));
        // alert("lost");
      } else {
        setGameStatus(GameModel.GameStatus.Draw);
        setIsPlaying(false);
        setInGame(false);
        setCoefficientData((prev) => [
          Number(result.profit) / fullAmount,
          ...prev,
        ]);
        // alert("draw");
      }
      setResult(null);
    }
  }, [result?.timestamp, result, gameStatus]);

  const [coefficientData, setCoefficientData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const { chain } = useNetwork();
  // const { address, isConnected } = useAccount();
  // const { data } = useFeeData({
  //   watch: isConnected,
  //   cacheTime: 5000,
  // });

  const [inGame, setInGame] = useState<boolean>(false);
  const [path, setPath] = useState<boolean[][] | undefined>(undefined);

  useEffect(() => {
    setInGame(inGame);
  }, [inGame]);

  const [playLost, { stop: stopLost }] = useSound(
    "/static/media/games_assets/music/loseSound.mp3",
    { volume: 1, loop: false }
  );
  const [playWon, { stop: stopWon }] = useSound(
    "/static/media/games_assets/music/winSound.mp3",
    { volume: 1, loop: false }
  );

  useEffect(() => {
    setPath(undefined);
  }, [rowsAmount]);

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

  // useEffect(() => {

  useEffect(() => {
    //setActivePicker(true);
    setInGame(false);
    if (gameStatus == GameModel.GameStatus.Won) {
      //pickSide(pickedSide);
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      //pickSide(pickedSide ^ 1);
    }
  }, [gameStatus]);
  const [multipliers, setMultipliers] = useState<number[]>([]);

  const [ballsArr, setBallsArr] = useState<{ value: number; index: number }[]>(
    []
  );

  useEffect(() => {
    if (ballsArr.length - 1 === path?.length) {
      setTimeout(() => {
        setBallsArr([
          {
            value: -1,
            index: -1,
          },
        ]);
      }, 700);
    }
  }, [ballsArr, path]);
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

  useEffect(() => {
    if (isMobile) {
      if (!imageLoading_1) {
        setIsLoading?.(imageLoading_1);
      }
    } else {
      if (!imageLoading_1 && !imageLoading_2 && !imageLoading_3) {
        setIsLoading?.(imageLoading_1);
      }
    }
  }, [imageLoading_1, imageLoading_2, imageLoading_3]);

  useEffect(() => {
    if (isPlaying) {
      setInGame(true);
    }
  }, [isPlaying]);

  const [betData, setBetData] = useState({});

  const [access_token] = useUnit([RegistrM.$access_token]);
  const subscribe = {
    type: "SubscribeBets",
    payload: [gamesList.find((item) => item.name === "Plinko")?.id],
  };
  useEffect(() => {
    setBetData({
      type: "MakeBet",
      game_id: gamesList.find((item) => item.name === "Plinko")?.id,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"num_rows":${rowsAmount}, "risk":${
        pickedLevel == "easy" ? 0 : pickedLevel == "normal" ? 1 : 2
      }}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: stopLoss ? String(stopLoss) : 0,
      stop_win: stopGain ? String(stopGain) : 0,
      num_games: pickedValue,
    });
  }, [
    stopGain,
    stopLoss,
    cryptoValue,
    isDrax,
    rowsAmount,
    pickedLevel,
    pickedValue,
  ]);

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
          payload: [gamesList.find((item) => item.name === "Dice")?.id],
        })
      );
    };
  }, []);
  return (
    <>
      {/* {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )} */}
      <div className={styles.plinko_table_wrap}>
        {" "}
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock game="plinko" text={gameText} />
        <div className={styles.plinko_table_background}>
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={tableBg}
            className={styles.plinko_table_background_img}
            alt="table-bg"
            width={1418}
            height={680}
            quality={100}
          />
          <Image
            onLoad={() => setImageLoading_2(false)}
            src={helmet}
            className={styles.helmet}
            alt="helmet"
            width={729}
            height={680}
            quality={100}
          />
          <Image
            onLoad={() => setImageLoading_3(false)}
            src={statue}
            className={styles.statue}
            alt="statue"
            width={709}
            height={680}
            quality={100}
          />
        </div>
        <div className={styles.total_container}>
          <span className={styles.total_won}>{fullWon.toFixed(2)}</span>
          <span className={styles.total_lost}>{fullLost.toFixed(2)}</span>
          <div>
            Total:&nbsp;
            <span
              className={clsx(
                totalValue > 0 && styles.total_won,
                totalValue < 0 && styles.total_lost
              )}
            >
              {Math.abs(totalValue).toFixed(2)}
            </span>
          </div>
        </div>
        <div className={styles.plinko_table}>
          <div className={styles.pyramid}>
            <div className={styles.balls_arr}>
              {ballsArr
                .sort((a, b) => b.index - a.index)
                .map(
                  (ball, i) =>
                    multipliers[ball.value] && (
                      <div
                        className={clsx(
                          styles.multiplier_value,
                          multipliers[ball.value] > 1 &&
                            styles.multiplier_positive,
                          multipliers[ball.value] < 1 &&
                            styles.multiplier_negative,
                          multipliers[ball.value] < 0.6 &&
                            styles.multiplier_extranegative
                        )}
                        key={i}
                      >
                        {multipliers[ball.value]}x
                      </div>
                    )
                )}
            </div>
            {path ? (
              <PlinkoPyramid
                inGame={inGame}
                multipliers={multipliers}
                setMultipliers={setMultipliers}
                path={path}
                ballsArr={ballsArr}
                setBallsArr={setBallsArr}
                middleC={multipliers.length}
              />
            ) : (
              <PlinkoPyramid
                inGame={false}
                multipliers={multipliers}
                setMultipliers={setMultipliers}
                path={undefined}
                ballsArr={ballsArr}
                setBallsArr={setBallsArr}
                middleC={multipliers.length}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// const { data: GameState, refetch: fetchGameState } = useContractRead({
//   chainId: chain?.id,
//   address: gameAddress as `0x${string}`,
//   abi: IPlinko,
//   functionName: "Plinko_GetState",
//   args: [address],
//   enabled: true,
//   //watch: isConnected,
//   blockTag: "latest",
// });

// useEffect(() => {
//   if (GameState && !inGame) {
//     if (
//       (GameState as any).requestID != BigInt(0) &&
//       (GameState as any).blockNumber != BigInt(0)
//     ) {
//       setWaitingResponse(true);
//       setInGame(true);
//       //setActivePicker(false);
//       pickSide((GameState as any).isHeads as number);
//     } else {
//       setInGame(false);
//     }
//   }
// }, [GameState]);

// const { config: allowanceConfig } = usePrepareContractWrite({
//   chainId: chain?.id,
//   address: pickedToken?.contract_address as `0x${string}`,
//   abi: IERC20,
//   functionName: "approve",
//   enabled:
//     pickedToken?.contract_address !=
//     "0x0000000000000000000000000000000000000000",
//   args: [
//     gameAddress,
//     useDebounce(
//       currentBalance
//         ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
//         : 0
//     ),
//   ],
//   gasPrice: data?.gasPrice as any,
//   gas: BigInt(50000),
// });

// const {
//   write: setAllowance,
//   error: allowanceError,
//   status: allowanceStatus,
//   data: allowanceData,
// } = useContractWrite(allowanceConfig);

// const [watchAllowance, setWatchAllowance] = useState<boolean>(false);

// const { config: refundConfig } = usePrepareContractWrite({
//   chainId: chain?.id,
//   address: gameAddress as `0x${string}`,
//   abi: IPlinko,
//   functionName: "Plinko_Refund",
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
// useEffect(() => {
//   if (allowanceData) {
//     setWatchAllowance(true);
//   }
// }, [allowanceData]);

// const { isSuccess: allowanceIsSet } = useWaitForTransaction({
//   hash: allowanceData?.hash,
//   enabled: watchAllowance,
// });

// useEffect(() => {
//   if (inGame && allowanceIsSet && watchAllowance) {
//     setWatchAllowance(false);
//     startPlaying();
//   } else if (allowanceError) {
//     setWatchAllowance(false);
//     setPath(undefined);
//     //setActivePicker(false);
//     setInGame(true);
//     setWaitingResponse(true);
//   }
// }, [inGame, allowanceIsSet, allowanceError]);

// const [fees, setFees] = useState<bigint>(BigInt(0));
// const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

// useEffect(() => {
//   if (data && data.gasPrice) {
//     setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
//   }
// }, [data]);

// const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
//   chainId: chain?.id,
//   address: gameAddress as `0x${string}`,
//   abi: IPlinko,
//   functionName: "getVRFFee",
//   args: [0],
//   watch: isConnected && !inGame,
// });

// const [riskLevel, setRiskLevel] = useState(pickedLevel == 'easy' ? 0 : pickedLevel == 'normal' ? 1 : 2);

// useEffect(() => {
//   if (VRFFees && data?.gasPrice) {
//     setFees(
//       BigInt(VRFFees ? (VRFFees as bigint) : 0) +
//         BigInt(2000000) * (data.gasPrice + data.gasPrice / BigInt(4))
//     );
//   }
// }, [VRFFees, data]);

// const { config: startPlayingConfig } = usePrepareContractWrite({
//   chainId: chain?.id,
//   address: gameAddress as `0x${string}`,
//   abi: IPlinko,
//   functionName: "Plinko_Play",
//   args: [
//     BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
//     pickedToken?.contract_address,
//     //pickedSide,
//     rowsAmount,
//     pickedLevel == "easy" ? 0 : pickedLevel == "normal" ? 1 : 2,
//     pickedValue,
//     useDebounce(stopGain)
//       ? BigInt(Math.floor((stopGain as number) * 10000000)) *
//       BigInt(100000000000)
//       : BigInt(Math.floor(cryptoValue * 10000000)) *
//       BigInt(100000000000) *
//       BigInt(200),
//     useDebounce(stopLoss)
//       ? BigInt(Math.floor((stopLoss as number) * 10000000)) *
//       BigInt(100000000000)
//       : BigInt(Math.floor(cryptoValue * 10000000)) *
//       BigInt(100000000000) *
//       BigInt(200),
//   ],
//   value:
//     fees +
//     (pickedToken &&
//       pickedToken.contract_address ==
//       "0x0000000000000000000000000000000000000000"
//       ? BigInt(Math.floor(cryptoValue * 10000000)) *
//       BigInt(100000000000) *
//       BigInt(pickedValue)
//       : BigInt(0)),
//   enabled: true,
//   //gasPrice: data?.gasPrice
//   //gas: BigInt(3000000),
// });

// const {
//   write: startPlaying,
//   isSuccess: startedPlaying,
//   error,
// } = useContractWrite({
//   gasPrice: prevGasPrice,
//   gas: BigInt(450000),
//   chainId: chain?.id,
//   address: gameAddress as `0x${string}`,
//   abi: IPlinko,
//   functionName: "Plinko_Play",
//   args: [
//     BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
//     pickedToken?.contract_address,
//     //pickedSide,
//     rowsAmount,
//     pickedLevel == "easy" ? 0 : pickedLevel == "normal" ? 1 : 2,
//     pickedValue,
//     useDebounce(stopGain)
//       ? BigInt(Math.floor((stopGain as number) * 10000000)) *
//         BigInt(100000000000)
//       : BigInt(Math.floor(cryptoValue * 10000000)) *
//         BigInt(100000000000) *
//         BigInt(200),
//     useDebounce(stopLoss)
//       ? BigInt(Math.floor((stopLoss as number) * 10000000)) *
//         BigInt(100000000000)
//       : BigInt(Math.floor(cryptoValue * 10000000)) *
//         BigInt(100000000000) *
//         BigInt(200),
//   ],
//   value:
//     fees +
//     (pickedToken &&
//     pickedToken.contract_address ==
//       "0x0000000000000000000000000000000000000000"
//       ? BigInt(Math.floor(cryptoValue * 10000000)) *
//         BigInt(100000000000) *
//         BigInt(pickedValue)
//       : BigInt(0)),
// });

// useEffect(() => {
//   if (startedPlaying) {
//     setPath(undefined);
//     //setActivePicker(false);
//     setInGame(true);
//     setWaitingResponse(true);
//   }
// }, [startedPlaying]);

// useContractEvent({
//   address: gameAddress as `0x${string}`,
//   abi: IPlinko,
//   eventName: "Plinko_Outcome_Event",
//   listener(log) {
//     //handleLog(log)

//     if (
//       ((log[0] as any).args.playerAddress as string).toLowerCase() ==
//       address?.toLowerCase()
//     ) {
//       setWaitingResponse(false);
//       const wagered =
//         BigInt((log[0] as any).args.wager) *
//         BigInt((log[0] as any).args.numGames);
//       setPath((log[0] as any).args.paths);
//       if ((log[0] as any).args.payout > wagered) {
//         playSounds !== "off" && playWon();
//         const profit = (log[0] as any).args.payout;
//         const multiplier = Number(profit / wagered);

//         const wagered_token = (
//           (log[0] as any).args.tokenAddress as string
//         ).toLowerCase();
//         const token = TOKENS.find((tk) => tk.address == wagered_token)?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];

//         const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
//         setWonStatus({
//           profit: profitFloat,
//           multiplier,
//           token: token as string,
//         });
//         setGameStatus(GameModel.GameStatus.Won);
//       } else {
//         playSounds !== "off" && playLost();
//         const wageredFloat =
//           Number(wagered / BigInt(10000000000000000)) / 100;

//         setLostStatus(wageredFloat);
//         setGameStatus(GameModel.GameStatus.Lost);
//       }
//       //setShowRedraw(false);
//     }
//   },
// });

//   if (wagered) {
//     // if (path) {
//     //   setPath(undefined)
//     // } else {
//     //   setPath(testBallPath);
//     // }

//     if (inGame) {
//       // setShowFlipCards(false);
//       // if (finishPlaying) finishPlaying();
//     } else {
//       const total_value = cryptoValue * 1;
//       if (
//         cryptoValue != 0 &&
//         currentBalance &&
//         total_value <= currentBalance
//       ) {
//         if (
//           (!allowance || (allowance && allowance <= cryptoValue)) &&
//           pickedToken?.contract_address !=
//             "0x0000000000000000000000000000000000000000"
//         ) {
//           // if (setAllowance) {
//           //   console.log("Setting allowance");
//           //   setAllowance();
//           //   setPath(undefined);
//           //   setInGame(true);
//           //   setWaitingResponse(true);
//           // }
//           //return;
//         } else {
//           //setActiveCards(initialArrayOfCards);
//           // if (startPlaying) {
//           //   setPath(undefined);
//           //   startPlaying();
//           // }
//         }
//       }
//     }
//     setWagered(false);
//   }
// }, [wagered]);

// import {
//   useNetwork,
//   useAccount,
//   useFeeData,
//   useContractRead,
//   usePrepareContractWrite,
//   useContractWrite,
//   useContractEvent,
//   useWaitForTransaction,
// } from "wagmi";
