import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/poker_images/pokerBgImage.webp";
import { PokerCard } from "./PokerCard";
import { useUnit } from "effector-react";
import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { T_Card } from "@/shared/api";
//import BackgroundMusic from '../../public/media/games_assets/music/background1.wav';
import useSound from "use-sound";
import * as GameModel from "@/widgets/GamePage/model";
export * as PokerModel from "./model";
import * as PokerModel from "./model";
import { settingsModel } from "@/entities/settings";
import { sessionModel } from "@/entities/session";
import { ABI as IPoker } from "@/shared/contracts/PokerABI";
import { WagerModel } from "../WagerInputsBlock";
import { WagerModel as WagerButtonModel } from "../Wager";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import * as api from "@/shared/api";
import { TOKENS } from "@/shared/tokens";
import { useDebounce, useMediaQuery } from "@/shared/tools";
import { PokerCombination } from "./PokerCombination";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import clsx from "clsx";
import { ProfitLine } from "../ProfitLine";
import { WinMessage } from "../WinMessage";
import { Preload } from "@/shared/ui/Preload";

// чирва 2
// пика 3
// буба 1
// креста 0
const initialArrayOfCards = [
  {
    suit: -1,
    number: -1,
  },
  {
    suit: -1,
    number: -1,
  },
  {
    suit: -1,
    number: -1,
  },
  {
    suit: -1,
    number: -1,
  },
  {
    suit: -1,
    number: -1,
  },
];

interface ICards {
  suit: number;
  number: number;
}

export interface PokerProps {
  gameText: string;
}

export const Poker: FC<PokerProps> = (props) => {
  const isMobile = useMediaQuery("(max-width: 650px)");
  // const [combinationName, setCombinationName] = useState<CombinationName>();
  const [imageLoading_1, setImageLoading_1] = useState(true);
  const [imageLoading_2, setImageLoading_2] = useState(true);
  const [preloading, setPreloading] = useState(true);
  const [
    betsAmount,
    lost,
    profit,
    gameStatus,
    playSounds,
    gameState,
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
    flipShowFlipCards,
    setShowFlipCards,
    //gameStatus
    //availableTokens
    setIsPlaying,
    setWaitingResponse,
    refund,
    setRefund,
  ] = useUnit([
    CustomWagerRangeInputModel.$pickedValue,
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$gameStatus,
    GameModel.$playSounds,
    PokerModel.$gameState,
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
    PokerModel.flipShowFlipCards,
    PokerModel.setShowFlipCards,
    //GameModel.$gameStatus
    //settingsModel.$AvailableTokens
    GameModel.setIsPlaying,
    GameModel.setWaitingResponse,
    GameModel.$refund,
    GameModel.setRefund,
  ]);
  const [coefficientData, setCoefficientData] = useState<number[]>([]);

  const [activeCards, setActiveCards] = useState<T_Card[]>(initialArrayOfCards);

  //const [cardsState, setCardsState] = useState<boolean[]>([false, false, false, false, false]);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useFeeData({
    watch: isConnected,
    cacheTime: 5000,
  });
  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (data && data.gasPrice) {
      setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
    }
  }, [data]);

  const [cardsState, setCardsState] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [playBackground, { stop: stopBackground }] = useSound(
    "/static/media/games_assets/music/background1.wav",
    { volume: 0.1, loop: true }
  );
  const [playDrawnCards] = useSound(
    "/static/media/games_assets/poker/sounds/cardsEveryone.mp3"
  );
  const [playNewCards] = useSound(
    "/static/media/games_assets/poker/sounds/2cards.mp3"
  );
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [inGame, setInGame] = useState<boolean>(false);

  const [setWstate] = useUnit([PokerModel.setWatchState]);

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    functionName: "getVRFFee",
    args: [0],
    watch: isConnected,
  });

  const {
    data: GameState,
    refetch: fetchGameState,
    error: readErr,
  } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    functionName: "VideoPoker_GetState",
    args: [address],
    //watch: watchState,
    enabled: true,
    //watch: isConnected,
    blockTag: "latest",
  });

  useEffect(() => {
    if (GameState) {
      if ((GameState as any).ingame) {
        setInGame(true);
        if (
          !(GameState as any).isFirstRequest &&
          (GameState as any).requestID == 0
        ) {
          flipShowFlipCards();
          setInGame(true);
          setActiveCards((GameState as any).cardsInHand);
        }
      } else {
      }
    }
  }, [GameState]);

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

  const { isSuccess: allowanceIsSet } = useWaitForTransaction({
    hash: allowanceData?.hash,
  });

  const [isPlaying] = useUnit([GameModel.$isPlaying]);

  // const { config: refundConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: IPoker,
  //   functionName: "VideoPoker_Refund",
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

  useEffect(() => {
    if (inGame && allowanceIsSet) {
      startPlaying();
    } else if (allowanceError) {
      //setActivePicker(true);
      setInGame(false);
      setWaitingResponse(false);
    }
  }, [inGame, allowanceIsSet, allowanceError]);

  const [fees, setFees] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(1000000) * (data.gasPrice + data.gasPrice / BigInt(4))
      );
    }
  }, [VRFFees, data]);

  // const { config: startPlayingConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: IPoker,
  //   functionName: "VideoPoker_Start",
  //   args: [
  //     useDebounce(
  //       BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
  //     ),
  //     pickedToken?.contract_address,
  //   ],
  //   value:
  //     fees +
  //     (pickedToken &&
  //       pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
  //       : BigInt(0)),
  //   enabled: true,
  // });

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite({
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    functionName: "VideoPoker_Start",
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      pickedToken?.contract_address,
    ],
    value:
      fees +
      (pickedToken &&
      pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
        : BigInt(0)),
  });

  useEffect(() => {
    if (startedPlaying) {
      setInGame(true);
      setWaitingResponse(true);
    }
  }, [startedPlaying]);

  // const { config: finishPlayingConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: IPoker,
  //   functionName: "VideoPoker_Replace",
  //   args: [cardsState.map((el) => (el ? 1 : 0))],
  //   value: cardsState.find((el) => el) ? fees : BigInt(0),
  //   enabled: true,
  // });

  const { write: finishPlaying, isSuccess: finishedPlaying } = useContractWrite(
    {
      chainId: chain?.id,
      address: gameAddress as `0x${string}`,
      abi: IPoker,
      functionName: "VideoPoker_Replace",
      args: [cardsState.map((el) => (el ? 1 : 0))],
      value: cardsState.find((el) => el) ? fees : BigInt(0),
      gasPrice: prevGasPrice,
      gas: BigInt(400000),
    }
  );

  useEffect(() => {
    if (startedPlaying || finishedPlaying) {
      setWaitingResponse(true);
      //setCardsNew(false);
    }
  }, [startedPlaying, finishedPlaying]);

  useEffect(() => {
    if (Wagered) {
      if (inGame) {
        setShowFlipCards(false);
        if (finishPlaying) finishPlaying();
      } else {
        if (
          cryptoValue != 0 &&
          currentBalance &&
          cryptoValue <= currentBalance
        ) {
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              "0x0000000000000000000000000000000000000000"
          ) {
            if (setAllowance) {
              setAllowance();
              setInGame(true);
              setWaitingResponse(true);
            }
            //return;
          } else {
            setActiveCards(initialArrayOfCards);

            if (startPlaying) {
              startPlaying();
            }
          }
        }
      }
      setWagered(false);
    }
  }, [Wagered]);

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    eventName: "VideoPoker_Start_Event",
    listener(log) {
      if ((log[0] as any).eventName == "VideoPoker_Start_Event") {
        if (
          ((log[0] as any).args.playerAddress as string).toLowerCase() ==
          address?.toLowerCase()
        ) {
          setWaitingResponse(false);
          //setCardsNew(true);
          setActiveCards((log[0] as any).args.playerHand as T_Card[]);
          setShowFlipCards(true);
        }
      }
    },
  });

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    eventName: "VideoPoker_Outcome_Event",
    listener(log) {
      if ((log[0] as any).eventName == "VideoPoker_Outcome_Event") {
        if (
          ((log[0] as any).args.playerAddress as string).toLowerCase() ==
          address?.toLowerCase()
        ) {
          setShowFlipCards(false);
          setWaitingResponse(false);

          setActiveCards((log[0] as any).args.playerHand);
          setCardsState([false, false, false, false, false]);
          setInGame(false);

          const wagered = (log[0] as any).args.wager;
          const handlePayouts = async () => {
            setCoefficientData((prev) => [
              Number((log[0] as any)?.args?.payout) / Number(wagered),
              ...prev,
            ]);
          };
          handlePayouts();
          if ((log[0] as any).args.payout > 0) {
            const profit = (log[0] as any).args.payout;

            const multiplier = Number(profit / wagered);

            const wagered_token = (
              (log[0] as any).args.tokenAddress as string
            ).toLowerCase();
            const token = TOKENS.find(
              (tk) => tk.address == wagered_token
            )?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];

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
          //setShowRedraw(false);
        }
      } else {
      }
    },
  });

  useEffect(() => {
    setActiveCards(gameState ? gameState : initialArrayOfCards);
    playDrawnCards();
  }, [gameState]);

  function hasRoyalFlush(cards: ICards[]) {
    const royalFlushNumbers = [1, 10, 11, 12, 13];
    const suits = new Set(cards.map((card) => card.suit));

    return Array.from(suits).some((suit) => {
      const suitCards = cards.filter((card) => card.suit === suit);
      const numbers = suitCards.map((card) => card.number);

      return royalFlushNumbers.every((number) => numbers.includes(number));
    });
  }

  function hasStraightFlush(cards: ICards[]) {
    const suits = Array.from(new Set(cards.map((card) => Number(card.suit))));
    if (suits.length > 1) return false;
    return suits.some((suit) => {
      const suitCards = cards.filter((card) => Number(card.suit) === suit);
      const sortedNumbers = suitCards
        .map((card) => card.number)
        .sort((a, b) => a - b);

      for (let i = 0; i < sortedNumbers.length - 1; i++) {
        if (sortedNumbers[i] !== sortedNumbers[i + 1] - 1) {
          return false;
        }
      }

      return true;
    });
  }

  function hasFourOfAKind(cards: ICards[]) {
    const numberCounts = countNumbers(cards);

    return Object.values(numberCounts).includes(4);
  }

  function hasFullHouse(cards: ICards[]) {
    const numberCounts = countNumbers(cards);
    return (
      Object.values(numberCounts).includes(3) &&
      Object.values(numberCounts).includes(2)
    );
  }

  function hasFlush(cards: ICards[]) {
    const suits = new Set(cards.map((card) => card.suit));
    return suits.size === 1;
  }

  function hasStraight(cards: ICards[]) {
    const sortedNumbers = cards
      .map((card) => card.number)
      .sort((a, b) => a - b);

    for (let i = 0; i < sortedNumbers.length - 1; i++) {
      if (sortedNumbers[i] !== sortedNumbers[i + 1] - 1) {
        return false;
      }
    }

    return true;
  }

  function hasThreeOfAKind(cards: ICards[]) {
    const numberCounts = countNumbers(cards);
    return Object.values(numberCounts).includes(3);
  }

  function hasTwoPair(cards: ICards[]) {
    const numberCounts = countNumbers(cards);
    const pairs = Object.values(numberCounts).filter((count) => count === 2);
    return pairs.length === 2;
  }

  function hasOnePair(cards: ICards[]) {
    const numberCounts = countNumbers(cards);
    return Object.values(numberCounts).includes(2);
  }

  function countNumbers(cards: ICards[]) {
    const counts: Record<number, number> = {};
    for (const card of cards) {
      counts[card.number] = (counts[card.number] || 0) + 1;
    }
    return counts;
  }

  const [combinationName, setCombinationName] = useState("");

  function evaluatePokerHand(cards: ICards[]) {
    if (hasRoyalFlush(cards)) {
      setCombinationName("Royal Flush");
    } else if (hasStraightFlush(cards)) {
      setCombinationName("Straight Flush");
    } else if (hasFourOfAKind(cards)) {
      setCombinationName("Four of a Kind");
    } else if (hasFullHouse(cards)) {
      setCombinationName("Full House");
    } else if (hasFlush(cards)) {
      setCombinationName("Flush");
    } else if (hasStraight(cards)) {
      setCombinationName("Straight");
    } else if (hasThreeOfAKind(cards)) {
      setCombinationName("Three of a Kind");
    } else if (hasTwoPair(cards)) {
      setCombinationName("Two Pair");
    } else if (hasOnePair(cards)) {
      setCombinationName("One Pair");
    } else {
      setCombinationName("High Card");
    }
  }
  useEffect(() => {
    evaluatePokerHand(activeCards);
  }, [activeCards, gameStatus]);

  const [multiplier, token] = useUnit([
    GameModel.$multiplier,
    GameModel.$token,
  ]);

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

  useEffect(() => {
    if (!imageLoading_1 && !imageLoading_2) {
      setPreloading(imageLoading_1);
    }
  }, [imageLoading_1, imageLoading_2]);

  return (
    <>
      {gameStatus === GameModel.GameStatus.Won && (
        <PokerCombination
          combinationName={combinationName}
          tokenImage={
            <Image
              src={`${api.BaseStaticUrl}/media/tokens/${token}.svg`}
              alt={""}
              width={isMobile ? 22 : 30}
              height={isMobile ? 22 : 30}
            />
          }
          profit={profit.toFixed(2)}
          multiplier={Number(multiplier.toFixed(2)).toString()}
        />
      )}

      <div className={s.poker_table_wrap}>
        <WagerLowerBtnsBlock game="poker" text={props.gameText} />
        {preloading && <Preload />}{" "}
        <div className={s.poker_table_background}>
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={tableBg}
            className={s.poker_table_background_img}
            alt="table-bg"
          />
        </div>{" "}
        <div className={clsx(s.total_container)}>
          <span className={s.total_won}>{fullWon.toFixed(2)}</span>
          <span className={s.total_lost}>{fullLost.toFixed(2)}</span>
          <div>
            Total:{" "}
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
        <div className={clsx(s.balls_arr)}>
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
        <div className={s.poker_table}>
          <div className={s.poker_table_cards_list}>
            {activeCards &&
              activeCards.map((item, ind) => {
                return item.number == -1 ? (
                  <PokerCard
                    setImageLoading={setImageLoading_2}
                    key={ind}
                    isEmptyCard={false}
                    coat={0}
                    card={0}
                    onClick={() => {}}
                  />
                ) : (
                  <PokerCard
                    setImageLoading={setImageLoading_2}
                    key={`${item.suit}_${item.number}_${transactionHash}`}
                    isEmptyCard={false}
                    coat={item.suit}
                    card={item.number}
                    onClick={() => {
                      const cards = cardsState;
                      cards[ind] = !cards[ind];
                      setCardsState([...cards]);
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
