import clsx from "clsx";
import { FC } from "react";
import s from "@/widgets/CarsRace/styles.module.scss";
import wheelIco from "@/public/media/cars/car2Wheel.svg";

interface Car2Props {
  gameStarted: boolean;
}

export const Car2: FC<Car2Props> = ({ gameStarted }) => {
  return (
    <>
      <svg
        width="270"
        height="85"
        viewBox="0 0 270 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.3"
          d="M3.06458 74.5719C3.06458 79.8809 62.77 84.1867 136.421 84.1867C210.072 84.1867 269.777 79.8809 269.777 74.5719C269.777 69.2628 210.072 64.957 136.421 64.957C62.77 64.957 3.06458 69.2628 3.06458 74.5719Z"
          fill="#050304"
        />
        <path
          d="M249.108 71.2039L239.007 69.2124H193.619L76.5972 67.1812H56.8858L29.3126 61.4053H23.0202V24.1875L175.73 42.8461L205.926 28.0414L242.458 33.112L258.693 50.3651L249.108 71.2039Z"
          fill="#050304"
        />
        <path
          d="M8.57718 21.224L6.00958 15.3935V12.364H12.8036C12.8036 12.364 17.2038 16.0937 24.6682 13.7645C24.6682 13.7645 69.4447 -0.225684 84.6021 0.00276772H132.18C132.18 0.00276772 149.204 2.79883 179.991 19.1282C179.991 19.1282 254.853 22.6245 269.777 41.5165V57.6074L266.976 61.5706V68.3348L249.102 71.2003V59.0328C249.102 44.8042 237.566 33.2674 223.337 33.2674C209.108 33.2674 197.572 44.8042 197.572 59.0328V71.3642H76.5913V59.0328C76.5913 44.8042 65.0545 33.2674 50.8259 33.2674C36.5973 33.2674 25.0605 44.8042 25.0605 59.0328V64.8832L24.6682 64.8335L6.47644 58.5361C6.47644 58.5361 -7.28534 40.3444 8.57718 21.219V21.224Z"
          fill="#78B7DE"
        />
        <path
          d="M6.01541 12.3643C14.3092 21.562 70.2303 15.7266 70.2303 15.7266C75.6039 16.7596 168.539 21.9991 168.539 21.9991L172.721 19.1732H180.886C189.348 19.64 255.813 23.8366 269.783 41.5168V57.6078L266.982 61.5709V68.3351L249.108 71.2007V59.0331C249.108 44.8045 237.571 33.2677 223.343 33.2677C209.114 33.2677 197.577 44.8045 197.577 59.0331V71.3646H76.5972V59.0331C76.5972 44.8045 65.0604 33.2677 50.8318 33.2677C36.6032 33.2677 25.0664 44.8045 25.0664 59.0331V64.8835L24.674 64.8338L6.48227 58.5365C6.48227 58.5365 -7.27948 40.3447 8.58304 21.2193L6.01541 15.3889V12.3594V12.3643Z"
          fill="#78B7DE"
        />
        <path
          d="M91.9687 17.9268C117.024 20.3256 156.313 23.6133 168.535 21.9993C168.535 21.9993 177.887 22.7839 173.64 61.4023H108.73C108.73 61.4023 89.7636 46.836 91.9687 17.9219V17.9268Z"
          fill="#78B7DE"
        />
        <g opacity="0.3">
          <path
            d="M74.5887 49.0422C96.5251 40.3213 82.5796 31.6104 82.5796 31.6104C124.908 25.9487 205.924 40.0482 205.924 40.0482C200.794 44.7563 197.575 51.5205 197.575 59.0345V71.366H76.5952V59.0345C76.5952 55.4886 75.88 52.1164 74.5838 49.0422H74.5887Z"
            fill="#050304"
          />
          <path
            d="M21.9168 48.8635H27.1562C25.8153 51.9824 25.0654 55.4191 25.0654 59.0346V64.8849L24.6731 64.8353L6.48134 58.538C6.48134 58.538 0.223743 50.2441 1.02332 38.9805C16.3197 39.2437 21.9168 48.8685 21.9168 48.8685V48.8635Z"
            fill="#050304"
          />
          <path
            d="M266.981 61.5684V68.3326L249.107 71.1982V59.0306C249.107 55.9862 248.576 53.071 247.608 50.3594H269.777V57.6003L266.976 61.5635L266.981 61.5684Z"
            fill="#050304"
          />
        </g>
        <path
          d="M133.811 2.75903C133.811 2.75903 135.594 1.57705 137.391 1.23438C144.598 3.21098 159.134 8.05813 179.998 19.1232C179.998 19.1232 180.311 19.1381 180.887 19.1679H172.722L133.811 2.75408V2.75903Z"
          fill="#3E3E3E"
        />
        <path
          d="M88.0483 64.957H184.251C191.468 64.957 197.576 71.3636 197.576 71.3636H76.5959C81.0805 65.1457 88.0483 64.957 88.0483 64.957Z"
          fill="#70AFD6"
        />
        <path
          d="M269.777 41.5153C269.777 41.5153 253.95 44.4753 255.196 32.1289C261.667 34.7313 266.867 37.8253 269.777 41.5153Z"
          fill="#B2D1E4"
        />
        <path
          opacity="0.3"
          d="M99.6202 25.6971C99.6202 26.9735 116.223 26.9735 116.223 25.6971C116.223 24.4208 115.359 23.3828 114.291 23.3828H101.547C100.479 23.3828 99.6152 24.4208 99.6152 25.6971H99.6202Z"
          fill="#050304"
        />
        <path
          opacity="0.3"
          d="M179.704 33.0162L193.321 34.824C194.861 33.4086 195.949 34.824 195.745 36.3685L176.545 33.8208C176.749 32.2762 178.164 31.1936 179.709 33.0162H179.704Z"
          fill="#050304"
        />
        <path
          opacity="0.3"
          d="M192.437 41.4596L178.819 39.6518C177.275 39.4482 176.192 38.0328 176.396 36.4883L195.596 39.036C195.392 40.5806 193.977 41.6632 192.432 41.4596H192.437Z"
          fill="#050304"
        />
        <g opacity="0.3">
          <path
            d="M46.7357 36.0831L46.8301 35.2835L20.136 32.0951L15.3633 27.3672L14.7971 27.9383L19.7635 32.8649L46.7357 36.0831Z"
            fill="#050304"
          />
        </g>
        <path
          d="M8.57871 21.2266C8.57871 21.2266 23.8055 23.5409 14.6377 30.2753H3.06607C4.26296 27.3302 6.03594 24.2908 8.57871 21.2266Z"
          fill="#FB3B3B"
        />
        <path
          opacity="0.3"
          d="M269.777 48.0986H246.669C246.54 47.8254 246.406 47.5572 246.267 47.2891H269.772V48.0986H269.777Z"
          fill="#050304"
        />
        <path
          opacity="0.3"
          d="M91.5658 17.8995L92.3753 17.9591C90.2994 45.1946 107.369 59.7758 108.878 61.0025H173.282C177.305 23.874 168.589 22.4139 168.5 22.404L166.324 22.2202L167.084 21.1276C167.203 21.1376 169.592 21.4753 171.032 23.2731C173.357 26.1734 176.912 34.8596 174.092 61.0025H198.312V61.812H108.595L108.486 61.7275C108.297 61.5785 89.3707 46.6944 91.5658 17.8945V17.8995Z"
          fill="#050304"
        />
        <path
          d="M65.6283 9.02863L70.2322 15.7233C70.2322 15.7233 150.126 24.4293 168.541 21.9958C168.541 21.9958 142.393 5.88991 125.031 3.59049C125.031 3.59049 96.37 -0.382602 65.6283 9.02863Z"
          fill="#3E3E3E"
        />
        <path
          d="M125.031 3.59154C142.393 5.89096 168.541 21.9968 168.541 21.9968C166.843 22.2203 164.618 22.3494 161.98 22.3991C154.451 17.6463 138.942 8.59265 127.613 6.90906C127.613 6.90906 109.839 4.1577 88.0266 8.68701L89.8492 17.7158C88.6921 17.6016 87.5647 17.4924 86.482 17.3881L84.868 9.38231C81.5058 10.1819 78.0641 11.1553 74.5926 12.3472L77.1056 16.4444C72.7998 16.0024 70.2322 15.7194 70.2322 15.7194L65.6283 9.02473C96.375 -0.3865 125.031 3.58657 125.031 3.58657V3.59154Z"
          fill="#333333"
        />
        <path
          opacity="0.3"
          d="M197.576 71.3706H76.5959C77.5395 70.0645 78.5924 69.0364 79.6651 68.207H193.673C196.066 69.7963 197.571 71.3706 197.571 71.3706H197.576Z"
          fill="#050304"
        />
        <circle cx="53.8369" cy="19.0654" r="9.79592" fill="#D9D9D9" />
        <path
          d="M50.5933 22.5781V20.9859L53.9343 18.0608C54.1848 17.8342 54.398 17.627 54.5739 17.4391C54.7498 17.2483 54.884 17.0575 54.9764 16.8667C55.0689 16.6728 55.1151 16.4626 55.1151 16.236C55.1151 15.9826 55.0599 15.7664 54.9496 15.5875C54.8393 15.4056 54.6872 15.2655 54.4934 15.1671C54.2996 15.0687 54.0775 15.0195 53.827 15.0195C53.5735 15.0195 53.3514 15.0717 53.1606 15.176C52.9698 15.2774 52.8207 15.425 52.7133 15.6188C52.609 15.8126 52.5568 16.0482 52.5568 16.3255H50.4591C50.4591 15.7023 50.5993 15.1641 50.8796 14.7109C51.1599 14.2577 51.5534 13.9088 52.0603 13.6643C52.5702 13.4168 53.1621 13.2931 53.8359 13.2931C54.5307 13.2931 55.1345 13.4094 55.6473 13.6419C56.1602 13.8745 56.5568 14.1995 56.837 14.617C57.1203 15.0314 57.2619 15.513 57.2619 16.0616C57.2619 16.4105 57.1919 16.7563 57.0517 17.0992C56.9116 17.4421 56.6596 17.8208 56.2959 18.2353C55.9351 18.6497 55.4222 19.1462 54.7573 19.7246L53.6615 20.7354V20.7936H57.3737V22.5781H50.5933Z"
          fill="black"
        />
      </svg>
      <img
        src={wheelIco.src}
        className={clsx(
          s.car2_rightWheel,
          gameStarted && s.start_anim,
          s.car_wheel
        )}
        alt="wheel-static"
      />
      <img
        src={wheelIco.src}
        className={clsx(
          s.car2_leftWheel,
          gameStarted && s.start_anim,
          s.car_wheel
        )}
        alt="wheel-static"
      />
    </>
  );
};