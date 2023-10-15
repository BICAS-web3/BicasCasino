import { FC } from "react";
import { useDeviceType } from "../tools";

interface PlinkoBallIconProps {}
export const PlinkoBallIcon: FC<PlinkoBallIconProps> = ({}) => {
  const device = useDeviceType();

  console.log(device);

  return (
    <>
      {device === "main" ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      ) : device === "tablet" ? (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z"
            fill="url(#paint0_radial_3138_141646)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3138_141646"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(4.00314 2.27651) scale(6.91886)"
            >
              <stop stop-color="#FFF5FF" />
              <stop offset="0.145833" stop-color="#ACFFCD" />
              <stop offset="0.401042" stop-color="#4EFF8A" />
              <stop offset="0.75" stop-color="#05C451" />
              <stop offset="1" stop-color="#08855F" />
            </radialGradient>
          </defs>
        </svg>
      ) : device === "phone" ? (
        <svg
          width="7"
          height="7"
          viewBox="0 0 7 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 7C5.433 7 7 5.433 7 3.5C7 1.567 5.433 0 3.5 0C1.567 0 0 1.567 0 3.5C0 5.433 1.567 7 3.5 7Z"
            fill="url(#paint0_radial_3138_141620)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3138_141620"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(2.8022 1.59356) scale(4.8432)"
            >
              <stop stop-color="#FFF5FF" />
              <stop offset="0.145833" stop-color="#ACFFCD" />
              <stop offset="0.401042" stop-color="#4EFF8A" />
              <stop offset="0.75" stop-color="#05C451" />
              <stop offset="1" stop-color="#08855F" />
            </radialGradient>
          </defs>
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      )}
    </>
  );
};
