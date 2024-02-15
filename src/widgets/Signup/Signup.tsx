import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import arr from "@/public/media/registration/arr.svg";

import * as RegistrM from "@/widgets/Registration/model";

import * as api from "@/shared/api";
import { EyeClose, EyeOpen } from "@/shared/SVGs";

import clsx from "clsx";
import s from "./styles.module.scss";

interface SignupProps {}

export const Signup: FC<SignupProps> = () => {
  const [setAuth] = useUnit([RegistrM.setAuth]);

  useEffect(() => {
    const exist = localStorage.getItem("auth");
    if (exist && exist === "ok") {
      setAuth(true);
    }
  }, []);

  const [ageCheckbox, setAgeCheckbox] = useState(true);
  const [policyCheckbox, setPolicyCheckbox] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup,
  ]);

  const [startRegister, setStartRegister] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  }, [error]);

  useEffect(() => {
    if (startRegister) {
      if (ageCheckbox && policyCheckbox && name && password) {
        (async () => {
          const data = await api.registerUser({
            username: name,
            password: password,
          });
          if (data.status === "OK") {
            localStorage.setItem(`auth`, "ok");
            setAuth(true);
            setName("");
            setPassword("");
          }
        })();
      } else {
        setError(true);
        setName("");
        setPassword("");
      }
      setStartRegister(false);
    }
  }, [startRegister]);

  return (
    <div className={s.signup_block}>
      <div className={s.signup_block_content}>
        <div className={s.input_item}>
          <span
            className={clsx(
              s.input_item_title,
              error && !name && s.input_item_title_err
            )}
          >
            Username
          </span>
          <input
            value={name}
            onChange={(el) => setName(el.target.value)}
            type="text"
            className={s.input}
          />
        </div>
        <div className={s.input_item} style={{ position: "relative" }}>
          <span
            className={clsx(
              s.input_item_title,
              error && !password && s.input_item_title_err
            )}
          >
            Password
          </span>
          <input
            value={password}
            onChange={(el) => setPassword(el.target.value)}
            type={showPassword ? "text" : "password"}
            className={s.input}
          />
          {showPassword ? (
            <EyeOpen
              onClick={() => setShowPassword((prev) => !prev)}
              className={s.eye}
            />
          ) : (
            <EyeClose
              onClick={() => setShowPassword((prev) => !prev)}
              className={s.eye}
            />
          )}
        </div>
        <div
          className={s.age_block}
          onClick={() => setAgeCheckbox(!ageCheckbox)}
        >
          <div
            className={clsx(
              s.checkbox,
              ageCheckbox && s.active_checkbox,
              error && !ageCheckbox && s.checkbox_err
            )}
          >
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
            className={clsx(
              s.checkbox,
              policyCheckbox && s.active_checkbox,
              error && !policyCheckbox && s.checkbox_err
            )}
          >
            <img src={arr.src} className={s.arr_checkbox} alt="arr-ico" />
          </div>
          <p className={clsx(s.checkbox_text)}>
            I accept the GreekKeepers <span>Terms of Use</span> and
            <span> Privacy Policy.</span>
          </p>
        </div>
        <button onClick={() => setStartRegister(true)} className={s.signup_btn}>
          Sign Up
        </button>
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
