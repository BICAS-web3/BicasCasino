import { FC, ReactElement, ReactNode, SetStateAction, useEffect } from 'react';
import s from './styles.module.scss';
import { sessionModel } from '@/entities/session';
import { settingsModel } from '@/entities/settings';
import { useUnit } from 'effector-react';

interface TokenPickerProps { };
const TokenPicker: FC<TokenPickerProps> = props => {

    var [currentNetwork,
        currentToken,
        pickToken,
        availableTokens
    ] = useUnit([
        sessionModel.$currentNetwork,
        sessionModel.$currentToken,
        sessionModel.pickToken,
        settingsModel.$AvailableTokens
    ]);

    let tokensList: ReactElement[] = [];

    return (<div className={s.token_picker_container}>
        <div className={s.picked_token}>

        </div>
        <div className={s.tokens_variants}>

        </div>
    </div>);
}

export type OnChangeWagerHandler = (event: {
    target: {
        value: SetStateAction<string>;
    };
}) => void;

export interface WagerProps {
    value: number;
    onChangeHandler: OnChangeWagerHandler;
    onMaxHandler: any;
};
export const Wager: FC<WagerProps> = props => {
    return (<div>
        <div className={s.max_button} onClick={props.onMaxHandler}>MAX</div>
        <div className={s.wager_container}>
            Wager
            <input className={s.wager_input} value={props.value} onChange={props.onChangeHandler}></input>
        </div>
    </div>);
}