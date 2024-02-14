import { FC } from "react";
import s from "./styles.module.scss";

interface RegistrationProps {}

export const Registration: FC<RegistrationProps> = () => {
  return (
    <div className={s.registration_wrap}>
      <div className={s.registration_block}></div>
    </div>
  );
};
