import { FC, useEffect, useState, Suspense } from "react";
import s from "./styles.module.scss";
import tableBg from "@/public/media/coinflip_images/coinflipTableBg.png";
import Image from "next/image";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, act } from "@react-three/fiber";
import { AnimationAction } from "three";
import { Environment } from '@react-three/drei';
import { SidePickerModel } from "../CoinFlipSidePicker";
import { useUnit } from "effector-react";
import { WagerModel as WagerButtonModel } from '../Wager';
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from '../CustomWagerRangeInput';
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import { useAccount, useContractEvent, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";
import { sessionModel } from "@/entities/session";
import { ABI as ICoinFlip } from "@/shared/contracts/CoinFlipABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { useDebounce } from "@/shared/tools";
import { WagerGainLossModel } from "../WagerGainLoss";
import { TOKENS } from "@/shared/tokens";

interface CoinFlipProps { }

enum CoinAction {
  Rotation = "Rotation",
  HeadsHeads = "HeadsHeads",
  HeadsTails = "HeadsTails",
  TailsHeads = "TailsHeads",
  TailsTails = "TailsTails",
  Stop = ""
}

interface ModelProps {
  action: CoinAction;
  initial: SidePickerModel.Side
}

const Model: FC<ModelProps> = ({ action, initial }) => {
  const { scene, animations } = useGLTF("/coinflip/coin_old.gltf");
  const { actions, mixer } = useAnimations(animations, scene);

  // scene.rotation.z = 1.3;
  if (initial == SidePickerModel.Side.Heads) {
    scene.rotation.y = -1.58;
  } else if (initial == SidePickerModel.Side.Tails) {
    scene.rotation.y = 1.58;
  }
  // scene.rotation.x = 3;



  console.log(scene);

  useEffect(() => {
    const rotation = actions[
      CoinAction.Rotation
    ] as AnimationAction;
    rotation.stop();
    if (action != CoinAction.Stop) {
      const current = actions[
        action
      ] as AnimationAction;
      current.stop();
      current.play();
      current.clampWhenFinished = false;
      console.log(current);
      if (action != CoinAction.Rotation) {
        current.setLoop(2200, 1);
      }
    }
  }, [initial, action]);

  // @ts-ignore
  return <primitive object={scene} />;
};

export const CoinFlip: FC<CoinFlipProps> = ({ }) => {
  const [
    playSounds,
    pickedSide,
    setActivePicker,
    pickSide,
    wagered,
    setWagered,
    betsAmount,
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
    setLostStatus
  ] = useUnit([
    GameModel.$playSounds,
    SidePickerModel.$pickedSide,
    SidePickerModel.setActive,
    SidePickerModel.pickSide,
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
  ]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const [waitingResult, setWaitingResult] = useState(false);
  const [inGame, setInGame] = useState<boolean>(false);

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
    abi: ICoinFlip,
    functionName: 'CoinFlip_GetState',
    args: [address],
    enabled: true,
    watch: isConnected,
    //blockTag: 'latest' as any
  });

  useEffect(() => {
    if (GameState) {
      if ((GameState as any).ingame) {
        if (!(GameState as any).isFirstRequest && (GameState as any).requestID == 0) {
          setInGame(true);
          setActivePicker(false);
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

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: ICoinFlip,
    functionName: 'getVRFFee',
    args: [500000],
    // onSuccess: (fees: bigint) => {
    //   console.log('fees', fees);
    // },
    watch: isConnected,
  });

  const { config: startPlayingConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: (gameAddress as `0x${string}`),
    abi: ICoinFlip,
    functionName: 'CoinFlip_Play',
    args: [
      useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)),
      pickedToken?.contract_address,
      pickedSide,
      betsAmount,
      stopGain ? useDebounce(BigInt(Math.floor(stopGain * 10000000)) * BigInt(100000000000)) : useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)) * BigInt(200),
      stopLoss ? useDebounce(BigInt(Math.floor(stopLoss * 10000000)) * BigInt(100000000000)) : useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)) * BigInt(200)
    ],
    value: BigInt(VRFFees ? (VRFFees as bigint) / BigInt(2) : 0) * BigInt(10),
    enabled: true,
  });

  const { write: startPlaying, isSuccess: startedPlaying, error } = useContractWrite(startPlayingConfig);

  useEffect(() => {
    console.log("Picked side", pickedSide);
  }, [pickedSide])

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
    }
  }, [startedPlaying]);

  const handleLog = (log: any) => {
    console.log('Log', log);
    console.log('address', ((log[0] as any).args.playerAddress as string));
    console.log('address wallet', address?.toLowerCase());
    console.log('Picked side', pickedSide);
    if (((log[0] as any).args.playerAddress as string).toLowerCase() == address?.toLowerCase()) {
      console.log("Found Log!");
      const wagered = (log[0] as any).args.wager;
      if ((log[0] as any).args.payout > 0) {
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
        pickSide(pickedSide);
      } else {
        console.log("lost");
        const wageredFloat = Number(wagered / BigInt(10000000000000000)) / 100;
        console.log("wagered", wageredFloat);
        setLostStatus(wageredFloat);
        setGameStatus(GameModel.GameStatus.Lost);
        console.log('Setting side to', pickedSide);
        pickSide(pickedSide ^ 1);
      }
      setInGame(false);
      setActivePicker(true);
      //setShowRedraw(false);
    }
  };

  useContractEvent({
    address: (gameAddress as `0x${string}`),
    abi: ICoinFlip,
    eventName: 'CoinFlip_Outcome_Event',
    listener(log) {
      //handleLog(log)
      console.log('Log', log);
      console.log('address', ((log[0] as any).args.playerAddress as string));
      console.log('address wallet', address?.toLowerCase());
      console.log('Picked side', pickedSide);
      if (((log[0] as any).args.playerAddress as string).toLowerCase() == address?.toLowerCase()) {
        console.log("Found Log!");
        const wagered = (log[0] as any).args.wager;
        if ((log[0] as any).args.payout > 0) {
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
        setInGame(false);
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
        if (cryptoValue != 0 && currentBalance && cryptoValue <= currentBalance) {
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
  }, [wagered]);

  useEffect(() => {
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide);
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1);
    }
    setActivePicker(true);
  }, [gameStatus])

  // const [screenWidth, setScreenWidth] = useState(
  //   typeof window !== "undefined" ? window.innerWidth : 0
  // );

  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (wagered) {
  //     setWaitingResult(true);
  //   }
  // }, [is]);

  return (
    <div className={s.coinflip_table_wrap}>
      <div className={s.coinflip_table_background}>
        <Image
          src={tableBg}
          className={s.coinflip_table_background_img}
          alt="table-bg"
        />
      </div>
      <div className={s.coinflip_table}>
        <div className={s.coinflip_wrap}>
          {/* <h2 className={s.coinflip_wins_losses_list}>0 winning / 0 loss</h2> */}
          <div className={s.coinflip_block}>
            <Canvas
              camera={{
                position: [-9, 0, 0],
                fov: 20
              }}
              style={{ pointerEvents: "none" }}
            >
              <Suspense fallback={null}>
                <Environment preset="dawn" />
                <ambientLight intensity={0.3} />
                <spotLight intensity={2.5} position={[-2, -5, 0]} angle={10} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <Model
                  action={inGame ? CoinAction.Rotation : pickedSide == SidePickerModel.Side.Heads ? CoinAction.TailsHeads : CoinAction.TailsHeads}
                  initial={pickedSide} />
              </Suspense>
            </Canvas>
          </div>
        </div>
        {/* <h2
          className={`${s.coinflip_wins_losses_list} ${s.coinflip_wins_losses_list_clone}`}
        >
          0 winning / 0 loss
        </h2> */}
      </div>
    </div>
  );
};

