import Image from 'next/image';
import { FC, JSX, useEffect, useState } from 'react';
import s from './styles.module.scss';
import locker from "../../public/media/total/locker.png";
import star from "../../public/media/total/star.png";
import trophy from "../../public/media/total/trophy.png";
import { SideBarModel } from '../SideBar';
import { useUnit } from 'effector-react';
import * as Api from '@/shared/api';

const triplex = (n: string): string => n.replace(/(?!^)(\d{3})(?=(\d{3})*$)/g, " $1");


export interface TotalItemProps { description: string; image: any, dollar?: boolean, statistics: number | string };
const TotalItem: FC<TotalItemProps> = props => {
    const [
        isSideBarOpen
    ] = useUnit([
        SideBarModel.$isOpen
    ]);

    return (<div className={`${s.total_item} ${isSideBarOpen && s.open_sidebar}`}>

        {/* <div className={s.total_item_image}>
            <div className={s.total_item_bg_image}>

            </div>
            <Image src={props.image}
                alt=''
                className={s.image}
            />
        </div> */}
        <div className={s.total_item_overflow_container}>
            <div className={s.total_item_bg_image}>

            </div>

            <div className={s.description}>
                {props.description}
            </div>
            <div className={s.statistic}>
                {props.dollar ? `$ ${props.statistics}` : `${props.statistics}`}
            </div>
        </div>

        <Image src={props.image}
            alt=''
            className={s.image}
        />
    </div>);
}

export interface TotalProps1 { }
export const Total: FC<TotalProps1> = props => {
    const [totals, setTotals] = useState({ total_wagered: '-', total_users: '-', total_bets: '-' });

    useEffect(() => {
        const interval = setInterval(() => {
            //console.log('Logs every minute');
            Api.GetTotalsFx().then((response) => {
                const totals = response.body as Api.T_Totals;
                setTotals({ total_wagered: (totals.sum ? totals.sum : 0).toFixed(2), total_users: totals.player_amount.toString(), total_bets: totals.bets_amount.toString() });
            })
        }, 20000);

        // return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    //     useEffect(() => {
    //    fetch(api_url).then((response) => response.json()).then((obj) => setObj(obj));
    //     }, []);

    // if (!obj) {
    //     return null;
    // }

    return (<>
        <div className={s.total_container}>
            <TotalItem description='total wagered' image={locker} dollar statistics={totals.total_wagered} />
            <TotalItem description='total bets' image={star} statistics={totals.total_bets} />
            <TotalItem description='total users' image={trophy} statistics={totals.total_users} />
        </div>
    </>);
}