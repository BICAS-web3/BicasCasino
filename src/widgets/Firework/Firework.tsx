import s from './styles.module.scss';


import { FC, ReactElement, useEffect, useState } from 'react';


export interface FireworkProps {
    render: boolean,
    force_rerender: number
};

export const Firework: FC<FireworkProps> = props => {
    // return (<><div
    //     className={s.firework}
    //     style={{
    //         display: props.render ? 'block' : 'none'
    //     }}
    // ></div>
    //     <div
    //         className={`${s.firework_right}`}
    //         style={{
    //             display: props.render ? 'block' : 'none'
    //         }}
    //     ></div>
    //     <div
    //         className={`${s.firework_left}`}
    //         style={{
    //             display: props.render ? 'block' : 'none'
    //         }}
    //     ></div>
    // </>)

    return (<div style={{
        display: props.render ? 'block' : 'none'
    }}><div
        className={s.firework}
        style={{
            //display: 'block'
        }}
    ></div>
        <div
            className={`${s.firework_right}`}
            style={{
                //display: 'block'
            }}
        ></div>
        <div
            className={`${s.firework_left}`}
            style={{
                //display: 'block'
            }}
        ></div>
        <div
            className={`${s.firework_left1}`}
            style={{
                //display: 'block'
            }}
        ></div>
        <div
            className={`${s.firework_left2}`}
            style={{
                //display: 'block'
            }}
        ></div>
        <div
            className={`${s.firework_right1}`}
            style={{
                //display: 'block'
            }}
        ></div>
        <div
            className={`${s.firework_right2}`}
            style={{
                //display: 'block'
            }}
        ></div>
        <div
            className={`${s.firework_right3}`}
            style={{
                //display: 'block'
            }}
        ></div>
    </div>)
}