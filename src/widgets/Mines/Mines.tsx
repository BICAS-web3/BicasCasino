import { useCallback, useEffect, useRef, useState } from "react";
import { useUnit } from "effector-react";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import Image from "next/image";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import clsx from "clsx";

import background from "@/public/media/mines_images/mines_bg.png";

import { sessionModel } from "@/entities/session";

import * as GameModel from "@/widgets/GamePage/model";

import { MineIcon } from "@/shared/SVGs/MineIcon";
import { MineGreenIcon } from "@/shared/SVGs/MineGreenIcon";
import { ArrowIconSwap } from "@/shared/SVGs/ArrSwiperIcon";
import { useDebounce } from "@/shared/tools";
import { ABI as ABIMines } from "@/shared/contracts/MinesABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { TOKENS } from "@/shared/tokens";

import { WagerModel } from "../WagerInputsBlock";
import { WagerModel as WagerButtonModel } from "../Wager";
import * as MinesModel from "./model";
import * as CustomInputWagerModel from "@/widgets/CustomWagerRangeInput/model";

import "swiper/scss";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { MineBombIcon } from "@/shared/SVGs/MineBomb";
import { MineMoneyIcon } from "@/shared/SVGs/MineMoneyIcon";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { Scrollbar } from "swiper/modules";

enum Tile {
  Closed,
  ClosedShaking,
  Coin,
  Bomb
}

export const Mines = () => {
  const initialGameField: Tile[] = [
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
    Tile.Closed,
  ];

  const initialPickedTiles = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const [pickedValue] = useUnit([CustomInputWagerModel.$pickedRows]);

  const [gameField, setGameField] = useState<Tile[]>(initialGameField);
  const [pickedTiles, setPickedTiles] = useState<boolean[]>(initialPickedTiles);

  const [fees, setFees] = useState<bigint>(BigInt(0));
  const [inGame, setInGame] = useState<boolean>(false);

  const { isConnected, address } = useAccount();

  const { data } = useFeeData({ watch: true });
  const { chain } = useNetwork();

  const [setIsPlaying, setSelectedLength] = useUnit([
    MinesModel.setIsPlaying,
    MinesModel.setSelectedLength,
  ]);


  const [
    lost,
    profit,
    gameStatus,
    playSounds,
    gameAddress,
    currentBalance,
    cryptoValue,
    pickedToken,
    Wagered,
    setWagered,
    allowance,
    setGameStatus,
    setWonStatus,
    setLostStatus,
    stopWinning,
    setStopWinning,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$gameStatus,
    GameModel.$playSounds,
    sessionModel.$gameAddress,
    sessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerModel.$pickedToken,
    WagerButtonModel.$Wagered,
    WagerButtonModel.setWagered,
    sessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    MinesModel.$stopWinning,
    MinesModel.setStopWinning,
  ]);

  // useEffect(() => {
  //   setSelectedMine([]);
  // }, [pickedValue]);
  const { data: minesState } = useContractRead({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "Mines_GetState",
    args: [address?.toLowerCase()],
    enabled: true,
    watch: isConnected,
  });
  //const [isActive, setIsActive] = useState<any>(null);

  const setGameFields = (revealedTiles: boolean[], tilesPicked: boolean[]) => {
    setGameField(revealedTiles.map((value: boolean) => {
      if (value) {
        return Tile.Coin;
      } else {
        return Tile.Closed;
      }
    }));

    setPickedTiles(
      tilesPicked
    );

  }

  useEffect(() => {
    console.log(minesState);
    console.log("mine", minesState);
    if ((minesState as any)?.blockNumber != 0) {
      // console.log(minesState);
      // if ((minesState as any)?.isCashout === false) {
      //   setIsCashout(false);
      //   setStopWinning("NO");
      // } else if ((minesState as any)?.isCashout === false) {
      //   setIsCashout(true);
      //   setStopWinning("YES");
      // }
      setGameFields((minesState as any)?.revealedTiles as any, (minesState as any)?.tilesPicked as any);
    }
  }, [minesState as any]);

  // useEffect(() => {
  //   setIsActive(minesState);
  //   console.log(minesState);
  //   if (stepArr?.length <= 0 || !stepArr?.find((el: boolean) => el === true)) {
  //     setStepArr((minesState as any)?.revealedTiles);
  //   }
  //   console.log("mine", minesState);
  //   if ((minesState as any)?.requestID) {
  //     console.log(minesState);
  //     if ((minesState as any)?.isCashout === false) {
  //       setIsCashout(false);
  //       setStopWinning("NO");
  //     } else if ((minesState as any)?.isCashout === false) {
  //       setIsCashout(true);
  //       setStopWinning("YES");
  //     }
  //   }
  // }, [(minesState as any)?.isCashout]);


  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  const [isCashout, setIsCashout] = useState(true);

  useEffect(() => {
    if (stopWinning === "NO") {
      setIsCashout(false);
    } else {
      setIsCashout(true);
    }
  }, [stopWinning]);

  const { config: startPlayingConfig, error } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "Mines_Start",
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      pickedToken?.contract_address,
      pickedValue,
      startedArr,
      isCashout,
    ],
    value:
      fees +
      (pickedToken &&
        pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
        : BigInt(0)),
    enabled: true,
  });

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error: errorWrite,
  } = useContractWrite(startPlayingConfig);

  const { config: startRevealingConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "Mines_Reveal",
    args: [startedArr, isCashout],
    value:
      fees +
      (pickedToken &&
        pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
        : BigInt(0)),
    enabled: true,
  });

  const {
    write: startRevealing,
    isSuccess: startedRevealing,
    error: errorReveal,
  } = useContractWrite(startRevealingConfig);

  const { config: finishGameConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "Mines_End",
    args: [],
    enabled: true,
  });

  const { write: finishPlaying, isSuccess: finishGameSuccess } =
    useContractWrite(finishGameConfig);

  const {
    data: GameState,
    refetch: fetchGameState,
    error: readErr,
  } = useContractRead({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "Mines_GetState",
    args: [address],
    enabled: true,
    watch: isConnected,
  });

  useEffect(() => {
    if (GameState) {
      console.log("In game", GameState);
      if ((GameState as any).blockNumber != 0) {
        console.log("In game");
        setInGame(true);
      } else {
        // setFinish(true);
        //setGameStatus(GameModel.GameStatus.Lost);
        setCopySelectedArr([]);
        setInGame(false);
      }
    }
  }, [GameState]);

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

  useEffect(() => {
    if (startedPlaying) {
      setInGame(true);
    }
  }, [startedPlaying]); // startedRevealing
  const { config: allowanceConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: pickedToken?.contract_address as `0x${string}`,
    abi: IERC20,
    functionName: "approve",
    enabled:
      pickedToken?.contract_address !=
      "0x0000000000000000000000000000000000000000",
    args: [
      gameAddress || "0xA7867C5891D9518bfB21BC55cF8EC641011e8799",
      useDebounce(
        currentBalance
          ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
          : 0
      ),
    ],
  });

  const {
    write: setAllowance,
    isSuccess: allowanceIsSet,
    error: allErr,
  } = useContractWrite(allowanceConfig);

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "getVRFFee",
    args: [0],
    watch: isConnected,
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
    if (Wagered) {
      if (inGame) {
        if (
          (isActive && isActive?.numMines > 0 && stopGame === false) ||
          copySelectedArr.length > 0
        ) {
          startRevealing?.();
          //alert(2);
        }
      } else {
        console.log(cryptoValue, currentBalance);
        if (
          cryptoValue != 0 &&
          currentBalance &&
          cryptoValue <= currentBalance
        ) {
          console.log("Allowance", allowance, startPlaying);
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
            "0x0000000000000000000000000000000000000000"
          ) {
            console.log("Setting allowance");
            if (setAllowance) setAllowance();
          } else {
            //setInGame(true);
            if (
              (isActive && isActive?.numMines > 0 && stopGame === false) ||
              copySelectedArr.length > 0
            ) {
              if (isCashout === true) {
                alert(3);
                setFinish(false);
                finishPlaying?.();
              } else {
                alert(2);
                setFinish(false);
                startRevealing?.();
              }
            } else {
              alert(1);
              setFinish(false);
              startPlaying?.();
            }
          }
        }
      }
      setWagered(false);
    }
  }, [Wagered]);

  const [finish, setFinish] = useState(false);
  const [lostArr, setLostArr] = useState<any[]>([]);

  useContractEvent({
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    eventName: "Mines_Reveal_Event",

    listener(log) {
      if ((log[0] as any).eventName === "Mines_Reveal_Event") {
        if (
          ((log[0] as any).args.playerAddress as string).toLowerCase() ==
          address?.toLowerCase()
        ) {
          const opened = (log[0] as any).args.minesTiles;
          const reveledArr = (log[0] as any).args.revealedTiles;
          setStepArr((log[0] as any).args.revealedTiles);
          console.log("---reveal---", reveledArr, opened);
          if (opened && Array.isArray(opened)) {
            const newResultArr = opened.map((el: boolean, index: number) => {
              return {
                number: index,
                value: el,
              };
            });

            setLostArr(newResultArr);
          }
          const openedExist = opened.find((el: boolean) => el === true);
          // if ((opened?.length > 0 && isCashout === true) || openedExist) {
          //   setFinish(true);
          // }
          //setInGame(false);
          if (Array.isArray(reveledArr)) {
            reveledArr.forEach((el, i) => {
              if (el === true && opened[i] === true) {
                setBombArr((prev: any) => [...prev, i]);
                // setFinish(true);
                // setGameStatus(GameModel.GameStatus.Lost);

                setCopySelectedArr([]);
              }
            });
          }
          const wagered = (log[0] as any).args.wager;
          if ((log[0] as any).args.payout > 0) {
            const profit = (log[0] as any).args.payout;
            const multiplier = Number(profit / wagered);
            const wagered_token = (
              (log[0] as any).args.tokenAddress as string
            ).toLowerCase();
            const token = TOKENS.find(
              (tk) => tk.address == wagered_token
            )?.name;
            const profitFloat =
              Number(profit / BigInt(10000000000000000)) / 100;
            if (finish === true) {
              //alert("tt");
              setWonStatus({
                profit: profitFloat,
                multiplier,
                token: token as string,
              });
              setGameStatus(GameModel.GameStatus.Won);
            }
          } else {
            if (finish === true) {
              //alert("tt");
              const wageredFloat =
                Number(wagered / BigInt(10000000000000000)) / 100;
              setLostStatus(wageredFloat);
              setGameStatus(GameModel.GameStatus.Lost);
            }
          }
        }
      }
    },
  });

  useContractEvent({
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    eventName: "Mines_End_Event",
    listener(log) {
      console.log("End Event", log);
      const receivedEndEvent = log.find(
        (el) => (el as any).eventName === "Mines_End_Event"
      );

      if (
        (
          (receivedEndEvent as any).args.playerAddress as string
        ).toLowerCase() == address?.toLowerCase()
      ) {
        setSelectedMine([]);
        setFinish(true);
        setInGame(false);
        setTimeout(() => {
          setStepArr([]);
          setSelectedMine([]);
        }, 2000);
        const wagered = (receivedEndEvent as any).args.wager;
        if ((receivedEndEvent as any).args.payout > 0) {
          const profit = (receivedEndEvent as any).args.payout;
          const multiplier = Number(profit / wagered);
          const wagered_token = (
            (receivedEndEvent as any).args.tokenAddress as string
          ).toLowerCase();
          const token = TOKENS.find((tk) => tk.address == wagered_token)?.name;
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
        { value: profit / cryptoValue, status: "won" },
      ]);
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost((prev) => prev + lost);
      setGameResult((prev) => [...prev, { value: 0.0, status: "lost" }]);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);

  const [stopGame, setStopGame] = useState(false);
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setStopGame(true);
      setFinish(true);
    }
  }, [gameStatus]);

  const [copySelectedArr, setCopySelectedArr] = useState<number[]>([]);
  // useEffect(() => {
  //   if (finish) {
  //     setTimeout(() => {
  //       setStartedArr(defaultValue);
  //       setCopySelectedArr((prev) => [...prev, ...selectedMine]);
  //       setSelectedMine([]);
  //       setLostArr([]);
  //     }, 3000);
  //   }
  // }, [finish]);

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setIsCashout(true);
      setCopySelectedArr([]);
    }
  }, [gameStatus]);

  const {
    data: RevealCount,
    refetch: fetchRevealCount,
    error: revealErr,
  } = useContractRead({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "Mines_GetMultipliers",
    args: [
      pickedValue,
      isCashout === true
        ? selectedMine?.length
        : copySelectedArr?.length > 0
          ? copySelectedArr?.length
          : selectedMine?.length,
    ],
    enabled: true,
    watch: isConnected,
  });

  const [revelNum, setRevealNum] = useState<any>([]);
  useEffect(() => {
    if (Wagered && cryptoValue > 0 && RevealCount) {
      setRevealNum((prev: any[]) => {
        if (Array.isArray(prev) && prev && prev?.length > 0) {
          return [RevealCount as bigint];
        } else {
          return [...prev, RevealCount as bigint];
        }
      });
    }
  }, [Wagered]);

  const [stepArr, setStepArr] = useState<any>([]);
  const [bombArr, setBombArr] = useState<any>([]);
  return (
    <>
      {errorWrite && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={styles.wrapp}>
        <div className={styles.mines_table_wrap}>
          <WagerLowerBtnsBlock className={styles.mines_block} game="mines" />
          <div className={styles.mines_table_background}>
            <Image
              src={background}
              className={styles.mines_table_background_img}
              alt="table-bg"
              width={1418}
              height={680}
              quality={100}
            />
          </div>
          <div className={styles.total_container}>
            <span className={styles.total_won}>{fullWon.toFixed(2)}</span>
            <span className={styles.total_lost}>{fullLost.toFixed(2)}</span>
            <div>
              Total:{" "}
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
          <div className={styles.balls_arr}>
            {gameResult.map((result, i) => (
              <div
                className={clsx(
                  styles.multiplier_value,
                  result.status === "won" && styles.multiplier_positive,
                  result.status === "lost" && styles.multiplier_negative
                )}
                key={i}
              >
                {result.value.toFixed(2)}x
              </div>
            ))}
            { }
          </div>
          <div
            className={styles.mines_table}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
          >
            {mineArr.map((index) => {
              const isSelected = selectedMine.includes(index);
              // isActive && alert(isActive?.tilesPicked[24]);
              return (
                <div
                  key={index}
                  onClick={() => toggleMineSelection(index)}
                  onMouseEnter={() => handleMouseMove(index)}
                  className={clsx(
                    styles.mine,
                    isSelected && styles.mine_selected,
                    isSelected &&
                    inGame &&
                    !copySelectedArr.includes(index) &&
                    ""
                    // styles.mine_animation
                  )}
                >
                  <MineIcon
                    className={clsx(
                      styles.mine_main,
                      isSelected && styles.mine_selected
                    )}
                  />
                  {/* {finish === true ? (
                    <MineGreenIcon
                      className={clsx(
                        styles.mine_green,
                        isSelected && styles.mine_selected,
                        isSelected && styles.mine_animation
                      )}
                    />
                  ) : (minesState as any)?.revealedTiles[index] === true ? (
                    <MineMoneyIcon
                      className={clsx(styles.mine_green, styles.mine_selected)}
                    />
                  ) : (minesState as any)?.revealedTiles[index] === false &&
                    copySelectedArr?.includes(index) ? (
                    <MineBombIcon
                      className={clsx(
                        styles.mine_green,
                        isSelected && styles.mine_selected
                      )}
                    />
                  ) : (
                    <MineGreenIcon
                      className={clsx(
                        styles.mine_green,
                        isSelected && styles.mine_selected,
                        isSelected && styles.mine_animation
                      )}
                    />
                  )} */}
                  <SelectedMine
                    bombArr={bombArr}
                    index={index}
                    finish={finish}
                    finishGameSuccess={finishGameSuccess}
                    isCashout={isCashout}
                    selectedMine={selectedMine}
                    startedPlaying={startedPlaying}
                    stepArr={stepArr}
                  />
                </div>
              );
            })}
          </div>{" "}
          <div className={styles.bottom_wrapper}>
            <div className={styles.bottom}>
              <Swiper
                ref={swiperRef}
                slidesPerView="auto"
                direction="horizontal"
                scrollbar={{
                  el: ".scroll-bar",
                  draggable: true,
                }}
                centeredSlides={false}
                className={styles.swiper}
                modules={[Scrollbar]}
              >
                {revelNum?.length > 0 &&
                  revelNum.map((el: bigint, index: number) => {
                    return (
                      <SwiperSlide key={index} className={styles.swiper_slide}>
                        <span>{index + 1}</span>Х
                        {(Number(el) / 10000).toFixed(2)}
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div
              className={clsx(styles.arr, styles.arr_prev)}
              onClick={handlePrev}
            >
              <ArrowIconSwap
                className={clsx(styles.arr_icon, styles.arr_icon_left)}
              />
            </div>
            <div
              className={clsx(styles.arr, styles.arr_next)}
              onClick={handleNext}
            >
              <ArrowIconSwap
                className={clsx(styles.arr_icon, styles.arr_icon_right)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface ISelectedMine {
  selectedMine: number[];
  finishGameSuccess: boolean;
  startedPlaying: boolean;
  finish: boolean;
  index: number;
  isCashout: boolean;
  stepArr: any;
  bombArr: any;
}
const SelectedMine = (props: ISelectedMine) => {
  const {
    selectedMine,
    startedPlaying,
    index,
    finish,
    finishGameSuccess,
    isCashout,
    stepArr,
    bombArr,
  } = props;
  const isSelected = selectedMine.includes(index);

  console.log(bombArr);
  const [isMomb, setIsBomb] = useState(false);

  useEffect(() => {
    if (bombArr.includes(index)) {
      setIsBomb(true);
    } else {
      setIsBomb(false);
    }
  }, [bombArr]);

  if (stepArr && stepArr[index] === true) {
    return isMomb ? (
      <MineBombIcon className={clsx(styles.mine_green, styles.mine_selected)} />
    ) : (
      <MineMoneyIcon
        className={clsx(styles.mine_green, styles.mine_selected)}
      />
    );
  } else {
    return (
      <MineGreenIcon
        className={clsx(
          styles.mine_green,
          isSelected && styles.mine_selected,
          isSelected && startedPlaying && styles.mine_animation
        )}
      />
    );
  }
};
