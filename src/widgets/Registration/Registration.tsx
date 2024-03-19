import { FC } from "react";
import s from "./styles.module.scss";
import Link from "next/link";
import HeaderLogo from "@/public/media/brand_images/logoLeft.png";
import HeaderBrandText from "@/public/media/brand_images/HeaderBrandText.svg";
import Image from "next/image";
import bg from "@/public/media/registration/formBg.webp";
import * as RegistrM from "./model";
import { useUnit } from "effector-react";
import { Signup } from "../Signup/Signup";
import { Signin } from "../Signin/Signin";
import clsx from "clsx";
import googleIco from "@/public/media/registration/googleIco.svg";
import fbIco from "@/public/media/registration/fbIco.svg";
import twitterIco from "@/public/media/registration/twitterIco.svg";
import { PasswordRecovery } from "../PasswordRecovery/PasswordRecovery";

interface RegistrationProps { }

export const Registration: FC<RegistrationProps> = () => {
  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup,
  ]);

  return (
    <div className={s.registration_wrap}>
      <div className={s.registration_block}>
        <div className={s.registration_left_block}>
          <img src={bg.src} className={s.reg_bg} alt="" />
          <Link className={s.emblem} href="/">
            <img src={HeaderLogo.src} alt={""} width={51} height={40} />
            <img
              className={s.logo_text}
              src={HeaderBrandText.src}
              alt={""}
              width={54.71}
              height={23.71}
            />
          </Link>
          <div className={s.registr_text_group}>
            <p className={s.welcome_text}>
              Welcome to <span>GreekKeepers</span>
            </p>
            <span className={s.registr_subTitle}>
              Start your gaming journey right now!
            </span>
          </div>
        </div>
        <div className={s.registration_main_block}>
          <div className={s.registration_main_block_content}>
            <div className={s.registration_title}>
              {isSignup !== "up" && isSignup !== "in"
                ? "Password recovery"
                : "Registration"}
            </div>
            {isSignup !== "recovery" && (
              <div className={s.registr_type_block}>
                <div
                  className={clsx(s.signUp_btn, isSignup === "up" && s.active)}
                  onClick={() => setIsSignup("up")}
                >
                  Sign Up
                </div>
                <div
                  className={clsx(s.signIn_btn, isSignup === "in" && s.active)}
                  onClick={() => setIsSignup("in")}
                >
                  Sign In
                </div>
              </div>
            )}
            {isSignup === "up" ? (
              <Signup />
            ) : isSignup === "in" ? (
              <Signin />
            ) : (
              <PasswordRecovery />
            )}
          </div>
          <div className={s.continue_with_block_wrap}>
            <div className={s.continue_with_title_block}>
              <div className={s.border}></div>
              <span className={s.continue_with_title}>Or continue with</span>
              <div className={s.border}></div>
            </div>
            <div className={s.continue_with_block}>
              <div className={s.continue_with_block_item}>
                <img src={googleIco.src} alt="gg" />
              </div>
              <div className={s.continue_with_block_item}>
                <img src={fbIco.src} alt="fb" />
              </div>
              <div className={s.continue_with_block_item}>
                <img src={twitterIco.src} alt="tw" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
