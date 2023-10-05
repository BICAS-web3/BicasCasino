import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import CloseIcon from "@/public/media/misc/close.svg";
import Image from 'next/image';

export interface WinMessageProps {
    tokenImage: any,
    profit: string,
    multiplier: string
}
export const WinMessage: FC<WinMessageProps> = props => {
    return (<div className={s.win_message}>
        <div className={s.close}>
            <Image src={CloseIcon} alt={''} />
        </div>
        <div className={s.win_container}>
            <div className={s.win_title}>
                YOU WIN!
            </div>
            <div className={s.profit_box}>
                <div className={s.profit}>
                    <div className={s.token}>
                        {props.tokenImage}
                    </div>
                    <div className={s.profit_text}>
                        {props.profit}
                    </div>
                </div>
                <div className={s.multiplier}>
                    {props.multiplier}
                </div>
            </div>
            <div className={s.bet_again_button}>
                Bet on my winnings
            </div>
        </div>
    </div>);
}