import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";


export interface PokerFlipCardsInfoProps {
    onCLick: () => void
}
export const PokerFlipCardsInfo: FC<PokerFlipCardsInfoProps> = props => {

    return (<>
        <div className={s.box}>
            <div className={s.text}>
                <div style={{ textAlign: 'center' }}>Flip the cards face down to draw them again.</div>
                <div>Then press the button.</div>
            </div>
            <div className={s.button} onClick={props.onCLick}>
                <div>Redraw</div>
            </div>
        </div>
    </>)
}