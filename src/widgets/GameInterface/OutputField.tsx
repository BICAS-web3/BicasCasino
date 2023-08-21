import { FC, ReactNode, SetStateAction, useEffect } from 'react';
import s from './styles.module.scss';

export interface OutputFieldprops {
    name: string,
    value: ReactNode
};

export const OutputField: FC<OutputFieldprops> = props => {
    return (<div className={s.output_field}>
        <div>
            {props.name}
        </div>

        {props.value}

    </div>);
}