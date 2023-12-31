import Image from 'next/image';
import { FC, ReactNode, useEffect } from 'react';
import s from './styles.module.scss';

type BackgroundProps = {
    children: ReactNode;
    height: number | undefined;
    min_height: number;
    min_width: number;
};
export const Background: FC<BackgroundProps> = props => {
    return (<div style={{
        //height: props.height,
        minHeight: props.min_height,
        minWidth: props.min_width
    }} className={`${s.background} ${s.running_stroke}`}>
        {props.children}
    </div >);
}

type SecondaryBackgroundProps = {
    children: ReactNode;
    height: number;
    min_width: number;
    secondary_class: any;
};
export const SecondaryBackground: FC<SecondaryBackgroundProps> = props => {
    return (<div style={{
        //width: props.width,
        height: props.height,
        minWidth: props.min_width,
        width: '100%'
    }} className={`${s.secondary_background} ${props.secondary_class}`}>
        {props.children}
    </div >);
}