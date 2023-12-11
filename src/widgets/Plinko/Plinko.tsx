import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/games_assets/plinko/plinkoBgImage3.png";
import mobilebg from "@/public/media/plinko_images/plinko_mobile_bg.png";
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
import {
  useNetwork,
  useAccount,
  useFeeData,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";
import { pickSide } from "../CoinFlipSidePicker/model";
import { ABI as IPlinko } from "@/shared/contracts/PlinkoABI";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";

import helmet from "@/public/media/plinko_images/helmet.png";
import statue from "@/public/media/plinko_images/statue.png";

import * as PlinkoM from "./model";
import clsx from "clsx";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";

const testBallPath = [
  [true, true, false, false, false, true, false, true],
  [false, true, true, false, false, false, false, false],
  [false, true, true, false, false, false, true, true],
  [true, true, true, true, true, true, true, true],
  [false, true, false, true, true, false, false, false],
  [false, true, true, false, false, false, false, false],
  [true, true, false, false, false, true, false, true],
  [true, true, true, true, true, true, true, true],
  [false, true, true, false, false, true, false, false],
  [true, true, false, false, false, true, false, true],
  [true, true, false, false, false, true, false, true],
  [false, true, true, false, false, false, false, false],
  [false, true, true, false, false, false, true, true],
  [true, true, true, true, true, true, true, true],
  [false, true, false, true, true, false, false, false],
  [false, true, true, false, false, false, false, false],
  [true, true, false, false, false, true, false, true],
  [true, true, true, true, true, true, true, true],
  [false, true, true, false, false, false, false, false],
  [true, true, false, false, false, true, false, true],
  [true, true, false, false, false, true, false, true],
  [false, true, true, false, false, false, false, false],
  [false, true, true, false, false, false, true, true],
  [true, true, true, true, true, true, true, true],
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
  const isMobile = useMediaQuery("(max-width: 480px)");

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
  ]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useFeeData({ watch: true });

  const [waitingResult, setWaitingResult] = useState(false);
  const [inGame, setInGame] = useState<boolean>(false);
  const [path, setPath] = useState<boolean[][] | undefined>(undefined);

  useEffect(() => {
    setInGame(inGame);
  }, [inGame]);

  const [playBackground, { stop: stopBackground }] = useSound(
    "/static/media/games_assets/music/background2.wav",
    { volume: 0.1, loop: true }
  );
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
    console.log("Play sounds", playSounds);
    if (!playSounds) {
      // /stopSounds();
      //sounds.background.pause();
      stopBackground();
    } else {
      playBackground();
    }
  }, [playSounds]);

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPlinko,
    functionName: "Plinko_GetState",
    args: [address],
    enabled: true,
    watch: isConnected,
    //blockTag: 'latest' as any
  });

  useEffect(() => {
    if (GameState && !inGame) {
      if ((GameState as any).ingame) {
        if (
          !(GameState as any).isFirstRequest &&
          (GameState as any).requestID == 0
        ) {
          setInGame(true);
          //setActivePicker(false);
          pickSide((GameState as any).isHeads as number);
        }
      } else {
        setInGame(false);
      }
    }
  }, [GameState]);

  useEffect(() => {
    inGame ? setPlayingStatus(true) : setPlayingStatus(false);
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
  });

  const { write: setAllowance, isSuccess: allowanceIsSet } =
    useContractWrite(allowanceConfig);

  const [fees, setFees] = useState<bigint>(BigInt(0));

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPlinko,
    functionName: "getVRFFee",
    args: [0],
    // onSuccess: (fees: bigint) => {
    //   console.log('fees', fees);
    // },
    watch: true,
  });

  // const [riskLevel, setRiskLevel] = useState(pickedLevel == 'easy' ? 0 : pickedLevel == 'normal' ? 1 : 2);

  useEffect(() => {
    console.log("gas price", data?.gasPrice);
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(2000000) * (data.gasPrice + data.gasPrice / BigInt(4))
      );
      console.log(
        "vrf fee",
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(2000000) * (data.gasPrice + data.gasPrice / BigInt(4))
      );
    }
  }, [VRFFees, data]);

  const { config: startPlayingConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPlinko,
    functionName: "Plinko_Play",
    args: [
      BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
      pickedToken?.contract_address,
      //pickedSide,
      rowsAmount,
      pickedLevel == "easy" ? 0 : pickedLevel == "normal" ? 1 : 2,
      pickedValue,
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
    value:
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000)) *
          BigInt(100000000000) *
          BigInt(pickedValue)
        : BigInt(0)),
    enabled: true,
    //gasPrice: data?.gasPrice
    //gas: BigInt(3000000),
  });

  const [finish, setFinish] = useState(true);
  useEffect(() => {
    if (inGame) setFinish(false);
  }, [inGame]);

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite(startPlayingConfig);

  // useEffect(() => {
  //   console.log("Picked side", pickedSide);
  // }, [pickedSide])

  useEffect(() => {
    if (startedPlaying) {
      setPath(undefined);
      //setActivePicker(false);
      setInGame(true);
    }
  }, [startedPlaying]);

  useEffect(() => {
    console.log("PLINKO ERROR", error);
  }, [error]);

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: IPlinko,
    eventName: "Plinko_Outcome_Event",
    listener(log) {
      //handleLog(log)
      console.log("Log", log);
      console.log("address", (log[0] as any).args.playerAddress as string);
      console.log("address wallet", address?.toLowerCase());
      //console.log('Picked side', pickedSide);
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("Found Log!");
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);
        setPath((log[0] as any).args.paths);
        if ((log[0] as any).args.payout > wagered) {
          playWon();
          console.log("won");
          const profit = (log[0] as any).args.payout;
          console.log("profit", profit);
          const multiplier = Number(profit / wagered);
          console.log("multiplier", multiplier);
          //console.log("token", ((log[0] as any).args.tokenAddress as string).toLowerCase());
          const wagered_token = (
            (log[0] as any).args.tokenAddress as string
          ).toLowerCase();
          const token = TOKENS.find((tk) => tk.address == wagered_token)?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];
          console.log("won token", token);
          //console.log("available tokens", availableTokens);
          const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
          setWonStatus({
            profit: profitFloat,
            multiplier,
            token: token as string,
          });
          setGameStatus(GameModel.GameStatus.Won);
        } else {
          playLost();
          console.log("lost");
          const wageredFloat =
            Number(wagered / BigInt(10000000000000000)) / 100;
          console.log("wagered", wageredFloat);
          setLostStatus(wageredFloat);
          setGameStatus(GameModel.GameStatus.Lost);
        }
        //setShowRedraw(false);
      }
    },
  });

  useEffect(() => {
    if (wagered) {
      // if (path) {
      //   setPath(undefined)
      // } else {
      //   setPath(testBallPath);
      // }
      console.log("Pressed wager");
      if (inGame) {
        // setShowFlipCards(false);
        // if (finishPlaying) finishPlaying();
      } else {
        console.log(cryptoValue, currentBalance);
        const total_value = cryptoValue * 1;
        if (
          cryptoValue != 0 &&
          currentBalance &&
          total_value <= currentBalance
        ) {
          console.log("Allowance", allowance);
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              "0x0000000000000000000000000000000000000000"
          ) {
            console.log("Setting allowance");
            if (setAllowance) setAllowance();
            //return;
          } else {
            //setActiveCards(initialArrayOfCards);
            console.log(
              "Starting playing",
              startPlaying,
              fees,
              pickedValue,
              rowsAmount,
              cryptoValue,
              //BigInt(VRFFees ? (VRFFees as bigint) : 0) * BigInt(10),
              pickedToken?.contract_address,
              gameAddress,
              VRFFees,
              fees +
                (pickedToken &&
                pickedToken.contract_address ==
                  "0x0000000000000000000000000000000000000000"
                  ? BigInt(Math.floor(cryptoValue * 10000000)) *
                    BigInt(100000000000) *
                    BigInt(pickedValue)
                  : BigInt(0)),
              BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
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
  console.log("ballsArr: ", ballsArr);
  return (
    <>
      {" "}
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={styles.plinko_table_wrap}>
        <WagerLowerBtnsBlock game="plinko" text={gameText} />
        <div className={styles.plinko_table_background}>
          <Image
            src={tableBg}
            className={styles.plinko_table_background_img}
            alt="table-bg"
            width={1418}
            height={680}
            quality={100}
          />
          <Image
            src={helmet}
            className={styles.helmet}
            alt="helmet"
            width={729}
            height={680}
            quality={100}
          />
          <Image
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
              {}
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
                inGame={inGame}
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
