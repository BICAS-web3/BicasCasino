import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { CanvasLoader } from "../CanvasLoader";
import { Canvas } from "@react-three/fiber";

export const DiceModel = () => {
  const computer = useGLTF("/dice/dice.gltf");

  return (
    <group>
      <ambientLight position={[0, 0, 0]} intensity={2000} />
      {/* <hemisphereLight
        position={[1, 4, 5]}
        intensity={500}
        groundColor="white"
      /> */}
      <spotLight
        position={[10, 4, 5]}
        // angle={0.12}
        // penumbra={1}
        // scale={50}
        intensity={1000}
        castShadow
        shadow-mapSize={1000}
      />
      <spotLight
        position={[-5, 42, -1]}
        // angle={0.12}
        // penumbra={1}
        // scale={50}
        intensity={1000}
        castShadow
        shadow-mapSize={1000}
      />
      <spotLight
        position={[-14, 20, -1]}
        // angle={0.12}
        // penumbra={1}
        // scale={50}
        intensity={1000}
        castShadow
        shadow-mapSize={1000}
      />
      <spotLight
        position={[10, -14, 0]}
        // angle={0.12}
        // penumbra={1}
        // scale={50}
        intensity={1000}
        castShadow
        shadow-mapSize={1000}
      />
      <spotLight
        position={[-10, -10, -1]}
        // angle={0.12}
        // penumbra={1}
        // scale={50}
        intensity={1000}
        castShadow
        shadow-mapSize={1000}
      />
      <spotLight
        position={[10, 10, 1]}
        // angle={0.12}
        // penumbra={1}
        // scale={50}
        intensity={1000}
        castShadow
        shadow-mapSize={1000}
      />
      {/* <pointLight intensity={10} /> */}
      <primitive
        object={computer.scene}
        scale={0.5}
        position={[-1, -5.5, -0.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

//?-------------------------------------

export const DiceCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: any) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      //   shadows
      //   dpr={[1, 2]}
      camera={{ position: [-20, 10, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={1}
        />
        <DiceModel />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
