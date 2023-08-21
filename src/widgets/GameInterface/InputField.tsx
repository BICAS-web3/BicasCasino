import { FC, ReactNode, SetStateAction, useEffect } from 'react';
import s from './styles.module.scss';


export interface InputFieldProps {
    name: string;
};
export const InputField: FC<InputFieldProps> = props => {
    return (<div className={s.input_field}>
        <div>
            {props.name}
        </div>
        <div style={{
            opacity: '25%',
        }}>
            No Limit
        </div>
    </div>);
}