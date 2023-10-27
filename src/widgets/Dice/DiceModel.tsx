import { Suspense, useEffect, useRef } from "react";

import {
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { CanvasLoader } from "../CanvasLoader";
import { Object3D } from "three";
enum CoinAction {
  Rotation = "Rotation",
  HeadsHeads = "HeadsHeads",
  HeadsTails = "HeadsTails",
  TailsHeads = "TailsHeads",
  TailsTails = "TailsTails",
  Stop = "",
}
export const DiceModel = () => {
  const { scene, animations } = useGLTF("/dice/dice.gltf");
  const { actions, mixer } = useAnimations(animations, scene);

  const modelRef = useRef<Object3D>(null);

  useEffect(() => {
    if (modelRef.current) {
      const animationDuration = 1;
      const targetRotationY = Math.PI * 4;

      const updateRotation = (elapsedTime: number) => {
        const rotation =
          (elapsedTime / (animationDuration * 1000)) * targetRotationY;
        modelRef.current!.rotation.y = rotation;
      };

      let start: any = null;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsedTime = timestamp - start;
        updateRotation(elapsedTime);
        if (elapsedTime < animationDuration * 1000) {
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
      {/* <ambientLight position={[0, 0, 0]} intensity={2000} /> */}
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
        // rotation={[0, -1, -0.1]}
      />
    </group>
  );
};

//?-------------------------------------

export const DiceCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      camera={{ position: [-20, 10, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* <OrbitControls
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        /> */}
        <DiceModel />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
