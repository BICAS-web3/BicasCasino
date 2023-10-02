import styles from './styles.module.scss'
import {FC, useEffect, useState} from "react";
import {Layout} from "@/widgets/Layout";
import {LiveBetsWS} from "@/widgets/LiveBets";
import {MinesGame} from "@/widgets/MinesGame/MinesGame";
import {GamePage} from "@/widgets/GamePage/GamePage";
import {useAccount, useContractRead, useContractWrite} from "wagmi";
import {ABI as IERC20} from "@/shared/contracts/ERC20";
import * as api from "@/shared/api";
import {ABI as IPoker} from "@/shared/contracts/PokerABI";

interface IMinesWrapper {}
export const MinesWrapper: FC<IMinesWrapper> = () => {
  const { address, isConnected } = useAccount();
  const [currentToken, setCurrentToken] = useState<api.T_Token>();
  const [gameAddress, setGameAddress] = useState<string>();
  const [newAllowance, setNewAllowance] = useState<bigint>();
  const [inGame, setInGame] = useState<boolean>(false);
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
  const { write: startPlaying, isSuccess: startedPlaying } = useContractWrite({
    address: (gameAddress as `0x${string}`),
    abi: IPoker,
    functionName: 'VideoPoker_Start',
    args: [BigInt(parseInt(((Number.isNaN(currentWager as number) ? 0 : currentWager as number) * 10000).toString())) * BigInt(100000000000000), currentToken?.contract_address],
    value: BigInt((VRFFees as bigint) ? (VRFFees as bigint) : 0) * BigInt(10),
    gas: BigInt(500000)
  });

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
    setInGame(true);
  };
  const onTokenChange = async (token: api.T_Token) => {
    setCurrentToken(token);
  };
  const onTokenAmountChange = (tokenAmount: number) => {
    setCurrentWager(tokenAmount);
  };
  return (
    <GamePage
      gameInfoText="test"
      gameTitle="mines"
      game="mines"
      onWager={onWager}
      onTokenChange={onTokenChange}
      onTokenAmountChange={onTokenAmountChange}
      inGame={inGame}
    >
      {<MinesGame/>}
    </GamePage>
  )
}

export default function MinesGame() {
  // const [setPickedGame] = useUnit([SideBarModel.setCurrentPick]);

  // useEffect(() => {
  //   setPickedGame(0);
  // }, []);

  return (
    <Layout>
      <LiveBetsWS subscription_type={'Subscribe'} subscriptions={['Mines', 'MinesStart']}/>
      <div className={styles.mines_container}>
        <MinesWrapper/>
      </div>
    </Layout>
  );
}




