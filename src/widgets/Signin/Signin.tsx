import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import * as RegistrM from "@/widgets/Registration/model";

import * as api from "@/shared/api";
import { EyeClose, EyeOpen } from "@/shared/SVGs";

import s from "./styles.module.scss";

import clsx from "clsx";

interface SigninProps {}

export const Signin: FC<SigninProps> = () => {
  const [inPorgress, setInProgress] = useState(false);
  const [errorData, setErrorData] = useState(false);

  const [setIsSignup, setAuth, setAccessToken, setRefreshToken] = useUnit([
    RegistrM.setIsSignup,
    RegistrM.setAuth,
    RegistrM.setAccessToken,
    RegistrM.setRefreshToken,
  ]);

  useEffect(() => {
    const exist = localStorage.getItem("auth");
    if (exist) {
      setAuth(true);
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [startLogin, setStartLogin] = useState(false);

  useEffect(() => {
    if (errorData) {
      setTimeout(() => setErrorData(false), 1000);
    }
  }, [errorData]);

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
          setInProgress(true);
          const data = await api.loginUser({
            login: name,
            password: password,
          });
          if (data.status === "OK") {
            console.log(data.body);
            setAccessToken((data.body as any).access_token);
            setRefreshToken((data.body as any).refresh_token);
            localStorage.setItem("auth", (data.body as any).access_token);
            setAuth(true);
            setName("");
            setPassword("");
          } else if ((data.body as any).status !== "OK") {
            if ((data.body as any).error === "Wrong login or password") {
              setErrorData(true);
            }
            setInProgress(false);
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
        {inPorgress ? "In process" : errorData ? "Wrong data" : "Sign In"}
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
