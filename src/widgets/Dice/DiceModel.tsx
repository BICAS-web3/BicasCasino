import { FC, Suspense, useEffect, useRef } from "react";

import { useAccount } from "wagmi";

import { Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Object3D } from "three";

import * as GameModel from "@/widgets/GamePage/model";

import { CanvasLoader } from "../CanvasLoader";
import { useUnit } from "effector-react";

interface DiceModelProps {
  inGame?: boolean;
}

export const DiceModel: FC<DiceModelProps> = ({ inGame }) => {
  const { scene } = useGLTF("/dice/dice.gltf");
  const { isConnected } = useAccount();

  const [gameStatus] = useUnit([GameModel.$gameStatus]);

  const modelRef = useRef<Object3D>(null);

  //! I'll make code more clean, without same pieces
  //? fucntion to make rotation if user in game and connected
  const updateRotation = (timestamp: number) => {
    const targetRotationY = Math.PI * 4;
    const animationDuration = 3000;
    const start = performance.now();

    const animate = () => {
      const now = performance.now();
      const elapsedTime = now - start;
      const rotation = (elapsedTime / animationDuration) * targetRotationY;
      if (modelRef.current) modelRef.current.rotation.y = rotation;

      if (inGame) {
        requestAnimationFrame(animate);
      }
    };

    if (inGame) {
      requestAnimationFrame(animate);
    }
  };
  useEffect(() => {
    if (inGame && isConnected && gameStatus === null) {
      updateRotation(performance.now());
    }
  }, [inGame, isConnected, gameStatus]);

  //? Rotation when page is loaded
  useEffect(() => {
    if (modelRef.current) {
      const updateRotation = (elapsedTime: number) => {
        const rotation = (elapsedTime / 1000) * 12.566370614359172;
        modelRef.current!.rotation.y = rotation;
      };

      let start: any = null;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsedTime = timestamp - start;
        updateRotation(elapsedTime);
        if (elapsedTime < 1000) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, []);
  const diceLight = [
    [10, 4, 5],
    [-5, 42, -1],
    [-14, 20, -1],
    [10, -14, 0],
    [-10, -10, -1],
    [10, 10, 1],
  ];
  return (
    <group>
      {diceLight.map((el, i) => (
        <spotLight
          key={i}
          position={[el[0], el[1], el[2]]}
          intensity={3000}
          castShadow
          shadow-mapSize={1000}
        />
      ))}
      <primitive
        ref={modelRef}
        object={scene}
        scale={window.innerWidth > 996 ? 0.5 : 0.25}
        position={[
          window.innerWidth > 996 ? -0.5 : 0.5,
          window.innerWidth > 996 ? -4.5 : -1.5,
          window.innerWidth > 996 ? -0.4 : -0.1,
        ]}
      />
    </group>
  );
};

interface DiceCanvasProps {
  inGame?: boolean;
}

export const DiceCanvas: FC<DiceCanvasProps> = ({ inGame }) => {
  return (
    <Canvas
      frameloop="always"
      camera={{ position: [-20, 10, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <DiceModel inGame={inGame} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
