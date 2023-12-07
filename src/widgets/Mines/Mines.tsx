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

export const Mines = () => {
  const defaultValue = [
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
    false,
  ];
  const minesCount = 25;
  const mineArr = Array.from({ length: minesCount }, (_, index) => index);
  const [pickedValue] = useUnit([CustomInputWagerModel.$pickedRows]);

  const [selectedMine, setSelectedMine] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [fees, setFees] = useState<bigint>(BigInt(0));
  const [inGame, setInGame] = useState<boolean>(false);

  const { isConnected, address } = useAccount();

  const { data } = useFeeData({ watch: true });
  const { chain } = useNetwork();

  const [setIsPlaying, setSelectedLength] = useUnit([
    MinesModel.setIsPlaying,
    MinesModel.setSelectedLength,
  ]);

  useEffect(() => {
    setSelectedLength(selectedMine.length);
  }, [selectedMine.length]);

  const [startedArr, setStartedArr] = useState(defaultValue);

  const changeValue = (el: number) => {
    if (el === 1) {
      return 24;
    } else if (el === 2) {
      return 21;
    } else if (el === 3) {
      return 17;
    } else if (el === 4) {
      return 14;
    } else if (el === 5) {
      return 12;
    } else if (el === 6) {
      return 10;
    } else if (el === 7) {
      return 9;
    } else if (el === 8) {
      return 8;
    } else if (el === 9) {
      return 7;
    } else if (el === 10) {
      return 6;
    } else if (el === 11 || el === 12) {
      return 5;
    } else if (el === 13 || el === 14) {
      return 4;
    } else if (el === 15 || el === 16 || el === 17) {
      return 3;
    } else if (el === 18 || el === 19 || el === 20 || el === 21) {
      return 2;
    } else if (el === 22 || el > 22) {
      return 1;
    }
  };

  useEffect(() => {
    setStartedArr((prev: any) => {
      return prev?.map((el: boolean, index: number) => {
        if (selectedMine.includes(index)) {
          return true;
        } else {
          return false;
        }
      });
    });
  }, [selectedMine]);

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
  ]);

  const [customFinishGame, setCustomFinishGame] = useState(false);

  useEffect(() => {
    setSelectedMine([]);
  }, [pickedValue]);

  const toggleMineSelection = (index: number) => {
    if (copySelectedArr.length > 0 && isCashout === true) {
      if (copySelectedArr.includes(index)) {
        return;
      } else {
        setSelectedMine((prev) => {
          if (prev.includes(index)) {
            return prev.filter((el) => el !== index);
          } else {
            if (selectedMine?.length === changeValue(pickedValue)!) {
              return [...prev];
            } else {
              return [...prev, index];
            }
          }
        });
      }
    } else {
      setSelectedMine((prev) => {
        if (prev.includes(index)) {
          return prev.filter((el) => el !== index);
        } else {
          if (selectedMine?.length === changeValue(pickedValue)!) {
            return [...prev];
          } else {
            return [...prev, index];
          }
        }
      });
    }
  };

  const handleMouseMove = (index: number) => {
    if (isMouseDown) {
      toggleMineSelection(index);
    }
  };
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
      setIsCashout(true);
    } else {
      setIsCashout(false);
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
      isCashout === true ? false : true,
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
    args: [startedArr, isCashout === true ? false : true],
    value:
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
        : BigInt(0)),
    enabled: true,
  });

  useEffect(() => {
    if (isCashout === false && startPlaying) {
      setCustomFinishGame(true);
    }
  }, [isCashout, startPlaying]);

  const {
    write: startRevealing,
    isSuccess: startedRevealing,
    error: errorReveal,
  } = useContractWrite(startRevealingConfig);

  useEffect(() => {
    if (startedRevealing) {
      setCustomFinishGame(true);
    }
  }, [startedRevealing]);

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
      if ((GameState as any).ingame) {
        if (
          !(GameState as any).isFirstRequest &&
          (GameState as any).requestID == 0
        ) {
          setInGame(true);
        }
      }
    }
  }, [GameState]);

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);
  useEffect(() => {
    if (startedPlaying || startedRevealing) {
      setInGame(true);
    }
  }, [startedPlaying, startedRevealing]);
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

  const [customStatus, setCustomStatus] = useState(false);

  useEffect(() => {
    if (gameStatus !== null && gameStatus == 0) {
      setCustomStatus(true);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (Wagered) {
      if (inGame) {
        if (finishPlaying) finishPlaying();
      } else {
        console.log(cryptoValue, currentBalance);
        if (
          cryptoValue != 0 &&
          currentBalance &&
          cryptoValue <= currentBalance
        ) {
          console.log("Allowance", allowance);
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              "0x0000000000000000000000000000000000000000"
          ) {
            console.log("Setting allowance");
            if (setAllowance) setAllowance();
          } else {
            if (isCashout && customStatus) {
              if (startRevealing) startRevealing();
            } else {
              if (startPlaying) startPlaying();
              setInGame(true);
            }
          }
        }
      }
      setWagered(false);
    }
  }, [Wagered]);

  const [finish, setFinish] = useState(false);
  const [loseIndex, setLoseIndex] = useState(-1);
  useContractEvent({
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    eventName: "Mines_Reveal_Event",
    listener(log) {
      const opened = (log[0] as any).args.minesTiles;
      const reveledddd = (log[0] as any).args.minesTiles;
      const openedExist = opened.find((el: boolean) => el === true);
      if (opened) {
        setFinish(true);
      }
      if (opened && openedExist) {
        setLoseIndex(opened.indexOf(true));
      }
      if ((log[0] as any).eventName === "Mines_Reveal_Event") {
        if (
          ((log[0] as any).args.playerAddress as string).toLowerCase() ==
          address?.toLowerCase()
        ) {
          setInGame(false);
          console.log(opened);

          console.log(reveledddd);
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
      }
    },
  });

  const setEvent = useContractEvent({
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    eventName: "Mines_End_Event",
    listener(log) {
      if ((log[0] as any).eventName === "Mines_End_Event" && customFinishGame) {
        if (
          ((log[0] as any).args.playerAddress as string).toLowerCase() ==
          address?.toLowerCase()
        ) {
          setInGame(false);
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
      }
    },
  });
  useEffect(() => {
    if (customFinishGame) {
      setEvent?.();
    }
  }, [customFinishGame]);

  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0.1);

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon((prev) => prev + profit);
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost((prev) => prev + lost);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);

  const [customStartPlaying, setCustomStartPlaying] = useState(false);

  useEffect(() => {
    if (startPlaying) {
      setCustomStartPlaying(true);
    }
  }, [startPlaying]);

  const [copySelectedArr, setCopySelectedArr] = useState<number[]>([]);
  useEffect(() => {
    if (finish) {
      setTimeout(() => {
        setStartedArr(defaultValue);
        setCopySelectedArr((prev) => [...prev, ...selectedMine]);
        setSelectedMine([]);
        setFinish(false);
        setLoseIndex(-1);
        setCustomStartPlaying(false);
      }, 3000);
    }
  }, [finish]);

  useEffect(() => {
    return () => {
      setCustomFinishGame(false);
    };
  }, []);

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Lost) {
      setIsCashout(false);
      setCopySelectedArr([]);
    }
  }, [gameStatus]);

  return (
    <>
      {errorWrite ||
        (errorReveal && (
          <ErrorCheck
            text="Something went wrong, please contact customer support."
            btnTitle="Contact us"
          />
        ))}
      <div className={styles.wrapp}>
        <div className={styles.mines_table_wrap}>
          <WagerLowerBtnsBlock game="mines" />
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
          <div
            className={styles.mines_table}
            onMouseDown={() => inGame === false && setIsMouseDown(true)}
            onMouseUp={() => inGame === false && setIsMouseDown(false)}
          >
            {mineArr.map((index) => {
              const isSelected = selectedMine.includes(index);
              return (
                <div
                  key={index}
                  onClick={() => inGame === false && toggleMineSelection(index)}
                  onMouseEnter={() =>
                    inGame === false && handleMouseMove(index)
                  }
                  className={clsx(
                    styles.mine,
                    isSelected && styles.mine_selected,
                    isSelected && !finish && inGame && styles.mine_animation
                  )}
                >
                  <MineIcon
                    className={clsx(
                      styles.mine_main,
                      isSelected && styles.mine_selected
                    )}
                  />
                  {finish ? (
                    loseIndex > -1 && loseIndex === index ? (
                      <MineBombIcon
                        className={clsx(
                          styles.mine_green,
                          isSelected && styles.mine_selected
                        )}
                      />
                    ) : (
                      <MineMoneyIcon
                        className={clsx(
                          styles.mine_green,
                          isSelected && styles.mine_selected
                        )}
                      />
                    )
                  ) : (
                    <MineGreenIcon
                      className={clsx(
                        styles.mine_green,
                        isSelected && styles.mine_selected
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className={styles.bottom_wrapper}>
        <div className={styles.bottom}>
          <Swiper
            // navigation
            ref={swiperRef}
            slidesPerView="auto"
            direction="horizontal"
            scrollbar={{
              el: ".scroll-bar",
              draggable: true,
            }}
            centeredSlides={false}
            className={styles.swiper}
          >
            {Array.from({ length: 40 }).map((_, index) => (
              <SwiperSlide key={index} className={styles.swiper_slide}>
                <span>4</span>Х 1.1
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={clsx(styles.arr, styles.arr_prev)} onClick={handlePrev}>
          <ArrowIconSwap
            className={clsx(styles.arr_icon, styles.arr_icon_left)}
          />
        </div>
        <div className={clsx(styles.arr, styles.arr_next)} onClick={handleNext}>
          <ArrowIconSwap
            className={clsx(styles.arr_icon, styles.arr_icon_right)}
          />
        </div>
      </div> */}
      </div>
    </>
  );
};