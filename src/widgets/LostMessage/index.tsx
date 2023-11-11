import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Image from 'next/image';
import useSound from "use-sound";

export interface LostMessageProps {
    amount: string,
}
export const LostMessage: FC<LostMessageProps> = props => {

    return (<div className={s.lost_message}>
        <div className={s.message}>
            YOU LOST
        </div>
        <div className={s.amount}>
            {props.amount}
        </div>
    </div>)
}