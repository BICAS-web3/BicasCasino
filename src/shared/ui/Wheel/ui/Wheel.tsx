import { FC } from "react";
import clsx from "clsx";
import * as GameModel from "@/widgets/GamePage/model";
import cross from "@/public/media/roulette_images/cross.png";
import s from "./styles.module.scss";
import Image from "next/image";
import { WinBlock } from "@/widgets/WinBlock/WinBlock";

export interface WheelProps {
  className?: string;
  profit?: any;
  gameStatus: any;
  array: { angle: number; value: number; color: string }[];
}

export const Wheel: FC<WheelProps> = ({
  className,
  array,
  gameStatus,
  profit,
}) => {
  return (
    <div className={s.wheel_wrapper}>
      {gameStatus === GameModel.GameStatus.Won && (
        <WinBlock winValue={profit} />
      )}
      <div className={s.wheel_eclipse}></div>
      <svg
        width="454"
        height="454"
        viewBox="0 0 454 454"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.eclipse_wrapper}
      >
        <circle
          cx="227"
          cy="227"
          r="225.5"
          fill="#101010"
          stroke="url(#paint0_radial_8102_100384)"
          stroke-width="3"
        />
        <defs>
          <radialGradient
            id="paint0_radial_8102_100384"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(229.046 225.575) rotate(90) scale(227.186 227.186)"
          >
            <stop offset="0.154514" stop-color="#FAECAA" />
            <stop offset="0.331597" stop-color="#FFDDBD" />
            <stop offset="0.581597" stop-color="#EEC368" />
            <stop offset="1" stop-color="#AB7C46" />
          </radialGradient>
        </defs>
      </svg>
      <div className={s.wheel_sub_wrapper}>
        <Image className={s.cross} src={cross} alt="cross" />
        <svg className={s.roulette_wheel} viewBox="0 0 290 290">
          <image
            className={s.eclipse_wrapper}
            xlinkHref={"/roulette_icons/eclipse_1.svg"}
          ></image>
          <circle cx="145" cy="145" r="145" fill="rgba(1,1,1,0)"></circle>
          <defs>
            <g id="wheel-sector">
              <path
                d="
                M 145 13
                A 132 132 1, 0, 1, 167.30810828248408 14.898699834102473
                L 145 145
                L 145 13
              "
              ></path>
            </g>
          </defs>
          <defs>
            <g id="wheel-sector-inner">
              <path
                d="
                M 145 13
                A 132 132 1, 0, 1, 167.30810828248408 14.898699834102473
                L 162.914086954116 40.524713503142905
                A 106 106 1, 0, 0, 145 39
                L 145 13
              "
              ></path>
            </g>
          </defs>
          {array.map((item) => (
            <g
              className={clsx(s.sector_item, s[item.color])}
              style={{
                transform: `rotate(${item.angle}deg) scaleY(1.0355) scaleX(1.045)`,
              }}
            >
              <span className={s.additional}></span>
              <use xlinkHref="#wheel-sector" className={s.use_tag}></use>
              <use
                xlinkHref="#wheel-sector"
                // className={s.use_tag}
                stroke="#D5C295"
                fill="none"
                strokeWidth={1}
              ></use>
              <use
                xlinkHref="#wheel-sector-inner"
                className={s.wheel_tag}
              ></use>{" "}
              <text
                className={s.sector_text}
                transform="translate(154,35) rotate(2)"
              >
                {item.value}
              </text>
            </g>
          ))}
          <circle
            cx="145"
            cy="145"
            r="74"
            fill="#101113"
            stroke="#D5C295"
            strokeWidth="1"
          ></circle>
        </svg>
      </div>
    </div>
  );
};
