import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";

import SwiperCore, { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/effect-fade";
// import "swiper/scss/ef";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";

///images

import swiperImg1 from "@/public/media/swiperBannerImgs/slide1Bg.png";
import swiperImg2 from "@/public/media/swiperBannerImgs/slide2Bg.png";
import swiperImg3 from "@/public/media/swiperBannerImgs/slide3Bg.png";
import swiperImg4 from "@/public/media/swiperBannerImgs/slide4Bg.png";
import swiperImg5 from "@/public/media/swiperBannerImgs/slide5Bg.png";
import swiperImg5Mob from "@/public/media/swiperBannerImgs/slide5MobBg.png";

import tgIco from "@/public/media/swiperBannerImgs/tgIco.svg";
import kycIco from "@/public/media/swiperBannerImgs/kycIco.svg";

import * as MainWallet from "@/widgets/AvaibleWallet/model";
import { useUnit } from "effector-react";
import * as BlurModel from "@/widgets/Blur/model";
import { AvaibleWallet } from "../AvaibleWallet";
import clsx from "clsx";
import { checkPageClicking } from "@/shared/tools";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
///

const swiperSlides = [
  {
    text: "Web3.0 Games",
    subTitle: "Without KYC just connect your wallet and play",
    isBtn: true,
    img: swiperImg1,
    btnFirstText: "Join wallet",
    btnSecondText: "Join wallet",
  },
  {
    text: "Get your $100 deposit bonus in the DRAXB token",
    isBtn: true,
    img: swiperImg2,
    btnFirstText: "Claim your deposit bonus",
    btnSecondText: "Join wallet",
  },
  {
    text: "You can bet on the BSC, Polygon and Arbitrum networks",
    isBtn: false,
    img: swiperImg3,
  },
  {
    text: "Since our platform is web 3.0",
    isBtn: false,
    extraText: "we do not keep user funds, your game is absolutely safe",
    img: swiperImg4,
  },
  {
    text: "",
    isBtn: false,
    extraText: "",
    img: swiperImg5,
    imgMob: swiperImg5Mob,
  },
];

interface SwiperBannerProps {}

export const SwiperBanner: FC<SwiperBannerProps> = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [walletVisibility, setWalletVisibility] = useState(false);
  const [is650, setIs650] = useState(false);
  const [is700, setIs700] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700 && width > 650) {
        setIs650(false);
        setIs700(true);
      } else if (width < 650) {
        setIs650(true);
        setIs700(false);
      } else {
        setIs650(false);
        setIs700(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isMainWalletOpen, setBlur] = useUnit([
    MainWallet.$isMainWalletOpen,
    BlurModel.setBlur,
  ]);

  const router = useRouter();
  const { isConnected } = useAccount();

  const handleConnectWalletBtn = () => {
    !isConnected ? router.push("/RegistrManual") : null;
    // if (!walletVisibility) {
    //   router.push("/");
    //   setWalletVisibility(true);
    //   setBlur(true);
    //   document.documentElement.style.overflow = "hidden";
    //   window.scrollTo(0, 0);
    // } else {
    //   setWalletVisibility(false);
    //   setBlur(false);
    //   document.documentElement.style.overflow = "visible";
    // }
  };

  const hideAvaibleWallet = () => {
    setWalletVisibility(false);
    setBlur(false);
    document.documentElement.style.overflow = "visible";
  };

  useEffect(() => {
    if (walletVisibility) {
      checkPageClicking(
        { blockDataId: "connect-wallet-banner-block" },
        (isBlock) => {
          !isBlock && setWalletVisibility(false);
        }
      );
    }

    if (!walletVisibility) {
      setWalletVisibility(false);
      setBlur(false);
      document.documentElement.style.overflow = "visible";
    }
  }, [walletVisibility]);

  return (
    <div
      className={s.swiper_banner_wrap}
      data-id={"connect-wallet-banner-block"}
    >
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        speed={1000}
        effect="fade"
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className={s.main_banner_swiper}
        pagination={{
          el: "#custom_swiper_banner_pagination",
          clickable: true,
        }}
      >
        {swiperSlides.map((slide, ind) => (
          <SwiperSlide
            key={ind}
            id="swiper-slide-banner"
            className={s.main_banner_swiper_slide}
            data-extra={slide.extraText && "true"}
          >
            <img
              className={s.slide_bg_img}
              src={
                (slide.imgMob && is700) || (slide.imgMob && is650)
                  ? slide.imgMob.src
                  : slide.img.src
              }
              alt="slide-imd"
            />
            <span className={`${s.slide_text} ${ind === 0 && s.title}`}>
              {slide.text}
            </span>
            {slide.extraText && (
              <span className={s.extra_text}>{slide.extraText}</span>
            )}
            {slide.subTitle && (
              <div className={s.kyc_block}>
                <Image src={kycIco} className={s.kyc_ico} alt="kyc-ico" />
                Without KYC <br /> just connect your wallet and play
              </div>
            )}
            {slide.isBtn === true && (
              <button
                onClick={() => handleConnectWalletBtn()}
                className={s.join_wallet_btn}
              >
                {!is650 ? slide.btnFirstText : slide.btnSecondText}
              </button>
            )}
            {ind === 4 && (
              <button
                className={s.tg_btn}
                onClick={() =>
                  window.open("https://t.me/HFT_Crypto_Signals_bot", "_blank")
                }
              >
                {is700 || is650 ? "Join Telegram Bot" : "Join Bot"}
                <img src={tgIco.src} alt="telegram-ico" />
              </button>
            )}
          </SwiperSlide>
        ))}
        <div
          className={s.custom_swiper_banner_pagination}
          id="custom_swiper_banner_pagination"
        ></div>
      </Swiper>
      <div
        className={clsx(
          s.wallet_wrap,
          walletVisibility && s.avaibleWallet_visible
        )}
      >
        <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
      </div>
    </div>
  );
};
// src={ is1280 ? slide.laptopImg : is700 ? slide.tabletImg : is650 ? slide.mobileImg : slide.deskImg }
