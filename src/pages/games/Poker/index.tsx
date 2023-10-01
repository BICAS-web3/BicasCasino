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

interface PokerWrapperProps { }

export const PokerWrapper: FC<PokerWrapperProps> = ({ }) => {

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: feeData } = useFeeData();
  const [gameAddress, setGameAddress] = useState<string>();
  const [currentToken, setCurrentToken] = useState<api.T_Token>();
  const [newAllowance, setNewAllowance] = useState<bigint>();
  const [currentWager, setCurrentWager] = useState<number>(0);


  const { data: allowance, isError, isLoading, refetch: fetchAllowance } = useContractRead({
    address: (currentToken?.contract_address as `0x${string}`),
    abi: IERC20,
    functionName: 'allowance',
    args: [address, gameAddress],
    watch: true,
  });

  const { data: VRFFees } = useContractRead({
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    functionName: 'getVRFFee',
    args: [500000],
    watch: true,
  });

  useEffect(() => {
    console.log("FEES", feeData);
  }, [feeData])

  const { write: setAllowance } = useContractWrite({
    address: (currentToken?.contract_address as `0x${string}`),
    abi: IERC20,
    functionName: 'approve',
    args: [gameAddress, newAllowance]
  });

  const { write: startPlaying } = useContractWrite({
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    functionName: 'VideoPoker_Start',
    args: [BigInt(currentWager as number) * BigInt(1000000000000000000), currentToken?.contract_address],
    value: BigInt((VRFFees as bigint) ? (VRFFees as bigint) : 0) * BigInt(2),
    gas: BigInt(500000)
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
    console.log("allowance", allowance);
    if (Number((allowance as bigint / BigInt(1000000000000000000)).toString()) < tokenAmount) {
      setNewAllowance(BigInt(tokenAmount * 10) * BigInt(1000000000000000000));
      return;
    }

    startPlaying();
  };

  const onTokenChange = async (token: api.T_Token) => {
    setCurrentToken(token);
  };

  const onTokenAmountChange = (tokenAmount: number) => {
    setCurrentWager(tokenAmount);
  };

  return (<GamePage
    gameInfoText="test"
    gameTitle="poker"
    game="poker"
    onWager={onWager}
    onTokenChange={onTokenChange}
    onTokenAmountChange={onTokenAmountChange}
  >
    <Poker />
  </GamePage>);
}


export default function PokerGame() {
  return (
    <Layout>
      <LiveBetsWS subscription_type={'Subscribe'} subscriptions={['Poker', 'PokerStart']} />
      <div className={s.poker_container}>
        <PokerWrapper />
      </div>
    </Layout>
  );
}
