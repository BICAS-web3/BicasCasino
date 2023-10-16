import { FC } from "react";
import { useDeviceType } from "../tools";
import s from "@/widgets/Plinko/styles.module.scss";

interface PlinkoBallIconProps {}
export const PlinkoBallIcon: FC<PlinkoBallIconProps> = ({}) => {
  const device = useDeviceType();

  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.plinko_svg_icon}
      >
        <path
          d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
          fill="url(#paint0_radial_3138_141693)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_3138_141693"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(8.00627 4.55302) scale(13.8377)"
          >
            <stop stop-color="#FFF5FF" />
            <stop offset="0.145833" stop-color="#ACFFCD" />
            <stop offset="0.401042" stop-color="#4EFF8A" />
            <stop offset="0.75" stop-color="#05C451" />
            <stop offset="1" stop-color="#08855F" />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
};
