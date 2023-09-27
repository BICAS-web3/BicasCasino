import Image from 'next/image';
import { FC, JSX, useEffect, useState } from 'react';
import s from './styles.module.scss';
import locker from "../../public/media/total/locker.png";
import star from "../../public/media/total/star.png";
import trophy from "../../public/media/total/trophy.png";

const triplex = (n: string): string => n.replace(/(?!^)(\d{3})(?=(\d{3})*$)/g, " $1");


export interface TotalProps { description: string; image: any, dollar?: boolean, statistics: string };


const TotalItem: FC<TotalProps> = props => {
    return (<div className={s.total_item}>

        <div className={s.total_item_image}>
            <div className={s.total_item_bg_image}>

            </div>
            <Image src={props.image}
                alt=''
                className={s.image}
            />
        </div>

        <div className={s.description}>
            {props.description}
        </div>
        <div className={s.statistic}>
            {props.dollar ? `$ ${props.statistics}` : `${props.statistics}`}
        </div>
    </div>);
}

export interface TotalProps1 { }
export const Total: FC<TotalProps1> = props => {
    const [obj, setObj] = useState({ money: "285298103", star: "4639291", award: "26398" });

    //     useEffect(() => {
    //    fetch(api_url).then((response) => response.json()).then((obj) => setObj(obj));
    //     }, []);

    if (!obj) {
        return null;
    }

    return (<>
        <div className={s.total_container}>
            <TotalItem description='total wagered' image={locker} dollar statistics={triplex(obj.money)} />
            <TotalItem description='total bets' image={star} statistics={triplex(obj.star)} />
            <TotalItem description='total users' image={trophy} statistics={triplex(obj.award)} />
        </div>
    </>);
}