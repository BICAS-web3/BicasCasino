import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/poker_images/pokerBgImage.png";
// import testCard1 from "@/public/media/poker_images/testCard1.png";
// import testCard2 from "@/public/media/poker_images/testCard2.png";
// import testCard3 from "@/public/media/poker_images/testCard3.png";
// import testCard4 from "@/public/media/poker_images/testCard4.png";
// import testCard5 from "@/public/media/poker_images/testCard5.png";
import { PokerCard } from "./PokerCard";
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
import { useDebounce } from "@/shared/tools";

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

// export type T_Card = {
//   coat: number,
//   card: number
// };

export interface PokerProps {
  // cardsState: boolean[],
  // setCardsState: any,
  //initialCards: T_Card[] | undefined,
  //gameState: any | undefined
}

export const Poker: FC<PokerProps> = (props) => {
  const [
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
  ] = useUnit([
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
  ]);

  const [activeCards, setActiveCards] = useState<T_Card[]>(initialArrayOfCards);
  //const [cardsState, setCardsState] = useState<boolean[]>([false, false, false, false, false]);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useFeeData({ watch: true });

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

  const [watchState, setWatchState] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!gameStatus) {
  //     setActiveCards(initialArrayOfCards);
  //   }
  // }, [gameStatus])

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    functionName: "getVRFFee",
    args: [0],
    // onSuccess: (fees: bigint) => {
    //   console.log('fees', fees);
    // },
    watch: isConnected,
  });

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    functionName: "VideoPoker_GetState",
    args: [address],
    //watch: watchState,
    enabled: true,
    watch: isConnected,
    //blockTag: 'latest' as any
  });

  useEffect(() => {
    if (GameState) {
      if ((GameState as any).ingame) {
        if (
          !(GameState as any).isFirstRequest &&
          (GameState as any).requestID == 0
        ) {
          flipShowFlipCards();
          setInGame(true);
          setActiveCards((GameState as any).cardsInHand);
          setWatchState(true);
          //setShowRedraw(true);
          // show redrawing cards info
        }
      } else {
        // setCardsState([false, false, false, false, false]);
        // setInGame(false);
        // setShowRedraw(false);
      }
      setWatchState(false);
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
  });

  const { write: setAllowance, isSuccess: allowanceIsSet } =
    useContractWrite(allowanceConfig);

  const [fees, setFees] = useState<bigint>(BigInt(0));

  useEffect(() => {
    console.log("gas price", data?.gasPrice);
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(1000000) * (data.gasPrice + data.gasPrice / BigInt(4))
      );
    }
  }, [VRFFees, data]);

  const { config: startPlayingConfig } = usePrepareContractWrite({
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
    //value: fees,
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
    error,
  } = useContractWrite(startPlayingConfig);

  useEffect(() => {
    console.log(startPlaying);
  }, [startPlaying]);

  const { config: finishPlayingConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    functionName: "VideoPoker_Replace",
    args: [cardsState.map((el) => (el ? 1 : 0))],
    value: cardsState.find((el) => el) ? fees : BigInt(0),
    enabled: true,
  });

  const { write: finishPlaying, isSuccess: finishedPlaying } =
    useContractWrite(finishPlayingConfig);

  useEffect(() => {
    if (Wagered) {
      console.log("Pressed wager");
      if (inGame) {
        setShowFlipCards(false);
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
            //return;
          } else {
            setActiveCards(initialArrayOfCards);
            console.log(
              "Starting playing",
              startPlaying,
              BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
              BigInt(VRFFees ? (VRFFees as bigint) : 0) * BigInt(10),
              pickedToken?.contract_address
            );
            if (startPlaying) {
              startPlaying();
            }
          }
        }
      }
      setWagered(false);
    }
  }, [Wagered]);

  useEffect(() => {
    setWatchState(true);
  }, [startedPlaying]);

  // useEffect(() => {
  //   console.log("available tokens", availableTokens);
  // }, [availableTokens])

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: IPoker,
    eventName: "VideoPoker_Outcome_Event",
    listener(log) {
      console.log("Log", log);
      if ((log[0] as any).eventName == "VideoPoker_Outcome_Event") {
        //console.log('Log', log);
        console.log("address", (log[0] as any).args.playerAddress as string);
        console.log("address wallet", address?.toLowerCase());
        if (
          ((log[0] as any).args.playerAddress as string).toLowerCase() ==
          address?.toLowerCase()
        ) {
          console.log("Found Log!");
          setActiveCards((log[0] as any).args.playerHand);
          setCardsState([false, false, false, false, false]);
          setInGame(false);

          const wagered = (log[0] as any).args.wager;
          if ((log[0] as any).args.payout > 0) {
            console.log("won");
            const profit = (log[0] as any).args.payout;
            console.log("profit", profit);
            const multiplier = Number(profit / wagered);
            console.log("multiplier", multiplier);
            //console.log("token", ((log[0] as any).args.tokenAddress as string).toLowerCase());
            const wagered_token = (
              (log[0] as any).args.tokenAddress as string
            ).toLowerCase();
            const token = TOKENS.find(
              (tk) => tk.address == wagered_token
            )?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];
            console.log("won token", token);
            //console.log("available tokens", availableTokens);
            const profitFloat =
              Number(profit / BigInt(10000000000000000)) / 100;
            setWonStatus({
              profit: profitFloat,
              multiplier,
              token: token as string,
            });
            setGameStatus(GameModel.GameStatus.Won);
          } else {
            console.log("lost");
            const wageredFloat =
              Number(wagered / BigInt(10000000000000000)) / 100;
            console.log("wagered", wageredFloat);
            setLostStatus(wageredFloat);
            setGameStatus(GameModel.GameStatus.Lost);
          }
          //setShowRedraw(false);
        }
      } else {
        console.log("Wrong Log!");
      }
    },
  });

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

  useEffect(() => {
    const run = async () => {
      //await delay(3000);
      playBackground();
    };

    if (playSounds) {
      run();
    }
  }, [playBackground]);

  useEffect(() => {
    setActiveCards(gameState ? gameState : initialArrayOfCards);
    playDrawnCards();
  }, [gameState]);

  // useEffect(() => {
  //   console.log("Cards state", props.cardsState);
  // }, [props.cardsState]);

  return (
    <div className={s.poker_table_wrap}>
      <div className={s.poker_table_background}>
        <Image
          src={tableBg}
          className={s.poker_table_background_img}
          alt="table-bg"
        />
      </div>
      <div className={s.poker_table}>
        <div className={s.poker_table_cards_list}>
          {activeCards &&
            activeCards.map((item, ind) => {
              return item.number == -1 ? (
                <PokerCard
                  key={ind}
                  isEmptyCard={false}
                  coat={0}
                  card={0}
                  onClick={() => {}}
                />
              ) : (
                <PokerCard
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
  );
};
