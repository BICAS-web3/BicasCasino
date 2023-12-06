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

import "swiper/scss";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";

export const Mines = () => {
  const minesCount = 25;
  const mineArr = Array.from({ length: minesCount }, (_, index) => index);

  const [selectedMine, setSelectedMine] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [fees, setFees] = useState<bigint>(BigInt(0));
  const [inGame, setInGame] = useState<boolean>(false);

  const { isConnected, address } = useAccount();

  const { data } = useFeeData({ watch: true });
  const { chain } = useNetwork();

  const [setIsPlaying] = useUnit([MinesModel.setIsPlaying]);

  const [startedArr, setStartedArr] = useState([
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
  ]);

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

  const toggleMineSelection = (index: number) => {
    setSelectedMine((prev) =>
      prev.includes(index)
        ? prev.filter((el) => el !== index)
        : [...prev, index]
    );
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

  const [isCashout, setIsCashout] = useState(false);

  useEffect(() => {
    if (stopWinning === "YES") {
      setIsCashout(true);
    } else {
      setIsCashout(false);
    }
  }, [stopWinning]);

  const { config: startPlayingConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    functionName: "Mines_Start",
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      pickedToken?.contract_address,
      startedArr.filter((el) => el === true).length
        ? startedArr.filter((el) => el === true).length
        : 1,
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

  const { write: startPlaying, isSuccess: startedPlaying } =
    useContractWrite(startPlayingConfig);

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

  const { write: startRevealing, isSuccess: startedRevealing } =
    useContractWrite(startRevealingConfig);

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

  useEffect(() => {
    if (startedPlaying && isCashout === false) {
      startRevealing?.();
    }
  }, [startedPlaying, isCashout]);

  useEffect(() => {
    if (isCashout === true && startedPlaying) {
      finishPlaying?.();
    }
  }, [isCashout && startedPlaying]);

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
      } else {
        setInGame(false);
      }
      // setWatchState(false);
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
  });

  const { write: setAllowance, isSuccess: allowanceIsSet } =
    useContractWrite(allowanceConfig);

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
    alert(`${inGame}, ${Wagered}`);
  }, [inGame, Wagered]);

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
            setAllowance?.();
          } else {
            //! setActiveCards(initialArrayOfCards);
            // console.log(
            //   "Starting playing",
            //   startPlaying,
            //   BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
            //   BigInt(VRFFees ? (VRFFees as bigint) : 0) * BigInt(10),
            //   pickedToken?.contract_address
            // );
            startPlaying?.();
          }
        }
      }
      setWagered(false);
    }
  }, [Wagered]);

  //?-----------------------------------------------------------------------------

  useContractEvent({
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    eventName: "Mines_Reveal_Event",
    listener(log) {
      if ((log[0] as any).eventName == "Mines_Reveal_Event") {
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

  useContractEvent({
    address: "0xD765fB31dCC92fCEcc524149F5B03CEba89531aC",
    abi: ABIMines,
    eventName: "Mines_End_Event",
    listener(log) {
      if ((log[0] as any).eventName == "Mines_End_Event") {
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

  const [multiplier, token] = useUnit([
    GameModel.$multiplier,
    GameModel.$token,
  ]);

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
  return (
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
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
        >
          {mineArr.map((index) => {
            const isSelected = selectedMine.includes(index);
            return (
              <div
                key={index}
                onClick={() => toggleMineSelection(index)}
                onMouseEnter={() => handleMouseMove(index)}
                className={clsx(
                  styles.mine,
                  isSelected && styles.mine_selected,
                  isSelected && styles.mine_animation
                )}
              >
                <MineIcon
                  className={clsx(
                    styles.mine_main,
                    isSelected && styles.mine_selected
                  )}
                />
                <MineGreenIcon
                  className={clsx(
                    styles.mine_green,
                    isSelected && styles.mine_selected
                  )}
                />
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
  );
};
