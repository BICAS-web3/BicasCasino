import { FC, ReactNode, SetStateAction, useEffect } from 'react';
import s from './styles.module.scss';

export type OnChangeBetsSliderHandler = (event: {
    target: {
        value: SetStateAction<string>;
    };
}) => void;

export interface SliderProps {
    min: number,
    max: number,
    default_value: number,
    on_change: OnChangeBetsSliderHandler,
    value: number
};
export const Slider: FC<SliderProps> = props => {
    return (
        <div className={s.slider_container}><input
            className={s.slider}
            type="range"
            min={props.min}
            max={props.max}
            defaultValue={props.default_value}
            onChange={props.on_change}
            value={props.value}
        /></div>);
}