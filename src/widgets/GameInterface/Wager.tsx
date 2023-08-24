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

interface WagerPickerProps { };
const WagerPicker: FC<WagerPickerProps> = props => {

    return (<div></div>);
}

export type OnChangeWagerHandler = (event: {
    target: {
        value: SetStateAction<string>;
    };
}) => void;

export interface WagerProps {
    value: string;
    valueDollars: string;
    onChangeHandler: OnChangeWagerHandler;
    onChangeDollarsHandler: OnChangeWagerHandler;
    onMaxHandler: any;
    onClickHandlers: (percentage: number) => void
};
export const Wager: FC<WagerProps> = props => {
    return (<div>
        <div className={s.wager_container}>
            Wager
            <div className={s.wager_input_container}>
                <input className={s.wager_input} value={props.value.toString()} onChange={props.onChangeHandler} ></input>
                {/* <div>$</div> */}
            </div>
            <div className={s.wager_input_container}>
                <input className={s.wager_input} value={props.valueDollars} onChange={props.onChangeDollarsHandler} ></input>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>$</div>
            </div>
            <div className={s.wager_percentage_picker} onClick={props.onMaxHandler}>
                <div className={s.percentage_pick} onClick={() => props.onClickHandlers(0.25)}>25%</div>
                <div className={s.percentage_pick} onClick={() => props.onClickHandlers(0.50)}>50%</div>
                <div className={s.percentage_pick} onClick={() => props.onClickHandlers(0.75)}>75%</div>
                <div className={s.percentage_pick} onClick={() => props.onClickHandlers(1)}>100%</div>
            </div>
        </div>
    </div>);
}