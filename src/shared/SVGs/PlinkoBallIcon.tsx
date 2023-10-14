import { FC } from "react";
import { useDeviceType } from "../tools";

interface PlinkoBallIconProps {}
export const PlinkoBallIcon: FC<PlinkoBallIconProps> = ({}) => {
  const device = useDeviceType();

  return (
    <>
      {device === "main" ? (
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5734 25.9589C20.6046 25.9589 26.3046 20.366 26.3046 13.4668C26.3046 6.56753 20.6046 0.974609 13.5734 0.974609C6.54211 0.974609 0.842163 6.56753 0.842163 13.4668C0.842163 20.366 6.54211 25.9589 13.5734 25.9589Z"
            fill="url(#paint0_radial_3106_114166)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3106_114166"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(11.0351 6.66231) scale(17.6171 17.2863)"
            >
              <stop stopColor="#FFFCF5" />
              <stop offset="0.145833" stopColor="#FFE8AC" />
              <stop offset="0.401042" stopColor="#FFB84E" />
              <stop offset="0.75" stopColor="#C47705" />
              <stop offset="1" stopColor="#853C08" />
            </radialGradient>
          </defs>
        </svg>
      ) : device === "tablet" ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
            fill="url(#paint0_radial_3134_133837)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3134_133837"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(5.60439 3.18712) scale(9.68641)"
            >
              <stop stop-color="#FFFCF5" />
              <stop offset="0.145833" stop-color="#FFE8AC" />
              <stop offset="0.401042" stop-color="#FFB84E" />
              <stop offset="0.75" stop-color="#C47705" />
              <stop offset="1" stop-color="#853C08" />
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
            fill="url(#paint0_radial_3149_47520)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3149_47520"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(2.8022 1.59356) scale(4.8432)"
            >
              <stop stop-color="#FFFCF5" />
              <stop offset="0.145833" stop-color="#FFE8AC" />
              <stop offset="0.401042" stop-color="#FFB84E" />
              <stop offset="0.75" stop-color="#C47705" />
              <stop offset="1" stop-color="#853C08" />
            </radialGradient>
          </defs>
        </svg>
      ) : (
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5734 25.9589C20.6046 25.9589 26.3046 20.366 26.3046 13.4668C26.3046 6.56753 20.6046 0.974609 13.5734 0.974609C6.54211 0.974609 0.842163 6.56753 0.842163 13.4668C0.842163 20.366 6.54211 25.9589 13.5734 25.9589Z"
            fill="url(#paint0_radial_3106_114166)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3106_114166"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(11.0351 6.66231) scale(17.6171 17.2863)"
            >
              <stop stopColor="#FFFCF5" />
              <stop offset="0.145833" stopColor="#FFE8AC" />
              <stop offset="0.401042" stopColor="#FFB84E" />
              <stop offset="0.75" stopColor="#C47705" />
              <stop offset="1" stopColor="#853C08" />
            </radialGradient>
          </defs>
        </svg>
      )}
    </>
  );
};
