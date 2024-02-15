import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import * as RegistrM from "@/widgets/Registration/model";

import * as api from "@/shared/api";

import s from "./styles.module.scss";

import clsx from "clsx";
import { EyeClose, EyeOpen } from "@/shared/SVGs";

interface SigninProps {}

export const Signin: FC<SigninProps> = () => {
  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup,
  ]);

  const [setAuth] = useUnit([RegistrM.setAuth]);

  useEffect(() => {
    const exist = localStorage.getItem("auth");
    if (exist && exist === "ok") {
      setAuth(true);
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [startLogin, setStartLogin] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  }, [error]);

  useEffect(() => {
    if (startLogin) {
      if (name && password) {
        (async () => {
          const data = await api.loginUser({
            login: name,
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
      setStartLogin(false);
    }
  }, [startLogin]);

  return (
    <div className={s.signin_block}>
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
        {/* <img
          onClick={() => setShowPassword((prev) => !prev)}
          src={passwordEye.src}
          className={s.eye}
          alt="eue"
        /> */}
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
      <button onClick={() => setStartLogin(true)} className={s.sign_btn}>
        Sign In
      </button>
      <span
        className={s.forgot_password_btn}
        onClick={() => setIsSignup("recovery")}
      >
        Forgot Password?
      </span>
    </div>
  );
};
