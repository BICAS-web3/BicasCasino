import s from "./styles.module.scss";
import { FC } from "react";

export interface NetworkErrorTextProps {
  error_text: string;
}

export const NetworkErrorText: FC<NetworkErrorTextProps> = props => {
  return (
    <div className={s.network_error_text_block}>
      <span className={s.network_error_text}>{props.error_text}</span>
    </div>
  )
}