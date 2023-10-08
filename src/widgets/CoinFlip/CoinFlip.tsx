import { FC, useEffect, useState, Suspense } from "react";
import s from "./styles.module.scss";
import tableBg from "@/public/media/coinflip_images/coinflipTableBg.png";
import Image from "next/image";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, act } from "@react-three/fiber";
import { AnimationAction } from "three";
import { Environment } from '@react-three/drei';

interface CoinFlipProps { }

enum CoinAction {
  Rotation = "Rotation",
  HeadsHeads = "HeadsHeads",
  HeadsTails = "HeadsTails",
  TailsHeads = "TailsHeads",
  TailsTails = "TailsTails",
  Stop = ""
}

interface ModelProps {
  action: CoinAction;
}

const Model: FC<ModelProps> = ({ action }) => {
  const { scene, animations } = useGLTF("/coinflip/coin_old.gltf");
  const { actions, mixer } = useAnimations(animations, scene);

  // scene.rotation.z = 1.3;
  scene.rotation.y = -1.58;
  // scene.rotation.x = 3;



  console.log(scene);

  useEffect(() => {
    if (action != CoinAction.Stop) {
      const current = actions[
        action
      ] as AnimationAction;
      current.play();
      current.clampWhenFinished = true;
      console.log(current);
      if (action != CoinAction.Rotation) {
        current.setLoop(2200, 1);
      }
    }
  }, [action]);

  // @ts-ignore
  return <primitive object={scene} />;
};

export const CoinFlip: FC<CoinFlipProps> = ({ }) => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={s.coinflip_table_wrap}>
      <div className={s.coinflip_table_background}>
        <Image
          src={tableBg}
          className={s.coinflip_table_background_img}
          alt="table-bg"
        />
      </div>
      <div className={s.coinflip_table}>
        <div className={s.coinflip_wrap}>
          <h2 className={s.coinflip_wins_losses_list}>0 winning / 0 loss</h2>
          <div className={s.coinflip_block}>
            <Canvas
              camera={{
                position: [-9, 0, 0],
                //near: 0.1,
                fov: 20
                //far: 1
              }}
              style={{ pointerEvents: "none" }}
            >
              <Suspense fallback={null}>
                <Environment preset="dawn" />
                <ambientLight intensity={0.3} />
                <spotLight intensity={2.5} position={[-2, -5, 0]} angle={10} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                {/* <pointLight
                  position={[-10, 0, 0]}
                  intensity={1}
                  color="#fff"
                /> */}
                {/* <directionalLight intensity={100} position={[0, 0, -1]} />
                <pointLight position={[0, 0, 0]} intensity={100} color="#fff" />
                <pointLight
                  position={[0, 0, 10]}
                  intensity={100}
                  color="#fff"
                />
                <pointLight position={[0, -10, 5]} intensity={100} color="#fff" /> */}
                <Model action={CoinAction.Stop} />
              </Suspense>
            </Canvas>
          </div>
        </div>
        <h2
          className={`${s.coinflip_wins_losses_list} ${s.coinflip_wins_losses_list_clone}`}
        >
          0 winning / 0 loss
        </h2>
      </div>
    </div>
  );
};

