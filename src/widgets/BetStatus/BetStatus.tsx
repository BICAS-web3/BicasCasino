import s from './styles.module.scss';
import { FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import * as StatusModel from "./model";
import { useUnit } from 'effector-react';

export interface BetStatusProps { };
export const BetStatus: FC<BetStatusProps> = props => {
    var [Won, setWon] = useUnit([
        StatusModel.$Won,
        StatusModel.setWon
    ]);

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const setStatus = async () => {
        await delay(5000);
        setWon(null);
    }

    useEffect(() => {
        setStatus();
    }, [Won]);

    return (<div className={`${s.bet_status} ${Won == null ? '' : Won ? s.bet_won : s.bet_lost}`}>
        {Won ? "Bet won" : "Bet lost"}
    </div>);
}