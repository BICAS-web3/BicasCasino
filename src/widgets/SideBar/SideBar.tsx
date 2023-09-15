import Image from 'next/image';
import { FC, ReactNode, SetStateAction, useEffect, useState, use, MouseEvent } from 'react';
import s from './styles.module.scss';
import { CoinButton, DiceButton, RPCButton, PokerButton, GamesIcon, ArrowIcon, SupportIcon } from '@/shared/SVGs';
import { useUnit } from 'effector-react';
import * as SideBarModel from './model';

interface ClosedSideBarProps {
    pickedGame: number | null
};
const ClosedSideBar: FC<ClosedSideBarProps> = props => {
    return (
        <>
            <div className={s.side_bar_upper}>
                <div className={`${s.button} ${s.games_button}`}>
                    <GamesIcon />
                </div>
                <div className={s.buttons_holder}>
                    <div className={`${s.button} ${props.pickedGame == 0 ? s.button_picked : ''}`}>
                        <CoinButton />
                    </div>
                    <div className={`${s.button} ${props.pickedGame == 1 ? s.button_picked : ''}`}>
                        <DiceButton />
                    </div>
                    <div className={`${s.button} ${props.pickedGame == 2 ? s.button_picked : ''}`}>
                        <RPCButton />
                    </div>
                    <div className={`${s.button} ${props.pickedGame == 3 ? s.button_picked : ''}`}>
                        <PokerButton />
                    </div>
                </div>
            </div>
            <div className={s.side_bar_lower}>

            </div>
        </>
    )
}

interface OpenedSideBarProps {
    pickedGame: number | null
};
const OpenedSideBar: FC<OpenedSideBarProps> = props => {
    const [gamesAreOpen, setOpen] = useState(true);
    return (
        <>
            <div className={s.side_bar_upper}>
                <div className={`${s.buttons_menu} ${gamesAreOpen ? '' : s.buttons_menu_closed}`}>
                    <div className={s.menu_header} onClick={() => { setOpen(!gamesAreOpen); }}>
                        <div className={s.header_icon_container}>
                            <GamesIcon />
                            GAMES
                        </div>
                        <div className={`${s.arrow} ${gamesAreOpen ? s.arrow_down : s.arrow_side}`}>
                            <ArrowIcon />
                        </div>
                    </div>
                    <div className={s.game_rows}>
                        <div className={`${s.game_row} ${s.picked_game_row}`}>
                            <CoinButton />
                            Coinflip
                        </div>
                        <div className={s.game_row}>
                            <DiceButton />
                            Dice
                        </div>
                        <div className={s.game_row}>
                            <RPCButton />
                            Rock Paper Scissors
                        </div>
                        <div className={s.game_row}>
                            <PokerButton />
                            Poker
                        </div>
                    </div>
                </div>
                <div className={s.support}>
                    <div className={s.icon_wrapper}>
                        <SupportIcon />
                    </div>
                    <div className={s.large_header_text}>
                        SUPPORT
                    </div>
                </div>
            </div>
            <div className={s.side_bar_lower}>

            </div>
        </>

    )
}

export interface SideBarProps { };
export const SideBar: FC<SideBarProps> = props => {
    const [
        isOpen,
        currentPick
    ] = useUnit([
        SideBarModel.$isOpen,
        SideBarModel.$currentPick
    ]);
    return (<div className={`${s.side_bar} ${isOpen ? s.side_bar_opened : s.side_bar_closed}`}>
        {isOpen ? <OpenedSideBar pickedGame={currentPick} /> : <ClosedSideBar pickedGame={currentPick} />}
    </div>)
}