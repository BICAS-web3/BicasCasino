import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import s from "./styles.module.scss";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useNetwork,
  useFeeData
} from 'wagmi';
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { ABI as IPoker } from "@/shared/contracts/PokerABI";
import { FC, useEffect, useState } from "react";
import * as api from '@/shared/api';
import { LiveBetsWS } from "@/widgets/LiveBets";
import { sessionModel } from "@/entities/session";
import { useUnit } from "effector-react";
import { PokerFlipCardsInfo } from "@/widgets/PokerFlipCardsInfo";
import useSound from 'use-sound';
import { SideBarModel } from "@/widgets/SideBar";
import { PokerModel } from "@/widgets/Poker/Poker";
import { useContractEvent } from 'wagmi'

interface PokerWrapperProps { }

export const PokerWrapper: FC<PokerWrapperProps> = ({ }) => {
  const [
    newBet,
    gameStateHook,
    setGameStateHook
  ] = useUnit([
    sessionModel.$newBet,
    PokerModel.$gameState,
    PokerModel.setGameState
  ]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: feeData } = useFeeData();
  const [gameAddress, setGameAddress] = useState<string>();
  const [currentToken, setCurrentToken] = useState<api.T_Token>();
  const [newAllowance, setNewAllowance] = useState<bigint>();
  const [currentWager, setCurrentWager] = useState<number>(0);
  const [showRedraw, setShowRedraw] = useState<boolean>(false);
  const [cardsState, setCardsState] = useState<boolean[]>([false, false, false, false, false]);
  const [playCard] = useSound('/static/media/games_assets/poker/sounds/oneCard.mp3');
  const [inGame, setInGame] = useState<boolean | null>(null);

  const { data: allowance, isError, isLoading, refetch: fetchAllowance } = useContractRead({
    chainId: chain?.id,
    address: (currentToken?.contract_address as `0x${string}`),
    abi: IERC20,
    functionName: 'allowance',
    args: [address, gameAddress],
    watch: true,
  });

  const { data: VRFFees } = useContractRead({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    functionName: 'getVRFFee',
    args: [500000],
    watch: true,
  });

  const { data: GameState } = useContractRead({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    functionName: 'VideoPoker_GetState',
    args: [address],
    watch: true,
  });

  useContractEvent({
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    eventName: 'VideoPoker_Outcome_Event',
    listener(log) {
      console.log('Log', log);
      console.log('address', ((log[0] as any).args.playerAddress as string));
      console.log('address wallet', address?.toLowerCase());
      if (((log[0] as any).args.playerAddress as string).toLowerCase() == address?.toLowerCase()) {
        console.log("Found Log!");
        setGameStateHook((log[0] as any).args.playerHand);
        setCardsState([false, false, false, false, false]);
        setInGame(false);
        setShowRedraw(false);
      }
    },
  });

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      await sleep(5000);
      console.log("Nullifying");
      setGameStateHook(null);
    };
    if (inGame != null && inGame == false) {
      run();
    }
  }, [inGame]);

  useEffect(() => {
    console.log("prev state", GameState);
    if (GameState as any | undefined) {
      if ((GameState as any).ingame) {
        setInGame(true);
        if (!(GameState as any).isFirstRequest && (GameState as any).requestID == 0) {
          setGameStateHook((GameState as any).cardsInHand);
          setShowRedraw(true);
        }
      } else {
        // setCardsState([false, false, false, false, false]);
        // setInGame(false);
        // setShowRedraw(false);
      }
    }
    // if (GameState as any | undefined
    //   && (GameState as any).ingame
    //   && !(GameState as any).isFirstRequest
    //   && (GameState as any).requestID == 0) {
    //   setShowRedraw(true);
    // }
    // if (GameState as any | undefined) {
    //   if ((GameState as any).ingame) {
    //     setInGame(true);
    //   } else {
    //     setCardsState([false, false, false, false, false]);
    //     setInGame(false);
    //   }
    // }
  }, [GameState])

  useEffect(() => {
    console.log("FEES", feeData);
  }, [feeData])

  const { write: setAllowance } = useContractWrite({
    chainId: chain?.id,
    address: (currentToken?.contract_address as `0x${string}`),
    abi: IERC20,
    functionName: 'approve',
    args: [gameAddress, newAllowance]
  });

  const { write: startPlaying, isSuccess: startedPlaying } = useContractWrite({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    functionName: 'VideoPoker_Start',
    args: [BigInt(parseInt(((Number.isNaN(currentWager as number) ? 0 : currentWager as number) * 10000).toString())) * BigInt(100000000000000), currentToken?.contract_address],
    value: BigInt((VRFFees as bigint) ? (VRFFees as bigint) : 0) * BigInt(10),
    //gas: BigInt(500000)
  });

  const { write: finishPlaying, isSuccess: finishedPlaying } = useContractWrite({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    functionName: 'VideoPoker_Replace',
    args: [cardsState],
    value: cardsState.find((el) => el) ? BigInt((VRFFees as bigint) ? (VRFFees as bigint) : 0) * BigInt(10) : BigInt(0),
    //gas: BigInt(500000)
  });

  useEffect(() => {
    if (!chain) {
      return;
    }

    const run = async () => {
      const game = (await api.getGame({
        network_id: chain.id,
        game_name: "Poker"
      })).body as api.T_Game;

      console.log("game", game);

      setGameAddress(game.address);
    };

    run();
  }, [chain]);

  useEffect(() => {
    if (!gameAddress) {
      return;
    }

    console.log("game address", gameAddress);

  }, [gameAddress]);

  useEffect(() => {
    if (!newAllowance) {
      return;
    }
    setAllowance();
  }, [newAllowance]);

  const onWager = async (tokenAmount: number) => {
    if (!isConnected) {
      return;
    }
    console.log("allowance", allowance);
    if (Number((allowance as bigint / BigInt(1000000000000000000)).toString()) < tokenAmount) {
      setNewAllowance(BigInt(tokenAmount * 10) * BigInt(1000000000000000000));
      return;
    }

    startPlaying();
    //setInGame(true);
  };

  useEffect(() => {
    if (startedPlaying) {
      //startPlaying();
      setInGame(true);
    }
  }, [startedPlaying])

  const onTokenChange = async (token: api.T_Token) => {
    setCurrentToken(token);
  };

  const onTokenAmountChange = (tokenAmount: number) => {
    setCurrentWager(tokenAmount);
  };

  const redrawCards = () => {
    finishPlaying();
  };

  useEffect(() => {
    if (finishedPlaying) {
      setShowRedraw(false);
    }
  }, [finishedPlaying]);

  return (<GamePage
    gameInfoText="test"
    gameTitle="poker"
    game="poker"
    onWager={onWager}
    onTokenChange={onTokenChange}
    onTokenAmountChange={onTokenAmountChange}
    inGame={inGame ? inGame : false}
  >
    {/* {GameState as any | undefined
      ? <Poker
        cardsState={cardsState}
        setCardsState={setCardsState}
        initialCards={(GameState as any).ingame
          && !(GameState as any).isFirstRequest
          ? (GameState as any).cardsInHand : undefined} 

          /> : <Poker
        cardsState={cardsState}
        setCardsState={setCardsState}
        initialCards={undefined} />} */}
    <Poker
      cardsState={cardsState}
      setCardsState={setCardsState}
    />
    {showRedraw && <div className={s.poker_flip_cards_info_wrapper}>
      <PokerFlipCardsInfo onCLick={() => { playCard(); redrawCards(); }} />
    </div>}
  </GamePage>);
}


export default function PokerGame() {
  const [setPickedGame] = useUnit([SideBarModel.setCurrentPick]);

  useEffect(() => {
    setPickedGame(0);
  }, []);

  return (
    <Layout>
      <LiveBetsWS subscription_type={'Subscribe'} subscriptions={['Poker', 'PokerStart']} />
      <div className={s.poker_container}>
        <PokerWrapper />
      </div>
    </Layout>
  );
}
