import s from "./styles.module.scss";
import Image from "next/image";
import tableBg from "@/public/media/games_assets/rock_paper_scissors/rps_main_bg.png";
import { Environment, useAnimations, useGLTF } from "@react-three/drei";
import { FC, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

interface ModelProps {
  side: string;
  left: boolean;
}

const Model: FC<ModelProps> = ({ side, left }) => {
  const { scene, animations } = useGLTF(side);
  const { actions, mixer } = useAnimations(animations, scene);

  // scene.rotation.z = 1.3;
  // if (initial == SidePickerModel.Side.Heads) {
  //   scene.rotation.y = -1.58;
  // } else if (initial == SidePickerModel.Side.Tails) {
  //   scene.rotation.y = 1.58;
  // }

  scene.rotation.z = 0.75;
  scene.rotation.x = 5;
  scene.position.y = -5;
  scene.position.x = !left ? 0 : -0.9;
  scene.position.z = !left ? 0 : 0.9;

  scene.scale.y = 1.3;
  scene.scale.x = 1.3;

  console.log(scene, side);

  // scene.position.x = 1;

  // @ts-ignore
  return <primitive object={scene} />;
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
              <Environment preset="dawn" />
              <ambientLight intensity={0.3} />
              <spotLight intensity={2.5} position={[-2, -5, 0]} angle={10} />
              <directionalLight intensity={2.5} position={[-2, 10, 0]} />
              <pointLight position={[0, -10, 5]} intensity={0.5} color="#fff" />
              <Model side={"/rps/paperCard.glb"} left={true} />
            </Suspense>
          </Canvas>
          <Canvas
            camera={{ position: [1, 6, 1], fov: 20 }}
            style={{ pointerEvents: "none" }}
          >
            <Suspense fallback={null}>
              <Environment preset="dawn" />
              <ambientLight intensity={0.3} />
              <spotLight intensity={2.5} position={[-2, -5, 0]} angle={10} />
              <directionalLight intensity={2.5} position={[-2, 10, 0]} />
              <pointLight position={[0, -10, 5]} intensity={0.5} color="#fff" />
              <Model side={"/rps/questCard.glb"} left={false} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};
