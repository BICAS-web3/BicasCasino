import s from "./styles.module.scss";
import { FC, useEffect } from 'react';
import Image from 'next/image';

export interface GameInfoProps { name: string, description: string; image: any };
export const GameInfo: FC<GameInfoProps> = props => {
    return (<div className={s.game_info}>
        <div className={s.game_name}>
            <div className={s.game_info_icon}>
                <Image
                    src={props.image}
                    alt=""
                    width={24}
                    height={18.67} />
            </div>
            {props.name}
        </div>
        <div className={s.description}>
            {props.description}
        </div>
    </div>);
}