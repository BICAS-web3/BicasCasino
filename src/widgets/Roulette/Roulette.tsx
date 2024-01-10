import { FC, useEffect, useState } from "react";

import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

import { useUnit } from "effector-react";

import bg from "@/public/media/roulette_images/bg.png";

import Image from "next/image";

import { Model as RollSettingModel } from "@/widgets/RollSetting";
import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";

import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as RocketABI } from "@/shared/contracts/RocketABI";
import { useDebounce } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";

import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { WagerGainLossModel } from "../WagerGainLoss";
import { SidePickerModel } from "../CoinFlipSidePicker";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";

import s from "./styles.module.scss";
import clsx from "clsx";

import * as DiceM from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { ProfitModel } from "../ProfitBlock";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { Preload } from "@/shared/ui/Preload";
import { RouletteBack } from "@/shared/SVGs/RouletteBack";
import { RouletteRepeat } from "@/shared/SVGs/RouletteRepeat";
import { Wheel } from "@/shared/ui/Wheel";

interface IRoulette {
  gameText: string;
}

export const Roulette: FC<IRoulette> = ({ gameText }) => {
  const { isConnected, address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
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
  const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
  const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;
  useEffect(() => {
    setCoefficient(Number(multiplier) / 10000);
  }, [multiplier]);

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
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
    functionName: "Rocket_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    args: [
      useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
      multiplier,
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
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
          BigInt(100000000000)
        : BigInt(0)),
  });

  const { data: GameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
    functionName: "Rocket_GetState",
    args: [address],
    enabled: true,
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
    address: gameAddress as `0x${string}`,
    abi: IERC20,
    functionName: "approve",
    enabled:
      pickedToken?.contract_address !=
      "0x0000000000000000000000000000000000000000",
    args: [
      gameAddress as `0x${string}`,
      useDebounce(
        currentBalance
          ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
          : 0
      ),
    ],
  });

  const { write: setAllowance } = useContractWrite(allowanceConfig);

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
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

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
      setWaitingResponse(true);
    }
  }, [startedPlaying]);

  const [localNumber, setLocalNumber] = useState<number | null>(null);
  const [coefficientData, setCoefficientData] = useState<number[]>([]);
  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: RocketABI,
    eventName: "Rocket_Outcome_Event",
    listener(log) {
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("------", (log[0] as any).args, "-------");

        setWaitingResponse(false);
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);

        const handleCall = () => {
          for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
            setTimeout(() => {
              const outCome =
                Number((log[0] as any)?.args?.payouts[i]) / Number(wagered);
              setCoefficientData((prev) => [outCome, ...prev]);
              setLocalNumber(outCome);
            }, 700 * (i + 1));
          }
        };
        handleCall();
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
            setAllowance?.();
          } else {
            startPlaying?.();
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

  useEffect(() => {
    if (!imageLoading_1) {
      setIsLoading(imageLoading_1);
    }
  }, [imageLoading_1]);

  const arrData = [
    { angle: 0, value: 0, color: "sector_green" },
    { angle: 9.72973, value: 32, color: "sector_red" },
    { angle: 19.4595, value: 15, color: "sector_black" },
    { angle: 29.1892, value: 19, color: "sector_red" },
    { angle: 38.9189, value: 4, color: "sector_black" },
    { angle: 48.6486, value: 21, color: "sector_red" },
    { angle: 58.3784, value: 2, color: "sector_black" },
    { angle: 68.1081, value: 25, color: "sector_red" },
    { angle: 77.8378, value: 17, color: "sector_black" },
    { angle: 87.5676, value: 34, color: "sector_red" },
    { angle: 97.2973, value: 6, color: "sector_black" },
    { angle: 107.027, value: 27, color: "sector_red" },
    { angle: 116.757, value: 13, color: "sector_black" },
    { angle: 126.486, value: 36, color: "sector_red" },
    { angle: 136.216, value: 11, color: "sector_black" },
    { angle: 145.946, value: 30, color: "sector_red" },
    { angle: 155.676, value: 8, color: "sector_black" },
    { angle: 165.405, value: 23, color: "sector_red" },
    { angle: 175.135, value: 10, color: "sector_black" },
    { angle: 184.865, value: 5, color: "sector_red" },
    { angle: 194.595, value: 24, color: "sector_black" },
    { angle: 204.324, value: 16, color: "sector_red" },
    { angle: 214.054, value: 33, color: "sector_black" },
    { angle: 223.784, value: 1, color: "sector_red" },
    { angle: 233.514, value: 20, color: "sector_black" },
    { angle: 243.243, value: 14, color: "sector_red" },
    { angle: 252.973, value: 31, color: "sector_black" },
    { angle: 262.703, value: 9, color: "sector_red" },
    { angle: 272.432, value: 22, color: "sector_black" },
    { angle: 282.162, value: 18, color: "sector_red" },
    { angle: 291.892, value: 29, color: "sector_black" },
    { angle: 301.622, value: 7, color: "sector_red" },
    { angle: 311.351, value: 28, color: "sector_black" },
    { angle: 321.081, value: 12, color: "sector_red" },
    { angle: 330.811, value: 35, color: "sector_black" },
    { angle: 340.541, value: 3, color: "sector_red" },
    { angle: 350.27, value: 26, color: "sector_black" },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      width < 650 ? setIsMobile(true) : setIsMobile(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // let numbersArrTen = [3, 6, 9, 12, 2, 5, 8, 11, 1, 4, 7, 10];
  // let numbersArr13 = [15, 18, 21, 24, 14, 17, 20, 23, 13, 16, 19, 22];

  const [numbersArr27, setNumberArr27] = useState([
    27, 30, 33, 36, 26, 29, 32, 35, 25, 28, 31, 34,
  ]);

  const [numbersArrTen, setNumberArrTen] = useState([
    3, 6, 9, 12, 2, 5, 8, 11, 1, 4, 7, 10,
  ]);

  const [numbersArr13, setNumberArr13] = useState([
    15, 18, 21, 24, 14, 17, 20, 23, 13, 16, 19, 22,
  ]);

  useEffect(() => {
    if (isMobile) {
      setNumberArr27(numbersArr27.sort((a, b) => a - b));
      setNumberArrTen(numbersArrTen.sort((a, b) => a - b));
      setNumberArr13(numbersArr13.sort((a, b) => a - b));
    } else {
      setNumberArr27(numbersArr27);
      setNumberArrTen(numbersArrTen);
      setNumberArr13(numbersArr13);
    }
  }, [isMobile]);

  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <section className={s.roulette_table_wrap}>
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock
          className={s.roulette_btns}
          game="roulette"
          text={gameText}
        />
        <div className={s.roulette_table_background}>
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={bg}
            alt=""
            className={s.roulette_table_background_img}
          />
        </div>

        <div className={s.roulette_table_body}>
          {/* <div className={s.roulette_wheel_wrap}></div> */}
          <Wheel array={arrData} />
          <div className={s.roulette_bets_wrap}>
            <div className={s.roulette_bets_block}>
              <div className={clsx(s.zero_bet, s.bet_font)}>0</div>
              <div className={s.n1_to_n10_bets_block}>
                <div className={clsx(s.bets_title_block, s.bet_font)}>
                  1st 12
                </div>
                <div className={s.n1_to_n10_list}>
                  {numbersArrTen.map((item, ind) => (
                    <div
                      className={clsx(s.bet_block, s.bet_font)}
                      data-odd={item % 2 === 1}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className={s.n1_to_n18_bet}>
                  <div className={clsx(s.n1_to_n18_bet_item, s.bet_font)}>
                    1 to 18
                  </div>
                  <div className={clsx(s.n1_to_n18_bet_item, s.bet_font)}>
                    EVEN
                  </div>
                </div>
              </div>
              <div className={s.n13_to_n24_bets_block}>
                <div className={clsx(s.bets_title_block, s.bet_font)}>
                  2ns 12
                </div>
                <div className={s.n13_to_n24_list}>
                  {numbersArr13.map((item, ind) => (
                    <div
                      className={clsx(s.bet_block, s.bet_font)}
                      data-odd={item % 2 === 1}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className={s.color_bet_block}>
                  <div className={s.color_bet_block_item}></div>
                  <div className={s.color_bet_block_item}></div>
                </div>
              </div>
              <div className={s.n25_to_n36_bets_block}>
                <div className={clsx(s.bets_title_block, s.bet_font)}>
                  3rd 12
                </div>
                <div className={s.n13_to_n24_list}>
                  {numbersArr27.map((item, ind) => (
                    <div
                      className={clsx(s.bet_block, s.bet_font)}
                      data-odd={item % 2 === 1}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className={s.n25_to_n36_odd_bet}>
                  <div className={clsx(s.n25_to_n36_bet_item, s.bet_font)}>
                    ODD
                  </div>
                  <div className={clsx(s.n25_to_n36_bet_item, s.bet_font)}>
                    19 to 36
                  </div>
                </div>
              </div>
              <div className={s.other_bets_block}>
                <div className={s.back_bet_btn}>
                  <RouletteBack />
                </div>
                <div className={clsx(s.n2_to_n1_bet_btn, s.bet_font)}>2:1</div>
                <div className={clsx(s.n2_to_n1_bet_btn, s.bet_font)}>2:1</div>
                <div className={clsx(s.n2_to_n1_bet_btn, s.bet_font)}>2:1</div>
                <div className={clsx(s.repeat_bet_btn)}>
                  <RouletteRepeat />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={s.roulette_table_wrap_under}>
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
        </div> */}
      </section>{" "}
    </>
  );
};
