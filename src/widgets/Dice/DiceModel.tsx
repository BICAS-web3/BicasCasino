import { FC, Suspense, useEffect, useRef, useState } from "react";
import { useUnit } from "effector-react";
import { useAccount } from "wagmi";
import {
  Environment,
  Preload,
  Stage,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimationAction, Object3D, LoopOnce } from "three";

import * as GameModel from "@/widgets/GamePage/model";
import { CanvasLoader } from "../CanvasLoader";

import s from "./styles.module.scss";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

enum DiceActions {
  Rotation = "Animation",
  Loop = "LoopAnimation",
  Stop = "",
}

interface DiceModelProps {
  inGame?: boolean;
  action: DiceActions;
  testState?: boolean;
  setIsLoading: (el: boolean) => void;
}
export const DiceModel: FC<DiceModelProps> = ({
  inGame,
  action,
  testState,
  setIsLoading,
}) => {
  const loader = new GLTFLoader();

  loader.load(
    "/dice/dice_2.glb",
    () => setIsLoading(false),
    undefined,
    () => setIsLoading(false)
  );
  const { scene, animations } = useGLTF("/dice/dice_2.glb");
  const { isConnected } = useAccount();
  const { actions, mixer } = useAnimations(animations, scene);
  const [gameStatus] = useUnit([GameModel.$gameStatus]);
  const modelRef = useRef<Object3D>(null);
  const inGameRef = useRef<boolean | undefined>(inGame);
  scene.rotation.y = -0.25;
  scene.rotation.x = 0.15;
  scene.rotation.z = -0.5;
  const [startAnimation, setStartAnimation] = useState(true);
  const rotation = actions[DiceActions.Rotation] as AnimationAction;
  const loop = actions[DiceActions.Loop] as AnimationAction;

  const [firstAnimation, setFirstAnimation] = useState(false);
  useEffect(() => {
    rotation.setLoop(LoopOnce, 1);
    rotation.play();
    rotation.clampWhenFinished = true;
    return () => {
      rotation.stop();
    };
  }, [firstAnimation]);
  useEffect(() => {
    setFirstAnimation((prev) => !prev);
  }, []);
  useEffect(() => {
    if (inGame) {
      rotation.stop();
      loop.setLoop(2201, 100);
      loop.play();
      loop.clampWhenFinished = false;
    } else {
      loop.stop();
    }
  }, [inGame]);

  useEffect(() => {
    inGameRef.current = inGame;
    if (inGame && isConnected && gameStatus === null) {
      setStartAnimation((prev) => !prev);
    }
  }, [inGame, isConnected, gameStatus]);

  const diceLightDirections = [
    [5, -10, 5],
    [-7, 5, 5],
    [-5, 0, 5],
    [5, 3, 7],
    [2, 1, 9],
    [7, 6, 7],
    [-1, 6, -7],
    [2, 7, -5],
  ];
  return (
    <group>
      <ambientLight intensity={0.3} />
      <spotLight intensity={10} position={[-2, -5, 0]} angle={10} />
      <spotLight intensity={10} position={[2, 3, -1]} angle={10} />
      <spotLight intensity={10} position={[0, -1, 1]} angle={10} />
      <directionalLight intensity={2.5} position={[-2, 10, 0]} />
      <primitive
        ref={modelRef}
        object={scene}
        scale={
          window.innerWidth > 1280 ? 0.5 : window.innerWidth > 650 ? 0.35 : 0.25
        }
        position={[
          window.innerWidth > 1280
            ? -2.5
            : window.innerWidth > 650
            ? -1.9
            : -1.27,
          window.innerWidth > 650 ? 4 : 1.7,
          0,
        ]}
      />
    </group>
  );
};

interface DiceCanvasProps {
  inGame?: boolean;
  setIsLoading: (el: boolean) => void;
}

export const DiceCanvas: FC<DiceCanvasProps> = ({ inGame, setIsLoading }) => {
  const [testState, setTestState] = useState(false);

  return (
    <Canvas
      onClick={() => setTestState((prev) => !prev)}
      frameloop="always"
      camera={{ position: [-3, 23, 20], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<></>}>
        <Stage adjustCamera={false} environment="dawn">
          <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
        </Stage>

        <DiceModel
          setIsLoading={setIsLoading}
          testState={testState}
          action={DiceActions.Rotation}
          inGame={inGame}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
