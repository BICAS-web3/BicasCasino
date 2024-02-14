import { FC, useState } from "react";
import s from "./styles.module.scss";
import passwordEye from "@/public/media/registration/passwordEye.svg";
import clsx from "clsx";
import arr from "@/public/media/registration/arr.svg";
import * as RegistrM from "@/widgets/Registration/model";
import { useUnit } from "effector-react";

interface SignupProps {}

export const Signup: FC<SignupProps> = () => {
  const [ageCheckbox, setAgeCheckbox] = useState(true);
  const [policyCheckbox, setPolicyCheckbox] = useState(false);

  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup,
  ]);

  return (
    <div className={s.signup_block}>
      <div className={s.signup_block_content}>
        <div className={s.input_item}>
          <span className={s.input_item_title}>Username</span>
          <input type="text" className={s.input} />
        </div>
        <div className={s.input_item} style={{ position: "relative" }}>
          <span className={s.input_item_title}>Password</span>
          <input type="text" className={s.input} />
          <img src={passwordEye.src} className={s.eye} alt="eue" />
        </div>
        <div
          className={s.age_block}
          onClick={() => setAgeCheckbox(!ageCheckbox)}
        >
          <div className={clsx(s.checkbox, ageCheckbox && s.active_checkbox)}>
            <img src={arr.src} className={s.arr_checkbox} alt="arr-ico" />
          </div>
          <p className={s.checkbox_text}>
            I am at least 18 years old and not a resident of the restricted
            states.
          </p>
        </div>
        <div
          className={s.age_block}
          onClick={() => setPolicyCheckbox(!policyCheckbox)}
        >
          <div
            className={clsx(s.checkbox, policyCheckbox && s.active_checkbox)}
          >
            <img src={arr.src} className={s.arr_checkbox} alt="arr-ico" />
          </div>
          <p className={s.checkbox_text}>
            I accept the GreekKeepers <span>Terms of Use</span> and
            <span> Privacy Policy.</span>
          </p>
        </div>
        <button className={s.signup_btn}>Sign Up</button>
        <div className={s.sign_in_block}>
          <span className={s.already_text}>Already have an account? </span>
          <span className={s.signin_text} onClick={() => setIsSignup("in")}>
            &nbsp; Sign in
          </span>
        </div>
      </div>
    </div>
  );
};
