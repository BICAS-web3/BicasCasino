import { FC, useEffect, useState, Suspense } from "react";
import s from "./styles.module.scss";
import tableBg from "@/public/media/coinflip_images/coinflipTableBg.webp";
import Image from "next/image";
import {
  OrbitControls,
  Stage,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import { Canvas, act, useLoader } from "@react-three/fiber";
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
  useWaitForTransaction
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
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import clsx from "clsx";
import { ProfitModel } from "../ProfitBlock";

import { CanvasLoader } from "../CanvasLoader";
import { ProfitLine } from "../ProfitLine";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Preload } from "@/shared/ui/Preload";
interface CoinFlipProps {
  gameText: string;
}

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
  setIsLoading: (el: boolean) => void;
}

const Model: FC<ModelProps> = ({ action, initial, setIsLoading }) => {
  const { scene, animations } = useGLTF("/coinflip/coin_old.gltf");

  const loader = new GLTFLoader();

  loader.load(
    "/coinflip/coin_old.gltf",
    () => setIsLoading(false),
    undefined,
    () => setIsLoading(false)
  );
  const { actions, mixer } = useAnimations(animations, scene);

  if (initial == SidePickerModel.Side.Heads) {
    scene.rotation.y = -1.82;
  } else if (initial == SidePickerModel.Side.Tails) {
    scene.rotation.y = 1.58;
  }
  // scene.rotation.x = 3;
  scene.scale.set(1, 1, 1);

  useEffect(() => {
    const rotation = actions[CoinAction.Rotation] as AnimationAction;
    rotation.stop();
    if (action != CoinAction.Stop) {
      const current = actions[action] as AnimationAction;
      current.stop();
      current.play();
      current.clampWhenFinished = false;
      if (action != CoinAction.Rotation) {
        current.setLoop(2200, 1);
      }
    }
  }, [initial, action]);

  // @ts-ignore
  return <primitive object={scene} />;
};

export const CoinFlip: FC<CoinFlipProps> = ({ gameText }) => {
  const [modelLoading, setModelLoading] = useState(true);
  const [imageLoading, setIMageLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [
    lost,
    profit,
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
    setCoefficient,
    waitingResponse,
    setWaitingResponse,
    setIsPlaying,
    setBetValue,
    betValue,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
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
    ProfitModel.setCoefficient,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.setBetValue,
    GameModel.$betValue,
  ]);
  const [coefficientData, setCoefficientData] = useState<number[]>([]);

  useEffect(() => {
    setCoefficient(1.98);
  }, []);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data, isError } = useFeeData({ watch: true });

  const [inGame, setInGame] = useState<boolean>(false);

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ICoinFlip,
    functionName: "CoinFlip_GetState",
    args: [address],
    enabled: true,
    //watch: isConnected && !inGame,
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

  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (data && data.gasPrice) {
      setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
    }
  }, [data]);

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
    gasPrice: (data?.gasPrice as any),
    gas: BigInt(50000),
  });

  const { write: setAllowance, error: allowanceError, status: allowanceStatus, data: allowanceData } =
    useContractWrite(allowanceConfig);

  const [watchAllowance, setWatchAllowance] = useState<boolean>(false);

  useEffect(() => {
    if (allowanceData) {
      setWatchAllowance(true);
    }
  }, [allowanceData])

  const { isSuccess: allowanceIsSet } = useWaitForTransaction({
    hash: allowanceData?.hash,
    enabled: watchAllowance
  })

  useEffect(() => {
    if (inGame && allowanceIsSet) {
      setWatchAllowance(false);
      startPlaying();
    } else if (allowanceError) {
      setWatchAllowance(false);
      setActivePicker(true);
      setInGame(false);
      setWaitingResponse(false);
    }
  }, [inGame, allowanceIsSet, allowanceError]);

  const [fees, setFees] = useState<bigint>(BigInt(0));

  const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ICoinFlip,
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

  const [value, setValue] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const newValue =
      fees +
      (pickedToken &&
        pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
        BigInt(100000000000)
        : BigInt(0));
    setValue(
      fees +
      (pickedToken &&
        pickedToken.contract_address ==
        "0x0000000000000000000000000000000000000000"
        ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
        BigInt(100000000000)
        : BigInt(0))
    );

    setBetValue(newValue + BigInt(400000) * prevGasPrice);
  }, [fees, pickedToken, cryptoValue, betsAmount, prevGasPrice]);

  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: ICoinFlip,
    functionName: "CoinFlip_Play",
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
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
    value: value,
  });

  useEffect(() => {
    if (startedPlaying) {
      setActivePicker(false);
      setInGame(true);
      setWaitingResponse(true);
    }
  }, [startedPlaying]);

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: ICoinFlip,
    eventName: "CoinFlip_Outcome_Event",
    listener(log) {
      if (
        ((log[0] as any).args.playerAddress as string).toLowerCase() ==
        address?.toLowerCase()
      ) {
        setWaitingResponse(false);
        const wagered =
          BigInt((log[0] as any).args.wager) *
          BigInt((log[0] as any).args.numGames);
        const handlePayouts = () => {
          for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
            setTimeout(() => {
              const outCome =
                Number((log[0] as any)?.args?.payouts[i]) / Number(BigInt((log[0] as any).args.wager));
              setCoefficientData((prev) => [outCome, ...prev]);
            }, 700 * (i + 1));
          }
        };
        handlePayouts();
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
            if (setAllowance) {
              setAllowance();
              setActivePicker(false);
              setInGame(true);
              setWaitingResponse(true);
            }
          } else {
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
  const [isPlaying] = useUnit([GameModel.$isPlaying]);

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
    if (!modelLoading && !imageLoading) {
      setIsLoading?.(modelLoading);
    }
  }, [modelLoading, imageLoading]);
  return (
    <>
      {error && (
        <ErrorCheck
          text="Something went wrong, please contact customer support."
          btnTitle="Contact us"
        />
      )}
      <div className={s.coinflip_table_wrap}>
        {" "}
        {isLoading && <Preload />}
        <WagerLowerBtnsBlock game="coinflip" text={gameText} />
        <div className={s.coinflip_table_background}>
          <Image
            onLoad={() => setIMageLoading(false)}
            src={tableBg}
            className={s.coinflip_table_background_img}
            alt="table-bg"
          />
        </div>
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
                <Suspense fallback={<></>}>
                  <Stage adjustCamera={false} environment="dawn">
                    <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                  </Stage>
                  <ambientLight intensity={1} />
                  <Model
                    setIsLoading={setModelLoading}
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
