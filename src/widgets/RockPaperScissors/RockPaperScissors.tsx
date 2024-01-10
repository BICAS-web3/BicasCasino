import { FC, Suspense, useEffect, useState } from "react";

import { useUnit } from "effector-react";

import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useFeeData,
} from "wagmi";

import Image from "next/image";

import { Environment, Stage, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import * as GameModel from "@/widgets/GamePage/model";

import { sessionModel } from "@/entities/session";

import tableBg from "@/public/media/games_assets/rock_paper_scissors/rps_main_bg.webp";

import { ABI as RPSABI } from "@/shared/contracts/RPSABI";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { useDebounce } from "@/shared/tools";
import { TOKENS } from "@/shared/tokens";

import s from "./styles.module.scss";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import { WagerModel as WagerButtonModel } from "../Wager";
import { WagerGainLossModel } from "../WagerGainLoss";
import { WagerModel } from "../WagerInputsBlock";
import * as CoinflipM from "./model";

export enum ModelType {
  Paper = "/rps/paperCard.glb",
  Rock = "/rps/rockCard.glb",
  Scissors = "/rps/scissorsCard.glb",
  Quest = "/rps/questCard.glb",
}

import * as RPSModel from "@/widgets/RpsPicker/model";
import clsx from "clsx";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { ProfitModel } from "../ProfitBlock";
import { CanvasLoader } from "../CanvasLoader";
import { ProfitLine } from "../ProfitLine";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Preload } from "@/shared/ui/Preload";
interface ModelProps {
  side: string;
  left: boolean;
  yValue: number;
  delay?: number;
  setIsLoading?: (el: boolean) => void;
  // isLoading?: boolean;
}

const Model: FC<ModelProps> = ({
  side,
  left,
  yValue,
  delay,
  setIsLoading,
  // isLoading,
}) => {
  const [pickedValue] = useUnit([RPSModel.$pickedValue]);
  const [selectedSide, setSelectedSide] = useState(side);
  useEffect(() => {
    setSelectedSide(side);
  }, [side, pickedValue]);
  const { scene } = useGLTF(selectedSide);
  const [is1280, setIs1280] = useState(false);
  const [is996, setIs996] = useState(false);

  const loader = new GLTFLoader();

  loader.load(
    selectedSide,
    () => setIsLoading?.(false),
    undefined,
    () => setIsLoading?.(false)
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280 && window.innerWidth > 996) {
        setIs1280(true);
        setIs996(false);
      } else if (window.innerWidth < 996) {
        setIs1280(false);
        setIs996(true);
      } else {
        setIs1280(false);
        setIs996(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const initialPosition = {
    y: -6 + yValue,
    x: !left ? 0 : -0.9,
    z: !left ? 0 : 0.9,
  };

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (delay) {
      if (elapsedTime > delay / 1000) {
        scene.position.y =
          initialPosition.y + Math.sin(elapsedTime - delay / 1000) * 0.3;
      }
    } else {
      scene.position.y = initialPosition.y + Math.sin(elapsedTime) * 0.3;
    }
  });

  useEffect(() => {
    scene.rotation.z = 0.75;
    scene.rotation.x = 5;

    scene.position.x = initialPosition.x;
    scene.position.y = initialPosition.y;
    scene.position.z = initialPosition.z;

    if (is1280) {
      scene.scale.set(0.7, 0.7, 1);
      initialPosition.y = -3;
      initialPosition.x = !left ? 0.2 : -0.5;
      initialPosition.z = !left ? -0.2 : 0.5;
    } else if (is996) {
      scene.scale.set(1.4, 1.4, 1);
      initialPosition.y = -5;
      initialPosition.x = !left ? 0.2 : -0.9;
      initialPosition.z = !left ? -0.2 : 0.9;
    } else {
      scene.scale.set(1.6, 1.5, 1);
    }
  }, [is1280, side, left, is996]);

  // @ts-ignore
  return <primitive object={scene} />;
};

interface RockPaperScissorsProps {
  gameText: string;
  setIsLoading?: (el: boolean) => void;
  isLoadingd?: boolean;
}

export const RockPaperScissors: FC<RockPaperScissorsProps> = ({ gameText }) => {
  const [isLoadingd, setIsLoading] = useState(true);
  const [value, setValue] = useState<ModelType>(ModelType.Paper);
  const [modelLoading_1, setModelLoading_1] = useState(true);
  const [modelLoading_2, setModelLoading_2] = useState(true);
  const [imageLoading, setIMageLoading] = useState(true);
  const [
    lost,
    profit,
    setPlayingStatus,
    playSounds,
    pickedValue,
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
    setIsPlaying,
    waitingResponse,
    setWaitingResponse,
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    CoinflipM.setPlayingStatus,
    GameModel.$playSounds,
    RPSModel.$pickedValue,
    RPSModel.setActive,
    RPSModel.pickValue,
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
    GameModel.setIsPlaying,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
  ]);

  useEffect(() => {
    setCoefficient(1.98);
  }, []);

  useEffect(() => {
    if (pickedValue === RPSModel.RPSValue.Paper) {
      setValue(ModelType.Paper);
    } else if (pickedValue === RPSModel.RPSValue.Rock) {
      setValue(ModelType.Rock);
    } else {
      setValue(ModelType.Scissors);
    }
  }, [pickedValue]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
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

  const [inGame, setInGame] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(inGame);
  }, [inGame]);

  const { data: GameState, refetch: fetchGameState } = useContractRead({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RPSABI,
    functionName: "RockPaperScissors_GetState",
    args: [address],
    enabled: true,
    blockTag: "latest",
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
          pickSide((GameState as any).action as number);
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
      gameAddress as `0x${string}`,
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
    abi: RPSABI,
    functionName: "getVRFFee",
    args: [0],
    watch: true,
  });

  useEffect(() => {
    if (VRFFees && data?.gasPrice) {
      setFees(
        BigInt(VRFFees ? (VRFFees as bigint) : 0) +
          BigInt(1100000) * (data.gasPrice + data.gasPrice / BigInt(4))
      );
    }
  }, [VRFFees, data]);

  // const { config: startPlayingConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: RPSABI,
  //   functionName: "RockPaperScissors_Play",
  //   args: [
  //     useDebounce(
  //       BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
  //     ),
  //     pickedToken?.contract_address,
  //     pickedValue,
  //     betsAmount,
  //     useDebounce(stopGain)
  //       ? BigInt(Math.floor((stopGain as number) * 10000000)) *
  //       BigInt(100000000000)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //       BigInt(100000000000) *
  //       BigInt(200),
  //     useDebounce(stopLoss)
  //       ? BigInt(Math.floor((stopLoss as number) * 10000000)) *
  //       BigInt(100000000000)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //       BigInt(100000000000) *
  //       BigInt(200),
  //   ],
  //   value:
  //     fees +
  //     (pickedToken &&
  //       pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
  //       BigInt(100000000000)
  //       : BigInt(0)),
  //   enabled: true,
  // });

  const [coefficientData, setCoefficientData] = useState<number[]>([]);
  const {
    write: startPlaying,
    isSuccess: startedPlaying,
    error,
  } = useContractWrite({
    chainId: chain?.id,
    address: gameAddress as `0x${string}`,
    abi: RPSABI,
    functionName: "RockPaperScissors_Play",
    args: [
      useDebounce(
        BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(100000000000)
      ),
      pickedToken?.contract_address,
      pickedValue,
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
    gasPrice: prevGasPrice,
    gas: BigInt(400000),
  });

  useEffect(() => {
    if (startedPlaying) {
      setWaitingResponse(true);
      setActivePicker(false);
      setInGame(true);
    }
  }, [startedPlaying]);

  useContractEvent({
    address: gameAddress as `0x${string}`,
    abi: RPSABI,
    eventName: "RockPaperScissors_Outcome_Event",
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
                Number((log[0] as any)?.args?.payouts[i]) / Number(wagered);
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
            if (setAllowance) setAllowance();
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
      pickSide(pickedValue);
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedValue);
    }
  }, [gameStatus]);

  const [enemyValue, setEnemyValue] = useState(ModelType.Quest);

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Draw) {
      setEnemyValue(value);
    } else if (gameStatus === GameModel.GameStatus.Won) {
      if (pickedValue === RPSModel.RPSValue.Paper) {
        setEnemyValue(ModelType.Rock);
      } else if (pickedValue === RPSModel.RPSValue.Rock) {
        setEnemyValue(ModelType.Scissors);
      } else if (pickedValue === RPSModel.RPSValue.Scissors) {
        setEnemyValue(ModelType.Paper);
      }
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      if (pickedValue === RPSModel.RPSValue.Paper) {
        setEnemyValue(ModelType.Scissors);
      } else if (pickedValue === RPSModel.RPSValue.Rock) {
        setEnemyValue(ModelType.Paper);
      } else if (pickedValue === RPSModel.RPSValue.Scissors) {
        setEnemyValue(ModelType.Rock);
      }
    }
  }, [gameStatus]);

  useEffect(() => {
    if (enemyValue !== ModelType.Quest) {
      setTimeout(() => {
        setEnemyValue(ModelType.Quest);
      }, 1000);
    }
  }, [value]);
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
    if (!modelLoading_1 && !modelLoading_2 && !imageLoading) {
      setIsLoading?.(modelLoading_1);
    }
  }, [modelLoading_1, modelLoading_2, imageLoading]);

  return (
    <div className={s.rps_table_container}>
      {isLoadingd && <Preload />}
      <WagerLowerBtnsBlock game="rps" text={gameText} />
      <div className={s.rps_table_background}>
        <Image
          onLoad={() => setIMageLoading(false)}
          src={tableBg}
          className={s.rps_table_background_img}
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
      <div className={s.rps_table}>
        <div className={s.rps_table_inner}>
          <Canvas
            camera={{ position: [1, 6, 1], fov: 22.5 }}
            style={{ pointerEvents: "none" }}
          >
            {value === ModelType.Paper && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment="dawn">
                  <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />
                <Model
                  setIsLoading={setModelLoading_1}
                  yValue={0.1}
                  side={ModelType.Paper}
                  left={true}
                />{" "}
              </Suspense>
            )}
            {value === ModelType.Rock && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment="dawn">
                  <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />
                <Model
                  setIsLoading={setModelLoading_1}
                  yValue={0.1}
                  side={ModelType.Rock}
                  left={true}
                />
              </Suspense>
            )}
            {value === ModelType.Scissors && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment="dawn">
                  <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />
                <Model
                  setIsLoading={setModelLoading_1}
                  yValue={0.1}
                  side={ModelType.Scissors}
                  left={true}
                />
              </Suspense>
            )}
          </Canvas>
          <Canvas
            camera={{ position: [1, 6, 1], fov: 20 }}
            style={{ pointerEvents: "none" }}
          >
            {enemyValue === ModelType.Paper && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment="dawn">
                  <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />
                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Paper}
                  left={false}
                />{" "}
              </Suspense>
            )}
            {enemyValue === ModelType.Rock && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment="dawn">
                  <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />

                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Rock}
                  left={false}
                />
              </Suspense>
            )}
            {enemyValue === ModelType.Scissors && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment="dawn">
                  <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />
                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Scissors}
                  left={false}
                />
              </Suspense>
            )}
            {enemyValue === ModelType.Quest && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment="dawn">
                  <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />
                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Quest}
                  left={false}
                />
              </Suspense>
            )}
          </Canvas>
        </div>
      </div>
    </div>
  );
};
