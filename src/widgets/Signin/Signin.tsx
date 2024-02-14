import { FC } from "react";
import s from "./styles.module.scss";
import passwordEye from "@/public/media/registration/passwordEye.svg";
import * as RegistrM from "@/widgets/Registration/model";
import { useUnit } from "effector-react";

interface SigninProps {}

export const Signin: FC<SigninProps> = () => {
  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup,
  ]);

  return (
    <div className={s.signin_block}>
      <div className={s.input_item}>
        <span className={s.input_item_title}>Username</span>
        <input type="text" className={s.input} />
      </div>
      <div className={s.input_item} style={{ position: "relative" }}>
        <span className={s.input_item_title}>Username</span>
        <input type="text" className={s.input} />
        <img src={passwordEye.src} className={s.eye} alt="eue" />
      </div>
      <button className={s.sign_btn}>Sign In</button>
      <span
        className={s.forgot_password_btn}
        onClick={() => setIsSignup("recovery")}
      >
        Forgot Password?
      </span>
    </div>
  );
};
