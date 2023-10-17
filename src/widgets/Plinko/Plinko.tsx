import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/games_assets/plinko/plinkoBgImage2.png";
import { PlinkoPyramid } from "@/shared/ui/PlinkoPiramyd";
import { useStore, useUnit } from "effector-react";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import { WagerModel as WagerButtonModel } from '../Wager';
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from '../CustomWagerRangeInput';
import { sessionModel } from "@/entities/session";
import { WagerGainLossModel } from "../WagerGainLoss";
import { TOKENS } from "@/shared/tokens";
import { useDebounce } from "@/shared/tools";
import { useNetwork, useAccount, useFeeData, useContractRead, usePrepareContractWrite, useContractWrite, useContractEvent } from "wagmi";
import { pickSide } from "../CoinFlipSidePicker/model";
import { ABI as IPlinko } from "@/shared/contracts/PlinkoABI";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";

interface IPlinko { }

export const Plinko: FC<IPlinko> = () => {

  const [
    playSounds,
    wagered,
    setWagered,
    rowsAmount,
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
    pickedLevel
  ] = useUnit([
    GameModel.$playSounds,
    WagerButtonModel.$Wagered,
    WagerButtonModel.setWagered,
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
    levelModel.$level
  ]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useFeeData();

  const [waitingResult, setWaitingResult] = useState(false);
  const [inGame, setInGame] = useState<boolean>(false);
  const [path, setPath] = useState<boolean[] | undefined>(undefined);

  const [playBackground, { stop: stopBackground }] = useSound('/static/media/games_assets/music/background2.wav', { volume: 0.1, loop: true });

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
    address: (gameAddress as `0x${string}`),
    abi: IPlinko,
    functionName: 'Plinko_GetState',
    args: [address],
    enabled: true,
    watch: isConnected,
    //blockTag: 'latest' as any
  });

  useEffect(() => {
    if (GameState && !inGame) {
      if ((GameState as any).ingame) {
        if (!(GameState as any).isFirstRequest && (GameState as any).requestID == 0) {
          setInGame(true);
          //setActivePicker(false);
          pickSide(((GameState as any).isHeads as number));
        }
      } else {
        setInGame(false);
      }
    }
  }, [GameState]);

  const { config: allowanceConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: (pickedToken?.contract_address as `0x${string}`),
    abi: IERC20,
    functionName: 'approve',
    enabled: true,
    args: [gameAddress, useDebounce(currentBalance ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000) : 0)]
  });

  const { write: setAllowance, isSuccess: allowanceIsSet } = useContractWrite(allowanceConfig);

  const [fees, setFees] = useState<bigint>(BigInt(0));

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: IPlinko,
    functionName: 'getVRFFee',
    args: [0],
    // onSuccess: (fees: bigint) => {
    //   console.log('fees', fees);
    // },
    watch: true,
  });

  // const [riskLevel, setRiskLevel] = useState(pickedLevel == 'easy' ? 0 : pickedLevel == 'normal' ? 1 : 2);

  useEffect(() => {
    console.log('gas price', data?.gasPrice);
    if (VRFFees && data?.gasPrice) {
      setFees((BigInt(VRFFees ? (VRFFees as bigint) : 0) + (BigInt(2000000) * data.gasPrice)));
      console.log("vrf fee", (BigInt(VRFFees ? (VRFFees as bigint) : 0) + (BigInt(2000000) * data.gasPrice)));
    }
  }, [VRFFees, data]);

  const { config: startPlayingConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: IPlinko,
    functionName: 'Plinko_Play',
    args: [
      useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)),
      pickedToken?.contract_address,
      //pickedSide,
      rowsAmount,
      pickedLevel == 'easy' ? 0 : pickedLevel == 'normal' ? 1 : 2,
      1,
      useDebounce(stopGain) ? BigInt(Math.floor(stopGain as number * 10000000)) * BigInt(100000000000) : BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000) * BigInt(200),
      useDebounce(stopLoss) ? BigInt(Math.floor(stopLoss as number * 10000000)) * BigInt(100000000000) : BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000) * BigInt(200)
    ],
    value: fees,
    enabled: true,
    //gas: BigInt(3000000),
  });

  const { write: startPlaying, isSuccess: startedPlaying, error } = useContractWrite(startPlayingConfig);

  // useEffect(() => {
  //   console.log("Picked side", pickedSide);
  // }, [pickedSide])

  useEffect(() => {
    if (startedPlaying) {
      //setActivePicker(false);
      setInGame(true);
    }
  }, [startedPlaying]);

  useEffect(() => {
    console.log(error);
  }, [error])

  useContractEvent({
    address: (gameAddress as `0x${string}`),
    abi: IPlinko,
    eventName: 'Plinko_Outcome_Event',
    listener(log) {
      //handleLog(log)
      console.log('Log', log);
      console.log('address', ((log[0] as any).args.playerAddress as string));
      console.log('address wallet', address?.toLowerCase());
      //console.log('Picked side', pickedSide);
      if (((log[0] as any).args.playerAddress as string).toLowerCase() == address?.toLowerCase()) {
        console.log("Found Log!");
        const wagered = BigInt(((log[0] as any).args.wager)) * BigInt((log[0] as any).args.numGames);
        setPath((log[0] as any).args.paths[0]);
        if ((log[0] as any).args.payout > wagered) {
          console.log("won");
          const profit = (log[0] as any).args.payout;
          console.log("profit", profit);
          const multiplier = Number(profit / wagered);
          console.log("multiplier", multiplier);
          //console.log("token", ((log[0] as any).args.tokenAddress as string).toLowerCase());
          const wagered_token = ((log[0] as any).args.tokenAddress as string).toLowerCase();
          const token = TOKENS.find((tk) => tk.address == wagered_token)?.name//TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];
          console.log("won token", token);
          //console.log("available tokens", availableTokens);
          const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
          setWonStatus({ profit: profitFloat, multiplier, token: token as string });
          setGameStatus(GameModel.GameStatus.Won);
        } else {
          console.log("lost");
          const wageredFloat = Number(wagered / BigInt(10000000000000000)) / 100;
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
      console.log("Pressed wager");
      if (inGame) {
        // setShowFlipCards(false);
        // if (finishPlaying) finishPlaying();
      } else {
        console.log(cryptoValue, currentBalance);
        const total_value = cryptoValue * 1;
        if (cryptoValue != 0 && currentBalance && total_value <= currentBalance) {
          console.log('Allowance', allowance);
          if (!allowance || (allowance && allowance <= cryptoValue)) {
            console.log('Setting allowance');
            if (setAllowance) setAllowance();
            //return;
          } else {
            //setActiveCards(initialArrayOfCards);
            console.log("Starting playing",
              startPlaying,
              BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
              //BigInt(VRFFees ? (VRFFees as bigint) : 0) * BigInt(10),
              pickedToken?.contract_address,
              gameAddress,
              VRFFees
            );
            if (startPlaying) {
              setPath(undefined);
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
  }, [gameStatus])

  return (
    <div className={styles.plinko_table_wrap}>
      <div className={styles.plinko_table_background}>
        <Image
          src={tableBg}
          className={styles.plinko_table_background_img}
          alt="table-bg"
          width={1418}
          height={680}
          quality={100}
        />
      </div>
      <div className={styles.plinko_table}>
        <div className={styles.pyramid}>
          <PlinkoPyramid path={path} />
        </div>
      </div>
    </div>
  );
};
