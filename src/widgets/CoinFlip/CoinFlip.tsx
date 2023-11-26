import { FC, useEffect, useState, Suspense } from "react";
import s from "./styles.module.scss";
import tableBg from "@/public/media/coinflip_images/coinflipTableBg.png";
import Image from "next/image";
import {
  OrbitControls,
  Stage,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Canvas, act } from "@react-three/fiber";
import { AnimationAction } from "three";
import { Environment } from "@react-three/drei";
import { SidePickerModel } from "../CoinFlipSidePicker";
import { useUnit } from "effector-react";
import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import * as GameModel from "@/widgets/GamePage/model";
import useSound from "use-sound";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { sessionModel } from "@/entities/session";
import { ABI as ICoinFlip } from "@/shared/contracts/CoinFlipABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { useDebounce } from "@/shared/tools";
import { WagerGainLossModel } from "../WagerGainLoss";
import { TOKENS } from "@/shared/tokens";
import { useFeeData } from "wagmi";
import * as CoinflipM from "./model";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
import clsx from "clsx";
interface CoinFlipProps {}

enum CoinAction {
  Rotation = "Rotation",
  HeadsHeads = "HeadsHeads",
  HeadsTails = "HeadsTails",
  TailsHeads = "TailsHeads",
  TailsTails = "TailsTails",
  Stop = "",
}

interface ModelProps {
  action: CoinAction;
  initial: SidePickerModel.Side;
}

const Model: FC<ModelProps> = ({ action, initial }) => {
  const { scene, animations } = useGLTF("/coinflip/coin_old.gltf");
  const { actions, mixer } = useAnimations(animations, scene);

  if (initial == SidePickerModel.Side.Heads) {
    scene.rotation.y = -1.82;
  } else if (initial == SidePickerModel.Side.Tails) {
    scene.rotation.y = 1.58;
  }
  // scene.rotation.x = 3;
  scene.scale.set(1, 1, 1);
  console.log(scene);

  useEffect(() => {
    const rotation = actions[CoinAction.Rotation] as AnimationAction;
    rotation.stop();
    if (action != CoinAction.Stop) {
      const current = actions[action] as AnimationAction;
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

export const CoinFlip: FC<CoinFlipProps> = ({}) => {
  const [
    lost,
    profit,
    setPlayingStatus,
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
    setLostStatus,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    CoinflipM.setPlayingStatus,
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
  const { data, isError, isLoading } = useFeeData({ watch: true });

  const [waitingResult, setWaitingResult] = useState(false);
  const [inGame, setInGame] = useState<boolean>(false);

  const [playBackground, { stop: stopBackground }] = useSound(
    "/static/media/games_assets/music/background2.wav",
    { volume: 0.1, loop: true }
  );

  useEffect(() => {
    console.log("Play sounds", playSounds);
    if (!playSounds) {
      stopBackground();
    } else {
      playBackground();
    }
  }, [playSounds]);

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ICoinFlip,
    functionName: "CoinFlip_GetState",
    args: [address],
    enabled: true,
    watch: isConnected,
  });

  useEffect(() => {
    if (GameState && !inGame) {
      if ((GameState as any).ingame) {
        if (
          !(GameState as any).isFirstRequest &&
          (GameState as any).requestID == 0
        ) {
          setInGame(true);
          setActivePicker(false);
          pickSide((GameState as any).isHeads as number);
        }
      } else {
        setInGame(false);
      }
    }
  }, [GameState]);

  useEffect(() => {
    inGame ? setPlayingStatus(true) : setPlayingStatus(false);
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

  const [fees, setFees] = useState<bigint>(BigInt(0));

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ICoinFlip,
    functionName: "getVRFFee",
    args: [0],
    watch: true,
  });

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
    abi: ICoinFlip,
    functionName: "CoinFlip_Play",
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      pickedToken?.contract_address,
      pickedSide,
      betsAmount,
      useDebounce(stopGain)
        ? BigInt(Math.floor((stopGain as number) * 10000000)) *
          BigInt(100000000000)
        : BigInt(Math.floor(cryptoValue * 10000000)) *
          BigInt(100000000000) *
          BigInt(200),
      useDebounce(stopLoss)
        ? BigInt(Math.floor((stopLoss as number) * 10000000)) *
          BigInt(100000000000)
        : BigInt(Math.floor(cryptoValue * 10000000)) *
          BigInt(100000000000) *
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
    enabled: true,
  });

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite(startPlayingConfig);

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
    }
  }, [startedPlaying]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: ICoinFlip,
    eventName: "CoinFlip_Outcome_Event",
    listener(log) {
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        console.log("Found Log!");
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);
        if ((log[0] as any).args.payout > wagered) {
          console.log("won");
          const profit = (log[0] as any).args.payout;
          console.log("profit", profit);
          const multiplier = Number(profit / wagered);
          console.log("multiplier", multiplier);
          //console.log("token", ((log[0] as any).args.tokenAddress as string).toLowerCase());
          const wagered_token = (
            (log[0] as any).args.tokenAddress as string
          ).toLowerCase();
          const token = TOKENS.find((tk) => tk.address == wagered_token)?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];
          console.log("won token", token);
          //console.log("available tokens", availableTokens);
          const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
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
    },
  });

  useEffect(() => {
    if (wagered) {
      console.log("Pressed wager");
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
            if (setAllowance) setAllowance();
          } else {
            console.log(
              "Starting playing",
              startPlaying,
              BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000),
              pickedToken?.contract_address,
              gameAddress,
              VRFFees,
              fees
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

  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={s.coinflip_table_wrap}>
        <div className={s.coinflip_table_background}>
          <Image
            src={tableBg}
            className={s.coinflip_table_background_img}
            alt="table-bg"
          />
        </div>{" "}
        <div className={s.total_container}>
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
        <div className={s.coinflip_table}>
          <div className={s.coinflip_wrap}>
            <div className={s.coinflip_block}>
              <Canvas
                camera={{
                  position: [-9, 0, 0],
                  fov: 20,
                }}
                style={{ pointerEvents: "none" }}
              >
                <Suspense fallback={null}>
                  <Stage adjustCamera={false} environment="dawn">
                    <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                  </Stage>
                  <ambientLight intensity={0.3} />
                  <spotLight
                    intensity={2.5}
                    position={[-2, -5, 0]}
                    angle={10}
                  />
                  <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                  <Model
                    action={
                      inGame
                        ? CoinAction.Rotation
                        : pickedSide == SidePickerModel.Side.Heads
                        ? CoinAction.TailsHeads
                        : CoinAction.TailsHeads
                    }
                    initial={pickedSide}
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
