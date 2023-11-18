import s from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/games_assets/rock_paper_scissors/rps_main_bg.png";
import { Environment, Stage, useAnimations, useGLTF } from "@react-three/drei";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

interface ModelProps {
  side: string;
  left: boolean;
  yValue: number;
}

const Model: FC<ModelProps> = ({ side, left, yValue }) => {
  const { scene, animations } = useGLTF(side);
  const { actions, mixer } = useAnimations(animations, scene);
  const [is1280, setIs1280] = useState(false);
  const [is996, setIs996] = useState(false);
  const [more1280, setMore1280] = useState(false);

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
  const modelRef = useRef<THREE.Group>();

  // const initialPosition = {
  //   y: -6 + yValue,
  //   x: !left ? 0 : -0.9,
  //   z: !left ? 0 : 0.9,
  // };
  // Анимация движения вверх и вниз
  // useFrame((state, delta) => {
  //   scene.position.y =
  //     initialPosition.y +
  //     Math.sin(state.clock.getElapsedTime()) * 0.2 +
  //     yValue!;
  // });

  //?-----
  // useEffect(() => {
  //   scene.rotation.z = 0.75;
  //   scene.rotation.x = 5;

  //   if (is1280) {
  //     scene.scale.set(0.7, 0.7, 1);
  //     initialPosition.y = -3 + yValue!;
  //     initialPosition.x = !left ? 0.2 : -0.5;
  //     initialPosition.z = !left ? -0.2 : 0.5;
  //   } else if (is996) {
  //     console.log("is996");
  //     scene.scale.set(1.4, 1.4, 1);
  //     initialPosition.y = -5 + yValue!;
  //     initialPosition.x = !left ? 0.2 : -0.9;
  //     initialPosition.z = !left ? -0.2 : 0.9;
  //   } else {
  //     scene.scale.set(1.6, 1.5, 1);
  //   }

  //   console.log(scene, side);
  // }, [is1280, side, left, is996]);
  //?-----

  useEffect(() => {
    scene.rotation.z = 0.75;
    scene.rotation.x = 5;

    // scene.position.x = initialPosition.x;
    // scene.position.y = initialPosition.y;
    // scene.position.z = initialPosition.z;

    scene.position.y = -6;
    scene.position.x = !left ? 0 : -0.9;
    scene.position.z = !left ? 0 : 0.9;

    if (is1280) {
      scene.scale.set(0.7, 0.7, 1);
      scene.position.y = -3;
      scene.position.x = !left ? 0.2 : -0.5;
      scene.position.z = !left ? -0.2 : 0.5;
    } else if (is996) {
      console.log("is996");
      scene.scale.set(1.4, 1.4, 1);
      scene.position.y = -5;
      scene.position.x = !left ? 0.2 : -0.9;
      scene.position.z = !left ? -0.2 : 0.9;
    } else {
      scene.scale.set(1.6, 1.5, 1);
    }

    console.log(scene, side);
  }, [is1280, side, left, is996]);

  // @ts-ignore
  return <primitive ref={modelRef} object={scene} />;
};

export const RockPaperScissors = () => {
  const [is1500, setIs1500] = useState(false);

  return (
    <div className={s.rps_table_container}>
      <div className={s.rps_table_background}>
        <Image
          src={tableBg}
          className={s.rps_table_background_img}
          alt="table-bg"
        />
      </div>
      <div className={s.rps_table}>
        <div className={s.rps_table_inner}>
          <Canvas
            camera={{ position: [1, 6, 1], fov: 20 }}
            style={{ pointerEvents: "none" }}
          >
            <Suspense fallback={null}>
              <Stage adjustCamera={false} environment="dawn">
                <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
              </Stage>
              <ambientLight intensity={0.3} />
              <directionalLight intensity={2.5} position={[-2, 10, 0]} />
              <pointLight position={[0, -10, 5]} intensity={0.5} color="#fff" />
              <Model yValue={0.1} side={"/rps/paperCard.glb"} left={true} />
            </Suspense>
          </Canvas>
          <Canvas
            camera={{ position: [1, 6, 1], fov: 20 }}
            style={{ pointerEvents: "none" }}
          >
            <Suspense fallback={null}>
              <Stage adjustCamera={false} environment="dawn">
                <Environment path="/hdr/" files="kiara_1_dawn_1k.hdr" />
              </Stage>
              <ambientLight intensity={0.3} />
              <spotLight intensity={2.5} position={[-2, -5, 0]} angle={10} />
              <directionalLight intensity={2.5} position={[-2, 10, 0]} />
              <pointLight position={[0, -10, 5]} intensity={0.5} color="#fff" />
              <Model yValue={-0.1} side={"/rps/questCard.glb"} left={false} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};
