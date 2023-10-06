import { FC, useEffect, useState, Suspense } from "react";
import s from "./styles.module.scss";
import tableBg from "@/public/media/coinflip_images/coinflipTableBg.png";
import Image from "next/image";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, act } from "@react-three/fiber";
import { AnimationAction } from "three";

interface CoinFlipProps {}

interface ModelProps {
  action: "winner" | "loser";
  play?: boolean;
}

const Model: FC<ModelProps> = ({ action, play = false }) => {
  const { scene, animations } = useGLTF("/coinflip/coin.gltf");
  const { actions, mixer } = useAnimations(animations, scene);

  scene.rotation.z = 1.3;
  scene.rotation.y = 5.5;

  console.log(scene);

  useEffect(() => {
    if (play) {
      const current = actions[
        action === "winner" ? "TailsHeads" : "TailsTails"
      ] as AnimationAction;
      current.play();
      current.clampWhenFinished = true;
      console.log(current);
      current.setLoop(2200, 1);
    }
  }, [play, action]);

  // @ts-ignore
  return play ? <primitive object={scene} /> : null;
};

export const CoinFlip: FC<CoinFlipProps> = ({}) => {
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
                position: [1, 6, 1],
              }}
              style={{ pointerEvents: "none" }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={2} />
                <directionalLight intensity={1} position={[50, 30, 30]} />
                <pointLight position={[0, 10, -5]} intensity={1} color="#fff" />
                <pointLight
                  position={[10, -10, 5]}
                  intensity={0.5}
                  color="#fff"
                />
                <pointLight position={[0, -10, 5]} intensity={1} color="#fff" />
                <Model action="winner" play={true} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
