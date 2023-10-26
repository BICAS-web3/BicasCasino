import { Suspense } from "react";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { CanvasLoader } from "../CanvasLoader";

export const DiceModel = () => {
  const computer = useGLTF("/dice/dice.gltf");
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
      <ambientLight position={[0, 0, 0]} intensity={2000} />
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
        object={computer.scene}
        scale={0.5}
        position={[-1, -5.5, -0.5]}
        rotation={[0, -1, -0.1]}
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
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
        <DiceModel />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
