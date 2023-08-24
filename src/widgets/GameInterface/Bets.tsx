import Image from 'next/image';
import { FC, ReactNode, SetStateAction, useEffect } from 'react';
import s from './styles.module.scss';
import { Slider, OnChangeBetsSliderHandler } from '.';

export interface MultipleBetsProps {
    on_change_bets_handler: OnChangeBetsSliderHandler,
    bets_amount: number,
};
export const MultipleBets: FC<MultipleBetsProps> = props => {
    return (<>
        <div className={s.multiple_bets_text}>
            <div>
                Multiple Bets
            </div>
            <div>
                {props.bets_amount}
            </div>
        </div>
        <Slider min={1} max={10} default_value={1} on_change={props.on_change_bets_handler} value={props.bets_amount} />
    </>);
};